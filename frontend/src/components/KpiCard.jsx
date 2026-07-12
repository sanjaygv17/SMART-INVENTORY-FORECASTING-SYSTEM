function KpiCard({

    title,

    value,

    color = "text-blue-600",

    icon: Icon,

    subtitle = "",

    bg = "bg-white"

}) {

    return (

        <div
            className={`rounded-2xl ${bg} p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">

                        {title}

                    </p>

                    <h2
                        className={`mt-2 text-3xl font-bold ${color}`}
                    >

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="mt-2 text-sm text-gray-400">

                            {subtitle}

                        </p>

                    )}

                </div>

                {Icon && (

                    <div
                        className={`rounded-full p-4 ${bg}`}
                    >

                        <Icon
                            size={34}
                            className={color}
                        />

                    </div>

                )}

            </div>

        </div>

    );

}

export default KpiCard;