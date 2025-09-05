"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { sendMessage, getTravellerMessages } from "@/redux/slices/messageSlice";
import TravellerNavbar from "@/components/TravellerNavbar";

export default function Page() {
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector((state) => state.messages);

  const [formData, setFormData] = useState({ subject: "", message: "" });
  const [success, setSuccess] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(getTravellerMessages());
  }, [dispatch]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
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

  return (
    <>
      <TravellerNavbar />
      <div className="h-screen grid grid-cols-1 md:grid-cols-2">
        
        {/* Left side - Contact Info */}
        <div className="bg-[#E2E0DF] p-8 border-r flex flex-col gap-6">
          <h2 className="text-2xl font-semibold mb-4">📞 Contact Us</h2>

          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="w-5 h-5 text-green-600" />
            <span>support@travelsite.com</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="w-5 h-5 text-green-600" />
            <span>+1 (555) 123-4567</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="w-5 h-5 text-green-600" />
            <span>123 Main Street, New York, USA</span>
          </div>

          {/* Embedded Google Map */}
          <div className="mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24170.123456!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNew%20York!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="250"
              allowFullScreen
              loading="lazy"
              className="rounded-lg shadow"
            ></iframe>
          </div>
        </div>

        {/* Right side - Chat */}
        <div className="flex flex-col bg-[#E2E0DF]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading && <p className="text-gray-600">Loading messages...</p>}
            {!loading && messages.length === 0 && (
              <p className="text-gray-500 text-center">No messages yet.</p>
            )}

            {messages.map((msg) => (
              <div key={msg._id} className="space-y-1">
                {/* Traveller message */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white p-3 rounded-2xl rounded-br-sm max-w-xs shadow">
                    <strong>{msg.subject}</strong>
                    <p>{msg.message}</p>
                    <small className="text-gray-200 text-xs block">
                      {new Date(msg.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>

                {/* Admin reply */}
                {msg.adminReply && (
                  <div className="flex justify-start">
                    <div className="bg-gray-300 text-gray-800 p-3 rounded-2xl rounded-bl-sm max-w-xs shadow">
                      <strong>Admin</strong>
                      <p>{msg.adminReply}</p>
                      {msg.repliedAt && (
                        <small className="text-gray-600 text-xs block">
                          {new Date(msg.repliedAt).toLocaleString()}
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}


            <div ref={chatEndRef} />
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 border-t bg-[#E2E0DF]">
            {/* Subject field */}
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />

            {/* Message field */}
            <div className="flex items-center gap-2">
              <textarea
                name="message"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                rows={1}
                className="flex-1 resize-none px-4 py-2 border rounded-full focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>

          {success && <p className="text-green-600 text-sm text-center pb-2">✅ Message sent!</p>}
          {error && <p className="text-red-600 text-sm text-center pb-2">❌ {error}</p>}
        </div>
      </div>
    </>
  );
}
