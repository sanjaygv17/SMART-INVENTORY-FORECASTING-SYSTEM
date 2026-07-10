import { useState } from "react";
import client from "../api/client";

function ProductPrediction() {
    const [predictionType, setPredictionType] = useState("product");
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePredict = async (event) => {
        event.preventDefault();

        const value = input.trim();
        if (!value) {
            setError(
                predictionType === "product"
                    ? "Please enter a product name."
                    : "Please enter a category name."
            );
            setResult(null);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const endpoint =
                predictionType === "product"
                    ? "/predict-product"
                    : "/predict-category";

            const params =
                predictionType === "product"
                    ? { product: value }
                    : { category: value };

            const response = await client.get(endpoint, { params });
            setResult(response.data);
        } catch (err) {
            setResult(null);
            setError(
                err.response?.data?.error ||
                    err.message ||
                    "Prediction failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const displayName = result?.name || input.trim();
    const predictedUnits =
        result?.predicted_units ?? result?.predictedUnits ?? null;

    return (
        <div className="mx-auto w-full max-w-4xl space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    AI Prediction
                </h1>
                <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                    Predict future units for a product or category from a single,
                    responsive page.
                </p>
            </div>

            <form
                onSubmit={handlePredict}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8"
            >
                <div className="grid gap-5 md:grid-cols-[180px_1fr_auto] md:items-end">
                    <div>
                        <label
                            htmlFor="prediction-type"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Prediction Type
                        </label>
                        <select
                            id="prediction-type"
                            value={predictionType}
                            onChange={(e) => {
                                setPredictionType(e.target.value);
                                setInput("");
                                setResult(null);
                                setError("");
                            }}
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                        >
                            <option value="product">Product</option>
                            <option value="category">Category</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="prediction-input"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            {predictionType === "product"
                                ? "Product Name"
                                : "Category Name"}
                        </label>
                        <input
                            id="prediction-input"
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={
                                predictionType === "product"
                                    ? "Enter Product Name"
                                    : "Enter Category Name"
                            }
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                        {loading ? (
                            <span className="inline-flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Predicting...
                            </span>
                        ) : (
                            "Predict"
                        )}
                    </button>
                </div>

                {error ? (
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}
            </form>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">
                <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Prediction Result
                        </h2>
                        <p className="text-sm text-slate-600">
                            Results appear here after a successful prediction.
                        </p>
                    </div>
                    <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
                        {predictionType}
                    </span>
                </div>

                {result ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">
                                {predictionType === "product"
                                    ? "Product Name"
                                    : "Category Name"}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-900">
                                {displayName}
                            </h3>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-5">
                            <p className="text-sm text-slate-500">
                                Predicted Units
                            </p>
                            <h3 className="mt-2 text-3xl font-bold text-blue-600">
                                {predictedUnits ?? "-"}
                            </h3>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                        Enter a name and click Predict to see the forecast.
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductPrediction;