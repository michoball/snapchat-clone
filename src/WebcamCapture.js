import "./WebcamCapture.css";
import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  console.log("webcam");
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
  }, [webcamRef]);

  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        width={videoConstraints.width}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />

      <RadioButtonUncheckedIcon
        className="webcamCapture_button"
        onClick={capture}
        fontSize="large"
      ></RadioButtonUncheckedIcon>
    </div>
  );
}

export default WebcamCapture;
