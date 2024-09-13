import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./components/UserContext";

import { Home } from "./pages/postAuth/client";
import { ContactRound, Gauge, List, Shield, Ticket } from "lucide-react";

import { Footer } from "./components/Footer";

// Pre Authentication
import PreAuthNavbar from "./components/navbar/PreAuthNavbar";
import HeroPage from "./pages/preAuth/HeroPage";
import RegisterPage from "./pages/preAuth/authentication/RegisterPage";
import LoginPage from "./pages/preAuth/authentication/LoginPage";
import Users from "./pages/postAuth/admin/sidebarPages/Users";

// Post Authentication {Admin}
import Sidebar, { SidebarItem } from "./pages/postAuth/admin/Sidebar";
import Dashboard from "./pages/postAuth/admin/sidebarPages/Dashboard";
import Activities from "./pages/postAuth/admin/sidebarPages/Activities";
import ComexForms from "./pages/postAuth/admin/sidebarPages/ComexForms";
import CreateUserPage from "./pages/postAuth/admin/sidebarPages/CreateUserPage";
import ViewActivityPage from "./pages/postAuth/admin/sidebarPages/ViewActivityPage";

// Post Authentication {Client}
import PostAuthNavbar from "./components/navbar/PostAuthNavbar";
import Profile from "./pages/postAuth/client/Profile";

// Misc
import CommunityEngagementForm from "./pages/postAuth/client/Forms/CommunityEngagementForm";
import StudentEngagementForm from "./pages/postAuth/client/Forms/StudentEngagementForm";
import ScrollToTop from "./components/hooks/ScrollToTop";

// Route protection
import ProtectedRoute from "./components/ProtectedRoute";
import ViewUserPage from "./pages/postAuth/admin/sidebarPages/ViewUserPage";
import EditUserPage from "./pages/postAuth/admin/sidebarPages/EditUserPage";
import CreateActivityPage from "./pages/postAuth/admin/sidebarPages/CreateActivityPage";
import EditActivityPage from "./pages/postAuth/admin/sidebarPages/EditActivityPage";
import Highlights from "./pages/postAuth/client/Highlights";
import AboutUs from "./pages/postAuth/client/AboutUs";

// Hero Page with Navbar and Footer
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
          to="/admin/users"
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
        <SidebarItem
          to="/admin/evaluation"
          icon={<List size={20} />}
          text={"Manage Evaluation"}
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
        <ScrollToTop />
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

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="activities" element={<Activities />} />
            <Route path="create-activity" element={<CreateActivityPage />} />
            <Route
              path="activities/:activityid"
              element={<ViewActivityPage />}
            />
            <Route
              path="activities/:activityid/edit"
              element={<EditActivityPage />}
            />
            <Route path="activities" element={<Activities />} />
            <Route path="comexforms" element={<ComexForms />} />
            <Route path="users" element={<Users />} />
            <Route path="create-user" element={<CreateUserPage />} />
            <Route path="users/:userid" element={<ViewUserPage />} />
            <Route path="users/:userid/edit" element={<EditUserPage />} />
          </Route>

          {/* Client Routes */}
          <Route
            path="/client/*"
            element={
              <ProtectedRoute
                allowedRoles={[
                  "Comex Coordinator",
                  "Faculty",
                  "NTP",
                  "Student",
                ]}
              >
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
              path="about-us"
              element={
                <>
                  <PostAuthNavbar />
                  <AboutUs />
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
              path="highlights"
              element={
                <>
                  <PostAuthNavbar />
                  <Highlights />
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
