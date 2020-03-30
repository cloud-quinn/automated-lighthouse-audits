const aws = require('aws-sdk');

module.exports = (fileData, fileName = `lighthouse-audit-${Date.now()}`) => {
    aws.config.update({
        'accessKeyId': 'access-key-for-aws-iam-user',
        'secretAccessKey': 'secret-access-key-for-aws-iam-user'
    });

    const s3Config = {
        'ACL': 'bucket-owner-read',
        'Body': fileData,
        'Bucket': 'name-of-s3-bucket',
        'ContentType': 'application/json',
        'Key': fileName,
    };

    new aws.S3({ "signatureVersion": "v4" }).putObject(s3Config, (err, res) => {
        if (err) throw err;
        console.log(res);
    });
};