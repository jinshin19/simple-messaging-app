import Image from "next/image";
import { timeFormatter } from "../utils/helpers/timeFormatter";
import placeHolderImage from "@/public/placeholder-image.png";

const MessageLeftSide = ({ content, time, picture }: MessageLeftSideI) => {
  const timeFormat = timeFormatter(time);
  return (
    <div className="message-left-side-card my-1">
      <div className="time">{timeFormat.timeFormat}</div>
      <div className="message-container">
        <div className="image">
          <Image src={picture || placeHolderImage} alt="avatar" fill />
        </div>
        <div className="message">{content}</div>
      </div>
    </div>
  );
};

export default MessageLeftSide;
