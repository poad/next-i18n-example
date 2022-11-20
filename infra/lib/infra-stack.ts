import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import { RemovalPolicy } from 'aws-cdk-lib';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { CacheControl } from 'aws-cdk-lib/aws-codepipeline-actions';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface InfraStackProps extends cdk.StackProps {
  appName: string;
}

export class InfraStack extends cdk.Stack {
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

    // CloudFront Functionリソースの定義
    const websiteIndexPageForwardFunction = new cloudfront.Function(
      this,
      'WebsiteIndexPageForwardFunction',
      {
        functionName: `${appName}-index-page-forwarder`,
        code: cloudfront.FunctionCode.fromFile({
          filePath: 'function/index.js',
        }),
      },
    );

    const oac = new cloudfront.CfnOriginAccessControl(
      this,
      'OriginAccessControl',
      {
        originAccessControlConfig: {
          name: `${appName}-oac`,
          originAccessControlOriginType: 's3',
          signingBehavior: 'no-override',
          signingProtocol: 'sigv4',
        },
      },
    );

    const cf = new cloudfront.CloudFrontWebDistribution(this, 'CloudFront', {
      comment: `for ${appName}`,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: s3bucket,
          },
          behaviors: [
            {
              isDefaultBehavior: true,
              compress: true,
              functionAssociations: [
                {
                  eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
                  function: websiteIndexPageForwardFunction,
                },
              ],
              cachedMethods: cloudfront.CloudFrontAllowedCachedMethods.GET_HEAD,
              viewerProtocolPolicy:
                cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              minTtl: cdk.Duration.seconds(0),
              maxTtl: cdk.Duration.seconds(86400),
              defaultTtl: cdk.Duration.seconds(3600),
            },
          ],
        },
      ],
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
    });
    s3bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'AllowCloudFrontServicePrincipalReadOnly',
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        actions: ['s3:GetObject'],
        resources: [`${s3bucket.bucketArn}/*`],
        conditions: {
          StringEquals: {
            'AWS:SourceArn': `arn:aws:cloudfront::${this.account}:distribution/${cf.distributionId}`,
          },
        },
      }),
    );

    const cfnDistribution = cf.node.defaultChild as cloudfront.CfnDistribution;
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.getAtt('Id'),
    );
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.S3OriginConfig.OriginAccessIdentity',
      '',
    );

    // eslint-disable-next-line no-new
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset(`${process.cwd()}/../app/out`)],
      destinationBucket: s3bucket,
      destinationKeyPrefix: '/',
      exclude: ['.DS_Store', '*/.DS_Store'],
      prune: true,
      cacheControl: [CacheControl.noCache()],
    });
  }
}
