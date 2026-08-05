import { useEffect, useState } from "react";
import client from "../api/client";
import AlertCard from "../components/AlertCard";
import KpiCard from "../components/KpiCard";

function Alerts() {

    const [alerts, setAlerts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState("All");

    const activeAlerts = alerts.filter(
    alert =>
        alert.severity === "Critical" ||
        alert.severity === "Warning"
).length;

    const filteredAlerts =

    filter === "All"

        ? alerts

        : alerts.filter(

            alert =>

                alert.severity === filter

        );

    const fetchAlerts = async () => {

    try {

        const response = await client.get("/alerts");

        setAlerts(response.data.data);

    }

    catch (error) {

        console.error(error);

    }

    finally {

        setLoading(false);

    }

};
    useEffect(() => {

    fetchAlerts();

}, []);

if (loading) {

    return (

        <div className="text-center text-xl">

            Loading Alerts...

        </div>

    );

}


    return (

        <div className="space-y-8">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

    <div>

        <h1 className="text-4xl font-bold text-slate-800">

            Inventory Alerts

        </h1>

        <p className="mt-2 text-gray-500">

            Monitor low-stock and out-of-stock products.

        </p>

    </div>

    <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 shadow-sm">

        <p className="text-sm text-gray-500">

            Active Alerts

        </p>

        <h2 className="text-3xl font-bold text-red-600">

            {activeAlerts}

        </h2>

    </div>

</div>

            {/* Summary */}


                <div className="grid gap-3 md:grid-cols-3">

    <KpiCard
        title="Critical Alerts"
        value={
            alerts.filter(a => a.severity === "Critical").length
        }
        subtitle="Immediate Attention"
        color="text-red-600"
    />

    <KpiCard
        title="Warning Alerts"
        value={
            alerts.filter(a => a.severity === "Warning").length
        }
        subtitle="Needs Reorder"
        color="text-yellow-600"
    />

    <KpiCard
        title="Healthy Products"
        value={
            alerts.filter(a => a.severity === "Healthy").length
        }
        subtitle="Inventory Healthy"
        color="text-green-600"
    />

</div>
     <div className="grid gap-4 md:grid-cols-4">
            
    <button
        onClick={() => setFilter("All")}
        className={`rounded-lg px-5 py-2 font-medium transition ${
            filter === "All"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
        }`}
    >

        All

    </button>

    <button
        onClick={() => setFilter("Critical")}
        className={`rounded-lg px-5 py-2 font-medium transition ${
            filter === "Critical"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
        }`}
    >

        Critical

    </button>

    <button
        onClick={() => setFilter("Warning")}
        className={`rounded-lg px-5 py-2 font-medium transition ${
            filter === "Warning"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
        }`}
    >

        Warning

    </button>

    <button
        onClick={() => setFilter("Healthy")}
        className={`rounded-lg px-5 py-2 font-medium transition ${
            filter === "Healthy"
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
        }`}
    >

        Healthy

    </button>
    </div>



            {/* Alert Cards */}

            <div className="grid gap-6 lg:grid-cols-3">

                {filteredAlerts.map((alert) => (

                    <AlertCard
                        key={alert.id}
                        product={alert.product}
                        currentStock={alert.currentStock}
                        reorderLevel={alert.reorderLevel}
                        severity={alert.severity}
                        message={alert.message}
                    />

                ))}
                {filteredAlerts.length === 0 && (

    <div className="rounded-xl bg-white p-8 text-center text-gray-500 shadow">

        No alerts found.

    </div>

)}

            </div>

        </div>

    );

}

export default Alerts;