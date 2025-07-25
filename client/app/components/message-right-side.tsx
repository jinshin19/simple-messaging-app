import { timeFormatter } from "../utils/helpers/timeFormatter";

const MessageRightSide = ({ content, time }: MessageRightSideI) => {
  const timeFormat = timeFormatter(time);
  return (
    <div className="message-right-side-card my-1">
      {/* <div className="time">{timeFormat.timeFormat}</div> */}
      <div className="message">{content}</div>
    </div>
  );
};

export default MessageRightSide;
