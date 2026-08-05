import { useEffect, useState } from "react";
import client from "../api/client";

import InventoryTable from "../components/InventoryTable";
import KpiCard from "../components/KpiCard";

import {
    MdInventory,
    MdWarning,
    MdCheckCircle,
    MdCategory
} from "react-icons/md";

function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedItem, setSelectedItem] = useState(null);
    const [restockQuantity, setRestockQuantity] = useState("");
    const [restockLoading, setRestockLoading] = useState(false);

    const loadInventory = async ({ showLoading = false } = {}) => {
        try {
            if (showLoading) {
                setLoading(true);
            }

            setPageError("");

            const response = await client.get("/stocks");
            setInventory(response.data.data);
        } catch (error) {
            console.error(error);
            setPageError(
                error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to load inventory."
            );
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadInventory({ showLoading: true });
    }, []);

    if (loading) {
        return (
            <div className="text-center text-2xl">
                Loading Inventory...
            </div>
        );
    }

    const lowStock = inventory.filter(
        item => item.currentStock <= item.reorderLevel
    ).length;

    const healthy = inventory.filter(
        item => item.currentStock > item.reorderLevel
    ).length;

    const categories = [
        "All",
        ...new Set(inventory.map(item => item.category))
    ];

    const filteredInventory = inventory.filter((item) => {
        const searchMatch = item.productName
            .toLowerCase()
            .includes(search.toLowerCase());

        const categoryMatch =
            selectedCategory === "All" || item.category === selectedCategory;

        let status = "Healthy";

        if (item.currentStock === 0) {
            status = "Out of Stock";
        } else if (item.currentStock <= item.reorderLevel) {
            status = "Low Stock";
        }

        const statusMatch =
            selectedStatus === "All" || status === selectedStatus;

        return searchMatch && categoryMatch && statusMatch;
    });

    const handleOpenRestock = (item) => {
        setSelectedItem(item);
        setRestockQuantity("");
        setPageError("");
    };

    const handleRestock = async () => {
        if (!selectedItem) {
            return;
        }

        const quantity = Number(restockQuantity);

        if (!Number.isInteger(quantity) || quantity <= 0) {
            setPageError("Enter a valid restock quantity.");
            return;
        }

        try {
            setRestockLoading(true);
            setPageError("");

            await client.patch(`/stocks/${selectedItem._id}/restock`, {
                quantity
            });

            setSelectedItem(null);
            setRestockQuantity("");
            await loadInventory();
        } catch (error) {
            console.error(error);
            setPageError(
                error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Restock failed."
            );
        } finally {
            setRestockLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold">
                    Inventory Management
                </h1>

                <p className="mt-2 text-gray-500">
                    Monitor product stock levels.
                </p>

                {pageError ? (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {pageError}
                    </div>
                ) : null}
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <KpiCard
                    title="Products"
                    value={inventory.length}
                    subtitle="Inventory Items"
                    color="text-blue-600"
                    icon={MdInventory}
                />

                <KpiCard
                    title="Low Stock"
                    value={lowStock}
                    subtitle="Needs Reorder"
                    color="text-yellow-600"
                    icon={MdWarning}
                />

                <KpiCard
                    title="Healthy"
                    value={healthy}
                    subtitle="Stock Available"
                    color="text-green-600"
                    icon={MdCheckCircle}
                />

                <KpiCard
                    title="Categories"
                    value={new Set(inventory.map(item => item.category)).size}
                    subtitle="Unique Categories"
                    color="text-purple-600"
                    icon={MdCategory}
                />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-xl border px-4 py-3"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="rounded-xl border px-4 py-3"
                >
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="rounded-xl border px-4 py-3"
                >
                    <option value="All">All</option>
                    <option value="Healthy">Healthy</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </div>

            {selectedItem ? (
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Restock Item
                            </h2>

                            <p className="text-sm text-gray-500">
                                {selectedItem.productName} - {selectedItem.category}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSelectedItem(null)}
                            className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Quantity to add
                            </label>

                            <input
                                type="number"
                                min="1"
                                value={restockQuantity}
                                onChange={(e) => setRestockQuantity(e.target.value)}
                                placeholder="Enter quantity"
                                className="w-full rounded-xl border px-4 py-3"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleRestock}
                            disabled={restockLoading}
                            className="rounded-xl bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                        >
                            {restockLoading ? "Restocking..." : "Confirm Restock"}
                        </button>
                    </div>
                </div>
            ) : null}

            <InventoryTable
                inventory={filteredInventory}
                onRestock={handleOpenRestock}
            />
        </div>
    );
}

export default Inventory;