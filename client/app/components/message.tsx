import Link from "next/link";
import MessageLeftSide from "./message-left-side";
import MessageRightSide from "./message-right-side";

const MessageComponent = () => {
  return (
    <div className="message-wrapper">
      <div className="receiver-detail">
        <div className="back-button-container">
          <Link href="/dashboard">Back</Link>
        </div>
        <div className="name">Bruce</div>
        <div className="status"></div>
      </div>
      <div className="content">
        <MessageRightSide />
        <MessageLeftSide />
      </div>
      <div className="action-wrapper">
        <div className="text">
          <textarea name="" id=""></textarea>
        </div>
        <div className="send">
          <button type="button" className="">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
