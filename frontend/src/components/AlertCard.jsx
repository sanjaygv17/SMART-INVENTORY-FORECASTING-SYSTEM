import {
    MdError,
    MdWarning,
    MdCheckCircle
} from "react-icons/md";

function AlertCard({

    product,

    currentStock,

    reorderLevel,

    severity,

    message

}) {

    const severityStyles = {

        Critical: {
            icon: MdError,
            bg: "bg-red-50",
            border: "border-red-500",
            text: "text-red-700"
        },

        Warning: {
            icon: MdWarning,
            bg: "bg-yellow-50",
            border: "border-yellow-500",
            text: "text-yellow-700"
        },

        Healthy: {
            icon: MdCheckCircle,
            bg: "bg-green-50",
            border: "border-green-500",
            text: "text-green-700"
        }

    };

    const style =
        severityStyles[severity] || severityStyles.Warning;

    const Icon = style.icon;

    return (

        <div
            className={`rounded-xl border-l-4 ${style.border} ${style.bg} p-6 shadow-md transition hover:shadow-lg`}
        >

            <div className="flex items-center gap-2">

                <Icon
                    size={28}
                    className={style.text}
                />

                <h2
                    className={`text-xl font-bold ${style.text}`}
                >

                    {severity}

                </h2>

            </div>

            <h3 className="mt-5 text-lg font-semibold">

                {product}

            </h3>

            <div className="mt-4 space-y-2 text-gray-600">

                <p>

                    Current Stock :

                    <span className="ml-2 font-semibold">

                        {currentStock}

                    </span>

                </p>

                <p>

                    Reorder Level :

                    <span className="ml-2 font-semibold">

                        {reorderLevel}

                    </span>

                </p>

            </div>

            <div
                className={`mt-5 rounded-lg px-4 py-3 font-medium ${style.bg} ${style.text}`}
            >

                {message}

            </div>

        </div>

    );

}

export default AlertCard;