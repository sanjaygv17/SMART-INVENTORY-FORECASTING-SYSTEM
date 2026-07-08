const recentTransactions = [
    {
        id: 1,
        product: "Amul Butter",
        quantity: 20,
        revenue: 1100
    },
    {
        id: 2,
        product: "Pepsi",
        quantity: 15,
        revenue: 750
    },
    {
        id: 3,
        product: "Lays Classic",
        quantity: 30,
        revenue: 900
    },
    {
        id: 4,
        product: "Good Day Biscuit",
        quantity: 25,
        revenue: 625
    }
];

function RecentTransactions() {

    return (

        <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold">
                Recent Transactions
            </h2>

            <table className="min-w-full">

                <thead>

                    <tr className="border-b">

                        <th className="py-3 text-left">
                            Product
                        </th>

                        <th className="py-3 text-left">
                            Quantity
                        </th>

                        <th className="py-3 text-left">
                            Revenue
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {recentTransactions.map((transaction) => (

                        <tr
                            key={transaction.id}
                            className="border-b hover:bg-gray-50"
                        >

                            <td className="py-3">
                                {transaction.product}
                            </td>

                            <td>
                                {transaction.quantity}
                            </td>

                            <td className="font-semibold text-green-600">
                                ₹{transaction.revenue}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default RecentTransactions;