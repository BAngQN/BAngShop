import "./AuthForm.css";
import { useForm } from "react-hook-form";

interface AuthFormProps {
    mode: "login" | "register";
    onSubmit?: (email: string, password: string) => void;
    onToggleMode?: () => void;
}

interface RegisterFields {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

function AuthForm({ mode, onSubmit, onToggleMode }: AuthFormProps) {
    const isLogin = mode === "login";

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<RegisterFields>({
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onValid = (data: RegisterFields) => {
        onSubmit?.(data.email, data.password);
    };

    return (
        <div className="auth-form">
            <h2 className="auth-form__title">
                {isLogin ? "Login" : "Register"}
            </h2>

            <form className="auth-form__form" onSubmit={handleSubmit(onValid)}>
                {!isLogin && (
                    <div className="auth-form__field">
                        <label className="auth-form__label" htmlFor="username">
                            Username
                        </label>
                        <input
                            className={`auth-form__input ${
                                errors.username ? "auth-form__input--error" : ""
                            }`}
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "At least 3 characters",
                                },
                            })}
                        />
                        {errors.username && (
                            <span className="auth-form__error">
                                {errors.username.message}
                            </span>
                        )}
                    </div>
                )}

                <div className="auth-form__field">
                    <label className="auth-form__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`auth-form__input ${
                            errors.email ? "auth-form__input--error" : ""
                        }`}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="auth-form__error">
                            {errors.email.message}
                        </span>
                    )}
                </div>

                <div className="auth-form__field">
                    <label className="auth-form__label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`auth-form__input ${
                            errors.password ? "auth-form__input--error" : ""
                        }`}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "At least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="auth-form__error">
                            {errors.password.message}
                        </span>
                    )}
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
                            className={`auth-form__input ${
                                errors.confirmPassword
                                    ? "auth-form__input--error"
                                    : ""
                            }`}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === getValues("password") ||
                                    "Passwords do not match",
                            })}
                        />
                        {errors.confirmPassword && (
                            <span className="auth-form__error">
                                {errors.confirmPassword.message}
                            </span>
                        )}
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
