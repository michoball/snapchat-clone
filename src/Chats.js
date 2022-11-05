import "./Chats.css";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase.config.js";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { collection, orderBy, onSnapshot, query } from "firebase/firestore";
import Chat from "./Chat";
import { selectUser } from "./features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "./features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    onSnapshot(q, (snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  return (
    <div className="chats">
      <div className="chats_header">
        <Avatar
          src={user.profilePic}
          onClick={() => {
            signOut(auth);
          }}
          className="chats_avatar"
        />
        <div className="chats_search">
          <SearchIcon className="chats_searchIcon" />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats_chatIcon" />
      </div>
      <div className="chats_posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>

      <RadioButtonUncheckedIcon
        className="chats_takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      ></RadioButtonUncheckedIcon>
    </div>
  );
}

export default Chats;
