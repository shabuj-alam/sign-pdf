import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'
import path from 'path';
import process from 'process';
import 'dotenv/config';
import { pdfSign, pdfUpload } from './services/pdfsign.service.js';

const app = express();
const IP = process.env.SERVER_IP;
const PORT = process.env.SERVER_PORT;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Upload and sign PDF endpoint
app.post('/api/upload-and-sign', pdfUpload.single('pdf'), pdfSign);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF signing server is running' });
});

app.listen(PORT, IP,() => {
  console.log(`Server running on http://${IP}:${PORT}`);
});
