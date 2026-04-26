import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useEffect } from "react";
import { productApi } from "../services/mockApi";
import React from "react";
import type { ProductDetailPage } from "../types/Product";

interface ProductDetailProps {
    onAddToCart?: (productId: string) => void;
}

function ProductDetail({ onAddToCart }: ProductDetailProps) {
    const navigator = useNavigate();
    const id = useParams().id;
    const [product, setProduct] = React.useState(
        null as ProductDetailPage | null,
    );
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null as string | null);
    useEffect(() => {
        let isRunning = true;
        const fetchProduct = async () => {
            setIsLoading(true);
            setError(null);
            const response = await productApi.getProductById(id || "");
            if (isRunning) {
                if (response.type === "success") {
                    setProduct(response.data);
                } else {
                    setError(response.message);
                    console.error("Error fetching product:", response.message);
                }
                setIsLoading(false);
            }
        };
        fetchProduct();
        return () => {
            isRunning = false;
        };
    }, [id]);
    // Loading state
    if (isLoading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <div className="product-detail__container">
                {product ? (
                    <>
                        <button
                            className="product-detail__back"
                            onClick={() => {
                                navigator("/");
                            }}
                            type="button"
                        >
                            ← Back to products
                        </button>
                        <div className="product-detail__layout">
                            <div className="product-detail__image">
                                <div className="product-detail__image-placeholder">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.description}
                                    />
                                </div>
                            </div>

                            <div className="product-detail__info">
                                <span className="product-detail__category">
                                    {product.category}
                                </span>
                                <h1 className="product-detail__name">
                                    {product.name}
                                </h1>
                                <p className="product-detail__brand">
                                    {product.brand}
                                </p>
                                <p className="product-detail__price">
                                    {product.price.toLocaleString("vi-VN")} ₫
                                </p>

                                <div className="product-detail__stock">
                                    <span className="product-detail__stock-badge product-detail__stock-badge--in-stock">
                                        In Stock
                                    </span>
                                    <span className="product-detail__stock-count">
                                        {product.stock} available
                                    </span>
                                </div>

                                <p className="product-detail__description">
                                    {product.description}
                                </p>

                                <button
                                    className={`product-detail__add-btn ${product.stock === 0 ? "product-card__add-btn--disabled" : ""}`}
                                    disabled={product.stock === 0}
                                    onClick={() => onAddToCart?.(id || "")}
                                    type="button"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>

                        <div className="product-detail__specs">
                            <h2 className="product-detail__specs-title">
                                Specifications
                            </h2>
                            <table className="product-detail__specs-table">
                                <tbody>
                                    {Object.entries(product.specifications).map(
                                        ([key, value]) => {
                                            return (
                                                <tr
                                                    key={key}
                                                    className="product-detail__specs-row"
                                                >
                                                    <td className="product-detail__specs-key">
                                                        {key}
                                                    </td>
                                                    <td className="product-detail__specs-value">
                                                        {value}
                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <div className="product-detail__error-container">
                        <span className="product-detail__error-icon">⚠️</span>
                        <h2 className="product-detail__error-title">
                            Product Not Found
                        </h2>
                        <p className="product-detail__error-message">
                            {error ??
                                "The product you are looking for does not exist."}
                        </p>
                        <button
                            className="product-detail__error-back-btn"
                            type="button"
                            onClick={() => navigator("/")}
                        >
                            ← Back to products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
