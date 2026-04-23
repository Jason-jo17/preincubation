from anthropic import Anthropic
from app.config import settings

client = Anthropic(api_key=settings.anthropic_api_key)

class ClaudeService:
    @staticmethod
    def create_message(system: str, user_message: str, model: str = "claude-sonnet-4-20250514", max_tokens: int = 4096):
        """Create a Claude message with retry logic"""
        try:
            message = client.messages.create(
                model=model,
                max_tokens=max_tokens,
                system=system,
                messages=[{"role": "user", "content": user_message}]
            )
            return message.content[0].text
        except Exception as e:
            print(f"Claude API error: {e}")
            raise
