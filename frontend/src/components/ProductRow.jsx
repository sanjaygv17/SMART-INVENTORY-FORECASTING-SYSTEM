import {
    MdVisibility,
    MdEdit,
    MdDelete
} from "react-icons/md";

function ProductRow({

    product,

    onView,

    onEdit,

    onDelete

}) {

    const margin =
        product.sellingPrice - product.costPrice;

    return (

        <tr className="border-b transition hover:bg-slate-50">

            <td className="px-6 py-4">

    <img

        src={
            product.image
                ? `http://localhost:5000/${product.image}`
                : "https://placehold.co/60x60?text=No+Image"
        }

        alt={product.productName}

        className="h-14 w-14 rounded-xl border object-cover"

    />

</td>

            <td className="px-6 py-4 font-semibold">

                {product.productName}

            </td>

            <td className="px-6 py-4">

                {product.category}

            </td>

            <td className="px-6 py-4">

                {product.brand}

            </td>

            <td className="px-6 py-4">

                ₹{product.costPrice}

            </td>

            <td className="px-6 py-4">

                ₹{product.sellingPrice}

            </td>

            <td className="px-6 py-4 font-semibold text-green-600">

                ₹{margin}

            </td>

            <td className="px-6 py-4">

                <div className="flex gap-3">

                    <button
                        onClick={() => onView(product)}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-200"
                    >

                        <MdVisibility size={20} />

                    </button>

                    <button
                        onClick={() => onEdit(product)}
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-600 transition hover:bg-yellow-200"
                    >

                        <MdEdit size={20} />

                    </button>

                    <button
                        onClick={() => onDelete(product)}
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
                    >

                        <MdDelete size={20} />

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default ProductRow;