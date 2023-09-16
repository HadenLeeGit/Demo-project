import { useAuth0 } from '@auth0/auth0-react';
import "../App.scss"

const Profile = () => {

    const { user, isAuthenticated } = useAuth0();

    var adminEmail = "software@thermasensecorp.com"

    const checkAdmin = () => {
        if (user.email == "software@thermasensecorp.com") {
            return <h2>Welcome, Admin!</h2>
        }
        else {
            return <h2>Welcome, user!</h2>
        }
    }

    return (

        isAuthenticated && (
            <article className="">
                {/* {user?.picture && <img src={user.picture} alt={user?.name} />} */}
                
                {/* <ul>
                    {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]} </li>)}
                </ul> */}


         

            </article>
        )



    )
}

export default Profile