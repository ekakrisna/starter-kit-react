import React from "react";
import {
  BrowserRouter,
  Routes as ReactRoutes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/home";
import SampleReduxPage from "../pages/sample-redux";
import SampleFilterPage from "../pages/sample-filter";
import SampleButtonPage from "../pages/sample-button";
import LoginPage from "../pages/login";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/sample-redux" element={<SampleReduxPage />} />
        <Route path="/sample-filter" element={<SampleFilterPage />} />
        <Route path="/sample-button" element={<SampleButtonPage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
