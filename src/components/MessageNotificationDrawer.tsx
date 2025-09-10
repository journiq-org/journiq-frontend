// // "use client";

// // import { useEffect, useRef } from "react";
// // import { Send, X } from "lucide-react";
// // import { useAppDispatch, useAppSelector } from "@/redux/hook";
// // import { sendMessage, getTravellerMessages } from "@/redux/slices/messageSlice";

// // interface Props {
// //   open: boolean;
// //   onClose: () => void;
// // }

// // export default function MessageNotificationDrawer({ open, onClose }: Props) {
// //   const dispatch = useAppDispatch();
// //   const { messages, loading, error } = useAppSelector((state) => state.messages);

// //   const chatEndRef = useRef<HTMLDivElement | null>(null);

// //   useEffect(() => {
// //     if (open) dispatch(getTravellerMessages());
// //   }, [open, dispatch]);

// //   useEffect(() => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   if (!open) return null;

// //   return (
// //     <div className="fixed top-16 right-6 z-50 w-80 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
// //       {/* Header */}
// //       <div className="flex items-center justify-between px-4 py-2 bg-green-500 text-white">
// //         <h3 className="font-semibold">💬 Messages</h3>
// //         <button onClick={onClose}>
// //           <X className="w-5 h-5" />
// //         </button>
// //       </div>

// //       {/* Messages List */}
// //       <div className="max-h-96 overflow-y-auto p-3 space-y-3 bg-gray-50">
// //         {loading && <p className="text-gray-600">Loading messages...</p>}
// //         {!loading && messages.length === 0 && (
// //           <p className="text-gray-500 text-center">No messages yet.</p>
// //         )}

// //         {messages.map((msg) => (
// //           <div key={msg._id}>
// //             <div className="bg-green-100 p-2 rounded-md">
// //               <strong>{msg.subject}</strong>
// //               <p className="text-sm">{msg.message}</p>
// //               <small className="text-gray-500 text-xs">
// //                 {new Date(msg.createdAt).toLocaleString()}
// //               </small>
// //             </div>

// //             {msg.adminReply && (
// //               <div className="bg-gray-100 p-2 rounded-md mt-1">
// //                 <strong>Admin:</strong>
// //                 <p className="text-sm">{msg.adminReply}</p>
// //                 {msg.repliedAt && (
// //                   <small className="text-gray-500 text-xs block">
// //                     {new Date(msg.repliedAt).toLocaleString()}
// //                   </small>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         ))}
// //         <div ref={chatEndRef} />
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Send, X } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { sendMessage, getTravellerMessages } from "@/redux/slices/messageSlice";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// export default function MessageNotificationDrawer({ open, onClose }: Props) {
//   const dispatch = useAppDispatch();
//   const { messages, loading, error } = useAppSelector((state) => state.messages);
//   const chatEndRef = useRef<HTMLDivElement | null>(null);
//   const [formData, setFormData] = useState({ subject: "", message: "" });
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (open) dispatch(getTravellerMessages());
//   }, [open, dispatch]);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.message.trim()) return;

//     const result = await dispatch(
//       sendMessage({ subject: formData.subject || "No Subject", message: formData.message })
//     );

//     if (sendMessage.fulfilled.match(result)) {
//       setSuccess(true);
//       setFormData({ subject: "", message: "" });
//       dispatch(getTravellerMessages());
//       setTimeout(() => setSuccess(false), 3000);
//     } else {
//       setSuccess(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed top-16 right-6 z-50 w-80 bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-2 bg-green-500 text-white">
//         <h3 className="font-semibold">💬 Messages</h3>
//         <button onClick={onClose}>
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       <div className="max-h-96 overflow-y-auto p-3 space-y-3 bg-gray-50">
//         {loading && <p className="text-gray-600">Loading messages...</p>}
//         {!loading && messages.length === 0 && <p className="text-gray-500 text-center">No messages yet.</p>}

//         {messages.map((msg) => (
//           <div key={msg._id}>
//             <div className="bg-green-100 p-2 rounded-md">
//               <strong>{msg.subject}</strong>
//               <p className="text-sm">{msg.message}</p>
//               <small className="text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleString()}</small>
//             </div>
//             {msg.adminReply && (
//               <div className="bg-gray-100 p-2 rounded-md mt-1">
//                 <strong>Admin:</strong>
//                 <p className="text-sm">{msg.adminReply}</p>
//                 {msg.repliedAt && (
//                   <small className="text-gray-500 text-xs block">{new Date(msg.repliedAt).toLocaleString()}</small>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>

//       <form onSubmit={handleSubmit} className="p-3 border-t flex flex-col gap-2 bg-gray-50">
//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           value={formData.subject}
//           onChange={handleChange}
//           className="w-full px-3 py-1 border rounded focus:ring-1 focus:ring-green-500"
//         />
//         <div className="flex gap-2">
//           <textarea
//             name="message"
//             placeholder="Type a message..."
//             value={formData.message}
//             onChange={handleChange}
//             className="flex-1 px-3 py-1 border rounded resize-none focus:ring-1 focus:ring-green-500"
//           />
//           <button type="submit" className="bg-green-500 p-2 rounded text-white hover:bg-green-600">
//             <Send className="w-4 h-4" />
//           </button>
//         </div>
//         {success && <p className="text-green-600 text-sm">✅ Message sent!</p>}
//         {error && <p className="text-red-600 text-sm">❌ {error}</p>}
//       </form>
//     </div>
//   );
// }



"use client";

import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { sendMessage, getTravellerMessages } from "@/redux/slices/messageSlice";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MessageNotificationDrawer({ open, onClose }: Props) {
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector((state) => state.messages);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) dispatch(getTravellerMessages());
  }, [open, dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    const result = await dispatch(
      sendMessage({ subject: formData.subject || "No Subject", message: formData.message })
    );

    if (sendMessage.fulfilled.match(result)) {
      setSuccess(true);
      setFormData({ subject: "", message: "" });
      dispatch(getTravellerMessages());
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setSuccess(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed top-16 right-0 z-50 w-96 h-[calc(100%-4rem)] bg-gray-900 shadow-xl border-l border-gray-800 rounded-l-lg flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white border-b border-gray-700">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          💬 <b>MESSAGE</b>
        </h3>
        <button onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-900">
        {loading && <p className="text-gray-400 text-center">Loading messages...</p>}
        {!loading && messages.length === 0 && (
          <p className="text-gray-500 text-center">No messages yet.</p>
        )}

        {messages.map((msg) => (
          <div key={msg._id} className="space-y-1">
            {/* User message */}
            <div className="bg-gray-800 text-white p-2 rounded-md shadow">
              <strong>{msg.subject}</strong>
              <p className="text-sm mt-1">{msg.message}</p>
              <small className="text-gray-400 text-xs">
                {new Date(msg.createdAt).toLocaleString()}
              </small>
            </div>

            {/* Admin reply */}
            {msg.adminReply && (
              <div className="bg-gray-700 text-white p-2 rounded-md shadow ml-4">
                <strong>Admin:</strong>
                <p className="text-sm">{msg.adminReply}</p>
                {msg.repliedAt && (
                  <small className="text-gray-400 text-xs block">
                    {new Date(msg.repliedAt).toLocaleString()}
                  </small>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-700 flex flex-col gap-2 bg-gray-900">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-gray-700 focus:ring-1 focus:ring-gray-500 text-white bg-gray-800 placeholder-gray-400"
        />
        <div className="flex gap-2">
          <textarea
            name="message"
            placeholder="Type a message..."
            value={formData.message}
            onChange={handleChange}
            className="flex-1 px-3 py-2 rounded border border-gray-700 resize-none focus:ring-1 focus:ring-gray-500 text-white bg-gray-800 placeholder-gray-400"
          />
          <button type="submit" className="bg-gray-700 hover:bg-gray-600 p-2 rounded text-white flex items-center justify-center">
            <Send className="w-4 h-4" />
          </button>
        </div>
        {success && <p className="text-green-400 text-sm">✅ Message sent!</p>}
        {error && <p className="text-red-400 text-sm">❌ {error}</p>}
      </form>
    </div>
  );
}
