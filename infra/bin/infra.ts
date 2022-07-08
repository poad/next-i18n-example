#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();

const accessToken = app.node.tryGetContext('token') as string;

new InfraStack(app, 'next-i18n-example', {
  accessToken
});