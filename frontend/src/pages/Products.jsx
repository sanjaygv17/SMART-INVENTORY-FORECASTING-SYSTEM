import { useEffect, useState } from "react";
import client from "../api/client";


import ProductTable from "../components/ProductTable";
import KpiCard from "../components/KpiCard";

import ProductDetailsModal from "../components/ProductDetailsModal";
import ProductFormModal from "../components/ProductFormModal";

import {
    MdInventory,
    MdCategory,
    MdBusiness,
    MdCurrencyRupee
} from "react-icons/md";

function Products() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

const [selectedCategory, setSelectedCategory] = useState("All");

const [selectedBrand, setSelectedBrand] = useState("All");

const [editingProduct, setEditingProduct] = useState(null);

const [showEditModal, setShowEditModal] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);
const [showModal, setShowModal] = useState(false);



    const fetchProducts = async () => {

        try {

            const response = await client.get("/products");

console.log(response.data);

setProducts(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchProducts();

    }, []);

    if (loading) {

        return (

            <div className="flex justify-center py-20">

                <h2 className="text-2xl font-semibold">

                    Loading Products...

                </h2>

            </div>

        );

    }

    const totalCategories = new Set(

        products.map(product => product.category)

    ).size;

    const totalBrands = new Set(

        products.map(product => product.brand)

    ).size;

    const averageSellingPrice = products.length

        ? (
            products.reduce(

                (sum, product) =>

                    sum + product.sellingPrice,

                0

            ) / products.length

        ).toFixed(2)

        : 0;

        const categories = [
    "All",
    ...new Set(products.map(product => product.category))
];

const brands = [

    "All",

    ...new Set(

        products

            .filter(product =>

                selectedCategory === "All"

                    ||

                product.category === selectedCategory

            )

            .map(product => product.brand)

    )

];

  const handleView = (product) => {

    setSelectedProduct(product);

    setShowModal(true);

};



   const handleEdit = (product) => {

    setEditingProduct(product);

    setShowEditModal(true);

};

const handleSave = async (updatedData) => {

    try {

        await client.put(

            `/products/${editingProduct._id}`,

            updatedData

        );

        fetchProducts();

        setShowEditModal(false);

        setEditingProduct(null);

    }

    catch (error) {

        console.error(error);

    }

};

    const handleDelete = (product) => {

        console.log("Delete", product);

    };

    const filteredProducts = products.filter((product) => {

    const searchMatch =
        product.productName
            .toLowerCase()
            .includes(search.toLowerCase());

    const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

    const brandMatch =
        selectedBrand === "All" ||
        product.brand === selectedBrand;

    return (
        searchMatch &&
        categoryMatch &&
        brandMatch
    );

});

    return (

        <div className="space-y-8">

            {/* Header */}

            <div>

                <h1 className="text-4xl font-bold text-slate-800">

                    Products

                </h1>

                <p className="mt-2 text-gray-500">

                    Manage product master information.

                </p>

            </div>

            {/* KPI Cards */}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                <KpiCard

                    title="Total Products"

                    value={products.length}

                    subtitle="Registered Products"

                    color="text-blue-600"

                    icon={MdInventory}

                />

                <KpiCard

                    title="Categories"

                    value={totalCategories}

                    subtitle="Unique Categories"

                    color="text-green-600"

                    icon={MdCategory}

                />

                <KpiCard

                    title="Brands"

                    value={totalBrands}

                    subtitle="Available Brands"

                    color="text-purple-600"

                    icon={MdBusiness}

                />

                <KpiCard

                    title="Avg. Selling Price"

                    value={`₹${averageSellingPrice}`}

                    subtitle="Across All Products"

                    color="text-orange-600"

                    icon={MdCurrencyRupee}

                />

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow">

    <div className="grid gap-4 lg:grid-cols-4">

        {/* Search */}

        <input
            type="text"
            placeholder="🔍 Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* Category */}

        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3"
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

        {/* Brand */}

        <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3"
        >

            {brands.map(brand => (

                <option
                    key={brand}
                    value={brand}
                >

                    {brand}

                </option>

            ))}

        </select>

        {/* Add Product */}

        <button
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >

            + Add Product

        </button>

    </div>

</div>

            {/* Product Table */}

         <ProductTable

    products={filteredProducts}

    onView={handleView}

    onEdit={handleEdit}

    onDelete={handleDelete}

/>

<ProductDetailsModal

    product={selectedProduct}

    open={showModal}

    onClose={() => {

        setShowModal(false);

        setSelectedStock(null);

    }}

/>

<ProductFormModal

    open={showEditModal}

    product={editingProduct}

    onClose={() => {

        setShowEditModal(false);

        setEditingProduct(null);

    }}

    onSave={handleSave}

/>

        </div>

    );

}

export default Products;