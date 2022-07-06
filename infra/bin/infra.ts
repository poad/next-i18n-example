#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';
import { nextJsExport } from '../lib/process/setup';

nextJsExport();

const app = new cdk.App();
new InfraStack(app, 'next-i18n-example', {
  name: 'next-i18n-example',
  region: 'us-west-2'
});