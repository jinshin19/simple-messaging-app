"use client";
import Link from "next/link";
import MessageLeftSide from "./message-left-side";
import MessageRightSide from "./message-right-side";
import { socket } from "../socket/socket";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  createConversation,
  getConversation,
} from "../utils/apis/conversationsApi";
import { ConversationsI } from "../utils/types/conversations/conversations";
import { ChevronLeft, SendHorizontal } from "lucide-react";
import { getUser } from "../utils/apis/usersApi";
import { AuthProviderContext } from "../AuthProvider";

const ConversationComponent = () => {
  const { userData } = useContext(AuthProviderContext);
  const params = useParams();
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<any>();
  const [conversations, setConversations] = useState<ConversationsI[]>([]);
  const [values, setvalues] = useState("");
  const receiver_id = params?.user_id ?? null;

  const sendMessage = async () => {
    try {
      const response = await createConversation(receiver_id as string, values);
      const data = await response.json();
      console.log("Data", userData);
      if (data?.ok) {
        setvalues("");
        const sender_info = {
          sender_id: userData?.user_id,
          receiver_id: receiver_id,
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
    if (!receiver_id) return;
    const fetchData = async () => {
      try {
        const [receiverInfoResponse, conversationsResponse] = await Promise.all(
          [
            getUser(receiver_id as string),
            getConversation(receiver_id as string),
          ]
        );

        const receiverResponseResult = await receiverInfoResponse.json();

        if (receiverResponseResult.ok && receiverResponseResult.data !== null) {
          setUser(receiverResponseResult.data);
        }

        const conversationResponseResult = await conversationsResponse.json();
        if (
          conversationResponseResult?.ok &&
          conversationResponseResult.data?.length > 0
        ) {
          setConversations(conversationResponseResult.data);
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

    fetchData();

    const handleMessage = (data: boolean) => {
      if (data === true) {
        fetchData();
      }
    };

    socket.on("refresh", handleMessage);
    socket.on("new_message", handleMessage);
    socket.on("message_received", handleMessage);

    return () => {
      socket.off("refresh");
      socket.off("message_received");
      socket.off("new_message");
    };
  }, [receiver_id]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <div className="message-wrapper">
      <div className="header-wrapper">
        <div className="back-button-container">
          <Link href="/">
            <ChevronLeft size={25} />
            BACK
          </Link>
        </div>
        <div className="user-info">
          <div className="name">
            {user?.given_name} {user?.family_name}
          </div>
          <div className="name">{""}</div>
          <div className="status-container">
            <p>{user?.isOnline === 1 ? "Online" : "Offline"}</p>
            <div className="status bg-green-500"></div>
          </div>
        </div>
      </div>
      <div className="content">
        {conversations?.length <= 0 && (
          <div className="no-conversation">
            {`You haven’t messaged ${user?.given_name} ${user?.family_name} yet. Say hi to start the conversation!`}
          </div>
        )}
        {conversations?.length > 0 &&
          conversations.map((m: ConversationsI) => {
            return m?.sender_id == userData?.user_id ? (
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
