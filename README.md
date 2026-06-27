Smart Inventory Forecasting System

Project overview

Smart Inventory Forecasting System (formerly FreshMart) is a weekly-demand forecasting and inventory recommendation MVP for FMCG retail. This repository contains data preprocessing notebooks, cleaned datasets, saved ML models, and the skeleton for production code (backend, frontend, ML scripts).

Current workspace mapping

- `data/` : raw and cleaned datasets (existing)
- `models/` : saved ML models and encoders (existing)
- `scripts/` : notebooks with ETL and experiments (existing)
- `Preapartion/` : learning/experimentation notebooks (existing)
- `frontend/` : React app (planned)
- `backend/` : Node/Express API (planned)
- `ml/` : production ML scripts and model store (planned)
- `docs/` : project docs and deployment notes (planned)

Next steps

1. Move reproducible preprocessing and training steps from `scripts/data_cleaning.ipynb` into `ml/scripts/` as deterministic Python modules.
2. Scaffold a minimal `backend/` that exposes prediction and transaction APIs and connects to a MongoDB instance.
3. Scaffold a minimal `frontend/` React app that can add transactions and show dashboard KPIs.
4. Add weekly retraining job and CI scripts.

How to use this repo now

- Continue using the notebooks in `scripts/` for experiments.
- When ready, we'll convert the notebook steps into scripts under `ml/scripts/` and wire up the `backend/` to call them.
