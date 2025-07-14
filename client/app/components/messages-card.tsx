import Link from "next/link";

const MessagesCard = () => {
  const content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, id veritatis quaerat quidem provident adipisci labore velit eveniet nesciunt voluptas distinctio officiis alias. Itaque id inventore rerum, consequatur expedita esse.";

  return (
    <Link className="messages-card" href={`messages/${2}`}>
      <div className="name">bruce</div>
      <div className="message">
        {content?.length > 10 ? `${content.slice(0, 10)}...` : content}
      </div>
      <div className="time">8:50PM</div>
    </Link>
  );
};

export default MessagesCard;
