import mockProducts from "../data/mockProducts";
import type { ApiResponse, PaginatedResponse } from "../types/ApiResponse";
import type { Product } from "../types/Product";

const delay = (ms: number = 500) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const products: Product[] = [...mockProducts];

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
