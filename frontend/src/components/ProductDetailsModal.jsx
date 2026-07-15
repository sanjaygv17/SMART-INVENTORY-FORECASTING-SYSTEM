import { MdClose, MdInventory2 } from "react-icons/md";

import { MdRefresh } from "react-icons/md";

import { useState, useEffect } from "react";
import client from "../api/client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from "recharts";

function ProductDetailsModal({

    product,

    open,

    onClose

}) {
const [stock, setStock] = useState(null);
const [loading, setLoading] = useState(false);

const [prediction, setPrediction] = useState(null);

const [predictionLoading, setPredictionLoading] = useState(false);

const [transactions, setTransactions] = useState([]);

const [transactionsLoading, setTransactionsLoading] = useState(false);

useEffect(() => {

    if (!open || !product) return;

    const fetchStock = async () => {

        try {

            setLoading(true);

            const response = await client.get(

                `/stocks/product/${encodeURIComponent(product.productName)}`

            );

            setStock(response.data.data);

        } catch (error) {

            console.error(error);

            setStock(null);

        } finally {

            setLoading(false);

        }

    };

    fetchStock();

    fetchPrediction();

    fetchTransactions();

}, [open, product]);

if (!open || !product) {

    return null;

}

const fetchTransactions = async () => {

    try {

        setTransactionsLoading(true);

        const response = await client.get(

            `/transactions/product/${encodeURIComponent(product.productName)}`

        );

        setTransactions(response.data.data);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setTransactionsLoading(false);

    }

};

const fetchPrediction = async () => {

    try {

        setPredictionLoading(true);

        const response = await client.get(

            `/predict-product?product=${encodeURIComponent(product.productName)}`

        );

        setPrediction(response.data);

    }

    catch (error) {

        console.error(error);

        setPrediction(null);

    }

    finally {

        setPredictionLoading(false);

    }

};

const chartData = [...transactions]
    .reverse()
    .map((item) => ({
        date: new Date(item.transactionDate)
            .toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short"
            }),
        sales: item.quantitySold
    }));

const recommendation = (() => {

    if (!prediction || !stock)

        return "Loading...";

    if (prediction.prediction >

        stock.currentStock)

        return "Increase Stock";

    if (

        stock.currentStock <=

        stock.reorderLevel

    )

        return "Reorder Immediately";

    return "Stock Level is Good";

})();




const margin =
    product.sellingPrice - product.costPrice;

const status =
    stock
        ? stock.currentStock <= stock.reorderLevel
            ? "Low Stock"
            : "Healthy"
        : "Unknown";


        

    return (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm">
         <div className="flex min-h-screen items-center justify-center p-6">

    <div className="flex max-h-[90vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-2xl">
                {/* Header */}

                <div className="flex items-center justify-between border-b px-8 py-5">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">

                            Product Details

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            View complete product information

                        </p>

                    </div>

                    <button

                        onClick={onClose}

                        className="rounded-full p-2 transition hover:bg-red-100"

                    >

                        <MdClose
                            size={28}
                            className="text-red-500"
                        />

                    </button>

                </div>

                <div className="overflow-y-auto p-8">

                {/* Body */}

                <div className="grid gap-10 p-8 lg:grid-cols-2">

                    {/* Image */}

                    <div>

                        <img

                            src={
                                product.image
                                    ? `http://localhost:5000/${product.image}`
                                    : "https://placehold.co/500x400?text=No+Image"
                            }

                            alt={product.productName}

                            className="h-[380px] w-full rounded-2xl border object-cover shadow"

                        />

                    </div>

                    {/* Product Information */}

                    <div className="space-y-4">

                        <InfoRow
                            label="Product Name"
                            value={product.productName}
                        />

                        <InfoRow
                            label="Category"
                            value={product.category}
                        />

                        <InfoRow
                            label="Brand"
                            value={product.brand}
                        />

                        <InfoRow
                            label="Cost Price"
                            value={`₹${product.costPrice}`}
                        />

                        <InfoRow
                            label="Selling Price"
                            value={`₹${product.sellingPrice}`}
                        />

                        <InfoRow
                            label="Profit Margin"
                            value={`₹${margin}`}
                        />

                    </div>

                </div>

                {/* Inventory Card */}

                <div className="mx-8 mb-8 rounded-2xl bg-slate-100 p-6">

                    <div className="mb-4 flex items-center gap-3">

                        <MdInventory2
                            className="text-blue-600"
                            size={28}
                        />

                        <h3 className="text-xl font-bold">

                            Inventory Information

                        </h3>

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

   <InfoCard
    title="Current Stock"
    value={
        loading ? (
            <MdRefresh className="animate-spin text-blue-600" size={24}/>
        ) : (
            stock?.currentStock ?? "N/A"
        )
    }
/>

                       <InfoCard
    title="Reorder Level"
    value={
        loading ? (
            <MdRefresh className="animate-spin text-blue-600" size={24}/>
        ) : (
            stock?.reorderLevel ?? "N/A"
        )
    }
/>

                        <InfoCard
    title="Status"
    value={
        loading? (
            <MdRefresh className="animate-spin text-blue-600" size={24}/>
        ) : (
            stock?.status?? "N/A"
        )       
    }
/>

                    </div>

                </div>
                <div className="mx-8 mb-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">

    <h2 className="mb-5 text-2xl font-bold text-slate-800">

        🤖 AI Demand Prediction

    </h2>

    <div className="grid gap-6 md:grid-cols-3">

        <InfoCard

            title="Predicted Demand"

            value={

                predictionLoading

                    ? "Loading..."

                    : prediction?.prediction ?? "N/A"

            }

        />

        <InfoCard

            title="Forecast"

            value="Next Week"

        />

        <InfoCard

            title="Recommendation"

            value={

                predictionLoading

                    ? "Loading..."

                    : recommendation

            }

        />

    </div>

</div>

<div className="mx-8 mb-8 rounded-2xl bg-white p-6 shadow">

    <h2 className="mb-6 text-xl font-bold">

        📈 Sales Trend

    </h2>

    <ResponsiveContainer
        width="100%"
        height={250}
    >

        <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="date"/>

            <YAxis/>

            <Tooltip/>

            <Line

                type="monotone"

                dataKey="sales"

                stroke="#2563eb"

                strokeWidth={3}

            />

        </LineChart>

    </ResponsiveContainer>

</div>

<div className="mx-8 mb-8 rounded-2xl bg-white p-6 shadow">

    <h2 className="mb-5 text-xl font-bold">

        📋 Recent Transactions

    </h2>

    {transactionsLoading ? (

        <p>Loading...</p>

    ) : (

        <table className="min-w-full">

            <thead>

                <tr className="border-b">

                    <th className="py-3 text-left">

                        Date

                    </th>

                    <th className="text-left">

                        Quantity

                    </th>

                    <th className="text-left">

                        Revenue

                    </th>

                </tr>

            </thead>

            <tbody>

                {transactions.map((item) => (

                    <tr
                        key={item._id}
                        className="border-b"
                    >

                        <td className="py-3">

                            {new Date(
                                item.transactionDate
                            ).toLocaleDateString()}

                        </td>

                        <td>

                            {item.quantitySold}

                        </td>

                        <td>

                            ₹{item.revenue}

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    )}

</div>



</div>



            </div>
            
            </div>
            

        </div>

        




    );

}



function InfoRow({

    label,

    value

}) {

    return (

        <div className="flex justify-between border-b py-3">

            <span className="font-medium text-gray-500">

                {label}

            </span>

            <span className="font-semibold text-slate-700">

                {value}

            </span>

        </div>

    );

}

function InfoCard({

    title,

    value

}) {

    return (

        <div className="rounded-xl bg-white p-5 shadow">

            <p className="text-sm text-gray-500">

                {title}

            </p>

            <h2 className="mt-2 text-2xl font-bold">

                {value}

            </h2>

        </div>

    );


    
}

export default ProductDetailsModal;