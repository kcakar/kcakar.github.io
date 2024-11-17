@echo off
:: Check if magick command is available
magick -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ImageMagick is not installed or not in your PATH.
    pause
    exit /b
)

:: Loop through .jpg files and convert them to WebP
for %%i in (*.jpg) do (
    echo Processing %%i ...
    ::magick "%%i" -resize 700x -quality 80 "%%~ni.webp"
    magick "%%i" -resize 1500x "%%~ni.webp"

)

echo Conversion complete.
pause