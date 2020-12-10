import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupButton = () => {
    const {loginWidthRedirect } = useAuth0();
    return (
        <button onClick={() => loginWidthRedirect({
            screen_hint: "signup",
        })}>
            Sign Up
        </button>
    )
}

export default SignupButton;