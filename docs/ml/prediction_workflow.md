# Prediction Workflow

## Overview

The forecasting system predicts future weekly demand using the trained XGBoost model.

## Workflow

Historical Dataset
↓
Feature Engineering
↓
Model Training
↓
Save Model
↓
Load Model
↓
Generate Forecast
↓
Inventory Recommendation

## Product Prediction Process

1. User selects a product.
2. Product data is loaded.
3. Latest weekly record is identified.
4. Feature vector is created.
5. XGBoost model predicts next week sales.
6. Predicted units are returned.

## Category Prediction Process

1. User selects category.
2. Category sales history is loaded.
3. Latest weekly record is selected.
4. Feature vector is generated.
5. XGBoost predicts next week category demand.

## Why Latest Week Is Used

The model is already trained using all historical data.

During prediction, the latest available week provides the most recent business state.

Example:

Week 30
Week 31
Week 32
Week 33

Latest week = Week 33

Prediction generated for Week 34.