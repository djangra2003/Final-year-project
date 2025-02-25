from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DEFAULT_SYSTEM_MESSAGE = (
"You are an expert on Indian beaches, providing accurate and detailed information about various beaches across the country. "
"Respond to questions with concise answers, including information about beach locations, activities, nearby attractions, best times to visit, and other relevant details. "
"Help users explore beaches by providing recommendations based on their preferences, including family-friendly, adventure-packed, or serene getaways. "
"If asked about the logistics of visiting a particular beach, estimate travel costs, accommodation options, and any associated expenses. "
"Present your responses in a clear, easy-to-read pointer format with each point on a new line."
)

# @app.route("/")
# def index():
#     return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_message = data.get("message", "")
        chat_log = data.get("chat_log", [])

        if not chat_log:
            chat_log = [{"role": "system", "content": DEFAULT_SYSTEM_MESSAGE}]

        chat_log.append({"role": "user", "content": user_message})

        url = "https://api.deepseek.com/v1/chat/completions"
        headers = {
            "Authorization": "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",
            "Content-Type": "application/json"
        }
        data = {
            "model": "deepseek-chat",
            "messages": chat_log
        }

        response = requests.post(url, json=data, headers=headers)
        response_json = response.json()
        assistant_message = response_json["choices"][0]["message"]["content"].strip()

        formatted_message = "\n".join([line.strip() for line in assistant_message.split("\n") if line.strip()])

        chat_log.append({"role": "assistant", "content": formatted_message})

        return jsonify({"assistant_message": formatted_message, "chat_log": chat_log})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5002)