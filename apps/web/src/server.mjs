import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, 'public');

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8']
]);

const port = Number(process.env.PORT || 3000);

createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const filePath = resolvePath(url.pathname);

  try {
    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) {
      await serveFile(join(filePath, 'index.html'), res);
    } else {
      await serveFile(filePath, res);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      await serveFile(join(publicDir, 'index.html'), res, 200);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
}).listen(port, () => {
  console.log(`Web workspace running at http://localhost:${port}`);
});

function resolvePath(pathname) {
  const cleanPath = pathname.replace(/\.\.(?:\/|$)/g, '').replace(/^\//, '');
  const target = join(publicDir, cleanPath || 'index.html');
  return target;
}

async function serveFile(path, res, status = 200) {
  const ext = extname(path).toLowerCase();
  const mime = mimeTypes.get(ext) || 'text/plain; charset=utf-8';
  const content = await readFile(path);
  res.writeHead(status, { 'Content-Type': mime, 'Content-Length': content.length });
  res.end(content);
}
