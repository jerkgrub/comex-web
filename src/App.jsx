import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "./components/UserContext";

import { Home } from "./pages/postAuth/client";
import {
  BookCopy,
  ContactRound,
  Gauge,
  Shield,
  SquareCheckBig,
  Ticket,
} from "lucide-react";

import { Footer } from "./components/Footer";

// Pre Authentication
import PreAuthNavbar from "./components/navbar/PreAuthNavbar";
import HeroPage from "./pages/preAuth/HeroPage";
import RegisterPage from "./pages/preAuth/authentication/RegisterPage";
import LoginPage from "./pages/preAuth/authentication/LoginPage";

// Post Authentication {Admin}
import Sidebar, { SidebarItem } from "./pages/postAuth/admin/Sidebar";
import Dashboard from "./pages/postAuth/admin/sidebarPages/Dashboard";
import Activities from "./pages/postAuth/admin/sidebarPages/Activities";
import ComexForms from "./pages/postAuth/admin/sidebarPages/ComexForms";
import Accounts from "./pages/postAuth/admin/sidebarPages/Accounts";

// Post Authentication {Client}
import PostAuthNavbar from "./components/navbar/PostAuthNavbar";
import Profile from "./pages/postAuth/client/Profile";

// Misc
import CommunityEngagementForm from "./pages/postAuth/client/forms/CommunityEngagementForm";
import StudentEngagementForm from "./pages/postAuth/client/forms/StudentEngagementForm";
import ScrollToTop from "./components/hooks/ScrollToTop";

// Protected Route Component
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");
  
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Protected Hero Page
function HeroPageWithNavbarAndFooter() {
  return (
    <>
      <PreAuthNavbar />
      <HeroPage />
      <Footer />
    </>
  );
}

// Admin Layout
function AdminLayout() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem
          to="/admin/dashboard"
          icon={<Gauge size={20} />}
          text={"Dashboard"}
          active
        />
        <SidebarItem
          to="/admin/comextracker"
          icon={<SquareCheckBig size={20} />}
          text={"COMEX Tracker"}
        />
        <SidebarItem
          to="/admin/comexforms"
          icon={<BookCopy size={20} />}
          text={"COMEX Forms"}
        />
        <SidebarItem
          to="/admin/accounts"
          icon={<ContactRound size={20} />}
          text={"Manage Users"}
        />
        <SidebarItem
          to="/admin/activities"
          icon={<Ticket size={20} />}
          text={"Manage Activities"}
        />
        <SidebarItem
          to="/admin/nstp"
          icon={<Shield size={20} />}
          text={"Manage NSTP"}
        />
      </Sidebar>
      <div
        className={`flex-grow transition-all duration-200 ${
          expanded ? "ml-64" : "ml-16"
        } p-4`}
      >
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if it exists
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ScrollToTop/>
        <Routes>
          {/* Pre Authentication */}
          <Route path="/" element={<HeroPageWithNavbarAndFooter />} />
          <Route
            path="/login"
            element={
              <>
                <PreAuthNavbar />
                <LoginPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <PreAuthNavbar />
                <RegisterPage />
                <Footer />
              </>
            }
          />

          {/* Protected Routes for Admin */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="activities" element={<Activities />} />
            <Route path="comexforms" element={<ComexForms />} />
            <Route path="accounts" element={<Accounts />} />
          </Route>

          {/* Protected Routes for Client */}
          <Route
            path="/client/*"
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route
              path="home"
              element={
                <>
                  <PostAuthNavbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="profile"
              element={
                <>
                  <PostAuthNavbar />
                  <Profile />
                  <Footer />
                </>
              }
            />
            <Route
              path="comexforms"
              element={
                <>
                  <ComexForms />
                  <Footer />
                </>
              }
            />
            <Route
              path="activities"
              element={
                <>
                  <Activities />
                  <Footer />
                </>
              }
            />
            <Route
              path="nstp"
              element={
                <>
                  <Footer />
                </>
              }
            />
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
