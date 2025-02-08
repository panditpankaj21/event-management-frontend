import { FaClock, FaHistory } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import EditEventModal from "../components/EditEventModal";
import io from "socket.io-client"

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`) 

const ListOfEvent = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(data.events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();

    socket.on('eventUpdate', (data) => {

      console.log("event is Updating....", data)

      if(data.type === "created"){
        setEvents(prev => [...prev, data.event]);

      } else if(data.type === "updated"){

        setEvents(prev => prev.map((event) => (event._id === data.updatedEvent._id ? data.updatedEvent : event)))

      } else if(data.type === "deleted"){

        setEvents((prev) => prev.filter((event) => event._id !== data.eventId))

      }
    })

    return () => {
      socket.off("eventUpdate")
    }
  }, [token]);


  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

    const currentDate = new Date();
    const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
    const pastEvents = events.filter(event => new Date(event.date) < currentDate);

    return (
      <div className="space-y-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Discover Events</h1>
    
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 ? (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FaClock className="text-blue-600 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <EventCard key={event._id} event={event} onDelete={handleDelete} setEditingEvent={setEditingEvent} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">No upcoming events found</p>
          </div>
        )}
    
        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="pt-12 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <FaHistory className="text-gray-500 w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-600">Past Events</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map(event => (
                <EventCard key={event._id} event={event} onDelete={handleDelete} setEditingEvent={setEditingEvent} />
              ))}
            </div>
          </section>
        )}
    
        {editingEvent && <EditEventModal event={editingEvent} onClose={() => setEditingEvent(null)} />}
      </div>
    );
    
};

export default ListOfEvent;