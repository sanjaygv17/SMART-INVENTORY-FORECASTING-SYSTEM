"""
API wrapper for ML prediction.
Usage:
python ml/scripts/api_predict.py product "Amul Butter"
python ml/scripts/api_predict.py category "Beverages"
"""

import os
import sys
from unittest import result
import joblib
import pandas as pd
import json

BASE_DIR = os.path.dirname(__file__)
MODELS_DIR = os.path.join(BASE_DIR, "..", "..", "models")
DATA_DIR = os.path.join(BASE_DIR, "..", "..", "data", "cleaned")

PRODUCT_MODEL = os.path.join(MODELS_DIR, "product_xgboost_model.pkl")
PRODUCT_ENCODER = os.path.join(MODELS_DIR, "product_encoder.pkl")
PRODUCT_DATA = os.path.join(DATA_DIR, "final_product_forecasting.csv")

CATEGORY_MODEL = os.path.join(MODELS_DIR, "category_xgboost_model.pkl")
CATEGORY_ENCODER = os.path.join(MODELS_DIR, "category_encoder.pkl")
CATEGORY_DATA = os.path.join(DATA_DIR, "final_category_forecasting.csv")


def predict_product(product_name):
    model = joblib.load(PRODUCT_MODEL)
    encoder = joblib.load(PRODUCT_ENCODER)
    df = pd.read_csv(PRODUCT_DATA)

    product_data = df[df["Product_Name"] == product_name].copy()
    if product_data.empty:
        return {"error": f"Product not found: {product_name}"}

    product_data = product_data.dropna(
        subset=["Lag_1", "Lag_2", "Lag_3", "Lag_4", "Rolling_4_Week_Avg", "Rolling_8_Week_Avg"]
    )
    if product_data.empty:
        return {"error": f"No valid feature rows for product: {product_name}"}

    latest = product_data.sort_values(["Year", "Week"]).iloc[-1]

    X = pd.DataFrame([{
        "Product_Encoded": encoder.transform([latest["Product_Name"]])[0],
        "Week": latest["Week"],
        "Month": latest["Month"],
        "Weekly_Revenue": latest["Weekly_Revenue"],
        "Weekly_Margin": latest["Weekly_Margin"],
        "Average_Stock": latest["Average_Stock"],
        "Lag_1": latest["Lag_1"],
        "Lag_2": latest["Lag_2"],
        "Lag_3": latest["Lag_3"],
        "Lag_4": latest["Lag_4"],
        "Rolling_4_Week_Avg": latest["Rolling_4_Week_Avg"],
        "Rolling_8_Week_Avg": latest["Rolling_8_Week_Avg"],
    }])

    prediction = model.predict(X)[0]
    return {
        "type": "product",
        "name": product_name,
        "predicted_units": round(float(prediction), 2),
    }


def predict_category(category_name):
    model = joblib.load(CATEGORY_MODEL)
    encoder = joblib.load(CATEGORY_ENCODER)
    df = pd.read_csv(CATEGORY_DATA)

    category_data = df[df["Category"] == category_name].copy()
    if category_data.empty:
        return {"error": f"Category not found: {category_name}"}

    latest = category_data.sort_values(["Year", "Week"]).iloc[-1]

    X = pd.DataFrame([{
        "Category_Encoded": encoder.transform([latest["Category"]])[0],
        "Week": latest["Week"],
        "Weekly_Revenue": latest["Weekly_Revenue"],
        "Weekly_Margin": latest["Weekly_Margin"],
        "Lag_1": latest["Lag_1"],
        "Lag_2": latest["Lag_2"],
        "Lag_3": latest["Lag_3"],
        "Rolling_4_Week_Avg": latest["Rolling_4_Week_Avg"],
    }])

    prediction = model.predict(X)[0]
    return {
        "type": "category",
        "name": category_name,
        "predicted_units": round(float(prediction), 2),
    }


def main():
    try:
        if len(sys.argv) < 3:
            print(json.dumps({
    "error": "Usage: python ml/scripts/predict.py [product|category] [name]"
}))
            return

        mode = sys.argv[1].lower()
        name = " ".join(sys.argv[2:])

        if mode == "product":
            result = predict_product(name)
        elif mode == "category":
            result = predict_category(name)
        else:
            result = {"error": "Mode must be 'product' or 'category'"}

        print(json.dumps(result))

    except Exception as e:
        print(json.dumps({
            "error": str(e)
        }))


if __name__ == "__main__":
    main()