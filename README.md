# vf-cf-spa

Steps to run

1.  Create S# deploy bucket: aws s3 create-bucket --bucket <RESOURCE_BUCKET_NAME> --region us-east-1
2.  Build angular app: ng build
3.  Package artifacts with CF: aws cloudformation package --template-file template.yml --output-template-file output.yml --s3-bucket=<RESOURCE_BUCKET_NAME>
4.  Deploy artifacts with CF: aws cloudformation deploy --template-file output.yml --stack-name <STACK_NAME> --parameter-overrides BucketName=<SPA_BUCKET_NAME> --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
5.  Output CF variables: aws cloudformation describe-stacks --stack-name <STACK_NAME> --query Stacks[].Outputs[].OutputValue --output text
