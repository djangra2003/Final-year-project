from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

logging.basicConfig(level=logging.INFO)

DEFAULT_SYSTEM_MESSAGE = (
    "You are an expert on Indian beaches, providing accurate and detailed information about various beaches across the country. "
    "Respond to questions with concise answers, including information about beach locations, activities, nearby attractions, best times to visit, and other relevant details. "
    "Help users explore beaches by providing recommendations based on their preferences, including family-friendly, adventure-packed, or serene getaways. "
    "If asked about the logistics of visiting a particular beach, estimate travel costs, accommodation options, and any associated expenses. "
    "Present your responses in a clear, easy-to-read pointer format with each point on a new line."
)

API_URL = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2"
HEADERS = {
    "x-rapidapi-key": "812f21515amsh89268b51628bae6p1b31efjsnf10efdcb1c01",
    "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
    "Content-Type": "application/json"
}

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "").strip()
        chat_log = data.get("chat_log", [])

        if not user_message:
            return jsonify({"error": "Message cannot be empty."}), 400

        if not chat_log:
            chat_log = [{"role": "system", "content": DEFAULT_SYSTEM_MESSAGE}]

        chat_log.append({"role": "user", "content": user_message})

        payload = {
            "messages": chat_log,
            "system_prompt": "",
            "temperature": 0.9,
            "top_k": 5,
            "top_p": 0.9,
            "max_tokens": 256,
            "web_access": False
        }

        response = requests.post(API_URL, json=payload, headers=HEADERS)
        response_json = response.json()
        
        if "choices" in response_json and response_json["choices"]:
            assistant_message = response_json["choices"][0]["message"]["content"].strip()
        else:
            assistant_message = "Sorry, I couldn't generate a response."

        formatted_message = "\n".join([line.strip() for line in assistant_message.split("\n") if line.strip()])
        chat_log.append({"role": "assistant", "content": formatted_message})

        return jsonify({"assistant_message": formatted_message, "chat_log": chat_log})
    except requests.exceptions.RequestException as e:
        logging.error(f"Request Error: {str(e)}")
        return jsonify({"error": "Failed to connect to AI service."}), 500
    except Exception as e:
        logging.error(f"Unexpected Error: {str(e)}")
        return jsonify({"error": "An unexpected error occurred."}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5002)