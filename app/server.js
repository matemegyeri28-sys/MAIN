import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const srcDir = path.join(__dirname, "src");
const distDir = path.join(__dirname, "dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function resolveFile(requestPath) {
  const cleanPath = requestPath.split("?")[0].split("#")[0];
  if (cleanPath === "/" || cleanPath === "") {
    return path.join(publicDir, "index.html");
  }

  const candidatePaths = [
    path.join(publicDir, cleanPath),
    path.join(srcDir, cleanPath.replace(/^\/src\//, "")),
    path.join(distDir, cleanPath),
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  const htmlPath = path.join(publicDir, cleanPath);
  if (fs.existsSync(htmlPath + ".html")) {
    return htmlPath + ".html";
  }

  return path.join(publicDir, "index.html");
}

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  const filePath = resolveFile(decodeURI(req.url));
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Internal server error");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  });
});

const port = process.env.PORT || 4173;
server.listen(port, () => {
  console.log(`Megyeri Attila Autokereskedése fut a http://localhost:${port} címen.`);
});
