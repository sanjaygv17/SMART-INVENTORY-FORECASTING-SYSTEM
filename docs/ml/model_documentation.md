# Model Documentation

## Models Evaluated

Three forecasting models were evaluated.

### ARIMA

Traditional statistical forecasting model.

Advantages:
- Easy to interpret
- Suitable for simple time series

Limitations:
- Cannot use multiple business features
- Lower flexibility

---

### LSTM

Deep learning based forecasting model.

Advantages:
- Learns long-term patterns
- Captures seasonality

Limitations:
- Higher computational cost
- Longer training time

---

### XGBoost

Machine learning based forecasting model.

Advantages:
- High accuracy
- Fast training
- Handles structured data efficiently

## Final Model Selection

Selected Model: XGBoost

Reason:

- Better forecasting accuracy
- Faster execution
- Suitable for FMCG sales data
- Supports multiple engineered features

The XGBoost model is used as the primary forecasting model in FreshMart.