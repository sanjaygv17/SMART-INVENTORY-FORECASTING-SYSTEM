import ProductRow from "./ProductRow";

function ProductTable({

    products,

    onView,

    onEdit,

    onDelete

}) {

    return (

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead className="bg-slate-800 text-white">

                       

                        <tr>

                             <th className="px-6 py-4 text-left">

    Image

</th>

                            <th className="px-6 py-4 text-left">

                                Product

                            </th>

                            <th className="px-6 py-4 text-left">

                                Category

                            </th>

                            <th className="px-6 py-4 text-left">

                                Brand

                            </th>

                            <th className="px-6 py-4 text-left">

                                Cost Price

                            </th>

                            <th className="px-6 py-4 text-left">

                                Selling Price

                            </th>

                            <th className="px-6 py-4 text-left">

                                Margin

                            </th>

                            <th className="px-6 py-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.length === 0 ? (

                            <tr>

                                <td

                                    colSpan={8}

                                    className="py-12 text-center text-gray-500"

                                >

                                    No products found.

                                </td>

                            </tr>

                        ) : (

                            products.map((product) => (

                                <ProductRow

                                    key={product._id}

                                    product={product}

                                    onView={onView}

                                    onEdit={onEdit}

                                    onDelete={onDelete}

                                />

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default ProductTable;