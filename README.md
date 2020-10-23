# vf-cf-spa

This repository contains a node lambda function, an angular SPA, and a cloudformation template to deploy all 
of these resources to your AWS instance.  

On deployment, the CF template will deploy the weather function, push the SPA to a user defined s3 bucket, override the 
api endpoint to the one returned from the creation of the lambda function.  The endpoint of the new SPA will be returned on 
the describe-stacks command.

Steps to run

1.  Create S# deploy bucket: aws s3 mb s3://<RESOURCE_BUCKET_NAME> --region us-east-1 --profile <YOUR_PROFILE>
2.  Build angular app: cd vf-spa -> npm run build
3.  Package artifacts with CF: aws cloudformation package --template-file vftemplate.yml --output-template-file output.yml --s3-bucket=<RESOURCE_BUCKET_NAME> --profile <YOUR_PROFILE>
4.  Deploy artifacts with CF: aws cloudformation deploy --template-file output.yml --stack-name <STACK_NAME> --parameter-overrides BucketName=<SPA_BUCKET_NAME> --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND --profile <YOUR_PROFILE>
5.  Output CF variables: aws cloudformation describe-stacks --stack-name <STACK_NAME> --query Stacks[].Outputs[].OutputValue --output text
