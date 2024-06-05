import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './components/UserContext';

import Sidebar, { SidebarItem } from './components/pages/postAuth/admin/Sidebar';
import { About, Home } from './components/pages/postAuth/client';
import LoginPage from './components/pages/preAuth/LoginPage';
import { BookCopy, ContactRound, Gauge, Shield, SquareCheckBig, Ticket } from 'lucide-react';
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
import postAuthRedirect from './components/postAuthRedirect';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Protected Hero Page
function HeroPageWithNavbarAndFooter() {
  return (
    <>
      <Dnavbar />
      <HeroPage />
      <Footer />
    </>
  );
}

const ProtectedHeroPage = postAuthRedirect(HeroPageWithNavbarAndFooter);

// Admin Layout
function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem to="/admin/dashboard" icon={<Gauge size={20} />} text={"Dashboard"} active />
        <SidebarItem to="/admin/events" icon={<Ticket size={20} />} text={"Manage Events"} />
        <SidebarItem to="/admin/nstp" icon={<Shield size={20} />} text={"Manage NSTP"} />
        <SidebarItem to="/admin/accounts" icon={<ContactRound size={20} />} text={"Manage Users"} />
        <SidebarItem to="/admin/comextracker" icon={<SquareCheckBig size={20} />} text={"COMEX Tracker"} />
        <SidebarItem to="/admin/comexforms" icon={<BookCopy size={20} />} text={"COMEX Forms"} />
      </Sidebar>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if it exists
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* Pre Authentication */}
          <Route path="/" element={<HeroPageWithNavbarAndFooter />} />
          <Route path="/login" element={<><Dnavbar /><LoginPage /><Footer /></>} />
          <Route path="/register" element={<><Dnavbar /><RegisterPage /><Footer /></>} />

          {/* Protected Routes for Admin */}
          <Route path="/admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="comexforms" element={<ComexForms />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          {/* Protected Routes for Client */}
          <Route path="/client/*" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
            <Route path="home" element={<><Cnavbar /><Home /><Footer /></>} />
            <Route path="comexforms" element={<><Header /><ComexForms /><Footer /></>} />
            <Route path="events" element={<><Header /><Events /><Footer /></>} />
            <Route path="nstp" element={<><Header /><About /><Footer /></>} />
          </Route>

          {/* Forms */}
          <Route path="/comform" element={<CommunityEngagementForm />} />
          <Route path="/studform" element={<StudentEngagementForm />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
