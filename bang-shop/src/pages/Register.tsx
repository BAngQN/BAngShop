import AuthForm from "../components/AuthForm/AuthForm";

interface RegisterProps {
    onToggleMode?: () => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

function Register({ onToggleMode, onSubmit }: RegisterProps) {
    return (
        <AuthForm
            mode="register"
            onSubmit={onSubmit}
            onToggleMode={onToggleMode}
        />
    );
}

export default Register;
