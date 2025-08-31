import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // In a real app, you would handle the file stream here.
    // For example, using a library like `formidable` or `multer`.
    console.log('Receiving file upload...');

    req.on('end', () => {
      const mockCid = `bafkrei${Buffer.from(Math.random().toString()).toString('hex').substring(0, 52)}`;
      console.log('File upload finished. Mock CID:', mockCid);
      res.status(200).json({ success: true, cid: mockCid });
    });

    req.on('error', (err) => {
      console.error('Upload error:', err);
      res.status(500).json({ success: false, message: 'Upload failed' });
    });

  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
