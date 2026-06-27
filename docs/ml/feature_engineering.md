# Feature Engineering Documentation

## Overview

Feature engineering was performed to improve forecasting performance and provide historical sales context to the machine learning model.

## Features Created

### Week

Represents the week number of the year.

### Month

Represents the month extracted from transaction date.

### Weekly Revenue

Total revenue generated during a week.

### Weekly Margin

Total profit generated during a week.

### Average Stock

Average stock available during the week.

## Lag Features

Lag features represent previous sales history.

### Lag_1

Sales from previous week.

### Lag_2

Sales from two weeks before.

### Lag_3

Sales from three weeks before.

### Lag_4

Sales from four weeks before.

## Rolling Average Features

### Rolling_4_Week_Avg

Average sales of previous four weeks.

### Rolling_8_Week_Avg

Average sales of previous eight weeks.

## Benefits

These features help the model understand:

- Sales trends
- Seasonal patterns
- Recent demand fluctuations
- Product demand behavior