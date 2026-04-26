import type { HomePageProduct } from "../../types/Product";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

interface ProductListProps {
    products: HomePageProduct[];
    onAddToCart?: (productId: string) => void;
    onViewDetail?: (productId: string) => void;
}

function ProductList({
    products,
    onAddToCart,
    onViewDetail,
}: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="product-list product-list--empty">
                <p className="product-list__empty-text">No products found.</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                    onViewDetail={onViewDetail}
                />
            ))}
        </div>
    );
}

export default ProductList;
