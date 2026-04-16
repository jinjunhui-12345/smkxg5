import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resend = new Resend(process.env.RESEND_API_KEY);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Supabase Webhook Route
  app.post('/api/webhook/reservation', async (req, res) => {
    try {
      const { record, type } = req.json ? req.body : { record: req.body.record, type: req.body.type };
      
      // Only handle INSERT events
      if (type !== 'INSERT' && !req.body.record) {
        return res.status(200).json({ message: 'Not an insert event' });
      }

      const data = record || req.body;

      console.log('Received reservation webhook:', data);

      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is missing');
        return res.status(500).json({ error: 'Email service not configured' });
      }

      const { data: emailData, error } = await resend.emails.send({
        from: 'LSM Reservation <onboarding@resend.dev>',
        to: ['jinjunhui0612@gmail.com'],
        subject: `新预约通知：${data.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #10b981;">收到新的展馆预约</h2>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><b>姓名：</b> ${data.name}</p>
            <p><b>身份/人数：</b> ${data.identity}</p>
            <p><b>联系电话：</b> ${data.phone}</p>
            <p><b>预约日期：</b> ${data.visit_date}</p>
            <p><b>预约时间：</b> ${data.visit_time}</p>
            <p><b>备注信息：</b> ${data.remarks || '无'}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #999;">此邮件由系统自动发送，请勿直接回复。</p>
          </div>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: error.message });
      }

      console.log('Email sent successfully:', emailData);
      res.status(200).json({ success: true, id: emailData?.id });
    } catch (err) {
      console.error('Webhook error:', err);
      res.status(500).json({ error: 'Internal server error' });
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
    const distPath = path.join(__dirname, 'dist');
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
