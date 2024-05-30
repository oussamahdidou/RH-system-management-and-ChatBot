import pickle

# Load the saved model
with open('chatbot.pkl', 'rb') as f:
    vectorizer, questions, answers = pickle.load(f)

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

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


# Example usage:
user_input = "How i apply for a job"
# Preprocess user input
processed_input = vectorizer.transform([user_input])

# Find the most similar question
similar_question_index = find_most_similar_question(processed_input, vectorizer, questions)

# Retrieve the corresponding answer
if similar_question_index is not None:
    print("Response:", answers[similar_question_index])
else:
    print("Sorry, I couldn't find a suitable response.")
