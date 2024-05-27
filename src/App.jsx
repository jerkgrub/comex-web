import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar, { SidebarItem } from './components/pages/postAuth/admin/Sidebar';
import { About, Home } from './components/pages/postAuth/client';
import LoginPage from './components/pages/preAuth/LoginPage';
import { Gauge, LayoutDashboard, Shield, Ticket } from 'lucide-react';
import { Outlet } from 'react-router-dom';
// choifs
// kiffy

import { UserContext } from './components/UserContext';
import { useContext, useState } from 'react';
import Dashboard from './components/pages/postAuth/admin/Dashboard';
import Events from './components/pages/postAuth/admin/Events';
import Header from './components/pages/postAuth/client/Navbar/Header';
import CommunityEngagementForm from './components/pages/postAuth/client/Forms/CommunityEngagementForm';
import StudentEngagementForm from './components/pages/postAuth/client/Forms/StudentEngagementForm';

function AdminLayout() {
  const { user } = useContext(UserContext);

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem to="/admin/dashboard" icon={<Gauge size={20} />} text={"Dashboard"} active />
        <SidebarItem to="/admin/events" icon={<Ticket size={20} />} text={"Events"} />
        <SidebarItem to="/admin/nstp" icon={<Shield size={20} />} text={"NSTP"} />
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
          <Route path="/login" element={<LoginPage />} />

          {/* for Admin */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="nstp" element={<About />} />
            // Add other admin routes here
          </Route>

          {/* for Client */}
          
          <Route path="/client/*">
            <Route path="home" element={<><Header /><Home /></>}/>
            <Route path="about" element={<><Header /><About /></>}/>
            <Route path="events" element={<><Header /><Events /></>}/>
            <Route path="nstp" element={<><Header /><About /></>}/>
            // Add other client routes here
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