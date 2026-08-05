"""
Train XGBoost model on product_weekly and save model and encoders.
Run: python ml/scripts/train_xgboost.py
"""
import os
import pandas as pd
import joblib
from xgboost import XGBRegressor
from sklearn.preprocessing import LabelEncoder

CLEANED_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'cleaned')
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'models')
IN_FILE = os.path.join(CLEANED_PATH, 'product_weekly.csv')


def main():
    df = pd.read_csv(IN_FILE)

    features = [
        'Product_Name',
        'Week',
        'Month',
        'Weekly_Revenue',
        'Weekly_Margin',
        'Average_Stock',
        'Lag_1',
        'Lag_2',
        'Lag_3',
        'Lag_4',
        'Rolling_4_Week_Avg',
        'Rolling_8_Week_Avg'
    ]

    df = df.reset_index(drop=True)

    # Encode product
    prod_enc = LabelEncoder()
    df['Product_Encoded'] = prod_enc.fit_transform(df['Product_Name'])

    X = df[['Product_Encoded', 'Week', 'Month', 'Weekly_Revenue', 'Weekly_Margin', 'Average_Stock', 'Lag_1', 'Lag_2', 'Lag_3', 'Lag_4', 'Rolling_4_Week_Avg', 'Rolling_8_Week_Avg']]
    y = df['Target']

    # Time-based split: use last 20% as test
    split = int(len(df) * 0.8)
    X_train, X_test = X.iloc[:split], X.iloc[split:]
    y_train, y_test = y.iloc[:split], y.iloc[split:]

    model = XGBRegressor(n_estimators=200, learning_rate=0.05, max_depth=6, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate model
    from sklearn.metrics import mean_absolute_error, r2_score
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    os.makedirs(MODEL_PATH, exist_ok=True)
    joblib.dump(model, os.path.join(MODEL_PATH, 'product_xgboost_model.pkl'))
    joblib.dump(prod_enc, os.path.join(MODEL_PATH, 'product_encoder.pkl'))

    print('Model trained and saved to', MODEL_PATH)
    print(f'R² Score: {r2:.4f}')
    print(f'MAE: {mae:.2f} units')


if __name__ == '__main__':
    main()
