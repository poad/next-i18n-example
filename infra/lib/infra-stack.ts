import * as amplify from '@aws-cdk/aws-amplify-alpha';
import { GitHubSourceCodeProvider } from '@aws-cdk/aws-amplify-alpha';
import { SecretValue, Stack, StackProps } from 'aws-cdk-lib';
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Role, ServicePrincipal, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface InfraStackProps extends StackProps {
  accessToken: string,
}

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props: InfraStackProps) {
    super(scope, id, props);

    const { accessToken } = props;

    const app = new amplify.App(this, 'AmplifyApp', {
      appName: 'next-i18n-example',
      sourceCodeProvider: new GitHubSourceCodeProvider({
        owner: 'poad',
        repository: 'next-i18n-example',
        oauthToken: SecretValue.unsafePlainText(accessToken)
      }),
      autoBranchDeletion: true,
      customResponseHeaders: [],
      environmentVariables: {
        AMPLIFY_MONOREPO_APP_ROOT: 'app',
        SSR_IS_ENABLED: 'true',
        IS_SSR: 'true',
        _LIVE_UPDATES: '[{"name":"Node.js version","pkg":"node","type":"nvm","version":"16"},{"name":"Next.js version","pkg":"next-version","type":"internal","version":"latest"},{"name":"Yarn","pkg":"yarn","type":"npm","version":"latest"}]'
      },
      role: new Role(this, 'AmplifyAppServiceRole', {
        roleName: 'NextI18nExampleAmplifyAppServiceRole',
        assumedBy: new ServicePrincipal('amplify.amazonaws.com'),
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify')
        ]
      }),
      buildSpec: BuildSpec.fromObjectToYaml({
        version: 1,
        applications: [
          {
            // backend: {
            //   phases: {
            //     preBuild: {
            //       commands: [
            //         'yarn install'
            //       ],
            //     },
            //     build: {
            //       commands: [
            //         'yarn build'
            //       ],
            //     },
            //   },
            // },
            frontend: {
              phases: {
                preBuild: {
                  commands: [
                    'yum remove openssl-devel -y',
                    'yum install openssl11 openssl11-devel -y',
                    'yarn install'
                  ],
                },
                build: {
                  commands: [
                    'yarn build'
                  ],
                },
              },
              artifacts: {
                baseDirectory: '.next',
                files: [
                  '**/*'
                ],
              },
              cache: {
                paths: 'node_modules'
              },
            },
            appRoot: 'app'
          }
        ]
      })
    });
    new amplify.Branch(this, 'AmplifyBranch', {
      app,
      branchName: 'main',
      autoBuild: false
    });
  }
}
