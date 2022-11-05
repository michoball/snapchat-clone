import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "./features/cameraSlice";
import "./Preview.css";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CreateIcon from "@mui/icons-material/Create";
import NoteIcon from "@mui/icons-material/Note";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CropIcon from "@mui/icons-material/Crop";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";

import { db, storage } from "./firebase.config.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { selectUser } from "./features/appSlice";

function Preview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cameraImage = useSelector(selectCameraImage);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true });
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };

  const sendPost = () => {
    const id = uuid();
    const storageRef = ref(storage, `post/${id}`);
    const uploadTask = uploadString(storageRef, cameraImage, "data_url");

    uploadTask
      .then(() => {
        // COMPLETE function
        getDownloadURL(storageRef).then((url) => {
          addDoc(collection(db, "posts"), {
            imageUrl: url,
            username: "Kang",
            read: false,
            profilePic: user.profilePic,
            timestamp: serverTimestamp(),
          });
          navigate("/chats");
        });
      })
      .catch((error) => {
        //ERROR function
        console.log(error);
      });
    // uploadTask.on(
    //   "state_changed",
    //   null,
    //   (error) => {
    //     //ERROR function
    //     console.log(error);
    //   },
    //   () => {
    //     //COMPLETE function
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       addDoc(collection(db, "posts"), {
    //         imageUrl: url,
    //         username: "Kang",
    //         read: false,
    //         //profilePic,
    //         timestamp: serverTimestamp(),
    //       });
    //       navigate("/chats");
    //     });
    //   }
    // );
  };

  return (
    <div className="preview">
      <CloseIcon className="preview_close" onClick={closePreview} />
      <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview_footer">
        <h2>Send Now</h2>
        <SendIcon className="preview_sendIcon" />
      </div>
    </div>
  );
}

export default Preview;
