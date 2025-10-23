import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const processes = [];

function runWorkspace(workspace, script) {
  const child = spawn('npm', ['run', '-w', workspace, script], {
    stdio: 'inherit',
    cwd: resolve(__dirname, '..')
  });
  processes.push(child);
  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`Workspace ${workspace} exited with code ${code}`);
      shutdown(code ?? 1);
    }
  });
}

function shutdown(code = 0) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

runWorkspace('@main/server', 'dev');
runWorkspace('@main/web', 'dev');
