import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_s3_deployment as s3Deploy } from 'aws-cdk-lib';
// import { aws_ec2 as ec2 } from 'aws-cdk-lib';
// import { aws_ecs as ecs } from 'aws-cdk-lib';
import { aws_apigateway as apiGateway } from 'aws-cdk-lib';
// import { aws_ecs_patterns as ecs_patterns } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
// import { aws_lambda_event_sources } from 'aws-cdk-lib';

export class CdkExpressHelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const bucket = new s3.Bucket(this, 'CdkHelloWorldBucket', {
        publicReadAccess: true,
        blockPublicAccess: {
          blockPublicAcls: false,
          blockPublicPolicy: false,
          ignorePublicAcls: false,
          restrictPublicBuckets: false,
        },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        autoDeleteObjects: true
      })

    new s3Deploy.BucketDeployment(this, "deployAssets", {
      sources: [s3Deploy.Source.asset("./assets")],
      destinationBucket: bucket,
      destinationKeyPrefix: 'static'
    })
      
    // const cluster = new ecs.Cluster(this, 'CdkExpressHelloWorldCluster', { vpc: vpc })
    
    // const vpc = new ec2.Vpc(this, 'CdkExpressHelloWorldVPC', { maxAzs: 2 })

    const expressLambda = new lambda.Function(this, "CDKExpressHelloWorld", {
      functionName: 'CDKExpressHelloWorld',
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.AssetCode.fromAsset('./server'),
      handler: 'server.handler',
      environment: {
        IMAGE_URL: `https://${bucket.bucketRegionalDomainName}/static`
      }
    })

    const api = new apiGateway.RestApi(this, 'CDKExpressHelloWorldApi', {
      restApiName: 'CDKExpressHelloWorldAPI'
    })

    const getIntegration = new apiGateway.LambdaIntegration(expressLambda, {
      requestTemplates: { "text/html": '{"statusCode": "200"}'}
    })
    const postIntegration = new apiGateway.LambdaIntegration(expressLambda, {
      requestTemplates: { "text/html": '{"statusCode": "200"}'}
    })
    const theyLive = api.root.addResource('they-live')
    theyLive.addMethod("GET", getIntegration)
    theyLive.addMethod("POST", postIntegration)
    api.root.addMethod("GET", getIntegration)
  }
}
