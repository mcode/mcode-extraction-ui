#!/usr/bin/env node

const { spawn } = require('child_process');

if (process.platform === 'win32') {
  spawn('npm.cmd', ['run', 'start:windows'], { stdio: 'inherit' });
} else {
  spawn('npm', ['run', 'start:nonwindows'], { stdio: 'inherit' });
}