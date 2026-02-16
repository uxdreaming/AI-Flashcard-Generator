# Audio Transcription Sample

## Context
This file simulates the output of an AI transcription from a voice recording. The student recorded themselves summarizing key concepts after a Machine Learning introductory lecture.

## Original source
Audio file: 2m 34s voice memo recorded on phone

## Transcribed text

```
Okay so today we covered the basics of supervised learning. The main idea
is that you have labeled data, meaning each example in your training set
has an input and a known correct output. The algorithm learns the mapping
between inputs and outputs.

There are two main types: classification and regression. Classification
is when you're predicting a category, like spam or not spam. Regression
is when you're predicting a continuous value, like house prices.

The professor emphasized overfitting a lot. Overfitting happens when your
model learns the training data too well, including the noise, and then
performs badly on new data. The opposite is underfitting, where the model
is too simple to capture the patterns.

To prevent overfitting you can use techniques like cross-validation,
regularization, or simply getting more training data. She mentioned that
the train-test split is usually 80-20 or 70-30.

Oh and one more thing, the loss function measures how wrong the model's
predictions are. The goal of training is to minimize the loss function.
Common ones are MSE for regression and cross-entropy for classification.
```

## Expected flashcards from this content

| Front | Back |
|-------|------|
| What is supervised learning? | A type of ML where the model learns from labeled data — each example has an input and a known correct output |
| What is the difference between classification and regression? | Classification predicts categories (spam/not spam), regression predicts continuous values (house prices) |
| What is overfitting? | When a model learns the training data too well, including noise, and performs badly on new unseen data |
| What is underfitting? | When a model is too simple to capture the underlying patterns in the data |
| Name 3 techniques to prevent overfitting | Cross-validation, regularization, and getting more training data |
| What does a loss function measure? | How wrong the model's predictions are — training aims to minimize it |
| What are common loss functions for regression and classification? | MSE (Mean Squared Error) for regression, cross-entropy for classification |
