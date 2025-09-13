// "use client";

// import { useEffect, useState, useRef } from "react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import {
//   fetchMessages,
//   markAsRead,
//   replyToMessage,
// } from "@/redux/slices/messageSlice";
// import toast from "react-hot-toast";

// export default function AdminMessagesPage() {
//   const dispatch = useAppDispatch();
//   const { messages } = useAppSelector((state) => state.messages);
//   const [activeTraveller, setActiveTraveller] = useState<string | null>(null);
//   const [replyText, setReplyText] = useState("");
//   const chatEndRef = useRef<HTMLDivElement | null>(null);

//   // fetch messages
//   useEffect(() => {
//     dispatch(fetchMessages());
//   }, [dispatch]);

//   // auto-scroll to bottom when messages or active chat changes
//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, activeTraveller]);

//   // optional: select last active traveller on load
//   useEffect(() => {
//     if (messages.length > 0) {
//       const lastMsg = [...messages].sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       )[0];
//       setActiveTraveller(lastMsg.traveller._id);
//     }
//   }, [messages]);

//   const handleReply = async (msgId: string) => {
//     if (!replyText.trim()) return;
//     const result = await dispatch(replyToMessage({ id: msgId, reply: replyText }));
//     if (replyToMessage.fulfilled.match(result)) {
//       toast.success("Reply sent ✅");
//       setReplyText("");
//     } else {
//       toast.error("Failed to send reply ❌");
//     }
//   };

//   // group messages by traveller
//   const grouped = messages.reduce((acc: any, msg: any) => {
//     const tId = msg.traveller._id;
//     if (!acc[tId]) acc[tId] = [];
//     acc[tId].push(msg);
//     return acc;
//   }, {});

//   // sort each group by date ascending
//   Object.keys(grouped).forEach((travellerId) => {
//     grouped[travellerId].sort(
//       (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//     );
//   });

//   // mark unread as read when opening a chat
//   useEffect(() => {
//     if (activeTraveller && grouped[activeTraveller]) {
//       grouped[activeTraveller]
//         .filter((m: any) => m.status === "unread")
//         .forEach((m: any) => dispatch(markAsRead(m._id)));
//     }
//   }, [activeTraveller, messages, dispatch]); // include messages & dispatch

//   return (
//     <div className="min-l-screen flex bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
//       <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">

//       {/* min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 */}
//       {/* ---------- SIDEBAR (fixed column) ---------- */}
//       <aside className="w-80 md:w-96 bg-gradient-to-br from-blue-100 via-white to-indigo-100 text-gray-900 flex-shrink-0 flex flex-col">
//         {/* header (constant) */}
//         <div className="p-4 border-b border-gray-800 flex items-center justify-between">
//           <h2 className="text-lg font-bold">Travellers</h2>
//         </div>

//         {/* list (scrollable within sidebar) */}
//         <div className="flex-1 overflow-y-auto">
//           {Object.keys(grouped).length === 0 ? (
//             <div className="p-4 text-gray-300">No travellers</div>
//           ) : (
//             Object.keys(grouped).map((travellerId) => {
//               const msgs = grouped[travellerId];
//               const traveller = msgs[0].traveller;
//               const lastMsg = msgs[msgs.length - 1];
//               const unreadCount = msgs.filter((m: any) => m.status === "unread").length;

//               return (
//                 <button
//                   key={travellerId}
//                   onClick={() => setActiveTraveller(travellerId)}
//                   className={`w-full text-left p-4 border-b border-gray-800 flex gap-3 items-start transition ${
//                     activeTraveller === travellerId ? "bg-[#bc7a24] text-white" : "hover:bg-gray-800/60"
//                   }`}
//                 >
//                   {/* avatar + unread badge */}
//                   <div className="relative flex-shrink-0">
//                     <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${activeTraveller === travellerId ? "bg-gray-900 text-[#bc7a24]" : "bg-[#111827] text-white"}`}>
//                       {traveller.name?.charAt(0).toUpperCase()}
//                     </div>

//                     {unreadCount > 0 && (
//                       <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#bc7a24] text-white text-[11px] font-semibold ring-2 ring-gray-900">
//                         {unreadCount > 99 ? "99+" : unreadCount}
//                       </span>
//                     )}
//                   </div>

//                   {/* name + last message */}
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2">
//                       <p className={`font-semibold truncate ${activeTraveller === travellerId ? "text-gray-900" : "text-gray-900"}`}>
//                         {traveller.name}
//                       </p>
//                       <span className="ml-auto text-xs text-gray-900">
//                         {new Date(lastMsg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </span>
//                     </div>
//                     <p className={`mt-1 text-sm truncate ${activeTraveller === travellerId ? "text-gray-900" : "text-gray-900"}`}>
//                       <span className="font-semibold">{lastMsg.subject}:</span> {lastMsg.message}
//                     </p>
//                   </div>
//                 </button>
//               );
//             })
//           )}
//         </div>
//       </aside>

//       {/* ---------- CHAT (main column) ---------- */}
//       <main className="flex-1 flex flex-col">
//         {activeTraveller ? (
//           <>
//             {/* chat header (fixed) */}
//             <div className="flex-shrink-0 p-4 bg-gray-900 text-white border-b border-gray-800 flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#bc7a24] font-semibold">
//                 {grouped[activeTraveller]?.[0]?.traveller?.name?.charAt(0)}
//               </div>
//               <div className="min-w-0">
//                 <h3 className="font-bold truncate">{grouped[activeTraveller]?.[0]?.traveller?.name}</h3>
//                 <p className="text-sm opacity-80">Chatting now</p>
//               </div>
//             </div>

//             {/* messages (ONLY this part scrolls) */}
//             <section className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#E2E0DF]">
//               {grouped[activeTraveller].map((msg: any) => (
//                 <div key={msg._id} className="space-y-1">
//                   {/* traveller message */}
//                   <div className="flex justify-start">
//                     <div className="px-3 py-2 rounded-2xl rounded-bl-sm shadow max-w-xs bg-white text-gray-900">
//                       <p className="text-sm font-semibold">{msg.subject}</p>
//                       <p className="mt-1">{msg.message}</p>
//                       <small className="text-gray-500 text-xs block text-right mt-1">
//                         {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                       </small>
//                     </div>
//                   </div>

//                   {/* admin reply */}
//                   {msg.adminReply && (
//                     <div className="flex justify-end">
//                       <div className="px-3 py-2 rounded-2xl rounded-br-sm shadow max-w-xs bg-[#bc7a24] text-white">
//                         {msg.adminReply}
//                         <small className="text-gray-100 text-xs block text-right mt-1">
//                           {new Date((msg.updatedAt || msg.createdAt)).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//                         </small>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div ref={chatEndRef} />
//             </section>

//             {/* reply box (fixed) */}
            
//             <div className="flex-shrink-0 p-3 bg-gray-100 border-t border-gray-300 flex items-center gap-3">
//               <input
//                 type="text"
//                 placeholder="Type a reply..."
//                 className="flex-1 rounded-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bc7a24] border border-gray-300"
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     // use last message id as thread id (same as before)
//                     const msgs = grouped[activeTraveller];
//                     if (msgs?.length) handleReply(msgs[msgs.length - 1]._id);
//                   }
//                 }}
//               />
//               <button
//                 onClick={() => {
//                   const msgs = grouped[activeTraveller];
//                   if (msgs?.length) handleReply(msgs[msgs.length - 1]._id);
//                 }}
//                 className="px-4 py-2 bg-[#bc7a24] text-white rounded-full hover:bg-[#a8641e] transition"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center">
//             <p className="text-gray-600">Select a traveller to view messages</p>
//           </div>
//         )}
//       </main>
//     </div>

// </div>




//   );
// }



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
  const { messages } = useAppSelector((state) => state.messages);
  const [activeTraveller, setActiveTraveller] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages on mount
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // Auto-scroll to bottom on updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, activeTraveller]);

  // Select most recent traveller on load
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = [...messages].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      setActiveTraveller(lastMsg.traveller._id);
    }
  }, [messages]);

  // Send reply
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
  const grouped = messages.reduce((acc: any, msg: any) => {
    const tId = msg.traveller._id;
    if (!acc[tId]) acc[tId] = [];
    acc[tId].push(msg);
    return acc;
  }, {} as Record<string, any[]>);

  // Sort each group ascending by time
  Object.keys(grouped).forEach((travellerId) => {
    grouped[travellerId].sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });

  // Mark unread as read when opening a chat
  useEffect(() => {
    if (activeTraveller && grouped[activeTraveller]) {
      grouped[activeTraveller]
        .filter((m: any) => m.status === "unread")
        .forEach((m: any) => dispatch(markAsRead(m._id)));
    }
  }, [activeTraveller, messages, dispatch]);

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* ---------- SIDEBAR (fixed column) ---------- */}
      <aside className="w-80 md:w-96 bg-gradient-to-br from-blue-100 via-white to-indigo-100 text-gray-900 flex-shrink-0 flex flex-col min-h-0">
        {/* Header (sticky) */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-10 bg-gradient-to-br from-blue-100 via-white to-indigo-100">
          <h2 className="text-lg font-bold">Travellers</h2>
        </div>

        {/* List (scrollable within sidebar) */}
        <div className="flex-1 overflow-y-auto">
          {Object.keys(grouped).length === 0 ? (
            <div className="p-4 text-gray-500">No travellers</div>
          ) : (
            Object.keys(grouped).map((travellerId) => {
              const msgs = grouped[travellerId];
              const traveller = msgs[0].traveller;
              const lastMsg = msgs[msgs.length - 1];
              const unreadCount = msgs.filter((m: any) => m.status === "unread").length;

              return (
                <button
                  key={travellerId}
                  onClick={() => setActiveTraveller(travellerId)}
                  className={`w-full text-left p-4 border-b border-gray-200 flex gap-3 items-start transition ${
                    activeTraveller === travellerId
                      ? "bg-[#bc7a24] text-white"
                      : "hover:bg-black/5"
                  }`}
                >
                  {/* Avatar + unread badge */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        activeTraveller === travellerId
                          ? "bg-gray-900 text-[#bc7a24]"
                          : "bg-[#111827] text-white"
                      }`}
                    >
                      {traveller.name?.charAt(0).toUpperCase()}
                    </div>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-[#bc7a24] text-white text-[11px] font-semibold ring-2 ring-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Name + last message */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold truncate text-gray-900">
                        {traveller.name}
                      </p>
                      <span className="ml-auto text-xs text-gray-500">
                        {new Date(lastMsg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p className="mt-1 text-sm truncate text-gray-700">
                      <span className="font-semibold">{lastMsg.subject}:</span>{" "}
                      {lastMsg.message}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ---------- CHAT (main column) ---------- */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeTraveller ? (
          <>
            {/* Chat header (fixed) */}
            <div className="flex-shrink-0 p-4 bg-gray-900 text-white border-b border-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-[#bc7a24] font-semibold">
                {grouped[activeTraveller]?.[0]?.traveller?.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold truncate">
                  {grouped[activeTraveller]?.[0]?.traveller?.name}
                </h3>
                <p className="text-sm opacity-80">Chatting now</p>
              </div>
            </div>

            {/* Messages (ONLY this scrolls) */}
            <section className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#E2E0DF]">
              {grouped[activeTraveller].map((msg: any) => (
                <div key={msg._id} className="space-y-1">
                  {/* Traveller message */}
                  <div className="flex justify-start">
                    <div className="px-3 py-2 rounded-2xl rounded-bl-sm shadow max-w-xs bg-white text-gray-900">
                      <p className="text-sm font-semibold">{msg.subject}</p>
                      <p className="mt-1">{msg.message}</p>
                      <small className="text-gray-500 text-xs block text-right mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  </div>

                  {/* Admin reply */}
                  {msg.adminReply && (
                    <div className="flex justify-end">
                      <div className="px-3 py-2 rounded-2xl rounded-br-sm shadow max-w-xs bg-[#bc7a24] text-white">
                        {msg.adminReply}
                        <small className="text-gray-100 text-xs block text-right mt-1">
                          {new Date(
                            msg.updatedAt || msg.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </section>

            {/* Reply box (fixed) */}
            <div className="flex-shrink-0 p-3 bg-gray-100 border-t border-gray-300 flex items-center gap-3">
              <input
                type="text"
                placeholder="Type a reply..."
                className="flex-1 rounded-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#bc7a24] border border-gray-300"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const msgs = grouped[activeTraveller];
                    if (msgs?.length) handleReply(msgs[msgs.length - 1]._id);
                  }
                }}
              />
              <button
                onClick={() => {
                  const msgs = grouped[activeTraveller];
                  if (msgs?.length) handleReply(msgs[msgs.length - 1]._id);
                }}
                className="px-4 py-2 bg-[#bc7a24] text-white rounded-full hover:bg-[#a8641e] transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-600">Select a traveller to view messages</p>
          </div>
        )}
      </main>
    </div>
  );
}