import { CategoryValue, type Category } from "../types/Product";

const validCategories = new Set<string>([
    ...Object.values(CategoryValue),
    "all",
]);

export function isValidCategory(value: string): value is Category {
    return validCategories.has(value);
}
