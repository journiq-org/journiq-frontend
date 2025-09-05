"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  fetchMessages,
  markAsRead,
  replyToMessage,
} from "@/redux/slices/messageSlice";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector(
    (state) => state.messages
  );
  const [activeTraveller, setActiveTraveller] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch all messages
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // Auto-scroll when messages or active chat changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTraveller]);

  // Auto-select most recent chat when messages load
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = [...messages].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      setActiveTraveller(lastMsg.traveller._id);
    }
  }, [messages]);

  const handleReply = async (msgId: string) => {
    if (!replyText.trim()) return;
    const result = await dispatch(
      replyToMessage({ id: msgId, reply: replyText })
    );
    if (replyToMessage.fulfilled.match(result)) {
      toast.success("Reply sent ✅");
      setReplyText("");
    } else {
      toast.error("Failed to send reply ❌");
    }
  };

  // Group messages by traveller
  const grouped = messages.reduce((acc: any, msg) => {
    const tId = msg.traveller._id;
    if (!acc[tId]) acc[tId] = [];
    acc[tId].push(msg);
    return acc;
  }, {});

  // Sort inside each traveller group
  Object.keys(grouped).forEach((travellerId) => {
    grouped[travellerId].sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });

  // Mark all unread as read when a chat is opened
  useEffect(() => {
    if (activeTraveller && grouped[activeTraveller]) {
      grouped[activeTraveller]
        .filter((m: any) => m.status === "unread")
        .forEach((m: any) => {
          dispatch(markAsRead(m._id));
        });
    }
  }, [activeTraveller]);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-3">
      {/* Sidebar - Travellers */}
      <div className="bg-white border-r overflow-y-auto md:col-span-1">
        <h2 className="text-xl font-bold p-4 border-b">Travellers</h2>
        {Object.keys(grouped).map((travellerId) => {
          const msgs = grouped[travellerId];
          const traveller = msgs[0].traveller;
          const lastMsg = msgs[msgs.length - 1];

          const unreadCount = msgs.filter(
            (m: any) => m.status === "unread"
          ).length;

          return (
            <div
              key={travellerId}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                activeTraveller === travellerId ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveTraveller(travellerId)}
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{traveller.name}</p>
                {unreadCount > 0 && (
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">
                {lastMsg.message}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col bg-white md:col-span-2">
        {activeTraveller ? (
          <>
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {grouped[activeTraveller].map((msg: any) => (
                <div key={msg._id} className="space-y-1">
                  {/* Traveller message */}
                  <div className="flex justify-start">
                    <div className="bg-gray-300 text-gray-800 p-3 rounded-2xl rounded-bl-sm max-w-xs shadow">
                      {msg.message}
                      <small className="text-gray-600 text-xs block mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>

                  {/* Admin reply */}
                  {msg.adminReply && (
                    <div className="flex justify-end">
                      <div className="bg-green-500 text-white p-3 rounded-2xl rounded-br-sm max-w-xs shadow">
                        {msg.adminReply}
                        <small className="text-gray-200 text-xs block mt-1">
                          {new Date(
                            msg.updatedAt || msg.createdAt
                          ).toLocaleTimeString()}
                        </small>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Reply Box */}
            <div className="p-4 flex gap-2 border-t bg-white">
              <input
                type="text"
                placeholder="Type a reply..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={() =>
                  handleReply(
                    grouped[activeTraveller][
                      grouped[activeTraveller].length - 1
                    ]._id
                  )
                }
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">Select a traveller to view messages</p>
          </div>
        )}
      </div>
    </div>
  );
}
