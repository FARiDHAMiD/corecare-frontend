import { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import MainLayout from "./Components/Layouts/MainLayout";
import SignUp from "./Pages/SignUp";
import Users from "./Pages/Admin/Users";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import { AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import AdminRoute from "./utils/AdminRoute";
import WorkingOnIt from "./StatusCodes/WorkingOnIt";
import PageNotFound from "./StatusCodes/PageNotFound";
import Events from "./Pages/Events";
import Cats from "./Pages/Cats";
import SingleEvent from "./Pages/SingleEvent";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Doctors from "./Pages/Doctors";
import Appointment from "./Components/Appointment";
import DoctorProfile from "./Pages/DoctorProfile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Fragment>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route path="/doctor/:id" element={<DoctorProfile />} />

              <Route element={<PrivateRoute />}>
                <Route path="/appointment/:id" element={<Appointment />} />
                <Route element={<AdminRoute />}>
                  <Route path="/users" element={<Users />} />
                </Route>
                <Route path="/events" element={<Events />} />
                <Route path="/event/:id" element={<SingleEvent />} />
                <Route path="/cats" element={<Cats />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/edit-profile/:id" element={<EditProfile />} />
              </Route>

              <Route path="/working" element={<WorkingOnIt />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Fragment>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
