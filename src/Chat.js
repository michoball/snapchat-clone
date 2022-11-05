import "./Chat.css";
import Avatar from "@material-ui/core/Avatar";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "./features/appSlice";
import { db } from "./firebase.config.js";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Chat({ id, profilePic, username, timestamp, imageUrl, read }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      setDoc(doc(db, "posts", id), { read: true }, { merge: true });
      navigate("/chats/view");
    }
  };

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat_avatar" src={profilePic} />
      <div className="chat_info">
        <h4>{username}</h4>
        <p>
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat_readIcon" />}
    </div>
  );
}

export default Chat;
