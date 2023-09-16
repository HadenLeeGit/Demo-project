import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogoutButton = () => {

    const {logout, isAuthenticated } = useAuth0();

    return (

        isAuthenticated && (
            <Button onClick={() => logout({ returnTo: "https://app.thermasense.tech/" }) } variant="dark" size="lg">
                Sign Out
            </Button>
        )

        
    )
}

export default LogoutButton