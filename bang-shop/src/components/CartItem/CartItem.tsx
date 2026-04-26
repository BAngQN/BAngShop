import type { CartItemData } from "../../types/Cart";
import "./CartItem.css";

interface CartItemProps {
    item: CartItemData;
    onQuantityChange?: (id: string, quantity: number) => void;
    onRemove?: (id: string) => void;
}

function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
    return (
        <div className="cart-item">
            <div className="cart-item__image">
                <img src={item.imageUrl} alt={item.name} />
            </div>

            <div className="cart-item__info">
                <h4 className="cart-item__name">{item.name}</h4>
                <p className="cart-item__price">
                    {item.price.toLocaleString("vi-VN")} ₫
                </p>
            </div>

            <div className="cart-item__quantity">
                <button
                    className="cart-item__qty-btn"
                    onClick={() =>
                        onQuantityChange?.(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    type="button"
                >
                    −
                </button>
                <span className="cart-item__qty-value">{item.quantity}</span>
                <button
                    className="cart-item__qty-btn"
                    onClick={() =>
                        onQuantityChange?.(item.id, item.quantity + 1)
                    }
                    type="button"
                >
                    +
                </button>
            </div>

            <p className="cart-item__subtotal">
                {(item.price * item.quantity).toLocaleString("vi-VN")} ₫
            </p>

            <button
                className="cart-item__remove-btn"
                onClick={() => onRemove?.(item.id)}
                type="button"
            >
                ✕
            </button>
        </div>
    );
}

export default CartItem;
