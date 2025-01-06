from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import List, Annotated
import models
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_methods=["*"],
                   allow_headers=["*"])


models.Base.metadata.create_all(bind=engine)

class Items(BaseModel):
    name: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]




@app.post("/items/",status_code=status.HTTP_200_OK)
async def create_item(item: Items, db:db_dependency):
    # return item
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
