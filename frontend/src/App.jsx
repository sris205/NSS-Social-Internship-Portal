import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentRegister from "./pages/StudentRegister";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import DailySubmission from "./pages/DailySubmission";
import Application from "./pages/Application";

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
         path="/student-login"
         element={<StudentLogin/>}
         />

      <Route
         path="/admin-login"  
         element={<AdminLogin/>} 
         />

      <Route 
         path="/student-dashboard"
         element={
           <ProtectedRoute>
               <StudentDashboard/>
          </ProtectedRoute>
         }  
         />

      <Route
         path="/admin-dashboard"
         element={
            <AdminProtectedRoute>
                <AdminDashboard/>
            </AdminProtectedRoute>
                }  
         />  

      <Route
         path="/student-register"
         element={<StudentRegister/>}  
      />    

      <Route
         path="/profile"
         element={<ProfilePage />}
         />

      <Route
          path="/submit-day/:day"
          element={<DailySubmission/>}  
         />

      <Route
         path="/apply"
         element={<Application/>}   
        /> 
          
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
