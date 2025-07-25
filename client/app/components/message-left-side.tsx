import { timeFormatter } from "../utils/helpers/timeFormatter";

const MessageLeftSide = ({ content, time }: MessageLeftSideI) => {
  const timeFormat = timeFormatter(time);
  return (
    <div className="message-left-side-card my-1">
      <div className="time">{timeFormat.timeFormat}</div>
      <div className="message">{content}</div>
    </div>
  );
};

export default MessageLeftSide;
