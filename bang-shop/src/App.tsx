import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import productFilterSlices from "./components/ProductList/productFilterSlices";

function App() {
    return (
        <BrowserRouter>
            <AppComponentWrapper />
        </BrowserRouter>
    );
}

function AppComponentWrapper() {
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const handleSearchSubmit = (query: string) => {
        navigator("/");
        dispatch(productFilterSlices.actions.setSearchQuery(query));
    };
    const handleClickLogin = () => {
        navigator("/login");
    };
    return (
        <>
            <Header
                onSearchSubmit={handleSearchSubmit}
                onLoginClick={handleClickLogin}
            />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}

export default App;
