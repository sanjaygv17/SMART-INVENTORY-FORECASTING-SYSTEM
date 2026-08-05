import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./layouts/Layout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
import Inventory from "./pages/Inventory";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";
import ProductPrediction from "./pages/ProductPrediction";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />}>

                    <Route index element={<Dashboard />} />

                    <Route path="products" element={<Products />} />

                    <Route path="transactions" element={<Transactions />} />

                    <Route path="inventory" element={<Inventory />} />

                    <Route path="alerts" element={<Alerts />} />

                    <Route path="analytics" element={<Analytics />} />

                    <Route path="product-prediction" element={<ProductPrediction />} />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;