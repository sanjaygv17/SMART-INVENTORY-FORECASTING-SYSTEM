import { useState } from "react";
import client from "../api/client";
import SeasonalityChart from "../components/SeasonalityChart";
import {
    MdAnalytics,
    MdInsights,
    MdTrendingUp,
    MdCalendarMonth
} from "react-icons/md";

function Analytics() {

    const [product, setProduct] = useState("");

    const [analytics, setAnalytics] = useState(null);

    const [view, setView] = useState("month");

    const [loading, setLoading] = useState(false);


    const [products, setProducts] = useState([]);
const [showSuggestions, setShowSuggestions] = useState(false);
const [loadingProducts, setLoadingProducts] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);

const fetchProducts = async (searchTerm) => {

    if (!searchTerm.trim()) {

        setProducts([]);
        setShowSuggestions(false);
        return;

    }

    try {

        setLoadingProducts(true);

        const response = await client.get(
            `/products?search=${searchTerm}`
        );

        setProducts(response.data.data);

        setShowSuggestions(true);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoadingProducts(false);

    }

};

    const fetchAnalytics = async () => {

        if (!product.trim()) {

            alert("Enter product name");

            return;

        }

        try {

            setLoading(true);

            const response = await client.get(

                `/analytics/seasonality/${encodeURIComponent(product)}`

            );

            setAnalytics(response.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to fetch analytics.");

        }

        finally {

            setLoading(false);

        }

    };

    const monthlyData = analytics?.monthlySales || [];

    const weeklyData = analytics?.weeklySales || [];

    const highestMonth =

        monthlyData.length > 0

            ? monthlyData.reduce((a, b) =>

                  a.units > b.units ? a : b

              )

            : null;

    const highestWeek =

        weeklyData.length > 0

            ? weeklyData.reduce((a, b) =>

                  a.units > b.units ? a : b

              )

            : null;

    const averageMonthlySales =

        monthlyData.length > 0

            ? Math.round(

                  monthlyData.reduce(

                      (sum, item) => sum + item.units,

                      0

                  ) / monthlyData.length

              )

            : 0;

    return (

        <div className="mx-auto max-w-7xl space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-4xl font-bold text-slate-800">

                    Seasonality Analytics

                </h1>

                <p className="mt-2 text-slate-500">

                    Analyze monthly and weekly sales trends using historical data.

                </p>

            </div>

            {/* Search */}

            <div className="rounded-3xl bg-white p-6 shadow">

                <div className="flex gap-4">

                    <div className="relative flex-1">

    <input

        type="text"

        value={product}

        onChange={(e) => {

            setProduct(e.target.value);

            fetchProducts(e.target.value);

        }}

        placeholder="Search Product"

        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"

    />

    {showSuggestions && (

        <div className="absolute z-50 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">

            {loadingProducts ? (

                <div className="p-4 text-gray-500">

                    Searching...

                </div>

            ) : products.length === 0 ? (

                <div className="p-4 text-gray-500">

                    No Products Found

                </div>

            ) : (

                products.map((item) => (

                    <div

                        key={item._id}

                        onClick={() => {

                            setSelectedProduct(item);

                            setProduct(item.productName);

                            setShowSuggestions(false);

                        }}

                        className="cursor-pointer border-b border-slate-100 px-5 py-4 transition hover:bg-blue-50"

                    >

                        <div className="font-semibold text-slate-800">

                            {item.productName}

                        </div>

                        <div className="mt-1 text-sm text-slate-500">

                            {item.category} • {item.brand}

                        </div>

                    </div>

                ))

            )}

        </div>

    )}

</div>

                    <button

                        onClick={fetchAnalytics}

                        className="rounded-xl bg-blue-600 px-6 text-white hover:bg-blue-700"

                    >

                        {loading ? "Loading..." : "Analyze"}

                    </button>

                </div>

            </div>

            {analytics && (

                <>

                    {/* Toggle */}

                    <div className="flex gap-4">

                        <button

                            onClick={() =>

                                setView("month")

                            }

                            className={`rounded-xl px-6 py-3 font-semibold transition

                            ${

                                view === "month"

                                    ? "bg-blue-600 text-white"

                                    : "bg-slate-200"

                            }`}

                        >

                            Monthly Trend

                        </button>

                        <button

                            onClick={() =>

                                setView("week")

                            }

                            className={`rounded-xl px-6 py-3 font-semibold transition

                            ${

                                view === "week"

                                    ? "bg-blue-600 text-white"

                                    : "bg-slate-200"

                            }`}

                        >

                            Weekly Trend

                        </button>

                    </div>
                    {selectedProduct && (

<div className="rounded-2xl bg-blue-50 p-5">

    <div className="grid grid-cols-3 gap-6">

        <div>

            <p className="text-sm text-gray-500">

                Category

            </p>

            <h3 className="font-semibold">

                {selectedProduct.category}

            </h3>

        </div>

        <div>

            <p className="text-sm text-gray-500">

                Brand

            </p>

            <h3 className="font-semibold">

                {selectedProduct.brand}

            </h3>

        </div>

        <div>

            <p className="text-sm text-gray-500">

                Selling Price

            </p>

            <h3 className="font-semibold">

                ₹{selectedProduct.sellingPrice}

            </h3>

        </div>

    </div>

</div>

)}

                    {/* Chart */}

                    <div className="rounded-3xl bg-white p-8 shadow">

                        <div className="mb-6 flex items-center gap-3">

                            <MdAnalytics

                                className="text-blue-600"

                                size={32}

                            />

                            <h2 className="text-2xl font-bold">

                                Sales Trend

                            </h2>

                        </div>

                        <SeasonalityChart

                            data={

                                view === "month"

                                    ? monthlyData

                                    : weeklyData

                            }

                            type={view}

                        />

                    </div>

                    {/* Statistics */}

                    <div className="grid gap-6 md:grid-cols-3">

                        <div className="rounded-3xl bg-white p-6 shadow">

                            <MdCalendarMonth

                                className="text-blue-600"

                                size={30}

                            />

                            <p className="mt-4 text-sm text-gray-500">

                                Peak Month

                            </p>

                            <h2 className="mt-2 text-3xl font-bold">

                                {highestMonth

                                    ? highestMonth.month

                                    : "-"}

                            </h2>

                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow">

                            <MdTrendingUp

                                className="text-green-600"

                                size={30}

                            />

                            <p className="mt-4 text-sm text-gray-500">

                                Peak Week

                            </p>

                            <h2 className="mt-2 text-3xl font-bold">

                                {highestWeek

                                    ? highestWeek.week

                                    : "-"}

                            </h2>

                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow">

                            <MdAnalytics

                                className="text-orange-600"

                                size={30}

                            />

                            <p className="mt-4 text-sm text-gray-500">

                                Avg Monthly Sales

                            </p>

                            <h2 className="mt-2 text-3xl font-bold">

                                {averageMonthlySales}

                            </h2>

                        </div>

                    </div>

                    {/* AI Insight */}

                    <div className="rounded-3xl border border-green-200 bg-green-50 p-8">

                        <div className="mb-5 flex items-center gap-3">

                            <MdInsights

                                size={32}

                                className="text-green-700"

                            />

                            <h2 className="text-2xl font-bold text-green-700">

                                AI Business Insight

                            </h2>

                        </div>

                        <div className="space-y-3 text-lg">

                            <p>

                                <strong>Peak Sales Month:</strong>{" "}

                                {highestMonth?.month}

                            </p>

                            <p>

                                <strong>Highest Weekly Sales:</strong>{" "}

                                Week {highestWeek?.week}

                            </p>

                            <p>

                                <strong>Average Monthly Sales:</strong>{" "}

                                {averageMonthlySales} Units

                            </p>

                            <div className="rounded-xl bg-white p-5">

                                <p className="font-semibold text-green-700">

                                    Recommendation

                                </p>

                                <p className="mt-2 text-gray-700">

                                    Increase inventory before{" "}

                                    <strong>

                                        {highestMonth?.month}

                                    </strong>{" "}

                                    because historical sales indicate this is the peak demand period for this product.

                                </p>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>

    );

}

export default Analytics;