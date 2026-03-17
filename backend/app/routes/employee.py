from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter(prefix="/employees", tags=["Employees"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    result = crud.create_employee(db, employee)
    if not result:
        raise HTTPException(status_code=400, detail="Employee already exists")
    return result


@router.get("/")
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)


@router.delete("/{emp_id}")
def delete_employee(emp_id: int, db: Session = Depends(get_db)):
    result = crud.delete_employee(db, emp_id)
    if not result:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Deleted successfully"}