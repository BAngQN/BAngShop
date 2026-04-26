import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { authenticatorSelector, userSelector } from "../store/selectors";
import authSlice from "../components/AuthForm/authSlice";
import { authenticationApi } from "../services/mockApi";

export function useUserAuthentication() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useAppSelector(authenticatorSelector);
    const user = useAppSelector(userSelector);

    const handleLogin = async (email: string, password: string) => {
        const response = await authenticationApi.login(email, password);
        if (response.type === "success") {
            dispatch(
                authSlice.actions.login({
                    user: {
                        id: response.data.id,
                        username: response.data.username,
                    },
                    cart: response.data.cart,
                }),
            );
            navigate("/");
        } else {
            throw new Error(response.message);
        }
    };

    const handleLogout = () => {
        dispatch(authSlice.actions.logout());
        navigate("/");
    };

    return {
        isLoggedIn,
        user,
        handleLogin,
        handleLogout,
    };
}
