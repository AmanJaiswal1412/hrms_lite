from pydantic import BaseModel, EmailStr
from datetime import date
from enum import Enum

# Employee
class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str


class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        orm_mode = True


class AttendanceStatus(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

# Attendance
class AttendanceCreate(BaseModel):
    employee_id: int
    date: date
    status: AttendanceStatus


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    status: str

    class Config:
        orm_mode = True