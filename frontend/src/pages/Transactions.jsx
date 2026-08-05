import { useState } from "react";
import client from "../api/client";
import { useEffect } from "react";
import ProductSearch from "../components/ProductSearch";
import toast from "react-hot-toast";

function Transactions() {

    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [formData, setFormData] = useState({
        productName: "",
        quantitySold: "",
        revenue: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    

    



    const fetchProducts = async (searchTerm) => {

    console.log("fetchProducts called:", searchTerm);

    if (!searchTerm.trim()) {
        setProducts([]);
        setShowSuggestions(false);
        return;
    }

    try {
        setLoadingProducts(true);

        
        const response = await client.get(`/products?search=${searchTerm}`);

        console.log(response.data);

        setProducts(response.data.data);
        setShowSuggestions(true);

    } catch (error) {
        console.error(error);
    } finally {
        setLoadingProducts(false);
    }
};
const fetchStockDetails = async (productName) => {

    try {

        const response = await client.get(
            `/stocks/product/${encodeURIComponent(productName)}`
        );

        setSelectedStock(response.data.data);

    } catch (error) {

        console.error(error);

        setSelectedStock(null);

    }

};



const validateForm = () => {

    const newErrors = {};

    if (!formData.productName.trim()) {
        newErrors.productName = "Product name is required";
    }

    if (!formData.quantitySold) {
        newErrors.quantitySold = "Quantity is required";
    } else if (Number(formData.quantitySold) <= 0) {
        newErrors.quantitySold = "Quantity must be greater than 0";
    }

    if (!formData.revenue) {
        newErrors.revenue = "Revenue is required";
    } else if (Number(formData.revenue) <= 0) {
        newErrors.revenue = "Revenue must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
};



const handleSubmit = async (e) => {

    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
        return;
    }

    try {

        setIsSubmitting(true);

        const response = await client.post(
            "/transactions",
            formData
        );

        console.log(response.data);
        toast.success("Transaction saved successfully!");

        

      
        setErrors({});

    } catch (error) {

        console.error(error);

       toast.error(
    error.response?.data?.message ||
    "Failed to save transaction."
);

    } finally {

        setIsSubmitting(false);

    }

};



const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({

        ...formData,

        [name]: value

    });

    if (name === "productName") {
        console.log("Searching:", value);
        fetchProducts(value);
    
    }

};
useEffect(() => {

    if (!selectedProduct) return;

    const quantity = Number(formData.quantitySold || 0);

    const sellingPrice = Number(selectedProduct.sellingPrice || 0);

    setFormData(prev => ({

        ...prev,

        revenue: quantity * sellingPrice

    }));

}, [

    formData.quantitySold,

    selectedProduct

]);

    return (

        <div className="mx-auto w-full max-w-4xl space-y-8">

            {/* Page Heading */}

            <div className="mb-8">

               <div className="space-y-2">
    <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Transaction Management
    </h1>

    <p className="max-w-2xl text-sm text-slate-600 md:text-base">
        Record new FMCG sales transactions to automatically update inventory and
        support demand forecasting.
    </p>
</div>

                <p className="mt-2 text-gray-500">

                    Record a product sale into the inventory system.

                </p>

            </div>

            {/* Form Card */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8">

                <form onSubmit={handleSubmit}>

                    <div className="space-y-6">

                        {/* Product Name */}

                        <div>

                            <label className="mb-2 block font-medium text-gray-700">

                                Product Name

                            </label>

                            <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                            />

                            {showSuggestions && (

    <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-slate-300 bg-white shadow-lg">

        {loadingProducts ? (

            <div className="p-3 text-gray-500">
                Searching...
            </div>

        ) : products.length === 0 ? (

            <div className="p-3 text-gray-500">
                No products found
            </div>

        ) : (

            products.map((product) => (

                <div
                    key={product._id}
               onClick={() => {

    setSelectedProduct(product);

    fetchStockDetails(product.productName);

    setFormData(prev => ({
        ...prev,
        productName: product.productName
    }));

    setShowSuggestions(false);

}}
                    className="cursor-pointer border-b p-3 hover:bg-blue-100"
                >

                    <div className="font-medium">
                        {product.productName}
                    </div>

                    <div className="text-sm text-gray-500">
                        {product.category}
                    </div>

                </div>

            ))

        )}

    </div>

)}
                            {
    errors.productName && (
        <p className="mt-2 text-sm text-red-500">
            {errors.productName}
        </p>
    )
}
{selectedProduct && (

<div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-5">

    <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Product Information
    </h3>

    <div className="grid gap-4 md:grid-cols-2">

        <div>

            <p className="text-sm text-gray-500">
                Category
            </p>

            <p className="font-semibold">
                {selectedProduct.category}
            </p>

        </div>

        <div>

            <p className="text-sm text-gray-500">
                Brand
            </p>

            <p className="font-semibold">
                {selectedProduct.brand}
            </p>

        </div>

        <div>

            <p className="text-sm text-gray-500">
                Selling Price
            </p>

            <p className="font-semibold text-green-700">
                ₹{selectedProduct.sellingPrice}
            </p>

        </div>


        <div>

            <p className="text-sm text-gray-500">
                Current Stock
            </p>

            <p className="font-semibold text-blue-700">
                {selectedStock
                    ? selectedStock.currentStock
                    : "Loading..."}
            </p>

        </div>

      

    </div>

</div>

)}

                        </div>

                        

                        {/* Quantity */}

                        <div>

                            <label className="mb-2 block font-medium text-gray-700">

                                Quantity Sold

                            </label>

                            <input
                                type="number"
                                name="quantitySold"
                                value={formData.quantitySold}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                               className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                            />
                            {
    errors.quantitySold && (
        <p className="mt-2 text-sm text-red-500">
            {errors.quantitySold}
        </p>
    )
}

                        </div>

                        {/* Revenue */}

                        <div>

                            <label className="mb-2 block font-medium text-gray-700">

                                Revenue

                            </label>
                       <input

    type="number"

    value={formData.revenue}

    readOnly

    placeholder="Revenue will be calculated automatically"

    className="w-full rounded-2xl border border-slate-300 bg-gray-100 px-4 py-3"

 />

   
                            {
    errors.revenue && (
        <p className="mt-2 text-sm text-red-500">
            {errors.revenue}
        </p>
    )
}

                        </div>

                        {/* Button */}
<button
    type="submit"
    disabled={isSubmitting}
    className={`flex w-full items-center justify-center rounded-lg py-3 text-lg font-semibold text-white transition ${
        isSubmitting
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
    }`}
>
    {isSubmitting ? (
        <>
            <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            Saving...
        </>
    ) : (
        "Save Transaction"
    )}
</button>

                            

                        

                    </div>

                </form>

            </div>

           
            

        </div>

    );

}

export default Transactions;

