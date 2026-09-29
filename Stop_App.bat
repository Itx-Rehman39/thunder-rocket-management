@echo off
title Stop Thunder Rockets Server
cd /d "%~dp0"

echo ===================================================
echo   Stopping Thunder Rockets Server (Port 3000)...
echo ===================================================

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Terminating PID: %%a ...
    taskkill /F /PID %%a >nul 2>&1
)

echo [OK] Server stopped successfully.
timeout /t 2 >nul
exit
