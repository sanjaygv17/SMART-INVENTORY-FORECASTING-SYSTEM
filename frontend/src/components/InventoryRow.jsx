import {
    MdCheckCircle,
    MdWarning,
    MdError
} from "react-icons/md";

function InventoryRow({

    product,

    category,

    currentStock,

    reorderLevel

}) {

    let status = "Healthy";
    let recommendation = "Stock Healthy";
    let badgeClass = "bg-green-100 text-green-700";
    let Icon = MdCheckCircle;

    if (currentStock === 0) {

        status = "Out of Stock";
        recommendation = "Restock Immediately";
        badgeClass = "bg-red-100 text-red-700";
        Icon = MdError;

    } else if (currentStock <= reorderLevel) {

        status = "Low Stock";
        recommendation = "Reorder Soon";
        badgeClass = "bg-yellow-100 text-yellow-700";
        Icon = MdWarning;

    }

    return (

        <tr className="border-b transition hover:bg-slate-50">

            <td className="px-6 py-4 font-semibold">

                {product}

            </td>

            <td className="px-6 py-4">

                {category}

            </td>

            <td className="px-6 py-4">

                {currentStock}

            </td>

            <td className="px-6 py-4">

                {reorderLevel}

            </td>

            <td className="px-6 py-4">

                <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}
                >

                    <Icon size={18} />

                    {status}

                </span>

            </td>

            <td className="px-6 py-4 font-medium">

                {recommendation}

            </td>

        </tr>

    );

}

export default InventoryRow;