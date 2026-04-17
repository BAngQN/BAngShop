export interface Product {
    id: string;
    category: Category;
    name: string;
    brand: string;
    description: string;
    stock: number;
    specifications: Record<string, string>;
    price: number;
    imageUrl: string;
    createdAt?: string;
    updatedAt?: string;
}

export type Category =
    | (typeof CategoryValue)[keyof typeof CategoryValue]
    | "all";

export type HomePageProduct = Pick<
    Product,
    "id" | "name" | "price" | "imageUrl"
>;

export type ProductDetailPage = Pick<
    Product,
    | "id"
    | "name"
    | "price"
    | "brand"
    | "category"
    | "stock"
    | "imageUrl"
    | "description"
    | "specifications"
>;

export const CategoryValue = {
    keyboard: "keyboard",
    mouse: "mouse",
    monitor: "monitor",
    headset: "headset",
    webcam: "webcam",
    speaker: "speaker",
} as const;
