import { Request, Response, NextFunction } from 'express';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import config from '@config';
import { BadRequest } from '@errors';

const { aws } = config;

const s3 = new AWS.S3({
  accessKeyId: aws.accesskey,
  secretAccessKey: aws.secretAccessKey,
});

// api/v1/upload
const upload = (req: Request, res: Response, next: NextFunction) => {
  const key = `${req.user!._id}/${uuidv4()}.png`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'web-tech-images',
      ContentType: 'image/png',
      Key: key,
    },
    (err, url) => {
      if (err) {
        return next(new BadRequest([{ msg: 'aws upload fail', param: 'url' }]));
      }
      return res.status(201).json({
        key,
        url,
      });
    }
  );
};

export default upload;
