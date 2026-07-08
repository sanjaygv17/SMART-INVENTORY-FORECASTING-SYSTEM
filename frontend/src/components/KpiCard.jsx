function KpiCard({ title, value, color, icon: Icon }) {
    return (
        <div
className="
rounded-2xl
bg-white
border border-gray-200
p-6
shadow-md
transition-all
duration-300
hover:-translate-y-2
hover:shadow-2xl
"
>
    <div
className={`
flex
h-16
w-16
items-center
justify-center
rounded-full
${color.replace("text", "bg")}/10
`}
>

<Icon
className={color}
size={34}
/>

</div>
            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-sm font-medium text-gray-500">
                        {title}
                    </h2>

                    <p className={`mt-3 text-4xl font-bold ${color}`}>
                        {value}
                    </p>

                </div>

                <div className={`rounded-full p-4 ${color.replace("text", "bg")}/10`}>

                    <Icon className={color} size={32} />

                </div>

            </div>

        </div>
    );
}

export default KpiCard;