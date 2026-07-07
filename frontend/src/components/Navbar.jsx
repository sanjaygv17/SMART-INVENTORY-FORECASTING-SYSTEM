function Navbar() {
    return (
        <nav className="bg-blue-600 text-white shadow-md">

            <div className="mx-auto flex h-16 items-center justify-between px-6">

                <h1 className="text-xl font-bold">
                    Smart Inventory Management System
                </h1>

                <div className="flex items-center gap-4">

                    <button className="rounded-lg bg-blue-700 px-3 py-2 hover:bg-blue-800">
                        Notifications
                    </button>

                    <div className="rounded-full bg-white px-4 py-2 font-semibold text-blue-600">
                        Admin
                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;