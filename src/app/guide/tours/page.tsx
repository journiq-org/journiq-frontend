'use client'

import { MapPin, Calendar, DollarSign } from "lucide-react"

const GuideToursPage = () => {
  const tours = [
    {
      id: 1,
      title: "Backwaters of Kerala",
      destination: "Alleppey, Kerala",
      duration: "2 Days / 1 Night",
      price: "₹4,500",
      image: "https://images.unsplash.com/photo-1601197989369-31aef83c7a1d",
    },
    {
      id: 2,
      title: "Munnar Tea Garden Experience",
      destination: "Munnar, Kerala",
      duration: "3 Days / 2 Nights",
      price: "₹7,200",
      image: "https://images.unsplash.com/photo-1595433562696-b9e7c8a4b0db",
    },
    {
      id: 3,
      title: "Heritage Tour of Kochi",
      destination: "Fort Kochi, Kerala",
      duration: "1 Day",
      price: "₹2,000",
      image: "https://images.unsplash.com/photo-1600661901433-bd703cc0b47b",
    },
  ]


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Tours</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={tour.image}
                alt={tour.title}
                className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{tour.title}</h2>
              <p className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                {tour.destination}
              </p>
              <p className="flex items-center text-gray-600 text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {tour.duration}
              </p>
              <p className="flex items-center font-semibold text-gray-800">
                <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                {tour.price}
              </p>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuideToursPage
