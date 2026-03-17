# HRMS Lite

## Overview
A lightweight HRMS system to manage employees and track attendance.

## Deployment
Frontend: https://hrms-lite-one-iota.vercel.app
Backend: https://hrms-lite-y4fp.onrender.com

## Tech Stack
- Frontend: React
- Backend: FastAPI
- Database: SQLite

## Features
- Add/View/Delete Employees
- Mark Attendance
- View Attendance Records

## ▶️ Run Locally

### Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## ⚠️ Assumptions
- Basic validation implemented
- SQLite used for simplicity
