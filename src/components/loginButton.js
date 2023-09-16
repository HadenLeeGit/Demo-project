import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            // <button onClick={() => loginWithRedirect()}>
            //     Sign In
            // </button>

            <Button onClick={() => loginWithRedirect()} variant="dark" size="lg">Sign In</Button>

        )
    )
}

export default LoginButton