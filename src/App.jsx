import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar, { SidebarItem } from './components/pages/postAuth/admin/Sidebar';
import { About, Home } from './components/pages/postAuth/client';
import LoginPage from './components/pages/preAuth/LoginPage';
import { BookCopy, ContactRound, Gauge, LayoutDashboard, Shield, SquareCheckBig, Ticket } from 'lucide-react';
import { Outlet } from 'react-router-dom';
// choifs
// kiffyw
import { UserContext } from './components/UserContext';
import { useContext, useState } from 'react';
import Dashboard from './components/pages/postAuth/admin/Dashboard';
import Events from './components/pages/postAuth/admin/Events';
import Header from './components/pages/postAuth/client/Navbar/Header';
import CommunityEngagementForm from './components/pages/postAuth/client/Forms/CommunityEngagementForm';
import StudentEngagementForm from './components/pages/postAuth/client/Forms/StudentEngagementForm';
import RegisterPage from './components/pages/preAuth/Register';
import Cnavbar from './components/pages/postAuth/client/Navbar/Cnavbar';
import ComexForms from './components/pages/postAuth/admin/ComexForms';
import Accounts from './components/pages/postAuth/admin/Accounts';
import Dnavbar from './components/pages/postAuth/client/Navbar/Dnavbar';
import { Footer } from './components/Footer';
import HeroPage from './components/pages/preAuth/HeroPage';

// sidebar
function AdminLayout() {
  const { user } = useContext(UserContext);
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem to="/admin/dashboard" icon={<Gauge size={20} />} text={"Dashboard"} active />
        <SidebarItem to="/admin/events" icon={<Ticket size={20} />} text={"Manage Events"} />
        <SidebarItem to="/admin/nstp" icon={<Shield size={20} />} text={"Manage NSTP"} />
        <SidebarItem to="/admin/accounts" icon={<ContactRound size={20} />} text={"Manage Accounts"} />
        <SidebarItem to="/admin/comextracker" icon={<SquareCheckBig size={20} />} text={"COMEX Tracker"} />
        <SidebarItem to="/admin/comexforms" icon={<BookCopy size={20} />} text={"COMEX Forms"} />
      </Sidebar>
      <Outlet />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* pre Authentication */}
          <Route path="/" element={<><Dnavbar/><HeroPage /><Footer/></>} />
          <Route path="/login" element={<><Dnavbar/><LoginPage /><Footer/></>} />
          <Route path="/register" element={<><Dnavbar/><RegisterPage /><Footer/></>} />

          {/* for Admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="comexforms" element={<ComexForms />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          {/* for Client */}
          
          <Route path="/client/*">
            <Route path="home" element={<><Cnavbar /><Home /><Footer/></>}/>
            <Route path="comexforms" element={<><Header /><Footer/><ComexForms /></>}/>
            <Route path="events" element={<><Header /><Events /><Footer/></>}/>
            <Route path="nstp" element={<><Header /><About /><Footer/></>}/>
          </Route>

          {/* forms */}
          <Route path="/comform" element={<CommunityEngagementForm />} />
          <Route path="/studform" element={<StudentEngagementForm />} />

        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;