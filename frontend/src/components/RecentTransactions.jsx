import { useEffect, useState } from "react";
import client from "../api/client";

function RecentTransactions() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {

        try {

            const response = await client.get("/transactions/recent");

            setTransactions(response.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTransactions();

    }, []);

    if (loading) {

        return (

            <div className="rounded-xl bg-white p-6 shadow-md">

                <h2 className="text-xl font-semibold">

                    Loading Transactions...

                </h2>

            </div>

        );

    }

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

                    {transactions.length === 0 ? (

                        <tr>

                            <td
                                colSpan="3"
                                className="py-4 text-center text-gray-500"
                            >

                                No transactions found

                            </td>

                        </tr>

                    ) : (

                        transactions.map((transaction) => (

                            <tr
                                key={transaction._id}
                                className="border-b hover:bg-blue-50"
                            >

                                <td className="py-3">

                                    {transaction.productName}

                                </td>

                                <td>

                                    {transaction.quantitySold}

                                </td>

                                <td className="font-semibold text-green-600">

                                    ₹{transaction.revenue}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default RecentTransactions;