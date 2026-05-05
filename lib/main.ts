#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
// @ts-ignore
import {GravelmonDynamoDBLayerStack} from "./stacks/GravelmonDynamoDBLayerStack";

const devEnv = {
    account: '698852667105',
    region: 'us-east-1',
}

const app = new cdk.App()
new GravelmonDynamoDBLayerStack( app, 'CdkLayerExampleStack', { env: devEnv } )