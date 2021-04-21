import AWS from 'aws-sdk';
const S3_BUCKET = 'teamappstorage';
const REGION = 'ap-southeast-1';


AWS.config.update({
    accessKeyId: 'AKIAYN6LHKCURUYRT6W3',
    secretAccessKey: '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'
})

export const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})