import AWS from 'aws-sdk';
const S3_BUCKET = 'teamappstorage';
const REGION = 'ap-southeast-1';


AWS.config.update({
    accessKeyId: 'AKIAYN6LHKCU4EYT2EMT',
    secretAccessKey: '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'
})

export const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})