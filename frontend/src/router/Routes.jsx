// src/router/Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Pricing from "../pages/Pricing";
import Dashboard from "../pages/Dashboard";
import CVTemplate from "../pages/CVTemplate";
import ResumeTemplate from "../pages/ResumeTemplate";
import CoverLetterTemplate from "../pages/CoverLetterTemplate";
import TemplateOptions from "../pages/TemplateOptions";
import UploadResume from "../pages/UploadResume.jsx";

// Cover Letter Module
import CoverBuilder from "../CoverLetter/CoverBuilder";
import CoverTemplateOptions from "../CoverLetter/CoverTemplateOptions";
import UploadCover from "../CoverLetter/UploadCover";

// Tools & Builders
import CavernCareer from "../tools/CavernCareer";
import ResumeBuilder from "../tools/ResumeBuilder";

// Not found
import NotFound from "../pages/NotFound";

// Auth
import AuthLayout from "../auth/AuthLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ForgotPassword from "../auth/ForgotPassword";

// Components
import ProtectedRoute from "./ProtectedRoute.jsx"; // ✅ same folder, so "./"

const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/cv-template" element={<CVTemplate />} />
      <Route path="/resume-template" element={<ResumeTemplate />} />
      <Route path="/cover-letter-template" element={<CoverLetterTemplate />} />
      <Route path="/upload-resume" element={<UploadResume />} />

      {/* Resume Template Options */}
      <Route path="/template-options/:templateId" element={<TemplateOptions />} />

      {/* Cover Letter Options */}
      <Route path="/cover-template-options/:templateId" element={<CoverTemplateOptions />} />
      <Route path="/upload-cover" element={<UploadCover />} />

      {/* Auth (nested) */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Backward-compat redirects */}
      <Route path="/login" element={<Navigate to="/auth/login" replace />} />
      <Route path="/register" element={<Navigate to="/auth/register" replace />} />
      <Route path="/forgot-password" element={<Navigate to="/auth/forgot-password" replace />} />

      {/* Protected */}
      <Route
        path="/CavernCareer"
        element={
          <ProtectedRoute>
            <CavernCareer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resume/builder/:templateId"
        element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cover/builder/:templateId"
        element={
          <ProtectedRoute>
            <CoverBuilder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
