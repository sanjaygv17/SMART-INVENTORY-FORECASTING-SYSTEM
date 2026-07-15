import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

function ProductFormModal({

    open,

    product,

    onClose,

    onSave

}) {

    const [formData, setFormData] = useState({

        productName: "",

        category: "",

        brand: "",

        costPrice: "",

        sellingPrice: ""

    });

    useEffect(() => {

        if (product) {

            setFormData({

                productName: product.productName || "",

                category: product.category || "",

                brand: product.brand || "",

                costPrice: product.costPrice || "",

                sellingPrice: product.sellingPrice || ""

            });

        }

    }, [product]);

    if (!open) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

    <div className="flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
                    {/* Header */}

                    <div className="flex items-center justify-between border-b px-8 py-5">

                        <div>

                            <h2 className="text-3xl font-bold text-slate-800">

                                Edit Product

                            </h2>

                            <p className="mt-1 text-gray-500">

                                Update product information

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

                    {/* Scrollable Form */}

                    <form

                        onSubmit={handleSubmit}

                        className="flex h-full flex-col"

                    >

                    <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

                            {/* Product Name */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Product Name

                                </label>

                                <input

                                    type="text"

                                    name="productName"

                                    value={formData.productName}

                                    onChange={handleChange}

                                    className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500"

                                    required

                                />

                            </div>

                            {/* Category */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Category

                                </label>

                                <input

                                    type="text"

                                    name="category"

                                    value={formData.category}

                                    onChange={handleChange}

                                    className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500"

                                    required

                                />

                            </div>

                            {/* Brand */}

                            <div>

                                <label className="mb-2 block font-medium text-slate-700">

                                    Brand

                                </label>

                                <input

                                    type="text"

                                    name="brand"

                                    value={formData.brand}

                                    onChange={handleChange}

                                    className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500"

                                    required

                                />

                            </div>

                            {/* Prices */}

                            <div className="grid gap-6 md:grid-cols-2">

                                <div>

                                    <label className="mb-2 block font-medium text-slate-700">

                                        Cost Price

                                    </label>

                                    <input

                                        type="number"

                                        name="costPrice"

                                        value={formData.costPrice}

                                        onChange={handleChange}

                                        className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500"

                                        required

                                    />

                                </div>

                                <div>

                                    <label className="mb-2 block font-medium text-slate-700">

                                        Selling Price

                                    </label>

                                    <input

                                        type="number"

                                        name="sellingPrice"

                                        value={formData.sellingPrice}

                                        onChange={handleChange}

                                        className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-blue-500"

                                        required

                                    />

                                </div>

                            </div>

                            {/* Margin */}

                            <div className="rounded-2xl bg-blue-50 p-5">

                                <p className="text-gray-600">

                                    Profit Margin

                                </p>

                                <h2 className="mt-2 text-3xl font-bold text-blue-700">

                                    ₹

                                    {Number(formData.sellingPrice || 0) -

                                        Number(formData.costPrice || 0)}

                                </h2>

                            </div>

                            {/* Placeholder for Future Image Upload */}

                            <div className="rounded-2xl border-2 border-dashed border-slate-300 p-6 text-center">

                                <p className="font-medium text-slate-700">

                                    Product Image

                                </p>

                                <p className="mt-2 text-sm text-gray-500">

                                    Image upload will be added in the next module.

                                </p>

                            </div>

                        </div>

                        {/* Fixed Footer */}

                        <div className="sticky bottom-0 flex justify-end gap-4 border-t bg-white px-8 py-5">

                            <button

                                type="button"

                                onClick={onClose}

                                className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"

                            >

                                Cancel

                            </button>

                            <button

                                type="submit"

                                className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"

                            >

                                Save Changes

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        

    );

}

export default ProductFormModal;