import os
import pandas as pd
import numpy
import re

import pymongo

from flask import Flask, jsonify, request, session, redirect, json, make_response, render_template
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import sklearn
from sklearn.metrics.pairwise import cosine_similarity;

import gensim
from gensim.parsing.preprocessing import remove_stopwords
from gensim.models import Word2Vec
import gensim.downloader as api

# import gridfs
# from gridfs import GridFS

from functools import wraps
import uuid
from passlib.hash import pbkdf2_sha256

import time
import certifi
from gtts import gTTS


# creating an instance of Flask App
app = Flask(__name__)
cors = CORS(app, resources= {r'*':{'origins':'*'}})
app.config['CORS_HEADERS'] = 'Content-Type'

# JWT
app.config["JWT_SECRET_KEY"] = os.environ.get('jwt_secret')
jwt = JWTManager(app)

app.secret_key = b"\xb8q}\x08\xb7\xe7\x97\xa8E'o`\x18\xa9%\xe3"

# database connection to mongo
client = pymongo.MongoClient(
    "mongodb+srv://Krunal:Krunal3011@intelligentsearch.gb3lu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    tlsCAFile=certifi.where())
db = client.intelligent_search

# file storage for > 16mb
# grid_fs = GridFS(db)


# -----functions (methods)-----
def start_session(user):
    del user['password']
    session['logged_in'] = True
    session['user'] = user
    return jsonify(user), 200


# -----decorators-----
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            return redirect('/')

    return wrap


# -----routes-----
@app.route('/')
@cross_origin()
def hello_world():
    return 'Welocme Home!'

# sign up
@app.route('/api/user/signup', methods=['POST'])
@cross_origin()
def signup():
    user = request.json

    # creating the user object
    user = {
        "_id": uuid.uuid4().hex,
        "name": user["name"],
        "email": user["email"],
        "role": user['role'],
        "password": user["password"],
    }

    # encrypting the password
    user["password"] = pbkdf2_sha256.encrypt(user["password"])

    # check if the user is already is exist or not
    if db.users.find_one({"email": user['email']}):
        return jsonify({"error": "This email is already in use"})

    # adding the user object to the database
    if db.users.insert_many([user]):
       # return start_session(user)
        start_session(user)
        # return redirect('/api/dashboard')
        return jsonify({"done": "user added successfully",
                        "user": user})

    return jsonify({'error': 'SignUp Failed'}), 400

# sign out
@app.route('/user/signout')
def signout():
    session.clear()
    return redirect('/')


# log in
@app.route('/api/user/login', methods=['POST'])
@cross_origin()
def login():
    login_user = request.json
    print(login_user)
    user = db.users.find_one({
        'email': login_user['email'],
    })

    # print(user['role'])

    if user and pbkdf2_sha256.verify(login_user['password'], user['password']):
        start_session(user)
        access_token = create_access_token(identity=login_user)
        # return redirect('/api/dashboard')
        # print("User", user)
        return jsonify(role=user['role'], access_token=access_token, user=user)
    else:
        return ('Invalid credentials')

    return jsonify("invalid login credentials"), 401


# fetch all users
@app.route('/api/users', methods=['GET'])
def users():
    users = db.users.find()
    return jsonify([user for user in users])


# fetch one user by userid
@app.route('/user/<userId>', methods=['GET'])
def find_user(userId):
    user = db.users.find_one({"_id": userId})
    return user['name']


# delete one user by userid
@app.route('/user/<userId>', methods=['DELETE'])
def delete_user(userId):
    user = db.users.delete_one({'_id': userId})
    return jsonify(f"User with {userId} Deleted Successfully")


# update user by userID
@app.route('/user/<userId>', methods=['PUT'])
def update_user(userId):

    user = db.users.find_one({"_id": userId})
    user['name'] = request.form.get("name")
    user['email'] = request.form.get("email")
    user['password'] = request.form.get("password")
    user["password"] = pbkdf2_sha256.encrypt(user["password"])

    db.users.update_one({"_id": userId}, {"$set": {
        "name": user['name'],
        "email": user['email'],
        "password": user["password"]
    }})

    return jsonify("user updated successfully")


# upload file
@app.route('/upload/<file_name>', methods=['POST'])
def upload_file(file_name):
    # /Users/krunal/Desktop/Methodologies.docx
    file_name = file_name
    file_location = "/Users/krunal/Desktop/" + file_name
    file_data= open(file_location,"rb")
    data = file_data.read()
    fs= gridfs.GridFS(db)
    fs.put(data, filename = file_name)
    print("upload done")

    return jsonify("done")


# download file
@app.route('/download/<file_name>')
def index(file_name):
    grid_fs_file = grid_fs.find_one({'filename': file_name})
    response = make_response(grid_fs_file.read())
    response.headers['Content-Type'] = 'application/octet-stream'
    response.headers["Content-Disposition"] = "attachment; filename={}".format(file_name)
    f = open("file_name", "w+")
    f.write(response)
    f.close()
    return jsonify("donee")


# predict question
@app.route('/api/user/predict', methods=['GET', 'POST'])
def predict():

    # Loading dataset and rename columns
    questionOfUser = request.json
    df = pd.read_excel("/Users/krunal/Desktop/healthtapQAs_v1.xlsx")
    df.columns = ["questions", "answers"]
    df
    df["questions"][5]
    df["answers"][5]

    # keeping only words in the sentence and removing punctuations.
    def clean_sentence(sentence, stopwords=False):

        sentence = sentence.lower().strip()
        sentence = re.sub(r'[^a-z0-9\s]', '', sentence)

        if stopwords:
            sentence = remove_stopwords(sentence)

        return sentence

    def get_cleaned_sentences(df, stopwords=False):
        sents = df[["questions"]]
        cleaned_sentences = []

        for index, row in df.iterrows():
            cleaned = clean_sentence(row["questions"], stopwords)
            cleaned_sentences.append(cleaned)
        return cleaned_sentences

    cleaned_sentences = get_cleaned_sentences(df, stopwords=True)
    cleaned_sentences_with_stopwords = get_cleaned_sentences(df, stopwords=False)
    # print(cleaned_sentences_with_stopwords[0]);

    # print(cleaned_sentences_with_stopwords[0])

    # loading Glove data
    glove_model = None
    try:
        glove_model = gensim.models.KeyedVectors.load("./glovemodel.mod")
        print("Loaded saved glove model")
    except:
        glove_model = api.load('glove-twitter-25')
        glove_model.save("./glovemodel.mod")
        print("Downloaded and saved glove model")

    glove_embedding_size = len(glove_model['computer'])

    # creating vectors
    def getWordVec(word, model):
        samp = model['computer']
        vec = [0] * len(samp)
        try:
            vec = model[word]
        except:
            vec = [0] * len(samp)
        return (vec)

    def getPhraseEmbedding(phrase, embeddingmodel):

        samp = getWordVec('computer', embeddingmodel)
        vec = numpy.array([0] * len(samp))
        den = 0
        for word in phrase.split():
            # print(word)
            den = den + 1
            vec = vec + numpy.array(getWordVec(word, embeddingmodel))

        return vec.reshape(1, -1)


    # finding cosine similarity from vectors
    def retrieveAndPrintFAQAnswer(question_embedding, sentence_embeddings, FAQdf, sentences):
        max_sim = -1
        index_sim = -1
        for index, faq_embedding in enumerate(sentence_embeddings):
            sim = cosine_similarity(faq_embedding, question_embedding)[0][0]
            # print(index, sim, sentences[index])
            if sim > max_sim:
                max_sim = sim
                index_sim = index
        print("Answer:", FAQdf.iloc[index_sim, 1])
        print("----------------------")
        measure2 = time.time()
        print("Response Time", measure2 - measure1)
        print("----------------------")
        print("\n")
        print("Enter Quit to exit: ")

        return FAQdf.iloc[index_sim, 1]

    # embedding the exsiting dataset
    sent_embeddings = []
    for sent in cleaned_sentences:
        sent_embeddings.append(getPhraseEmbedding(sent, glove_model))

    print("Welcome to the Question Answering System")

    #while True:
    #print("Question:")

    print(questionOfUser)
    print(questionOfUser['ques'])
    question_orig = questionOfUser['ques']

    # if (question_orig.lower() == 'quit'):
    #     break
    measure1 = time.time()
    question = clean_sentence(question_orig, stopwords=True)

    question_embedding = getPhraseEmbedding(question, glove_model)
    global ansOfInputque
    ansOfInputque = retrieveAndPrintFAQAnswer(question_embedding, sent_embeddings, df, cleaned_sentences)

    mytext = ansOfInputque
    language = 'en'
    myobj = gTTS(text=mytext, lang=language, slow=False)
    myobj.save("/Users/krunal/Desktop/WEB/IntelligentSearch/frontend_react/src/assets/audio.mp3")

    return jsonify(ansOfInputque)

if __name__ == '__main__':
    app.run()
