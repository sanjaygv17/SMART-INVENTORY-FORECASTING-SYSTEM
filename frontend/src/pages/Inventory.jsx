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

    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("All");

const [selectedStatus, setSelectedStatus] = useState("All");

    const fetchInventory = async () => {

        try {

            const response = await client.get("/stocks");


            setInventory(response.data.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchInventory();

    }, []);

    if (loading) {

        return (

            <div className="text-center text-2xl">

                Loading Inventory...

            </div>

        );

    }

    const lowStock = inventory.filter(

        item =>

            item.currentStock <= item.reorderLevel

    ).length;

    const healthy = inventory.filter(

        item =>

            item.currentStock > item.reorderLevel

    ).length;

    const categories = [

    "All",

    ...new Set(

        inventory.map(

            item => item.category

        )

    )

];
const filteredInventory = inventory.filter((item) => {

    const searchMatch =
        item.productName
            .toLowerCase()
            .includes(search.toLowerCase());

    const categoryMatch =
        selectedCategory === "All" ||
        item.category === selectedCategory;

    let status = "Healthy";

    if (item.currentStock === 0) {

        status = "Out of Stock";

    } else if (item.currentStock <= item.reorderLevel) {

        status = "Low Stock";

    }

    const statusMatch =
        selectedStatus === "All" ||
        status === selectedStatus;

    return (
        searchMatch &&
        categoryMatch &&
        statusMatch
    );

});

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Inventory Management

                </h1>

                <p className="text-gray-500 mt-2">

                    Monitor product stock levels.

                </p>

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

                    value={
                        new Set(

                            inventory.map(

                                item => item.category

                            )

                        ).size
                    }

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

        onChange={(e) =>
            setSearch(e.target.value)
        }

        className="rounded-xl border px-4 py-3"

    />

    <select

        value={selectedCategory}

        onChange={(e) =>
            setSelectedCategory(e.target.value)
        }

        className="rounded-xl border px-4 py-3"

    >

        {categories.map(category => (

            <option

                key={category}

                value={category}

            >

                {category}

            </option>

        ))}

    </select>

    <select

        value={selectedStatus}

        onChange={(e) =>
            setSelectedStatus(e.target.value)
        }

        className="rounded-xl border px-4 py-3"

    >

        <option>

            All

        </option>

        <option>

            Healthy

        </option>

        <option>

            Low Stock

        </option>

        <option>

            Out of Stock

        </option>

    </select>

</div>
<InventoryTable

inventory={filteredInventory}

/>

        </div>

    );

}

export default Inventory;