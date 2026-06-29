import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Load env variables so api/graphql.js can access process.env.VITE_...
  const env = loadEnv(mode, process.cwd(), '')
  process.env = { ...process.env, ...env }

  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/graphql', (req, res, next) => {
            // Mock Vercel-like response methods for the local API handler
            res.status = (code) => { res.statusCode = code; return res; };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            };
            
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  req.body = JSON.parse(body);
                } catch (e) {
                  req.body = {};
                }
                
                try {
                  const { default: graphqlHandler } = await import('./api/graphql.js');
                  await graphqlHandler(req, res);
                } catch (err) {
                  console.error('API Error:', err);
                  if (!res.headersSent) {
                    res.status(500).json({ error: 'Internal Server Error' });
                  }
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    server: {
      proxy: {
        '/api-proxy': {
          target: 'https://soullovenearth.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-proxy/, ''),
          secure: true,
        }
      }
    }
  }
})