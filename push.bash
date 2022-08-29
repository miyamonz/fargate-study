#!/bin/bash

docker tag fargate-study_server $ECR_URL/fargate-study:latest
docker push $ECR_URL/fargate-study:latest

aws ecs update-service --cluster fargate-study-cluster --service fargate-study-service --force-new-deployment
