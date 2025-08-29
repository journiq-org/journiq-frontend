"use client";

import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchMessages, markAsRead, replyToMessage } from "@/redux/slices/messageSlice";
import toast from "react-hot-toast";

export default function AdminMessagesPage() {
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector((state) => state.messages);
  const [activeTraveller, setActiveTraveller] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    // auto-scroll to bottom when messages change
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTraveller]);

  const handleMarkAsRead = async (id: string) => {
    const result = await dispatch(markAsRead(id));
    if (markAsRead.fulfilled.match(result)) {
      toast.success("Marked as read ✅");
    }
  };

  const handleReply = async (msgId: string) => {
    if (!replyText.trim()) return;
    const result = await dispatch(replyToMessage({ id: msgId, reply: replyText }));
    if (replyToMessage.fulfilled.match(result)) {
      toast.success("Reply sent ✅");
      setReplyText("");
    } else {
      toast.error("Failed to send reply ❌");
    }
  };

  // Group and sort messages by traveller
  const grouped = messages.reduce((acc: any, msg) => {
    const tId = msg.traveller._id;
    if (!acc[tId]) acc[tId] = [];
    acc[tId].push(msg);
    return acc;
  }, {});

  // Sort inside each traveller group
  Object.keys(grouped).forEach((travellerId) => {
    grouped[travellerId].sort(
      (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Travellers */}
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b">Travellers</h2>
        {Object.keys(grouped).map((travellerId) => {
          const msgs = grouped[travellerId];
          const traveller = msgs[0].traveller;
          const lastMsg = msgs[msgs.length - 1];

          return (
            <div
              key={travellerId}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                activeTraveller === travellerId ? "bg-gray-100" : ""
              }`}
              onClick={() => setActiveTraveller(travellerId)}
            >
              <p className="font-semibold text-gray-800">{traveller.name}</p>
              <p className="text-sm text-gray-600 truncate">{lastMsg.message}</p>
            </div>
          );
        })}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {activeTraveller ? (
          <>
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {grouped[activeTraveller].map((msg: any) => {
                const isUnread = msg.status === "unread";
                return (
                  <div key={msg._id} onClick={() => isUnread && handleMarkAsRead(msg._id)}>
                    {/* Traveller message */}
                    <div className="flex justify-start mb-2">
                      <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                        {msg.message}
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Admin reply (if exists) */}
                    {msg.adminReply && (
                      <div className="flex justify-end">
                        <div className="max-w-xs px-4 py-2 rounded-lg bg-blue-500 text-white rounded-br-none">
                          {msg.adminReply}
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(msg.updatedAt || msg.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div ref={chatEndRef} /> {/* scroll to here */}
            </div>

            {/* Reply Box */}
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                placeholder="Type a reply..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <button
                onClick={() =>
                  handleReply(grouped[activeTraveller][grouped[activeTraveller].length - 1]._id)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
