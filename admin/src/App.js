import { useContext } from 'react';
import './App.css';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDevelopers from './pages/Admin/AddDevelopers';
import DevelopersList from './pages/Admin/DevelopersList';
import { DevContext } from './context/DevContext';
import DevDashboard from './pages/Developer/DevDashboard';
import DevAppointments from './pages/Developer/DevAppointments';
import DevProfile from './pages/Developer/DevProfile';

function App() {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DevContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <SideBar />
        <Routes>
          {/* Admin Routes */}
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard />}></Route>
          <Route path='/all-appointments' element={<AllApointments />}></Route>
          <Route path='/add-developers' element={<AddDevelopers />}></Route>
          <Route path='/developers-list' element={<DevelopersList />}></Route>
          {/* Developers Routes */}
          <Route path='/developer-dashboard' element={<DevDashboard />}></Route>
          <Route path='/developer-appointments' element={<DevAppointments />}></Route>
          <Route path='/developer-profile' element={<DevProfile />}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App;
