import {
    cartCountSelector,
    cartSelector,
    userSelector,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "../store/store";
import { cartApi, productApi } from "../services/mockApi";
import authSlice from "../components/AuthForm/authSlice";
import { useNavigate } from "react-router-dom";

export function useCart() {
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const cart = useAppSelector(cartSelector);
    const user = useAppSelector(userSelector);
    const cartCount = useAppSelector(cartCountSelector);

    const addToCart = async (productId: string) => {
        try {
            const productResponse = await productApi.getProductById(productId);
            if (productResponse.type !== "success") {
                throw new Error("Product not found");
            }
            const product = productResponse.data;
            const response = await cartApi.addCartItem(user.id, {
                productId: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: 1,
            });
            if (response.type === "success") {
                dispatch(authSlice.actions.setCart(response.data));
            } else {
                throw new Error(response.message);
            }
        } catch (err) {
            console.error("Failed to add item to cart:", err);
        }
    };

    const onCartClick = (isLoggedIn: boolean) => {
        console.log("Cart clicked. User logged in:", isLoggedIn);
        if (!isLoggedIn) {
            navigator("/login");
        } else {
            navigator("/cart");
        }
    };

    return { cart, cartCount, addToCart, onCartClick };
}
