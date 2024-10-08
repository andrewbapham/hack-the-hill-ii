from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import routers.journals as journals
import routers.users as users
import routers.embeddings as embeddings
from dotenv import load_dotenv

load_dotenv()

origins = ["*"]

tags_metadata = [
    {"name": "journals", "description": "Operations with journals."},
    {"name": "users", "description": "Operations with users."},
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(journals.router, prefix="/api/v1", tags=["journals"])
app.include_router(users.router, prefix="/api/v1", tags=["users"])
app.include_router(embeddings.router, prefix="/api/v1", tags=["embeddings"])


@app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok"}
