import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import * as aws from 'aws-sdk';

aws.config.update({
    secretAccessKey: `${process.env.AWS_KEY}`,
    accessKeyId: `${process.env.AWS_ID}`,
    region: `${process.env.AWS_REGION}`
})

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'school-images-1',
        acl: 'public-read-write',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.originalname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

export default upload;