// // "use client";
// // import React, { useState } from "react";
// // import { MapPin, Phone, Mail } from "lucide-react";
// // import { useRouter } from "next/navigation";
// // import TravellerNavbar from "@/components/TravellerNavbar";
// // import MessageNotificationDrawer from "@/components/MessageNotificationDrawer";

// // const ContactPage = () => {
// //   const router = useRouter();

// //    const [openMessageDrawer, setOpenMessageDrawer] = useState(false);

// //   return (
// //     <>
// //     <TravellerNavbar/>

// //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
// //       <div className="bg-white rounded-2xl shadow-md border border-gray-200 w-full max-w-3xl p-8">
// //        {/* Header with SEND MESSAGE button */}
// //         <div className="flex items-center justify-between mb-6">
// //         <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
// //         <button
// //             onClick={() => setOpenMessageDrawer(true)}
// //             className="px-4 py-2 bg-grey-900 text-white rounded-lg hover:bg-blue-700 transition"
// //         >
// //             SEND MESSAGE
// //         </button>
// //         </div>
// //         {/* Contact Info */}
// //         <div className="space-y-4 mb-6">
// //           <div className="flex items-center gap-3 text-gray-700">
// //             <MapPin className="w-5 h-5 text-blue-600" />
// //             <span>123 Main Street, Kochi, Kerala, India</span>
// //           </div>
// //           <div className="flex items-center gap-3 text-gray-700">
// //             <Phone className="w-5 h-5 text-green-600" />
// //             <span>+91 98765 43210</span>
// //           </div>
// //           <div className="flex items-center gap-3 text-gray-700">
// //             <Mail className="w-5 h-5 text-red-600" />
// //             <span>support@journiq.com</span>
// //           </div>
// //         </div>

// //         {/* Map */}
// //         <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
// //           <iframe
// //             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d76.2673!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d123456789%3A0xabcdef123456789!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1694351234567"
// //             width="100%"
// //             height="100%"
// //             style={{ border: 0 }}
// //             allowFullScreen={true}
// //             loading="lazy"
// //           ></iframe>
// //         </div>

      
// //       </div>
// //     </div>
// //       {/* Message Drawer */}
// //           <MessageNotificationDrawer open={openMessageDrawer} onClose={() => setOpenMessageDrawer(false)} />
// //     </>
// //   );
// // };

// // export default ContactPage;



// "use client";
// import React, { useState } from "react";
// import { MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react";
// import TravellerNavbar from "@/components/TravellerNavbar";
// import MessageNotificationDrawer from "@/components/MessageNotificationDrawer";

// const ContactPage = () => {
//   const [openMessageDrawer, setOpenMessageDrawer] = useState(false);

//   return (
//     <>
//       <TravellerNavbar />

//       <div className="min-h-screen bg-gray-50">
//         {/* Hero */}
//         <section className="px-6 pt-12">
//           <div className="mx-auto max-w-5xl">
//             <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">Get in touch</h1>
//                   <p className="mt-2 text-gray-600">
//                     Questions about bookings, itineraries, or support? We’re here to help every day.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => setOpenMessageDrawer(true)}
//                     className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
//                   >
//                     Send message
//                   </button>
//                   <a
//                     href="tel:+919876543210"
//                     className="px-4 py-2 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-100 transition"
//                     aria-label="Call us"
//                   >
//                     Call now
//                   </a>
//                 </div>
//               </div>

//               {/* Quick Contact Options */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
//                 <a
//                   href="tel:+919876543210"
//                   className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition bg-gray-50"
//                 >
//                   <div className="p-2 rounded-lg bg-green-50 text-green-600">
//                     <Phone className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Phone</p>
//                     <p className="text-sm text-gray-600">+91 98765 43210</p>
//                     <span className="text-xs text-green-700 group-hover:underline">Tap to call</span>
//                   </div>
//                 </a>

//                 <a
//                   href="mailto:support@journiq.com"
//                   className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition bg-gray-50"
//                 >
//                   <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
//                     <Mail className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Email</p>
//                     <p className="text-sm text-gray-600">support@journiq.com</p>
//                     <span className="text-xs text-blue-700 group-hover:underline">Write to us</span>
//                   </div>
//                 </a>

//                 <a
//                   href="https://api.whatsapp.com/send?phone=919876543210&text=Hi%20Journiq%20Team!"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition bg-gray-50"
//                 >
//                   <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
//                     <MessageSquare className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">WhatsApp</p>
//                     <p className="text-sm text-gray-600">Chat with support</p>
//                     <span className="text-xs text-emerald-700 group-hover:underline">Open WhatsApp</span>
//                   </div>
//                 </a>

//                 <button
//                   onClick={() => setOpenMessageDrawer(true)}
//                   className="group text-left flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition bg-gray-50"
//                   aria-label="Open live chat"
//                 >
//                   <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
//                     <MessageSquare className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Live chat</p>
//                     <p className="text-sm text-gray-600">Start a conversation</p>
//                     <span className="text-xs text-purple-700 group-hover:underline">Open chat</span>
//                   </div>
//                 </button>
//               </div>

//               {/* Contact Details */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
//                 <div className="p-5 rounded-xl border border-gray-200">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
//                       <MapPin className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">Office</p>
//                       <p className="text-sm text-gray-600">
//                         123 Main Street, Kochi, Kerala, India
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-5 rounded-xl border border-gray-200">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
//                       <Clock className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">Working hours</p>
//                       <p className="text-sm text-gray-600">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="p-5 rounded-xl border border-gray-200">
//                   <div className="flex items-start gap-3">
//                     <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
//                       <Mail className="w-5 h-5" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-900">Support</p>
//                       <p className="text-sm text-gray-600">support@journiq.com</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Map */}
//               <div className="w-full h-64 rounded-xl overflow-hidden mt-8">
//                 <iframe
//                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d76.2673!3d9.9312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d123456789%3A0xabcdef123456789!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1694351234567"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="lazy"
//                   title="Journiq office location"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer CTA */}
//         <section className="px-6 py-10">
//           <div className="mx-auto max-w-5xl">
//             <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//               <div>
//                 <h2 className="text-xl font-semibold">Need a personalized itinerary?</h2>
//                 <p className="text-gray-300 mt-1">
//                   Tell us your dates and preferences — we’ll craft a trip for you.
//                 </p>
//               </div>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setOpenMessageDrawer(true)}
//                   className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition"
//                 >
//                   Start a chat
//                 </button>
//                 <a
//                   href="mailto:support@journiq.com?subject=Custom%20Itinerary%20Request"
//                   className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition"
//                 >
//                   Email us
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* Message Drawer */}
//       <MessageNotificationDrawer
//         open={openMessageDrawer}
//         onClose={() => setOpenMessageDrawer(false)}
//       />
//     </>
//   );
// };

// export default ContactPage;




"use client";
import React, { useState } from "react";
import { MapPin, MessageSquare, Clock } from "lucide-react";
import TravellerNavbar from "@/components/TravellerNavbar";
import MessageNotificationDrawer from "@/components/MessageNotificationDrawer";

const ContactPage = () => {
  const [openMessageDrawer, setOpenMessageDrawer] = useState(false);

  return (
    <>
      <TravellerNavbar />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="px-6 pt-12">
          <div className="mx-auto max-w-5xl">
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
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
    </>
  );
};

export default ContactPage;