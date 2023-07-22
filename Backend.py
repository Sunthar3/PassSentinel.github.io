from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import pickle

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def createTokens(f):
    tokens = []
    for i in f:
        tokens.append(i)
    return tokens

# Load the trained model and vectorizer
with open('D:\\Project\\trained_model.pkl', 'rb') as file:
    clf = pickle.load(file)
    vectorizer = pickle.load(file)

# Route for password analysis
@app.route('/analyze', methods=['POST'])
@cross_origin()
def analyze_password():
    data = request.get_json()
    password = data['password']

    # Perform analysis using the trained model
    X_predict = vectorizer.transform([password])
    predicted_strength = str(clf.predict(X_predict)[0])

    # Return the analysis result
    return jsonify({'strength': predicted_strength})

@app.route('/', methods=['POST','GET'])
def temp():
    return jsonify({'You Dont known the end point right':'heehee'})

if __name__ == '__main__':
    app.run()
