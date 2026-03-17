from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from .. import crud, schemas, database
from .. import models

router = APIRouter(prefix="/attendance", tags=["Attendance"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    result = crud.create_attendance(db, attendance)

    if not result:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this employee on this date"
        )

    return result


@router.get("/{employee_id}")
def get_attendance(employee_id: int, db: Session = Depends(get_db)):
    return crud.get_attendance_by_employee(db, employee_id)


@router.get("/by-emp/{employee_id}")
def get_attendance_by_employee_id(employee_id: str, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.employee_id == employee_id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee.id
    ).all()