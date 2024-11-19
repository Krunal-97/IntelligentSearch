# AI-Powered Intelligent Search Web Application

## Overview

This web application leverages Artificial Intelligence (AI) and Machine Learning (ML) technologies to provide accurate answers to user-specific queries. It also integrates a Text-to-Speech feature to enhance accessibility. The system is designed to be easily customizable, enabling users to train the application for specific industries by utilizing domain-specific datasets.

## Key Features

- **AI-Based Question Answering**: Utilizes pre-trained models to retrieve relevant answers from a dataset.
- **Text-to-Speech**: Converts text-based answers into speech for enhanced user accessibility.
- **Customizable for Any Industry**: Train the application with industry-specific data for tailored results.
- **Additional Features**:
  - Speech recognition
  - Grammar checker
  - Cosine similarity-based answer matching

## Tech Stack

- **Frontend**: ReactJS (External, not included here)
- **Backend**: Flask
- **Database**: MongoDB (PyMongo)
- **Machine Learning**: GloVe Word Embeddings, Scikit-learn
- **APIs**:
  - Google Text-to-Speech (gTTS)
  - Flask-JWT for Authentication
  - Flask-CORS for cross-origin requests

## How It Works

1. **Model Training**: The system is trained using domain-specific data to enhance answer accuracy.
2. **Question Processing**: User queries are cleaned and converted into vector embeddings for comparison.
3. **Answer Retrieval**: Cosine similarity is used to match the query with the most relevant answer in the dataset.
4. **Text-to-Speech**: Answers are converted into speech for playback to the user.

## API Endpoints

- **POST /api/user/signup**: Register a new user.
- **POST /api/user/login**: User login and authentication.
- **GET /api/user/predict**: Get AI-generated answer for a user query.
- **POST /upload**: Upload files for processing.
- **GET /download**: Retrieve uploaded files.

## Installation

### Prerequisites

- Python 3.x
- Flask
- PyMongo
- Scikit-learn
- GloVe word embeddings
