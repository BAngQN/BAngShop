import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

interface HeaderProps {
    cartItemCount?: number;
    isLoggedIn?: boolean;
    username?: string;
    onCartClick?: () => void;
    onLoginClick?: () => void;
    onLogoutClick?: () => void;
    onSearchSubmit?: (query: string) => void;
}

function Header({
    cartItemCount = 0,
    isLoggedIn = false,
    username = "",
    onCartClick,
    onLoginClick,
    onLogoutClick,
    onSearchSubmit,
}: HeaderProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    return (
        <header className="header">
            <div className="header__container">
                <Link className="header__logo" to="/" replace>
                    Bang Shop
                </Link>

                <form
                    className="header__search"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSearchSubmit?.(searchQuery);
                        setSearchQuery("");
                    }}
                >
                    <input
                        className="header__search-input"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                    />
                    <button className="header__search-btn" type="submit">
                        Search
                    </button>
                </form>

                <nav className="header__nav">
                    <button
                        className="header__cart"
                        onClick={onCartClick}
                        type="button"
                    >
                        🛒 Cart
                        {cartItemCount > 0 && (
                            <span className="header__cart-badge">
                                {cartItemCount}
                            </span>
                        )}
                    </button>

                    {isLoggedIn ? (
                        <div className="header__user">
                            <span className="header__username">{username}</span>
                            <button
                                className="header__auth-btn"
                                onClick={onLogoutClick}
                                type="button"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            className="header__auth-btn"
                            onClick={onLoginClick}
                            type="button"
                        >
                            Login
                        </button>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
