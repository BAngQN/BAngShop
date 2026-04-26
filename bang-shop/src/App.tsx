import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/store";
import productFilterSlices from "./components/ProductList/productFilterSlices";
import authSlice from "./components/AuthForm/authSlice";
import { authenticationApi, cartApi } from "./services/mockApi";
import { useUserAuthentication } from "./hook/userAuthentication";
import { useCart } from "./hook/userCart";

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
    const useAuthentication = useUserAuthentication();
    const userCart = useCart();
    const isLoggedIn = useAuthentication.isLoggedIn;
    const user = useAuthentication.user;
    const cart = userCart.cart;
    const cartCount = userCart.cartCount;

    const handleSearchSubmit = (query: string) => {
        navigator("/");
        dispatch(productFilterSlices.actions.setSearchQuery(query));
    };

    const handleClickLogin = () => {
        navigator("/login");
    };

    const handleSubmitLogin = async (email: string, password: string) => {
        useAuthentication.handleLogin(email, password);
    };

    const handleSubmitRegister = async (
        userName: string,
        email: string,
        password: string,
    ) => {
        const response = await authenticationApi.register(
            userName,
            email,
            password,
        );
        if (response.type === "success") {
            alert("Registration successful! Please log in.");
            navigator("/login");
        } else {
            alert(response.message);
        }
    };

    const handleLogout = () => {
        useAuthentication.handleLogout();
    };

    const handleAddToCart = async (productId: string) => {
        if (!isLoggedIn || !user) {
            navigator("/login");
            return;
        }
        userCart.addToCart(productId);
    };

    const handleCartClick = () => {
        userCart.onCartClick(isLoggedIn);
    };

    const handleQuantityChange = async (
        cartItemId: string,
        quantity: number,
    ) => {
        if (!user) return;
        const response = await cartApi.updateCartItemQuantity(
            user.id,
            cartItemId,
            quantity,
        );
        if (response.type === "success") {
            dispatch(authSlice.actions.setCart(response.data));
        }
    };

    const handleRemoveCartItem = async (cartItemId: string) => {
        if (!user) return;
        const response = await cartApi.removeCartItem(user.id, cartItemId);
        if (response.type === "success") {
            dispatch(authSlice.actions.setCart(response.data));
        }
    };

    return (
        <>
            <Header
                isLoggedIn={isLoggedIn}
                username={user?.username}
                cartItemCount={cartCount}
                onSearchSubmit={handleSearchSubmit}
                onLoginClick={handleClickLogin}
                onCartClick={handleCartClick}
                onLogoutClick={handleLogout}
            />
            <Routes>
                <Route
                    path="/"
                    element={<HomePage onAddToCart={handleAddToCart} />}
                />
                <Route
                    path="/product/:id"
                    element={<ProductDetail onAddToCart={handleAddToCart} />}
                />
                <Route
                    path="/cart"
                    element={
                        <CartPage
                            items={cart}
                            onQuantityChange={handleQuantityChange}
                            onRemove={handleRemoveCartItem}
                            onCheckout={() => alert("Checkout coming soon!")}
                        />
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Login
                            onSubmit={handleSubmitLogin}
                            onToggleMode={() => navigator("/register")}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Register
                            onSubmit={handleSubmitRegister}
                            onToggleMode={() => navigator("/login")}
                        />
                    }
                />
            </Routes>
        </>
    );
}

export default App;
