import "./AuthForm.css";

interface AuthFormProps {
    mode: "login" | "register";
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onToggleMode?: () => void;
}

function AuthForm({ mode, onSubmit, onToggleMode }: AuthFormProps) {
    const isLogin = mode === "login";

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">
                {isLogin ? "Login" : "Register"}
            </h2>

            <form className="auth-form__form" onSubmit={onSubmit}>
                {!isLogin && (
                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            className="auth-form__input"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                        />
                    </div>
                )}

                <div className="auth-form__field">
                    <label className="auth-form__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="auth-form__input"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="auth-form__field">
                    <label className="auth-form__label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="auth-form__input"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </div>

                {!isLogin && (
                    <div className="auth-form__field">
                        <label
                            className="auth-form__label"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="auth-form__input"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>
                )}

                <button className="auth-form__submit" type="submit">
                    {isLogin ? "Login" : "Register"}
                </button>
            </form>

            <p className="auth-form__toggle">
                {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <button
                    className="auth-form__toggle-btn"
                    onClick={onToggleMode}
                    type="button"
                >
                    {isLogin ? "Register" : "Login"}
                </button>
            </p>
        </div>
    );
}

export default AuthForm;
