import mockProducts from "../data/mockProducts";
import type { ApiResponse, PaginatedResponse } from "../types/ApiResponse";
import type { Product } from "../types/Product";
import type { CartItemData } from "../types/Cart";
import type { User } from "../types/User";
import { v4 as uuidv4 } from "uuid";

const delay = (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const products: Product[] = [...mockProducts];

const userCarts = new Map<string, CartItemData[]>([
    [
        "abcd1234",
        [
            {
                id: "cart-mon001",
                productId: "mon001",
                name: "AOC 16T10/74",
                price: 3300000,
                quantity: 1,
                imageUrl:
                    "https://mmd-aoc2.oss-cn-hongkong.aliyuncs.com/Features/Features/16T10-FHD.jpg",
            },
        ],
    ],
]);

const users: User[] = [
    {
        id: "abcd1234",
        username: "bang",
        password: "12345678",
        email: "vovanluc.3108@gmail.com",
        cart: [],
    },
];

export const productApi = {
    async getProducts(
        page: number = 1,
        category: string = "all",
        limit: number = 10,
    ): Promise<ApiResponse<PaginatedResponse<Product>>> {
        return await delay().then(() => {
            const data: Product[] = products.filter((product) =>
                category === "all" ? true : product.category === category,
            );
            const paginatedData = data.slice((page - 1) * limit, page * limit);
            const totalItems = data.length;
            const totalPages =
                totalItems > 0 ? Math.ceil(totalItems / limit) : 0;
            const hasNextPage = page < totalPages;
            const response: ApiResponse<PaginatedResponse<Product>> = {
                type: "success",
                data: {
                    items: paginatedData,
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: page,
                    hasNextPage: hasNextPage,
                },
            };
            return response;
        });
    },

    async getProductById(id: string): Promise<ApiResponse<Product>> {
        return await delay().then(() => {
            const product = products.find((data) => data.id === id);
            if (product) {
                return {
                    type: "success",
                    data: product,
                };
            } else {
                return {
                    type: "error",
                    statusCode: 404,
                    message: "Product not found",
                };
            }
        });
    },

    async searchProducts(
        query: string,
        page: number = 1,
        limit: number = 10,
    ): Promise<ApiResponse<PaginatedResponse<Product>>> {
        return await delay().then(() => {
            const normalizedQuery = query.trim().toLowerCase();
            const filteredProducts = products.filter((product) => {
                const matchesQuery = product.name
                    .toLowerCase()
                    .includes(normalizedQuery);
                return matchesQuery;
            });
            const paginatedProducts = filteredProducts.slice(
                (page - 1) * limit,
                page * limit,
            );
            const totalItems = filteredProducts.length;
            const totalPages =
                totalItems > 0 ? Math.ceil(totalItems / limit) : 0;
            const hasNextPage = page < totalPages;
            const response: ApiResponse<PaginatedResponse<Product>> = {
                type: "success",
                data: {
                    items: paginatedProducts,
                    totalItems: totalItems,
                    totalPages: totalPages,
                    currentPage: page,
                    hasNextPage: hasNextPage,
                },
            };
            return response;
        });
    },
};

export const authenticationApi = {
    async login(email: string, password: string): Promise<ApiResponse<User>> {
        return await delay().then(() => {
            const currentUser = users.find(
                (user) => user.email === email && user.password === password,
            );
            console.log("Login attempt:", {
                email,
                password,
                success: !!currentUser,
            });
            if (currentUser) {
                return {
                    type: "success",
                    data: {
                        ...currentUser,
                        cart: userCarts.get(currentUser.id) ?? [],
                    },
                };
            } else {
                return {
                    type: "error",
                    statusCode: 401,
                    message: "Invalid email or password",
                };
            }
        });
    },

    async register(
        username: string,
        email: string,
        password: string,
    ): Promise<ApiResponse<User>> {
        return await delay().then(() => {
            if (users.some((user) => user.email === email)) {
                return {
                    type: "error",
                    statusCode: 409,
                    message: "Email already in use",
                };
            }
            const newUser: User = {
                id: uuidv4(),
                username,
                email,
                password,
                cart: [],
            };
            users.push(newUser);
            return {
                type: "success",
                data: { ...newUser, cart: [] },
            };
        });
    },
};

export const cartApi = {
    async addCartItem(
        userId: string,
        item: Omit<CartItemData, "id">,
    ): Promise<ApiResponse<CartItemData[]>> {
        return await delay().then(() => {
            const cart = (userCarts.get(userId) ?? []).map((c) => ({ ...c }));
            const existing = cart.find((c) => c.productId === item.productId);
            if (existing) {
                existing.quantity += item.quantity;
            } else {
                cart.push({
                    ...item,
                    id: `cart-${item.productId}-${Date.now()}`,
                });
            }
            userCarts.set(userId, cart);
            return { type: "success", data: [...cart] };
        });
    },

    async removeCartItem(
        userId: string,
        cartItemId: string,
    ): Promise<ApiResponse<CartItemData[]>> {
        return await delay().then(() => {
            const cart = (userCarts.get(userId) ?? []).filter(
                (c) => c.id !== cartItemId,
            );
            userCarts.set(userId, cart);
            return { type: "success", data: [...cart] };
        });
    },

    async updateCartItemQuantity(
        userId: string,
        cartItemId: string,
        quantity: number,
    ): Promise<ApiResponse<CartItemData[]>> {
        return await delay().then(() => {
            const cart = (userCarts.get(userId) ?? []).map((c) => ({ ...c }));
            const item = cart.find((c) => c.id === cartItemId);
            if (!item) {
                return {
                    type: "error" as const,
                    statusCode: 404,
                    message: "Cart item not found",
                };
            }
            item.quantity = Math.max(1, quantity);
            userCarts.set(userId, cart);
            return { type: "success", data: [...cart] };
        });
    },
};
