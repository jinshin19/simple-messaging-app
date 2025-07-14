import MessageLeftSide from "./message-left-side";
import MessageRightSide from "./message-right-side";

const Message = () => {
  return (
    <div className="message-wrapper">
      <div className="receiver-detail">
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

export default Message;
