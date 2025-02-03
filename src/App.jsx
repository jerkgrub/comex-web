import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from './components/UserContext';
import { Home } from './pages/postAuth/client';
import { ContactRound, FolderKanban, Gauge, PersonStanding, Zap } from 'lucide-react';
import { Footer } from './components/Footer';
import CertTest from './pages/postAuth/client/profilePages/CertTest';

import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import EngagementAppraisalsPage from './pages/postAuth/client/forms/EngagementAppraisalsPage';

// Pre Authentication
import PreAuthNavbar from './components/navbar/PreAuthNavbar';
import HeroPage from './pages/preAuth/HeroPage';
import RegisterPage from './pages/preAuth/authentication/RegisterPage';
import LoginPage from './pages/preAuth/authentication/LoginPage';
import Users from './pages/postAuth/admin/sidebarPages/Users';
import ForgotPasswordPage from './pages/preAuth/ForgotPasswordPage';
import ResetPasswordPage from './pages/preAuth/ResetPasswordPage';
import ProposeActivityPage from './pages/postAuth/client/ProposeActivityPage';

// Post Authentication {Admin}
import Sidebar, { SidebarItem } from './pages/postAuth/admin/Sidebar';
import Dashboard from './pages/postAuth/admin/sidebarPages/Dashboard';
import Activities from './pages/postAuth/admin/sidebarPages/Activities';
import ComexForms from './pages/postAuth/admin/sidebarPages/ComexForms';
import CreateUserPage from './pages/postAuth/admin/sidebarPages/CreateUserPage';
import ViewActivityPage from './pages/postAuth/admin/sidebarPages/ViewActivityPage';
import InstitutionalPage from './pages/postAuth/client/forms/InstitutionalPage';

// Post Authentication {Client}
import PostAuthNavbar from './components/navbar/PostAuthNavbar';
import Profile from './pages/postAuth/client/Profile';

// Misc
import ScrollToTop from './components/hooks/ScrollToTop';
import CommunityEngagementForm from './pages/postAuth/client/forms/CommunityEngagementForm';
import StudentEngagementForm from './pages/postAuth/client/forms/StudentEngagementForm';
import FormSubmitted from './pages/postAuth/client/forms/FormSubmitted';
import ProtectedRoute from './components/ProtectedRoute';
import ViewUserPage from './pages/postAuth/admin/sidebarPages/ViewUserPage';
import EditUserPage from './pages/postAuth/admin/sidebarPages/EditUserPage';
import CreateActivityPage from './pages/postAuth/admin/sidebarPages/CreateActivityPage';
import EditActivityPage from './pages/postAuth/admin/sidebarPages/EditActivityPage';
import Highlights from './pages/postAuth/client/Highlights';
import AboutUs from './pages/postAuth/client/AboutUs';
import NotFound from './components/NotFound';
import ClientViewAllActivities from './pages/postAuth/client/ClientViewAllActivities';
import ClientViewOneActivity from './pages/postAuth/client/ClientViewOneActivity';
import RegisterActivityPage from './pages/postAuth/client/RegisterActivityPage';
import ClientAppraisals from './pages/postAuth/client/ClientAppraisals';
import ViewAppraisals from './pages/postAuth/admin/ViewAppraisals';
import ViewOneCredit from './pages/postAuth/admin/sidebarPages/ViewOneCredit';
import EditProfilePage from './pages/postAuth/client/profilePages/EditProfilePage';
import ViewAchievementsPage from './pages/postAuth/client/profilePages/ViewAchievementsPage';
import ViewParticipatedActivitiesPage from './pages/postAuth/client/profilePages/ViewParticipatedActivitiesPage';
import AutoCertPage from './pages/postAuth/admin/sidebarPages/AutoCertPage';
import InstitutionalAppraisalPage from './pages/postAuth/client/forms/InstitutionalAppraisalPage';
import ManageAppraisals from './pages/postAuth/admin/ManageAppraisals';
import ViewOneAppraisal from './pages/postAuth/admin/ViewOneAppraisal';
import EvaluationForms from './pages/postAuth/client/EvaluationForms';
import Initiatives from './pages/postAuth/admin/Initiatives';
import Projects from './pages/postAuth/admin/initiativesPages/projectPages/Projects';
import Programs from './pages/postAuth/admin/initiativesPages/programPages/ProgramsPage';
import CreateProgramPage from './pages/postAuth/admin/initiativesPages/programPages/CreateProgramPage';
//
// Hero Page with Navbar and Footer
function HeroPageWithNavbarAndFooter() {
  return (
    <>
      <PreAuthNavbar />
      <HeroPage />
      <AboutUs />
      <Footer />
    </>
  );
}

// Admin Layout
function AdminLayout() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-gray-200">
      <Sidebar>
        <SidebarItem to="/admin/dashboard" icon={<Gauge size={20} />} text="Dashboard" active />
        <SidebarItem to="/admin/users" icon={<ContactRound size={20} />} text="Manage Users" />
        {/* <SidebarItem to="/admin/spez" icon={<Hourglass size={20} />} text="Manage SPEZ" /> */}
        <SidebarItem
          to="/admin/initiatives"
          icon={<PersonStanding size={20} />}
          text="Manage Initiatives"
        />
        <SidebarItem
          to="/admin/review-evaluation-forms"
          icon={<FolderKanban size={20} />}
          text="Review Evaluation Forms"
        />
        {/* <SidebarItem to="/admin/nstp" icon={<Shield size={20} />} text="Manage NSTP" /> */}
        <SidebarItem to="/admin/autocert" icon={<Zap size={20} />} text="AutoCert" />
      </Sidebar>
      <div className={`flex-grow transition-all duration-200 ${expanded ? 'ml-64' : 'ml-16'} p-4`}>
        <Outlet />
      </div>
    </div>
  );
}

// Main App
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
  }, [user]);

  return (
    <SkeletonTheme baseColor="#c0c7d1" highlightColor="#dae3e8">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Pre Authentication */}
            <Route
              path="/reset-password"
              element={
                <>
                  <PreAuthNavbar />
                  <ResetPasswordPage />
                  <Footer />
                </>
              }
            />
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
            <Route
              path="about-us"
              element={
                <>
                  <PreAuthNavbar />
                  <Footer />
                </>
              }
            />
            <Route
              path="forgotpassword"
              element={
                <>
                  <PreAuthNavbar />
                  <ForgotPasswordPage />
                  <Footer />
                </>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="comexforms" element={<ComexForms />} />
              <Route path="activities" element={<Activities />} />

              <Route path="initiatives" element={<Initiatives />} />

              {/* initatives sub-routes scuba*/}
              {/* programs */}
              <Route path="initiatives/programs" element={<Programs />} />
              <Route path="initiatives/programs/new" element={<CreateProgramPage />} />

              {/* projects */}
              <Route path="initiatives/projects" element={<Projects />} />

              {/* activities */}
              <Route path="initiatives/activities" element={<Activities />} />

              <Route path="create-activity" element={<CreateActivityPage />} />
              <Route path="autocert" element={<AutoCertPage />} />

              {/* activities */}
              <Route path="activities/:activityid" element={<ViewActivityPage />} />
              <Route path="activities/:activityid/edit" element={<EditActivityPage />} />

              {/* appraisals */}
              <Route path="review-evaluation-forms" element={<ViewAppraisals />} />
              <Route path="review-evaluation-forms/:appraisalType" element={<ManageAppraisals />} />
              <Route
                path="review-evaluation-forms/view/:appraisalId"
                element={<ViewOneAppraisal />}
              />
              <Route
                path="engagement-appraisals/:activityid"
                element={<EngagementAppraisalsPage />}
              />
              <Route path="engagement-appraisals/credits/:creditid" element={<ViewOneCredit />} />

              <Route path="users" element={<Users />} />
              <Route path="create-user" element={<CreateUserPage />} />
              <Route path="users/:userid" element={<ViewUserPage />} />
              <Route path="users/:userid/edit" element={<EditUserPage />} />
            </Route>

            {/* Client Routes */}
            <Route
              path="/client/*"
              element={
                <ProtectedRoute allowedRoles={['Comex Coordinator', 'Faculty', 'NTP', 'Student']}>
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
                path="view-activities"
                element={
                  <>
                    <PostAuthNavbar />
                    <ClientViewAllActivities />
                    <Footer />
                  </>
                }
              />
              <Route
                path="view-activities/:activityid"
                element={
                  <>
                    <PostAuthNavbar />
                    <ClientViewOneActivity />
                    <Footer />
                  </>
                }
              />
              <Route
                path="engagement-appraisals"
                element={
                  <>
                    <PostAuthNavbar />
                    <ClientAppraisals />
                    <Footer />
                  </>
                }
              />
              <Route
                path="evaluation-forms"
                element={
                  <>
                    <PostAuthNavbar />
                    <EvaluationForms />
                    <Footer />
                  </>
                }
              />
              <Route
                path="propose-activity"
                element={
                  <>
                    <PostAuthNavbar />
                    <ProposeActivityPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="engagement-appraisals-institutional"
                element={
                  <>
                    <PostAuthNavbar />
                    <InstitutionalPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="engagement-appraisals-institutional/:activityId"
                element={
                  <>
                    <PostAuthNavbar />
                    <InstitutionalAppraisalPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="engagement-appraisals/:title"
                element={
                  <>
                    <PostAuthNavbar />
                    <EngagementAppraisalsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="engagement-appraisals/community-engagement/:activityid"
                element={
                  <>
                    <PostAuthNavbar />
                    <CommunityEngagementForm />
                    <Footer />
                  </>
                }
              />
              <Route
                path="cert"
                element={
                  <>
                    <PostAuthNavbar />
                    <CertTest />
                    <Footer />
                  </>
                }
              />
              <Route
                path="view-activities/:activityid/register"
                element={
                  <>
                    <PostAuthNavbar />
                    <RegisterActivityPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="form-submitted"
                element={
                  <>
                    <PostAuthNavbar />
                    <FormSubmitted />
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
                path="profile/edit"
                element={
                  <>
                    <PostAuthNavbar />
                    <EditProfilePage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="profile/view-participated-activities"
                element={
                  <>
                    <PostAuthNavbar />
                    <ViewParticipatedActivitiesPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="profile/view-achievements"
                element={
                  <>
                    <PostAuthNavbar />
                    <ViewAchievementsPage />
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
            <Route path="/studform" element={<StudentEngagementForm />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </SkeletonTheme>
  );
}

export default App;
