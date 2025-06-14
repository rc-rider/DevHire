import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Developer = () => {
  const { speciality } = useParams();
  const { developers } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);

  const normalizeSpeciality = (text) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/\//g, "-")
      .replace(/-+/g, "-");
  };

  const applyFilter = () => {
    if (speciality) {
      const normalizedSpeciality = speciality.toLowerCase();

      setFilterDoc(
        developers.filter(
          (doc) => normalizeSpeciality(doc.speciality) === normalizedSpeciality
        )
      );
    } else {
      setFilterDoc(developers);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [developers, speciality]);

  return (
    <div>
      <p className="text-gray-600 ">Explore Top Tech Talents by Specialization</p>
      <div className="flex flex-col sm:flex-row items-start  gap-5 mt-5 ">
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)} >Filters</button>
        <div className={`flex-col gap-2 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => speciality === 'Frontend-Developer' ? navigate('/developers') : navigate('/developers/Frontend-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Frontend-Developer" ? "bg-indigo-100 text-black" : ""}`}>Frontend Developer</p>
          <p onClick={() => speciality === 'Backend-Developer' ? navigate('/developers') : navigate('/developers/Backend-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Backend-Developer" ? "bg-indigo-100 text-black" : ""}`}>Backend Developer</p>
          <p onClick={() => speciality === 'Full-Stack-Developer' ? navigate('/developers') : navigate('/developers/Full-Stack-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Full-Stack-Developer" ? "bg-indigo-100 text-black" : ""}`}>Full Stack Developer</p>
          <p onClick={() => speciality === 'DevOps-Engineer' ? navigate('/developers') : navigate('/developers/DevOps-Engineer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "DevOps-Engineer" ? "bg-indigo-100 text-black" : ""}`}>DevOps Engineer</p>
          <p onClick={() => speciality === 'AI-ML-Engineer' ? navigate('/developers') : navigate('/developers/AI-ML-Engineer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "AI-ML-Engineer" ? "bg-indigo-100 text-black" : ""}`}>AI / ML Engineer</p>
          <p onClick={() => speciality === 'Cybersecurity-Expert' ? navigate('/developers') : navigate('/developers/Cybersecurity-Expert')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Cybersecurity-Expert" ? "bg-indigo-100 text-black" : ""}`}>Cybersecurity Expert</p>
          <p onClick={() => speciality === 'Mobile-App-Developer' ? navigate('/developers') : navigate('/developers/Mobile-App-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Mobile-App-Developer" ? "bg-indigo-100 text-black" : ""}`}>Mobile App Developer</p>
          <p onClick={() => speciality === 'SEO-Specialist' ? navigate('/developers') : navigate('/developers/SEO-Specialist')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "SEO-Specialist" ? "bg-indigo-100 text-black" : ""}`}>SEO Specialist</p>
          <p onClick={() => speciality === 'UI-UX-Designer' ? navigate('/developers') : navigate('/developers/UI-UX-Designer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "UI-UX-Designer" ? "bg-indigo-100 text-black" : ""}`}>UI/UX Designer</p>
          <p onClick={() => speciality === 'QA-Tester' ? navigate('/developers') : navigate('/developers/QA-Tester')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "QA-Tester" ? "bg-indigo-100 text-black" : ""}`}>QA / Tester</p>
          <p onClick={() => speciality === 'Cloud-Architect' ? navigate('/developers') : navigate('/developers/Cloud-Architect')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Cloud-Architect" ? "bg-indigo-100 text-black" : ""}`}>Cloud Architect</p>
          <p onClick={() => speciality === 'QA-Automation-Engineer' ? navigate('/developers') : navigate('/developers/QA-Automation-Engineer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "QA-Automation-Engineer" ? "bg-indigo-100 text-black" : ""}`}>QA Automation Engineer</p>
          <p onClick={() => speciality === 'Data-Scientist' ? navigate('/developers') : navigate('/developers/Data-Scientist')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Data-Scientist" ? "bg-indigo-100 text-black" : ""}`}>Data Scientist</p>
          <p onClick={() => speciality === 'Game-Developer' ? navigate('/developers') : navigate('/developers/Game-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Game-Developer" ? "bg-indigo-100 text-black" : ""}`}>Game Developer</p>
          <p onClick={() => speciality === 'Blockchain-Developer' ? navigate('/developers') : navigate('/developers/Blockchain-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Blockchain-Developer" ? "bg-indigo-100 text-black" : ""}`}>Blockchain Developer</p>
          <p onClick={() => speciality === 'Python-Developer' ? navigate('/developers') : navigate('/developers/Python-Developer')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Python-Developer" ? "bg-indigo-100 text-black" : ""}`}>Python Developer</p>
          <p onClick={() => speciality === 'Technical-Writer-&-API-Doc-Expert' ? navigate('/developers') : navigate('/developers/Technical-Writer-&-API-Doc-Expert')} className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded transition-all cursor-pointer whitespace-nowrap hover:bg-more ${speciality === "Technical-Writer-&-API-Doc-Expert" ? "bg-indigo-100 text-black" : ""}`}>Technical Writer & API Doc <br /> Expert</p>
        </div>
        <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6">
          {filterDoc.map((items, index) => (
            <div
              onClick={() => navigate(`/appointment/${items._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-4 transition-transform duration-500"
              key={index}
            >
              <div className="bg-blue-50 w-full aspect-square">
                <img
                  className="w-full h-full object-contain"
                  src={items.image}
                  alt={items.name}
                />
              </div>
              <div className="p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${items.available ? 'text-green-500' : 'text-gray-500'} `}>
                  <p className={`w-2 h-2 ${items.available ? 'bg-green-500' : 'bg-gray-700'}  rounded-full`}></p>
                  <p>{items.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{items.name}</p>
                <p className="text-gray-600 text-sm">{items.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Developer;
