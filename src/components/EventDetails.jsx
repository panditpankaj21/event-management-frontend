import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { format } from 'date-fns';

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState(0);

  useEffect(() => {
    async function getEvent() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${id}`);
        console.log(data)
        setEvent(data.event);
      } catch (error) {
        console.error(error);
      }
    }

    getEvent();

    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join_event", id);
    socket.on("update_count", (count) => setAttendees(count));

    return () => {
      socket.emit("leave_event", id);
      socket.off("update_count");
    };
  }, [id]);

  if (!event) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {event.title}
          </h1>
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
            <span className="text-white text-lg md:text-xl font-medium">
              {format(new Date(event.date), "MMMM do, yyyy")}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Event Details</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {event.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-900">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="p-3 bg-purple-600 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {format(new Date(event.date), "MMMM do, yyyy @ h:mm a")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendees Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Event Stats</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <span className="text-sm font-medium text-green-700">Live Attendees</span>
                  <span className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105">
                    {attendees}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;