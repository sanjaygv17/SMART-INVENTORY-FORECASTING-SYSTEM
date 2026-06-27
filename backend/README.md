Backend README

Purpose: host REST APIs for transactions, stock updates, forecasts, and alerts.

Suggested stack:
- Node.js + Express
- MongoDB (Atlas or local)

Initial endpoints to implement:
- POST /api/transactions
- GET /api/stock/:productId
- GET /api/predict/product/:productName
- GET /api/predict/category/:categoryName
- GET /api/inventory-alerts
- POST /api/retrain

Notes:
- Heavy ML logic should live in `ml/` scripts and be called by the backend as subprocesses or via a microservice.
