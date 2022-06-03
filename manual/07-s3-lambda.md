
### lambda deployment
aws-upload를 server에 배포하였을 경우
```
sudo apt-get install zip

sudo zip -r aws-upload.zip ./*
```

### aws cli install
```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo unzip awscliv2.zip
sudo ./aws/install
```

### aws setup
`aws configure`
Key id : [키 아이디]
Access Key :  [시크릿 액세스 키]
Default region name : ap-northeast-2
Default output format : json

### aws-upload.zip file s3 copy
```
aws s3 cp "aws-upload.zip" s3://버킷명
```