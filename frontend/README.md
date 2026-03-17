# HRMS Lite

## Overview
A lightweight HRMS system to manage employees and track attendance.

## Tech Stack
- Frontend: React
- Backend: FastAPI
- Database: SQLite

## Features
- Add/View/Delete Employees
- Mark Attendance
- View Attendance Records

## Run Locally

### Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev