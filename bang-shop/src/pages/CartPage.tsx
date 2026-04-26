import { Link } from "react-router-dom";
import CartItem from "../components/CartItem/CartItem";
import type { CartItemData } from "../types/Cart";
import "./CartPage.css";

interface CartPageProps {
    items?: CartItemData[];
    onQuantityChange?: (id: string, quantity: number) => void;
    onRemove?: (id: string) => void;
    onCheckout?: () => void;
}

function CartPage({
    items = [],
    onQuantityChange,
    onRemove,
    onCheckout,
}: CartPageProps) {
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <div className="cart-page">
            <div className="cart-page__container">
                <h1 className="cart-page__title">Shopping Cart</h1>

                {items.length === 0 ? (
                    <div className="cart-page__empty">
                        <p className="cart-page__empty-text">
                            Your cart is empty.
                        </p>
                        <Link to="/" className="cart-page__continue-btn">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="cart-page__layout">
                        <div className="cart-page__items">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQuantityChange={onQuantityChange}
                                    onRemove={onRemove}
                                />
                            ))}
                        </div>

                        <aside className="cart-page__summary">
                            <h2 className="cart-page__summary-title">
                                Order Summary
                            </h2>
                            <div className="cart-page__summary-row">
                                <span>Items ({items.length})</span>
                                <span>{total.toLocaleString("vi-VN")} ₫</span>
                            </div>
                            <div className="cart-page__summary-row cart-page__summary-row--total">
                                <span>Total</span>
                                <span>{total.toLocaleString("vi-VN")} ₫</span>
                            </div>
                            <button
                                className="cart-page__checkout-btn"
                                onClick={onCheckout}
                                type="button"
                            >
                                Checkout
                            </button>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartPage;
