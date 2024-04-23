import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login/Login";
import DietPlan from "./users/userDashboard/DietPlan";
import SubsPlan from "./pages/SubsPlan";
import Trainer from "./users/userDashboard/Trainers";
import Services from "./pages/Services";
import Contacts from "./pages/Contact";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import Dasboard from "./components/Dasboard/Dasboard";


const App = () => (
  <Provider store={store}>
    <Box
      width="100vw"
      sx={{ width: { xl: "1488px" } }}
      m="auto"
      style={{ backgroundColor: "lightblue" }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="dietPlan/" element={<DietPlan />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/Subsplan" element={<SubsPlan />} />
        <Route path="/Trainer" element={<Trainer />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </Box>
  </Provider>
);

export default App;
