import { auth, provider } from "../firebase-config"
import { signInWithPopup } from "firebase/auth"
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const Auth = (props) => {
    const { setAuth } = props;

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        try {
            cookies.set("auth-token", result.user.refreshToken)
            setAuth(true);
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle}> Sign in with Google</button>
        </div>
    );
}
