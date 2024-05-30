from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the saved model
with open('chatbot.pkl', 'rb') as f:
    vectorizer, questions, answers = pickle.load(f)

def find_most_similar_question(processed_input, vectorizer, questions):
    max_similarity = -1
    most_similar_index = None

    for i, question in enumerate(questions):
        question_vector = vectorizer.transform([question])
        similarity = cosine_similarity(processed_input, question_vector)
        if similarity > max_similarity:
            max_similarity = similarity
            most_similar_index = i

    return most_similar_index

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    user_input = data['input']
    
    
    processed_input = vectorizer.transform([user_input])

    similar_question_index = find_most_similar_question(processed_input, vectorizer, questions)

    if similar_question_index is not None:
        response = answers[similar_question_index]
    else:
        response = "Sorry, I couldn't find a suitable response."
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
