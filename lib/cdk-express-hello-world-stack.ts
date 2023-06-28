import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { aws_s3 as s3 } from 'aws-cdk-lib';
// import { aws_ec2 as ec2 } from 'aws-cdk-lib';
// import { aws_ecs as ecs } from 'aws-cdk-lib';
import { aws_apigateway as apiGateway } from 'aws-cdk-lib';
// import { aws_ecs_patterns as ecs_patterns } from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
// import { aws_lambda_event_sources } from 'aws-cdk-lib';

export class CdkExpressHelloWorldStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    // const bucket = new s3.Bucket(this, 'CdkHelloWorldBucket', {
      //   versioned: true,
      //   removalPolicy: cdk.RemovalPolicy.DESTROY,
      //   autoDeleteObjects: true
      // })
      
    // const cluster = new ecs.Cluster(this, 'CdkExpressHelloWorldCluster', { vpc: vpc })
    
    // const vpc = new ec2.Vpc(this, 'CdkExpressHelloWorldVPC', { maxAzs: 2 })

    const expressLambda = new lambda.Function(this, "CDKExpressHelloWorld", {
      functionName: 'CDKExpressHelloWorld',
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.AssetCode.fromAsset('./server/build'),
      handler: 'server.handler'
    })

    const api = new apiGateway.RestApi(this, 'CDKExpressHelloWorldApi', {
      restApiName: 'CDKExpressHelloWorldAPI'
    })

    const getIntegration = new apiGateway.LambdaIntegration(expressLambda, {
      requestTemplates: { "text/html": '{"statusCode": "200"} '}
    })

    api.root.addMethod("GET", getIntegration)
  }
}
