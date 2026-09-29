@echo off
title Thunder Rockets Cricket Management System
cd /d "%~dp0"

echo ===================================================
echo   THUNDER ROCKETS 138/10R CRICKET MANAGEMENT
echo ===================================================
echo.
echo Starting application server...

:: Check if port 3000 is already in use
netstat -ano | findstr :3000 | findstr LISTENING >nul
if %ERRORLEVEL% equ 0 (
    echo [OK] Server is already running on http://localhost:3000
) else (
    echo Launching background server...
    start /min "Thunder Rockets Server" cmd /c "npm run start"
    :: Give the server a few seconds to initialize
    timeout /t 3 /nobreak >nul
)

echo.
echo Opening Google Chrome at http://localhost:3000 ...
start "" "http://localhost:3000"

echo.
echo ===================================================
echo  Application is LIVE at: http://localhost:3000
echo  You can now close this window safely.
echo ===================================================
timeout /t 4 >nul
exit
