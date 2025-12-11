from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "SwasthyaSetu ML Service Running"

@app.route('/predict/anemia', methods=['POST'])
def predict_anemia():
    # Placeholder for ML Logic
    return jsonify({"prediction": "Safe", "confidence": 0.95})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
