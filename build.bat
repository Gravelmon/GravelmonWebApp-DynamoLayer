@echo off

echo Start build...
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

echo Start build-layer...
call npm run build-layer
if %errorlevel% neq 0 exit /b %errorlevel%

echo Klaar.
pause