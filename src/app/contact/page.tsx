"use client";

import React, { useState } from "react";
import { MapPin, MessageSquare, Clock } from "lucide-react";
import TravellerNavbar from "@/components/TravellerNavbar";
import MessageNotificationDrawer from "@/components/MessageNotificationDrawer";
import Footerr from "@/components/Footerr";

const ContactPage = () => {
  const [openMessageDrawer, setOpenMessageDrawer] = useState(false);

  return (
    <>
      <TravellerNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="px-6 pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Contact Journiq</h1>
                  <p className="mt-2 text-gray-600">
                    Our support team is available to assist with bookings and travel plans.
                    Start a chat and we’ll get back shortly.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOpenMessageDrawer(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Chat with us
                  </button>
                </div>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="p-5 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Office</p>
                      <p className="text-sm text-gray-600">
                        123 Main Street, Kochi, Kerala, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Support hours</p>
                      <p className="text-sm text-gray-600">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Response time</p>
                      <p className="text-sm text-gray-600">Typically within 15–30 minutes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="w-full h-64 rounded-xl overflow-hidden mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d76.2673!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d123456789%3A0xabcdef123456789!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1694351234567"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Journiq office location"
                />
              </div>
            </div>
          </div>
        </section>

       {/* CTA Strip */}
        <section className="px-6 py-10">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#22252c] text-[#fdfdfd]">
              <div>
                <h2 className="text-xl font-semibold">Need help with your trip?</h2>
                <p className="mt-1 text-[#e4e2e1]">
                  Chat with us for itinerary guidance, changes, or quick questions.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setOpenMessageDrawer(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[#22252c] bg-[#ff9100] hover:opacity-90 transition cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" />
                  Start chat
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Message Drawer */}
      <MessageNotificationDrawer
        open={openMessageDrawer}
        onClose={() => setOpenMessageDrawer(false)}
      />
      <Footerr/>
    </>
  );
};

export default ContactPage;