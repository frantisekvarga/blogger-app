import { Request, Response } from 'express';
import { Files, File as FormidableFile, IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import {
  InvalidFileException,
  UploadErrorException,
} from '../types/exceptions';

const uploadDir = path.resolve('apps/api/public/uploads');
fs.mkdirSync(uploadDir, { recursive: true });

export class ImageController {
  public uploadImage = (req: Request, res: Response) => {
    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 24 * 1024 * 1024,
    });

    form.parse(req, (err, fields, files: Files) => {
      if (err || !files.image) {
        console.error('Form parse error:', err);
        throw new UploadErrorException();
      }

      const fileData = files.image;
      const image: FormidableFile = Array.isArray(fileData)
        ? fileData[0]
        : fileData;

      if (!image || !image.filepath) {
        throw new InvalidFileException();
      }

      const fileName = path.basename(image.filepath);
      const imageUrl = `/uploads/${fileName}`;

      return res.status(200).json({ imageUrl });
    });
  };
}
