import AuthForm from "../components/AuthForm/AuthForm";

interface LoginProps {
    onToggleMode?: () => void;
    onSubmit?: (email: string, password: string) => void;
}

function Login({ onToggleMode, onSubmit }: LoginProps) {
    return (
        <AuthForm
            mode="login"
            onSubmit={onSubmit}
            onToggleMode={onToggleMode}
        />
    );
}

export default Login;
