ML README

Purpose: store reproducible ML scripts, model artifacts, and evaluation notebooks.

Suggested structure:
- `ml/scripts/` : deterministic Python modules for preprocessing, feature engineering, training, prediction
- `ml/models/` : production model artifacts (xgboost, encoders)
- `ml/evaluation/` : scripts to compare XGBoost, ARIMA, LSTM
- `ml/data/` : canonical copies of the cleaned datasets used for training

Action items:
- Convert `scripts/data_cleaning.ipynb` into `ml/scripts/preprocessing.py` and `ml/scripts/feature_engineering.py`.
- Add `ml/scripts/train_xgboost.py` and `ml/scripts/predict.py` to be called by the backend.
