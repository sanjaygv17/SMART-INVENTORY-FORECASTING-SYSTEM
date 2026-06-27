"""
Preprocessing script for Smart Inventory Forecasting System
- Loads raw CSV from ../data/raw/
- Cleans basic missing values
- Synthesizes Product_Name from Brand+Category mapping (if missing)
- Saves cleaned CSV to ../data/cleaned/cleaned_data.csv

Run: python ml/scripts/preprocessing.py
"""

import os
import pandas as pd
import random

RAW_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'raw')
CLEANED_PATH = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'cleaned')
RAW_FILE = os.path.join(RAW_PATH, 'sample dataset.csv')
OUT_FILE = os.path.join(CLEANED_PATH, 'cleaned_data.csv')

product_mapping = {
    ('Dairy', 'Amul'): ['Amul Milk', 'Amul Butter', 'Amul Cheese', 'Amul Curd'],
    ('Dairy', 'Nestle'): ['Nestle Yogurt', 'Nestle Milk Powder'],
    ('Snacks', 'PepsiCo'): ['Lays Classic', 'Lays Magic Masala', 'Kurkure Masala', 'Doritos Nacho'],
    ('Snacks', 'Parle'): ['Parle-G Biscuits', 'Monaco Biscuits', 'Hide & Seek'],
    ('Beverages', 'PepsiCo'): ['Pepsi 750ml', 'Mountain Dew', '7UP Bottle'],
    ('Grocery', 'Tata'): ['Tata Salt', 'Tata Sampann Dal', 'Tata Rice'],
}


def main():
    if not os.path.exists(RAW_FILE):
        raise FileNotFoundError(f"Raw file not found: {RAW_FILE}")

    df = pd.read_csv(RAW_FILE)

    # Basic cleaning
    # Fill Customer_Age with median
    if 'Customer_Age' in df.columns:
        df['Customer_Age'] = df['Customer_Age'].fillna(df['Customer_Age'].median())

    # Fill Customer_Gender with mode
    if 'Customer_Gender' in df.columns:
        df['Customer_Gender'] = df['Customer_Gender'].fillna(df['Customer_Gender'].mode()[0])

    # Convert Invoice_Date to datetime
    if 'Invoice_Date' in df.columns:
        df['Invoice_Date'] = pd.to_datetime(df['Invoice_Date'], errors='coerce')

    # Create Product_Name if missing
    if 'Product_Name' not in df.columns:
        def synth(row):
            key = (row.get('Category'), row.get('Brand'))
            if key in product_mapping:
                return random.choice(product_mapping[key])
            return f"{row.get('Brand', 'Brand')}_{row.get('Category', 'Cat')}_product"

        df['Product_Name'] = df.apply(synth, axis=1)

    os.makedirs(CLEANED_PATH, exist_ok=True)
    df.to_csv(OUT_FILE, index=False)
    print('Cleaned data saved to', OUT_FILE)


if __name__ == '__main__':
    main()
