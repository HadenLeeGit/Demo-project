
import './App.scss';
import userLogo from "./images/TSLogo.png";
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import Profile from './components/profile';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Lock } from 'auth0-lock'
import GoToDashboardButton from './components/goToDashboardButton';

function App() {
  const { isLoading, error } = useAuth0();

  var options = {
    allowSignUp: false
  }

  var lock = new Auth0Lock("aw5R1QyzXEYLhzVm0wcvHMXnu3Ke5NuN", "dev-h2fijpc23mzv6ab7.us.auth0.com", options)

  return (
    <main className="column">
      <div className="container">
        <img className="landinglogo" style={{}} src={userLogo} alt="Logo" />
        {/* <p className='text'>Dashboard</p> */}
        {error && <p>Authentication Error</p>}
        {!error && isLoading && <p>Loading...</p>}
        {!error && !isLoading && (
          <>
            <LoginButton />
            <Profile />
            <div className='button'>
              <GoToDashboardButton />
            </div>
            <div className='button'>
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </main>
  );
}


export default App;
