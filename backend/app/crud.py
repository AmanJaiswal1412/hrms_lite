from sqlalchemy.orm import Session
from . import models, schemas

# Employee
def create_employee(db: Session, employee: schemas.EmployeeCreate):
    existing = db.query(models.Employee).filter(
        (models.Employee.email == employee.email) |
        (models.Employee.employee_id == employee.employee_id)
    ).first()

    if existing:
        return None

    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_employees(db: Session):
    return db.query(models.Employee).all()


def delete_employee(db: Session, emp_id: int):
    employee = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if employee:
        db.delete(employee)
        db.commit()
    return employee


# Attendance
def create_attendance(db: Session, attendance: schemas.AttendanceCreate):

    existing = db.query(models.Attendance).filter(
        models.Attendance.employee_id == attendance.employee_id,
        models.Attendance.date == attendance.date
    ).first()

    if existing:
        return None

    db_attendance = models.Attendance(**attendance.dict())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    return db_attendance


def get_attendance_by_employee(db: Session, employee_id: int):
    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id
    ).all()