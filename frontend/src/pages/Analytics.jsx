import MetricsTable from "../components/MetricsTable";
function Analytics() {
    return (
        <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <MetricsTable />
            Evaluation Metrics

• MAE (Mean Absolute Error): Lower is better.
• RMSE (Root Mean Squared Error): Lower is better.
• R² Score: Higher is better.
        </div>
    );
}

export default Analytics;