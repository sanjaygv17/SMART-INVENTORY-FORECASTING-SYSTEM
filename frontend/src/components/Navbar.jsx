function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-md">

           <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

    <div>

        <h1 className="text-4xl font-bold text-slate-800">
            Welcome Back, Admin 👋
        </h1>

        <p className="mt-2 text-white-500">
            Smart Inventory Management Dashboard
        </p>

    </div>

    <div className="bg-gray-100 px-5 py-3 shadow">

        <p className="text-sm text-gray-500">
            Today's Date
        </p>

        <h2 className="text-lg font-semibold text-slate-700">
            {new Date().toLocaleDateString()}
        </h2>

    </div>

</div>

        </nav>
    );
}

export default Navbar;