"""
Simple prediction script to load product model and predict next-week demand for a product.
Usage: python ml/scripts/predict.py "Tata Salt"
"""
import os
import sys
import joblib
import pandas as pd

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'models')
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'cleaned')

MODEL_FILE = os.path.join(MODEL_PATH, 'product_xgboost_model.pkl')
ENC_FILE = os.path.join(MODEL_PATH, 'product_encoder.pkl')
DATA_FILE = os.path.join(DATA_PATH, 'product_weekly.csv')


def main(product_name):
    model = joblib.load(MODEL_FILE)
    enc = joblib.load(ENC_FILE)

    df = pd.read_csv(DATA_FILE)
    product_data = df[df['Product_Name'] == product_name].copy()
    if product_data.empty:
        print('Product not found:', product_name)
        # Print available products for debugging
        unique_products = df['Product_Name'].unique()[:5]
        print('Available products (sample):', unique_products)
        return

    # Remove rows with NaN in target features
    product_data = product_data.dropna(subset=['Lag_1', 'Lag_2', 'Lag_3', 'Lag_4', 'Rolling_4_Week_Avg', 'Rolling_8_Week_Avg'])
    
    if product_data.empty:
        print('No valid data for product:', product_name)
        return

    latest = product_data.sort_values(['Year', 'Week']).iloc[-1]

    feature_row = {
        'Product_Encoded': enc.transform([latest['Product_Name']])[0],
        'Week': latest['Week'],
        'Month': latest['Month'],
        'Weekly_Revenue': latest['Weekly_Revenue'],
        'Weekly_Margin': latest['Weekly_Margin'],
        'Average_Stock': latest['Average_Stock'],
        'Lag_1': latest['Lag_1'],
        'Lag_2': latest['Lag_2'],
        'Lag_3': latest['Lag_3'],
        'Lag_4': latest['Lag_4'],
        'Rolling_4_Week_Avg': latest['Rolling_4_Week_Avg'],
        'Rolling_8_Week_Avg': latest['Rolling_8_Week_Avg']
    }

    X = pd.DataFrame([feature_row])
    pred = model.predict(X)[0]
    print(f'Predicted next-week units for {product_name}:', round(pred))


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python ml/scripts/predict.py "Product Name"')
    else:
        main(sys.argv[1])
