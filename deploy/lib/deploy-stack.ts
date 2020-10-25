import { Construct, RemovalPolicy, Stack, StackProps } from "@aws-cdk/core";
import { Bucket } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";

export class DeployStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const bucketName = "jest-generator";
    const destinationBucket = new Bucket(this, bucketName, {
      bucketName,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Deploy dist file to bucket
    new BucketDeployment(this, "DeployWithInvalidation", {
      destinationBucket,
      sources: [Source.asset("../dist")],
    });
  }
}
