from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    supabase_url: str
    supabase_key: str
    anthropic_api_key: str
    openai_api_key: str
    redis_url: str = "redis://localhost:6379"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
