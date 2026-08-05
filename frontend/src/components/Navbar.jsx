import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

import {
    MdNotifications,
    MdAccountCircle,
    MdCalendarToday,
    MdWbSunny,
    MdNightlightRound,
    MdWbTwilight,
    MdLogout,
    MdPerson
} from "react-icons/md";

function Navbar() {

    const now = new Date();

    const hour = now.getHours();

    const navigate = useNavigate();

const [alertCount, setAlertCount] = useState(0);

const [showProfile, setShowProfile] = useState(false);

const profileRef = useRef(null);

const fetchAlertCount = async () => {

    try {

        const response = await client.get("/alerts");

        console.log(response.data);

        const alerts = response.data.data || [];

        const criticalAlerts = alerts.filter(
            alert => alert.severity === "Critical"
        );

        setAlertCount(criticalAlerts.length);

    } catch (error) {

        console.error(error);

        setAlertCount(0);

    }

};
useEffect(() => {

    fetchAlertCount();

}, []);



    let greeting = "";
    let GreetingIcon = MdWbSunny;

    if (hour < 12) {

        greeting = "Good Morning";

        GreetingIcon = MdWbSunny;

    } else if (hour < 17) {

        greeting = "Good Afternoon";

        GreetingIcon = MdWbTwilight;

    } else {

        greeting = "Good Evening";

        GreetingIcon = MdNightlightRound;

    }

    const today = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    useEffect(() => {

    const handleClickOutside = (event) => {

        if (
            profileRef.current &&
            !profileRef.current.contains(event.target)
        ) {
            setShowProfile(false);
        }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

}, []);

    return (

        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between px-8 py-5">

                {/* Left Section */}

                <div className="flex items-center gap-4">

                    <div className="rounded-full bg-blue-100 p-3">

                        <GreetingIcon
                            size={28}
                            className="text-blue-600"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-slate-800">

                            {greeting}, Admin 👋

                        </h1>

                        <p className="mt-1 text-sm text-slate-500">

                            Welcome to Smart Inventory Management System

                        </p>

                    </div>

                </div>

                {/* Right Section */}

                <div className="flex items-center gap-6">

                    {/* Date */}

                    <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-5 py-3">

                        <MdCalendarToday
                            className="text-blue-600"
                            size={22}
                        />

                        <div>

                            <p className="text-xs text-slate-500">

                                Today

                            </p>

                            <p className="font-semibold text-slate-700">

                                {today}

                            </p>

                        </div>

                    </div>

                    {/* Notifications */}

                   <button

    onClick={() => navigate("/alerts")}

    className="relative rounded-full bg-slate-100 p-3 transition-all duration-300 hover:bg-blue-100"

>

                        <MdNotifications
                            size={24}
                            className="text-slate-700"
                        />

                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">

                            {alertCount}

                        </span>

                    </button>

                    {/* Profile */}

                   {/* Profile */}

<div
    ref={profileRef}
    className="relative"
>
    <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2 transition hover:bg-slate-200"
    >
        <MdAccountCircle
            size={42}
            className="text-slate-700"
        />

        <div className="text-left">
            <p className="font-semibold text-slate-800">
                Admin
            </p>

            <p className="text-xs text-slate-500">
                System Administrator
            </p>
        </div>
    </button>

    {showProfile && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

            <button
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-100"
            >
                <MdPerson
                    size={22}
                    className="text-slate-600"
                />

                <span>My Profile</span>
            </button>

            <button
                className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-slate-100"
            >
                <MdLogout
                    size={22}
                    className="text-red-500"
                />

                <span className="text-red-500">
                    Logout
                </span>
            </button>

        </div>
    )}
</div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;