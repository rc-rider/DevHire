import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDevelopers from "../components/RelatedDevelopers";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { devId } = useParams();
  const { developers, currencySymbol, backendUrl, token, getDevelopersData, userData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();
  const [devInfo, setDevInfo] = useState(null);
  const [devSlots, setDevSlots] = useState([]);
  const [slotIndex, setSlotsIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [projectName, setProjectName] = useState('');


  const scrollRef = useRef(null);
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -150, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 150, behavior: "smooth" });

  // Fetch developer info from context developers list
  const fetchDevInfo = () => {
    const dev = developers.find(d => d._id === devId);
    setDevInfo(dev);
  };

  // Generate available slots for next 7 days starting from today or tomorrow if late
  const getAvailableSlots = () => {
    if (!devInfo) return;

    const newSlots = [];
    const today = new Date();

    // Check if current time is past 8:30 PM
    const isLate = today.getHours() > 20 || (today.getHours() === 20 && today.getMinutes() >= 30);
    const startOffset = isLate ? 1 : 0;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + startOffset + i);

      let startTime = new Date(currentDate);
      let endTime = new Date(currentDate);
      endTime.setHours(20, 30, 0, 0);

      // Adjust startTime for today if booking after current time
      if (i === 0 && startOffset === 0) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinutes = now.getMinutes();

        if (currentMinutes > 30) {
          startTime.setHours(currentHour + 1, 0, 0, 0);
        } else if (currentMinutes > 0) {
          startTime.setHours(currentHour, 30, 0, 0);
        } else {
          startTime.setHours(currentHour, 0, 0, 0);
        }

        // Minimum booking start time at 10 AM
        if (startTime.getHours() < 10) {
          startTime.setHours(10, 0, 0, 0);
        }
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];

      while (startTime <= endTime) {
        const formattedTime = startTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const slotDateKey = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;

        // Check if slot is booked for this date/time
        const bookedSlots = devInfo?.slots_booked?.[slotDateKey] || [];
        const isSlotAvailable = !bookedSlots.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(startTime),
            time: formattedTime
          });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        newSlots.push(timeSlots);
      }
    }

    setDevSlots(newSlots);

    // Set default slotTime for first available slot group
    if (newSlots.length > 0) {
      setSlotTime(newSlots[0][0].time);
      setSlotsIndex(0);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    if (!projectName || projectName.trim() === '') {
    toast.error('Project name cannot be empty!', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }

    try {
      if (!devSlots[slotIndex] || !slotTime) {
        toast.error("Please select a valid slot");
        return;
      }

      const selectedSlot = devSlots[slotIndex].find(slot => slot.time === slotTime);
      if (!selectedSlot) {
        toast.error("Selected slot is invalid");
        return;
      }

      const date = selectedSlot.datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;
      const slotTimestamp = date.getTime();

      const payload = {
        userId: userData._id,
        userData,
        devId,
        devData: devInfo,
        slotDate,
        slotTime,
        amount: devInfo.hourlyRate,
        date: slotTimestamp,
        projectName,
      };

      const { data } = await axios.post(
        backendUrl + "/api/users/book-appointment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDevelopersData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error booking appointment");
    }
  };

  useEffect(() => {
    fetchDevInfo();
  }, [developers, devId]);

  useEffect(() => {
    getAvailableSlots();
  }, [devInfo]);

  // Filter out slot groups that are today but past booking cut-off time (8:30 PM)
  const now = new Date();
  const filteredSlots = devSlots.filter(slotGroup => {
    if (!Array.isArray(slotGroup) || slotGroup.length === 0) return false;

    const slotDate = slotGroup[0].datetime;
    const isToday = now.toDateString() === slotDate.toDateString();

    if (isToday) {
      if (now.getHours() > 20 || (now.getHours() === 20 && now.getMinutes() >= 30)) {
        return false;
      }
    }
    return true;
  });

  return devInfo ? (
    <div>
      {/* Developer Info */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={devInfo.image}
            alt={devInfo.name || "Developer"}
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {devInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="Verified" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600 ">
            <p>{devInfo.degree} - {devInfo.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{devInfo.experience}</button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">Skills</p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {
                Array.isArray(devInfo.skills)
                  ? devInfo.skills.join(', ')
                  : typeof devInfo.skills === 'string'
                    ? devInfo.skills.split(',').join(', ')
                    : 'N/A'
              }
            </p>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="Info" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">{devInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Hourly Rate: <span className="text-gray-600">{currencySymbol}{devInfo.hourlyRate}</span>
          </p>
        </div>
      </div>

      {/* Slot Booking */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Schedule Your Dev Time – Pick a Slot</p>

        {filteredSlots.length > 0 ? (
          <>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {filteredSlots.map((items, index) => (
                <div
                  onClick={() => {
                    setSlotsIndex(index);
                    // Reset slotTime to first available time of selected day
                    setSlotTime(items[0].time);
                  }}
                  key={index}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"
                    }`}
                >
                  <p>{daysOfWeek[items[0].datetime.getDay()]}</p>
                  <p>{items[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full mt-4">
              <button
                onClick={scrollLeft}
                className="p-2 bg-gray-200 rounded-2xl hover:bg-primary flex-shrink-0"
                type="button"
              >
                &lt;
              </button>

              <div
                ref={scrollRef}
                className="flex items-center gap-3 overflow-x-scroll whitespace-nowrap flex-grow"
                style={{ scrollBehavior: "smooth" }}
              >
                {filteredSlots[slotIndex]?.map((items, index) => (
                  <p
                    key={index}
                    onClick={() => setSlotTime(items.time)}
                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border ${items.time === slotTime
                      ? "bg-primary text-white border-none"
                      : "text-gray-400 border-gray-300 hover:bg-more"
                      }`}
                  >
                    {items.time.toLowerCase()}
                  </p>
                ))}
              </div>

              <button
                onClick={scrollRight}
                className="p-2 bg-gray-200 rounded-2xl hover:bg-primary flex-shrink-0"
                type="button"
              >
                &gt;
              </button>
            </div>

            <div className="mt-4">
              <label htmlFor="projectName" className="block text-base font-semibold text-gray-900  mb-1">
                Enter Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Ecommerce Web App"
                className="w-full sm:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>


            <button
              onClick={bookAppointment}
              className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 hover:scale-105 transition-all duration-300 w-fit"
            >
              Hire Developer Now
            </button>
          </>
        ) : (
          <p className="mt-4 text-sm text-gray-500">No slots available right now. Please check back later.</p>
        )}
      </div>

      <RelatedDevelopers devId={devId} speciality={devInfo.speciality} />
    </div>
  ) : (
    <p className="text-center mt-8 text-gray-500">Loading developer info...</p>
  );
};

export default Appointment;
