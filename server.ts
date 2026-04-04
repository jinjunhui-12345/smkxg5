import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Afs20180112, * as $Afs20180112 from '@alicloud/afs20180112';
import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
import * as $tea from '@alicloud/tea-util';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Alibaba Cloud AFS Client
  const afsConfig = new $OpenApi.Config({
    accessKeyId: process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET,
    endpoint: 'afs.aliyuncs.com',
    regionId: 'cn-hangzhou',
  });
  const afsClient = new Afs20180112(afsConfig);

  // Supabase Client for backend
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_KEY;
  const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

  // API Route for Reservation with Captcha Verification
  app.post('/api/reserve', async (req, res) => {
    const { formData, captchaData } = req.body;

    if (!captchaData) {
      return res.status(400).json({ error: 'Missing captcha data' });
    }

    try {
      // 1. Verify Captcha with Alibaba Cloud
      const authenticateSigRequest = new $Afs20180112.AuthenticateSigRequest({
        scene: captchaData.scene,
        sessionId: captchaData.sessionId,
        sig: captchaData.sig,
        appKey: captchaData.appKey,
        token: captchaData.token,
        remoteIp: req.ip || '127.0.0.1',
      });

      const runtime = new $tea.RuntimeOptions({});
      const afsResponse = await afsClient.authenticateSigWithOptions(authenticateSigRequest, runtime);

      if (afsResponse.body.code !== 100) {
        console.error('Captcha verification failed:', afsResponse.body);
        return res.status(400).json({ error: '人机验证失败，请重试', code: afsResponse.body.code });
      }

      // 2. Save Reservation to Supabase
      if (!supabase) {
        throw new Error('Database not configured');
      }

      const newRecord = {
        ...formData,
        id: Math.random().toString(36).substring(2, 10).toUpperCase(),
        created_at: Date.now(),
      };

      const { data: savedData, error } = await supabase
        .from('ReservationData')
        .insert([newRecord])
        .select()
        .single();

      if (error) throw error;

      res.json(savedData);
    } catch (error: any) {
      console.error('Reservation error:', error);
      res.status(500).json({ error: error.message || '提交预约失败，请稍后重试' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
