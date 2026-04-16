import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {

  AWS_ACCESS_KEY:string = 'AKIAZPHUT6QUDBXJS3WB';
  AWS_SECRET_KEY:string = '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';
  AWS_BUCKET:string = 'shailesh-nestjs-upload-v1'
  private s3 = new S3Client({
      region: 'eu-north-1', // Mumbai
      credentials: {
      accessKeyId: this.AWS_ACCESS_KEY,
      secretAccessKey: this.AWS_SECRET_KEY,
      },
  });

  async uploadFile(file: Express.Multer.File) {
      const fileName = `${Date.now()}-${file.originalname}`;

      await this.s3.send(new PutObjectCommand({
        Bucket: this.AWS_BUCKET,
        Key: fileName, 
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      return `https://${this.AWS_BUCKET}.s3.amazonaws.com/${fileName}`;
  }


  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }


}
