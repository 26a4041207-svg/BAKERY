@echo off
title HONEYQUE Bakery - Backend (.NET Core Web API)
echo ========================================================
echo  KHOI DONG BACKEND ASP.NET CORE WEB API - HONEYQUE BAKERY
echo ========================================================
cd backend\BakeryApi
echo Dang chay backend tren http://localhost:5169 ...
echo Swagger UI co san tai: http://localhost:5169/index.html
dotnet run --urls "http://localhost:5169"
pause
