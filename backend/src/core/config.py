import logging
import os

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Todo API"
    SECRET_KEY: str = "your-secret-key" # TODO: Generate a strong secret key
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    ALLOWED_ORIGINS: list[str] = ["*"]

    DATABASE_URL: str | None = None # TODO: Update with actual DB URL

    # Model for BaseSettings
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

# Basic logging configuration
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

