function MetricsTable() {

    const models = [

        {
            model: "ARIMA",
            mae: 37.50,
            rmse: 49.75,
            r2: -0.247,
            status: "Poor"
        },

        {
            model: "LSTM",
            mae: 18.20,
            rmse: 24.10,
            r2: 0.63,
            status: "Good"
        },

        {
            model: "XGBoost category model",
            mae: 15.66,
            rmse: 18.09,
            r2: 0.9396,
            status: "Best"
        },
         {
            model: "XGBoost product model",
            mae: 10.66,
            rmse: 12.69,
            r2: 0.675,
            status: "Best"
        }

    ];

    const badgeColor = (status) => {

        switch (status) {

            case "Best":
                return "bg-green-100 text-green-700";

            case "Good":
                return "bg-yellow-100 text-yellow-700";

            default:
                return "bg-red-100 text-red-700";

        }

    };

    return (

        <div className="rounded-3xl bg-white p-6 shadow-lg">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-slate-800">

                    Model Performance Metrics

                </h2>

                <p className="mt-1 text-gray-500">

                    Comparison of forecasting models using evaluation metrics.

                </p>

            </div>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>

                        <tr className="border-b bg-slate-100">

                            <th className="px-6 py-4 text-left">

                                Model

                            </th>

                            <th className="px-6 py-4 text-center">

                                MAE ↓

                            </th>

                            <th className="px-6 py-4 text-center">

                                RMSE ↓

                            </th>

                            <th className="px-6 py-4 text-center">

                                R² ↑

                            </th>

                            <th className="px-6 py-4 text-center">

                                Status

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {models.map((item) => (

                            <tr

                                key={item.model}

                                className="border-b hover:bg-slate-50"

                            >

                                <td className="px-6 py-4 font-semibold">

                                    {item.model}

                                </td>

                                <td className="px-6 py-4 text-center">

                                    {item.mae}

                                </td>

                                <td className="px-6 py-4 text-center">

                                    {item.rmse}

                                </td>

                                <td className="px-6 py-4 text-center">

                                    {item.r2}

                                </td>

                                <td className="px-6 py-4 text-center">

                                    <span

                                        className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeColor(item.status)}`}

                                    >

                                        {item.status}

                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default MetricsTable;