import "./Login.css";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase.config";
import { login } from "./features/appSlice";

function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://images.ctfassets.net/adclj4ijug4e/5LO0pW3N2SNIQTN3DPr9zZ/ef2d3f804ec3719a3ac0d43ab3732546/social-lg.jpeg"
          alt=""
        />
        <Button variant="outlined" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

export default Login;
