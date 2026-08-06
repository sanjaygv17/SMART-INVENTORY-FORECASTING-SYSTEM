import { useState } from "react";
import client from "../api/client";

function ProductPrediction() {
    const [predictionType, setPredictionType] = useState("product");
    const [input, setInput] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const [products, setProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stock, setStock] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [seasonality, setSeasonality] = useState(null);


    


    
const fetchSuggestions = async (search) => {

    if (!search.trim()) {
        setProducts([]);
        setShowSuggestions(false);
        return;
    }

    try {

        setLoadingProducts(true);

        const endpoint =
            predictionType === "product"
                ? `/products?search=${search}`
                : `/categories?search=${search}`;

        const response = await client.get(endpoint);

        setProducts(response.data.data);

        setShowSuggestions(true);

    } catch (error) {

        console.error(error);

    } finally {

        setLoadingProducts(false);

    }

};

const fetchStock = async (productName) => {

    try {

        const response = await client.get(
            `/stocks/product/${encodeURIComponent(productName)}`
        );

        setStock(response.data.data);

    } catch (error) {

        console.error(error);

        setStock(null);

    }

};

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
            setError(null);

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

const predictedUnits =Math.round(
    response.data.predicted_units ??
    response.data.predictedUnits ??
    0
);

const sellingPrice =
    selectedProduct?.sellingPrice || 0;

const currentStock =
    selectedProduct?.CurrentStock ||
    selectedProduct?.currentStock ||
    0;


const expectedRevenue =
    Math.round(Number(predictedUnits) * Number(sellingPrice));
const confidence =
    Number(predictedUnits) > 200
        ? 95
        : Number(predictedUnits) > 100
        ? 90
        : 85;

const trend =
    Number(predictedUnits) > Number(currentStock)
        ? "Increasing"
        : "Stable";
const getPeakMonth = (monthlySales) => {

    if (!monthlySales || monthlySales.length === 0) {
        return "-";
    }

    const peak = monthlySales.reduce((max, current) =>
        current.units > max.units ? current : max
    );

    return peak.month;

};


setPredictionData({
    predictedUnits,
    confidence,
    trend,
    peakMonth: "August",
    expectedRevenue
});

if (predictionType === "product") {

    await fetchStock(value);

}
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
    const predictedUnits =Math.round(
        result?.predicted_units ?? result?.predictedUnits ?? null
    );

        const safetyStock = stock?.reorderLevel || 20;



const recommendedOrder =Math.round(

stock && predictionData

    ? Math.max(
        0,
        Number(predictedUnits) -
        Number(stock.currentStock) +
        Number(safetyStock)
    )

    : null);

    const priority =

    recommendedOrder > 150
        ? "High"
        : recommendedOrder > 50
        ? "Medium"
        : "Low";

        const recommendation =
    priority === "High"
        ? `Urgent: Order ${recommendedOrder} units immediately to prevent stockout.`
        : priority === "Medium"
        ? `Plan to order ${recommendedOrder} units in the next replenishment cycle.`
        : "Current inventory is sufficient. No immediate replenishment required.";
 const demandLevel =

    predictionData?.predictedUnits > 250
        ? "High"

        : predictionData?.predictedUnits > 120
        ? "Medium"

        : "Low";

        const demandPercentage =

    predictionData

        ? Math.min(
            100,
            Math.round(
                (predictionData.predictedUnits / 100) * 100
            )
        )

        : 0;
     const confidenceColor =

    predictionData?.confidence >= 95

        ? "bg-green-500"

        : predictionData?.confidence >= 90

        ? "bg-yellow-500"

        : "bg-red-500";

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
                            onChange={(e) => {

    setInput(e.target.value);

    fetchSuggestions(e.target.value);

}}
                            placeholder={
                                predictionType === "product"
                                    ? "Enter Product Name"
                                    : "Enter Category Name"
                            }
                            className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white"
                        />{showSuggestions && (

<div className="mt-2 max-h-60 overflow-y-auto rounded-xl border bg-white shadow-lg">

    {loadingProducts ? (

        <div className="p-3">
            Searching...
        </div>

    ) : (

       products.map((item) => (

    <div
        key={item._id || item.category}
        onClick={() => {

            if (predictionType === "product") {

                setSelectedProduct(item);

                setInput(item.productName);

            } else {

                setInput(item.category);

            }

            setShowSuggestions(false);

        }}
        className="cursor-pointer border-b p-3 hover:bg-blue-100"
    >

        <div className="font-medium">

            {predictionType === "product"
                ? item.productName
                : item.category}

        </div>

        {predictionType === "product" && (

            <div className="text-sm text-gray-500">

                {item.category} • {item.brand}

            </div>

        )}

    </div>

))

    )}

</div>

)}


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

{selectedProduct && (

<div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow">

    <h2 className="mb-6 text-xl font-bold">

        Product Information

    </h2>

    <div className="grid gap-5 md:grid-cols-4">

        <div>

            <p className="text-sm text-slate-500">

                Category

            </p>

            <h3 className="mt-2 font-semibold">

                {selectedProduct.category}

            </h3>

        </div>

        <div>

            <p className="text-sm text-slate-500">

                Brand

            </p>

            <h3 className="mt-2 font-semibold">

                {selectedProduct.brand}

            </h3>

        </div>

        <div>

            <p className="text-sm text-slate-500">

                Selling Price

            </p>

            <h3 className="mt-2 font-semibold text-green-600">

                ₹{selectedProduct.sellingPrice}

            </h3>

        </div>

        <div>

            <p className="text-sm text-slate-500">

                Current Stock

            </p>

            <h3 className="mt-2 font-semibold">

               {stock?.currentStock ??
 selectedProduct.currentStock ??
 selectedProduct.CurrentStock ??
 0}

            </h3>

        </div>

    </div>

</div>

)}
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
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

    <div className="rounded-2xl bg-blue-50 p-5">
        <p className="text-sm text-slate-500">
            Predicted Units
        </p>

        <h2 className="mt-2 text-3xl font-bold text-blue-700">
            {predictionData?.predictedUnits} Units
        </h2>
    </div>

   <div className="rounded-2xl bg-green-50 p-5">

    <p className="text-sm text-slate-500">

        Forecast Confidence

    </p>

    <h2 className="mt-2 text-3xl font-bold text-green-700">

        {predictionData?.confidence}%

    </h2>

    <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-green-100">

        <div

            className={`h-full ${confidenceColor}`}

            style={{

                width: `${predictionData?.confidence || 0}%`

            }}

        />

    </div>

</div>

<div className="rounded-2xl bg-orange-50 p-5">

    <p className="text-sm text-slate-500">

        Demand Meter

    </p>

    <h2 className="mt-2 text-2xl font-bold text-orange-700">

        {demandLevel}

    </h2>

    <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-orange-100">

        <div

            className="h-full bg-orange-500"

            style={{

                width: `${demandPercentage}%`

            }}

        />

    </div>

</div>

    <div className="rounded-2xl bg-yellow-50 p-5">
        <p className="text-sm text-slate-500">
            Demand Trend
        </p>

        <h2 className="mt-2 text-xl font-bold text-yellow-700">
            📈 {predictionData?.trend}
        </h2>
    </div>

    <div className="rounded-2xl bg-purple-50 p-5">
        <p className="text-sm text-slate-500">
            Peak Month
        </p>

        <h2 className="mt-2 text-2xl font-bold text-purple-700">
            {predictionData?.peakMonth}
        </h2>
    </div>

    <div className="rounded-2xl bg-orange-50 p-5">
        <p className="text-sm text-slate-500">
            Expected Revenue
        </p>

        <h2 className="mt-2 text-2xl font-bold text-orange-700">
            ₹{predictionData?.expectedRevenue}
        </h2>
    </div>

</div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                        Enter a name and click Predict to see the forecast.
                    </div>
                )}
            </div>
            


    

    {stock && predictionData && (

<div className="rounded-3xl border border-green-200 bg-green-50 p-8 shadow-lg">

    <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-green-700">

            AI Inventory Advisor

        </h2>

        <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
                priority === "High"
                    ? "bg-red-100 text-red-700"
                    : priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
            }`}
        >
            {priority} Priority
        </span>

    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <InfoCard
            title="Current Stock"
            value={stock.currentStock}
        />

        <InfoCard
            title="Predicted Demand"
            value={predictionData.predictedUnits}
        />

        <InfoCard
            title="Safety Stock"
            value={safetyStock}
        />

        <InfoCard
            title="Recommended Order"
            value={`${recommendedOrder} Units`}
        />

    </div>

    <div className="mt-8 rounded-2xl bg-white p-5">

        <h3 className="mb-2 text-lg font-bold text-slate-800">

            Recommendation

        </h3>

        <p className="text-slate-600">

            {recommendation}

        </p>

    </div>

</div>

)}


        </div>

        
    );
}
function InfoCard({

    title,

    value

}) {

    return (

        <div className="rounded-2xl bg-white p-5 shadow">

            <p className="text-sm text-slate-500">

                {title}

            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">

                {value}

            </h2>

        </div>

    );

}
export default ProductPrediction;