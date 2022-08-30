import * as cdk from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

export class CdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
  pipeline = new CodePipeline(this, "Pipeline", {
    synth: new ShellStep("Synth", {
      input: CodePipelineSource.connection("miyamonz/fargate-study", "main", {
        connectionArn:
          "arn:aws:codestar-connections:ap-northeast-1:843096071935:connection/47c4233d-0875-42ea-b13f-950c07a63fd6",
      }),

      commands: [
        "cd cdk",
        "npm ci",
        "npm run build",
        "npm run cdk synth",
      ],
    }),
  });
}
