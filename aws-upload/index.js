const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3();

//exports.handler 관습이다 
exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; //버킷명
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // 파일명
  const filename = Key.split('/')[Key.split('/').length - 1];// 파일명 추출
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // 파일명 확장자 제거
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg 사용합니다.
  console.log('name', filename, 'ext', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, Key }).promise(); // 버퍼로 가져오기
    console.log('original', s3Object.Body.length); // 이미지의 용량
    const resizedImage = await sharp(s3Object.Body) // 리사이징
      .resize(200, 200, { fit: 'inside' }) // 비율을 유지하면서 꽉차게 (inside)
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({ // thumb 폴더에 저장
      Bucket,
      Key: `thumb/${filename}`, // original/easyToDo 20mb -> thumb/easyToDo.png 4mb 
      Body: resizedImage,
    }).promise();
    console.log('put', resizedImage.length);
    return callback(null, `thumb/${filename}`); //s3에서는 reutrn 값이 필요없음 http 응답시 필요 한경우 임
  } catch (error) {
    console.error(error);
    return callback(error);
  }
};
