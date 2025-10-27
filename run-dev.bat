@echo off
setlocal
cd /d "%~dp0"
if not exist node_modules (
  echo Installing dependencies...
  npm install || goto :eof
)
echo Starting dev server...
npm run dev

