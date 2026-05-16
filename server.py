from flask import Flask, request, jsonify
from gpt4all import GPT4All
import os

app = Flask(__name__)

# Use the local model file
model_path = os.path.join(os.getcwd(), "models", "ggml-gpt4all-j-v1.3-groovy.bin")
gpt = GPT4All(model_path, allow_download=False)

@app.route("/get-ai-response", methods=["POST"])
def get_ai_response():
    data = request.get_json()
    query = data.get("query")
    if not query:
        return jsonify({"error": "Query is required"}), 400

    response = gpt.generate(query, max_tokens=150)
    return jsonify({"answer": response})

if __name__ == "__main__":
    app.run(port=5000)