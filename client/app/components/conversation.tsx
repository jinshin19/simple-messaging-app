"use client";
import Link from "next/link";
import MessageLeftSide from "./message-left-side";
import MessageRightSide from "./message-right-side";
import { socket } from "../socket/socket";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  createConversation,
  getConversation,
} from "../utils/apis/conversationsApi";
import { ConversationsI } from "../utils/types/conversations/conversations";
import { ChevronLeft, SendHorizontal } from "lucide-react";

const ConversationComponent = () => {
  const params = useParams();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [conversations, setConversations] = useState<ConversationsI[]>([]);
  const [values, setvalues] = useState("");
  const [sender_id, setSenderId] = useState<string | null>(null);
  const user_id = params?.user_id ?? null;
  const receiverInfo = conversations?.filter((c) => c.receiver_id === user_id);

  const sendMessage = async () => {
    try {
      const response = await createConversation(user_id as string, values);
      const data = await response.json();
      if (data?.ok) {
        setvalues("");
        const sender_info = {
          sender_id,
          receiver_id: user_id,
          message: values,
        };
        socket.emit("message_sent", sender_info);
      }
    } catch (error) {
      console.log("Error Found:", {
        file_path: "message.tsx",
        method: "sendMessage",
        error,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConversation(user_id as string);
        const data = await response.json();
        if (data?.ok) {
          socket.emit("register", user_id);
          setConversations(data?.data);
        }
      } catch (error) {
        console.log("Error Found:", {
          file_path: "message.tsx",
          method: "fetchData -> useEffect",
          error,
        });
        console.error(error);
      }
    };

    if (user_id) {
      fetchData();

      const handleMessage = (data: boolean) => {
        if (data === true) {
          fetchData();
        }
      };

      socket.on("refresh", handleMessage);
      socket.on("new_message", handleMessage);
      socket.on("message_received", handleMessage);

      const sender_id = localStorage.getItem("SMA-user_id");
      setSenderId(sender_id);
    }

    return () => {
      socket.off("new_message");
      socket.off("message_received");
      socket.off("refresh");
    };
  }, []);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <div className="message-wrapper">
      <div className="header-wrapper">
        <div className="back-button-container">
          <Link href="/dashboard">
            <ChevronLeft size={25} />
            BACK
          </Link>
        </div>
        <div className="user-info">
          <div className="name">{receiverInfo[0]?.receiver_name}</div>
          <div className="status-container">
            <p>Online</p>
            <div className="status bg-green-500"></div>
          </div>
        </div>
      </div>
      <div className="content">
        {conversations?.length <= 0 && (
          <div className="no-conversation">
            You haven’t messaged Bruce yet. Say hi to start the conversation!
          </div>
        )}
        {conversations?.length > 0 &&
          conversations.map((m: ConversationsI) => {
            return m?.sender_id == sender_id ? (
              <MessageRightSide
                key={m.message_id}
                content={m?.message}
                time={m?.sent_time}
              />
            ) : (
              <MessageLeftSide
                key={m.message_id}
                content={m?.message}
                time={m?.sent_time}
              />
            );
          })}
        <div ref={messageRef}></div>
      </div>
      <div className="action-wrapper">
        <div className="text">
          <textarea
            name=""
            id=""
            onChange={(e) => setvalues(e.target.value)}
            value={values}
          ></textarea>
        </div>
        <div className="send">
          <button type="button" onClick={sendMessage}>
            <SendHorizontal size={23} />
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationComponent;
