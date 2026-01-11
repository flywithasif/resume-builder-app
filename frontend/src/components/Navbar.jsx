import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const templateItems = [
    { label: "Resume Template", link: "/resume-template" },
    { label: "CV Template", link: "/cv-template" },
    { label: "Cover Letter Template", link: "/cover-letter-template" },
  ];

  const productItems = [
    { label: "Job Tracker", link: "/job-tracker" },
    { label: "Cavern Career", link: "/CavernCareer" },
    { label: "Resume Builder ", link: "/ResumeBuilder" },
  ];

  const aboutItems = [
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-[#2C3333] px-6 py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-[#E7F6F2] text-2xl font-bold">
          Cavern<span className="text-[#A5C9CA]">Resume</span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#E7F6F2]"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu title="Templates" items={templateItems} />
          <DropdownMenu title="Products" items={productItems} />
          <DropdownMenu title="About" items={aboutItems} />

          <Link
            to="/pricing"
            className="text-[#E7F6F2] hover:text-[#A5C9CA] px-4 py-2"
          >
            Pricing
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-[#E7F6F2] hover:text-[#A5C9CA] px-4 py-2"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#E7F6F2] hover:text-red-400 border border-[#A5C9CA] rounded px-4 py-2 ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="text-[#E7F6F2] hover:text-[#A5C9CA] border border-[#A5C9CA] rounded px-4 py-2 ml-2"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 px-2">
          <DropdownMenu title="Templates" items={templateItems} />
          <DropdownMenu title="Products" items={productItems} />
          <DropdownMenu title="About" items={aboutItems} />

          <Link
            to="/pricing"
            className="block text-[#E7F6F2] hover:text-[#A5C9CA] px-4 py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pricing
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-[#E7F6F2] hover:text-[#A5C9CA] px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block text-[#E7F6F2] hover:text-red-400 border border-[#A5C9CA] rounded px-4 py-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="block text-[#E7F6F2] hover:text-[#A5C9CA] border border-[#A5C9CA] rounded px-4 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
