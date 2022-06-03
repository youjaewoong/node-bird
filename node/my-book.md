
### IAM KEY 발급

### s3 인스턴스 생성

### s3설정
- 퍼블릭 액세스 차단 해제
- 버킷 정책 설정
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::easy-to-do/*"
        }
    ]
}
```

### aws modul s3 plugin
`npm i aws-sdk multer-s3`