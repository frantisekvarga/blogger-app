import { Request, Response } from 'express';
import { IncomingForm, File as FormidableFile, Files } from 'formidable';
import path from 'path';
import fs from 'fs';

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
        return res.status(400).json({ message: 'Upload error' });
      }

      const fileData = files.image;
      const image: FormidableFile = Array.isArray(fileData) ? fileData[0] : fileData;

      if (!image || !image.filepath) {
        return res.status(400).json({ message: 'Invalid file' });
      }

      const fileName = path.basename(image.filepath);
      const imageUrl = `/uploads/${fileName}`;

      return res.status(200).json({ imageUrl });
    });
  };
}
