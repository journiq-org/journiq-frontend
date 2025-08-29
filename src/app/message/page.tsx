"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { sendMessage, getTravellerMessages } from "@/redux/slices/messageSlice";
import TravellerNavbar from "@/components/TravellerNavbar";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector((state) => state.messages);
  const profile = useAppSelector((state) => state.user.profile);

  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  // Fetch traveller messages on mount
  useEffect(() => {
    dispatch(getTravellerMessages());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(sendMessage({ subject: formData.subject, message: formData.message }));
    if (sendMessage.fulfilled.match(result)) {
      setSuccess(true);
      setFormData({ subject: "", message: "" });
      dispatch(getTravellerMessages()); // refresh messages to show new message
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setSuccess(false);
    }
  };

  return (
    <>
      <TravellerNavbar />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Message <span className="text-indigo-600">Journiq</span>
          </h1>

          {/* Chat Box */}
          <div className="mb-6 max-h-96 overflow-y-auto space-y-4 border rounded-lg p-4 bg-gray-50">
            {loading && <p className="text-gray-600">Loading messages...</p>}
            {!loading && messages.length === 0 && <p className="text-gray-500">No messages yet.</p>}
            {messages.map((msg) => (
              <div key={msg._id} className="space-y-1">
                <div className="bg-blue-100 text-gray-800 p-3 rounded-lg w-fit max-w-xs">
                  <strong>{msg.subject}</strong>
                  <p>{msg.message}</p>
                  <small className="text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleString()}</small>
                </div>

                {msg.adminReply && (
                  <div className="bg-green-100 text-gray-800 p-3 rounded-lg w-fit max-w-xs ml-auto">
                    <strong>Admin </strong>
                    <p>{msg.adminReply}</p>
                    {msg.repliedAt && (
                      <small className="text-gray-500 text-xs">
                        {new Date(msg.repliedAt).toLocaleString()}
                      </small>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Send new message form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p className="text-green-600 text-sm text-center mt-2">✅ Message sent!</p>}
            {error && <p className="text-red-600 text-sm text-center mt-2">❌ {error}</p>}
          </form>

          {/* Contact Details */}
          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="text-indigo-600 w-6 h-6" />
              <span className="text-gray-700">support@journiq.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-indigo-600 w-6 h-6" />
              <span className="text-gray-700">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-indigo-600 w-6 h-6" />
              <span className="text-gray-700">Kochi, Kerala, India</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
