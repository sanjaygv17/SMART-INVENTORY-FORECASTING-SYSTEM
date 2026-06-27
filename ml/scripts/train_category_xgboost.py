"""
Train XGBoost model on category-level weekly forecasting data and save model and encoder.
Input: data/cleaned/final_category_forecasting.csv
Output: models/category_xgboost_model.pkl, models/category_encoder.pkl

Run:
python ml/scripts/train_category_xgboost.py
"""

import os
import pandas as pd
import joblib
from xgboost import XGBRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score

CLEANED_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "data", "cleaned")
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "models")
IN_FILE = os.path.join(CLEANED_PATH, "final_category_forecasting.csv")


def main():
    df = pd.read_csv(IN_FILE)

    required_columns = [
        "Year",
        "Week",
        "Category",
        "Weekly_Units_Sold",
        "Weekly_Revenue",
        "Weekly_Margin",
        "Lag_1",
        "Lag_2",
        "Lag_3",
        "Rolling_4_Week_Avg",
        "Target",
    ]

    missing = [column for column in required_columns if column not in df.columns]
    if missing:
        raise KeyError(f"Missing required columns: {missing}")

    df = df.sort_values(by=["Category", "Year", "Week"]).reset_index(drop=True)

    category_encoder = LabelEncoder()
    df["Category_Encoded"] = category_encoder.fit_transform(df["Category"])

    X = df[
        [
            "Category_Encoded",
            "Week",
            "Weekly_Revenue",
            "Weekly_Margin",
            "Lag_1",
            "Lag_2",
            "Lag_3",
            "Rolling_4_Week_Avg",
        ]
    ]
    y = df["Target"]

    split = int(len(df) * 0.8)
    X_train, X_test = X.iloc[:split], X.iloc[split:]
    y_train, y_test = y.iloc[:split], y.iloc[split:]

    model = XGBRegressor(
        n_estimators=150,
        learning_rate=0.05,
        max_depth=5,
        random_state=42,
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    mae = mean_absolute_error(y_test, y_pred)

    os.makedirs(MODEL_PATH, exist_ok=True)
    joblib.dump(model, os.path.join(MODEL_PATH, "category_xgboost_model.pkl"))
    joblib.dump(category_encoder, os.path.join(MODEL_PATH, "category_encoder.pkl"))

    print(f"Model trained and saved to {MODEL_PATH}")
    print(f"R² Score: {r2:.4f}")
    print(f"MAE: {mae:.2f} units")


if __name__ == "__main__":
    main()