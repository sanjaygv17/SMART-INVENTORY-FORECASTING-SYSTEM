import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {

    return (

        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-1 flex-col">

                <Navbar />

                <main className="flex-1 overflow-auto bg-gray-100 p-6">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default Layout;