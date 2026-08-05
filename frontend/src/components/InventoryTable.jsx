import InventoryRow from "./InventoryRow";

function InventoryTable({

    inventory,

    onRestock

}) {

    return (

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-800 text-white">

                        <tr>

                            <th className="px-6 py-4 text-left">

                                Product

                            </th>

                            <th className="px-6 py-4 text-left">

                                Category

                            </th>

                            <th className="px-6 py-4 text-left">

                                Current Stock

                            </th>

                            <th className="px-6 py-4 text-left">

                                Reorder Level

                            </th>

                            <th className="px-6 py-4 text-left">

                                Status

                            </th>

                            <th className="px-6 py-4 text-left">

                                Recommendation

                            </th>

                            <th className="px-6 py-4 text-left">

                                Restock

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {inventory.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    className="py-10 text-center text-gray-500"
                                >

                                    No inventory available.

                                </td>

                            </tr>

                        ) : (

                            inventory.map((item) => (

                                <InventoryRow

                                    key={item._id}

                                    product={item.productName}

                                    category={item.category}

                                    currentStock={item.currentStock}

                                    reorderLevel={item.reorderLevel}

                                    onRestock={() => onRestock(item)}

                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default InventoryTable;