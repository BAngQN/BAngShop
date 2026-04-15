import type { HomePageProduct } from "../../types/Product";
import "./ProductCard.css";

interface ProductCardProps {
    product: HomePageProduct;
    onAddToCart?: (productId: string) => void;
    onViewDetail?: (productId: string) => void;
}

function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
    return (
        <article className="product-card">
            <div
                className="product-card__image"
                onClick={() => onViewDetail?.(product.id)}
            >
                <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="product-card__body">
                <h3
                    className="product-card__name"
                    onClick={() => onViewDetail?.(product.id)}
                >
                    {product.name}
                </h3>
                <p className="product-card__price">
                    {product.price.toLocaleString("vi-VN")} ₫
                </p>
            </div>
            <div className="product-card__footer">
                <button
                    className="product-card__add-btn"
                    onClick={() => onAddToCart?.(product.id)}
                    type="button"
                >
                    Add to Cart
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
