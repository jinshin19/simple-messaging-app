import Link from "next/link";

const MessageLeftSide = () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, id veritatis quaerat quidem provident adipisci labore velit eveniet nesciunt voluptas distinctio officiis alias. Itaque id inventore rerum, consequatur expedita esse.";

  return (
    <div className="message-left-side-card">
      {/* <div className="name">bruce</div> */}
      <div className="message">{content}</div>
      <div className="time">8:50PM</div>
    </div>
  );
};

export default MessageLeftSide;
