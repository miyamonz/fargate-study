import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import { Duration } from "aws-cdk-lib";

export class FargateStudyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECS Cluster
    const cluster = new ecs.Cluster(this, "AbeTestCluster", {
      vpc: vpc,
    });

    const loadBalancedFargateService =
      new ecsPatterns.ApplicationLoadBalancedFargateService(
        this,
        "AbeTestService",
        {
          cluster: cluster, // Required
          memoryLimitMiB: 512,
          cpu: 256,
          desiredCount: 1, // Optional(省略値は3)
          listenerPort: 80,
          taskImageOptions: {
            image: ecs.ContainerImage.fromRegistry(
              "my_account/spring-boot-docker"
            ),
            containerPort: 8080,
          },
          healthCheckGracePeriod: Duration.seconds(240),
        }
      );

    // HealthCheckの設定
    loadBalancedFargateService.targetGroup.configureHealthCheck({
      path: "/",
      healthyThresholdCount: 2, // Optional
      interval: Duration.seconds(15), // Optional
    });
  }
}
