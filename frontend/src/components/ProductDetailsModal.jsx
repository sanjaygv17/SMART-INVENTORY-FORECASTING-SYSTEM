import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import client from "../api/client";
import { MdImage } from "react-icons/md";

function ProductDetailsModal({

    product,

    open,

    onClose

}) {

    if (!open || !product) {

        return null;

    }

    const margin =
        product.sellingPrice - product.costPrice;

    const status =

    stock

        ? stock.currentStock <= stock.reorderLevel

            ? "Low Stock"

            : "Healthy"

        : "Loading...";

    const [stock, setStock] = useState(null);

const [loading, setLoading] = useState(true);


useEffect(() => {

    if (!open || !product) return;

    const fetchStock = async () => {

        try {

            const response = await client.get(

                `/stocks/product/${encodeURIComponent(product.productName)}`

            );

            setStock(response.data.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    fetchStock();

}, [open, product]);

if (loading) {

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black/50">

            <div className="rounded-2xl bg-white p-8">

                Loading Product Details...

            </div>

        </div>

    );

}

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b p-6">

                    <h2 className="text-2xl font-bold">

                        Product Details

                    </h2>

                    <button
                        onClick={onClose}
                    >

                        <MdClose size={28} />

                    </button>

                </div>

                {/* Body */}

                <div className="grid gap-8 p-8 md:grid-cols-3">

                    {/* Image */}

                    <div>

                        <img

                            src={
                                product.image

                                    ? `http://localhost:5000/${product.image}`

                                    : "/no-image.png"
                            }

                            alt={product.productName}

                           className="h-14 w-14 rounded-xl border object-cover transition duration-300 hover:scale-110"
                        />

                    </div>

                    {/* Details */}

                    <div className="space-y-4">

                        <DetailRow
                            title="Product"
                            value={product.productName}
                        />

                        <DetailRow
                            title="Category"
                            value={product.category}
                        />

                        <DetailRow
                            title="Brand"
                            value={product.brand}
                        />

                        <DetailRow
                            title="Cost Price"
                            value={`₹${product.costPrice}`}
                        />

                        <DetailRow
                            title="Selling Price"
                            value={`₹${product.sellingPrice}`}
                        />

                        <DetailRow
                            title="Profit Margin"
                            value={`₹${margin}`}
                        />

                        <DetailRow
                            title="Current Stock"
                            value={stock?.currentStock ?? "N/A"}
                        />

                        <DetailRow
                            title="Reorder Level"
                            value={stock?.reorderLevel ?? "N/A"}
                        />

                        <DetailRow
                            title="Status"
                            value={status}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

}

function DetailRow({

    title,

    value

}) {

    return (

        <div className="flex justify-between border-b pb-2">

            <span className="font-medium text-gray-500">

                {title}

            </span>

            <span className="font-semibold">

                {value}

            </span>

        </div>

    );

}

export default ProductDetailsModal;