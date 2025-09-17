import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { Link } from "react-router";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path='checkout' element={<CheckoutPage />} />
            <Route path='orders' element={<OrdersPage />} />
            <Route path='tracking' element={<TrackingPage />} />
            <Route
                path='*'
                element={
                    <div>
                        ERROR 404 <Link to='/'>Back to Homepage</Link>
                    </div>
                }
            />
        </Routes>
    );
}

export default App;
