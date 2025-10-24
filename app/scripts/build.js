import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, ".." );
const distDir = path.join(rootDir, "dist");

function copyDir(source, destination) {
  if (!fs.existsSync(source)) {
    return;
  }
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  for (const item of fs.readdirSync(source)) {
    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);
    const stats = fs.statSync(srcPath);
    if (stats.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

copyDir(path.join(rootDir, "public"), distDir);
copyDir(path.join(rootDir, "src"), path.join(distDir, "src"));

console.log("Statikus fájlok felkészítve a dist mappába.");
