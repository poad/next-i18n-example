import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Effect, PolicyStatement, StarPrincipal } from 'aws-cdk-lib/aws-iam';
import { HttpOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CachePolicy, OriginProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import * as crypto from 'crypto';

export interface InfraStackProps extends StackProps {
  name: string,
  region: string,
}

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);


    const hash = crypto.createHash("md5").update(new Date().getTime().toString()).digest('hex');

    const s3BucketName = `${props.name}-static-site`;

    new cf.Distribution(this, 'CloudFront', {
      defaultBehavior: {
        origin: new HttpOrigin(`${s3BucketName}.s3-website-${props.region}.amazonaws.com`, {
          customHeaders: {
            'Referer': hash
          },
          protocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
        }),
        cachePolicy: CachePolicy.CACHING_DISABLED,

      },
      enableIpv6: false,
      defaultRootObject: 'index.html',
    });

    const s3bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: s3BucketName,
      versioned: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: false,
      accessControl: s3.BucketAccessControl.PRIVATE,
      publicReadAccess: false,
      websiteIndexDocument: 'index.html',
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(`${process.cwd()}/../pages/out`)],
      destinationBucket: s3bucket,
      destinationKeyPrefix: '/',
      exclude: ['.DS_Store', '*/.DS_Store'],
    });

    s3bucket.addToResourcePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject'],
      principals: [new StarPrincipal()],
      resources: [`${s3bucket.bucketArn}/*`],
    }));
  }
}
