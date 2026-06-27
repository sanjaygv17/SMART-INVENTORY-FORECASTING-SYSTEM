# Dataset Documentation

## Dataset Overview

The FreshMart project uses an FMCG retail transaction dataset containing approximately 100,000 transaction records.

The dataset represents historical supermarket sales data used for demand forecasting and inventory management.

## Dataset Columns

- Invoice_ID
- Invoice_Date
- City
- Store_Format
- Category
- Brand
- Channel
- Payment_Mode
- Units
- Cost_Price
- Selling_Price
- Revenue
- Cost
- Margin
- Margin_%
- Stock_On_Hand
- Reorder_Level
- Lead_Time_Days
- Customer_Age
- Customer_Gender
- Loyalty_Flag

## Data Cleaning Steps

1. Removed duplicate records.
2. Converted Invoice_Date into datetime format.
3. Extracted Year, Month and Week features.
4. Handled missing values.
5. Created product mappings for forecasting.
6. Aggregated daily transactions into weekly sales records.

## Purpose

The cleaned dataset is used for:

- Product-wise forecasting
- Category-wise forecasting
- Weekly demand prediction
- Inventory optimization