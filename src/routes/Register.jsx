import { SignUp } from "@clerk/clerk-react";

const Register = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <SignUp signInUrl="/login" />
        </div>
    );
};

export default Register;

