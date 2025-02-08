import { FaCalendarAlt, FaMapMarkerAlt, FaTag, FaEdit, FaTrash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"

const EventCard = ({ event, onDelete, setEditingEvent}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const guest = decodedToken.guest;
  let userId;
  if(!guest){
    userId = decodedToken.userId;
  }

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!guest && event.creator === userId && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={() => setEditingEvent(event)}
              className="p-2 cursor-pointer bg-white/90 backdrop-blur-sm rounded-lg shadow-sm text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              aria-label="Edit event"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="p-2 cursor-pointer bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
              aria-label="Delete event"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>  
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.category === 'conference' ? 'bg-blue-100 text-blue-800' :
              event.category === 'concert' ? 'bg-purple-100 text-purple-800' :
              'bg-green-100 text-green-800'
            }`}>
              {event.category}
            </span>
            {new Date(event.date) > new Date() ? (
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                Upcoming
              </span>
            ) : (
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                Past Event
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-600 line-clamp-2 text-sm">{event.description}</p>
        </div>

        <div className="mt-auto space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCalendarAlt className="flex-shrink-0" />
            <span>
              {new Date(event.date).toLocaleDateString('en-IN', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: "Asia/Kolkata"
              })}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaMapMarkerAlt className="flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate(`events/${event._id}`)}
          className="mt-4 w-full cursor-pointer bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Join Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
