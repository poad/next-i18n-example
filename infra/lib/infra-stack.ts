import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CachePolicy } from 'aws-cdk-lib/aws-cloudfront';
import { CacheControl } from 'aws-cdk-lib/aws-codepipeline-actions';

export interface InfraStackProps extends StackProps {
  appName: string
}

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const { appName } = props;

    const s3bucket = new s3.Bucket(this, 'S3Bucket', {
      bucketName: appName,
      versioned: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: false,
      accessControl: s3.BucketAccessControl.PRIVATE,
      publicReadAccess: false,
    });

    new cf.Distribution(this, 'CloudFront', {
      comment: `for ${appName}`,
      defaultBehavior: {
        origin: new S3Origin(s3bucket, {
          originAccessIdentity: new cf.OriginAccessIdentity(this, 'CloudFrontS3OriginAccessIdentity', {
          })
        }),
        cachePolicy: CachePolicy.CACHING_OPTIMIZED_FOR_UNCOMPRESSED_OBJECTS,
        
      },
      enableIpv6: false,
      defaultRootObject: 'index.html',
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(`${process.cwd()}/../app/out`)],
      destinationBucket: s3bucket,
      destinationKeyPrefix: '/',
      exclude: ['.DS_Store', '*/.DS_Store', '_next/static/wasm/webassembly.wasm'],
      prune: true,
      cacheControl: [
        CacheControl.noCache()
      ]
    });
  }
}
