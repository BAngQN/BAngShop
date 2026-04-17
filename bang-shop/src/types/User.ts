import type { CartItemData } from "./Cart";

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    cart: CartItemData[];
}
