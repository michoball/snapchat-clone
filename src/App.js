import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./WebcamCapture";
import Preview from "./Preview";
import Chats from "./Chats";
import ChatView from "./ChatView";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/appSlice";
import { auth } from "./firebase.config.js";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./features/appSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app_logo"
              alt=""
              src="https://images.ctfassets.net/adclj4ijug4e/5LO0pW3N2SNIQTN3DPr9zZ/ef2d3f804ec3719a3ac0d43ab3732546/social-lg.jpeg"
            />

            <div className="app_body">
              <div className="app_bodyBackground">
                <Routes>
                  <Route path="/" element={<WebcamCapture />} />
                  <Route path="/preview" element={<Preview />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/chats/view" element={<ChatView />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
