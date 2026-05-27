from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import json, os

load_dotenv()

app = FastAPI(title="Analytics Dashboard API", version="1.0.0")

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open(os.path.join(os.path.dirname(__file__), "analytics.json")) as f:
    DATA = json.load(f)

RANGE_PARAM = Query("30d", pattern="^(7d|30d|90d|12m)$")


@app.get("/")
def root():
    return {"message": "Analytics Dashboard API — visit /docs for full API reference"}


@app.get("/kpis")
def get_kpis(range: str = RANGE_PARAM):
    return DATA["kpis"][range]


@app.get("/user-growth")
def get_user_growth(range: str = RANGE_PARAM):
    return DATA["user_growth"][range]


@app.get("/feature-usage")
def get_feature_usage(range: str = RANGE_PARAM):
    return DATA["feature_usage"][range]


@app.get("/traffic-sources")
def get_traffic_sources():
    return DATA["traffic_sources"]


@app.get("/retention-trend")
def get_retention_trend(range: str = RANGE_PARAM):
    return DATA["retention_trend"][range]


@app.get("/insights")
def get_insights():
    return DATA["insights"]
