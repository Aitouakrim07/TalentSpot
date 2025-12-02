import { SignIn } from "@clerk/clerk-react";

const Login = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <SignIn signUpUrl="/register" redirectUrl="/admin" />
        </div>
    );
};

export default Login;
