import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2d3e50] text-white">
      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-6 py-4 bg-[#3c4d61] text-xl">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF aria-label="Facebook" className="hover:text-blue-400 cursor-pointer" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn aria-label="LinkedIn" className="hover:text-blue-400 cursor-pointer" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter aria-label="Twitter" className="hover:text-blue-400 cursor-pointer" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram aria-label="Instagram" className="hover:text-pink-400 cursor-pointer" />
        </a>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 className="font-semibold mb-4">Cavern Resume</h3>
          <ul className="space-y-2">
            <li><a href="#homepage" className="hover:underline">Homepage</a></li>
            <li><a href="#resume-templates" className="hover:underline">Resume Templates</a></li>
            <li><a href="#cv-templates" className="hover:underline">CV Templates</a></li>
            <li><a href="#cover-letters" className="hover:underline">Cover Letters</a></li>
            <li><a href="#resume-builder" className="hover:underline">Resume Builder</a></li>
            <li><a href="#cv-maker" className="hover:underline">CV Maker</a></li>
            <li><a href="#cover-letter-maker" className="hover:underline">Cover Letter Maker</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Learn</h3>
          <ul className="space-y-2">
            <li><a href="#career-blog" className="hover:underline">Career Blog</a></li>
            <li><a href="#how-resume" className="hover:underline">How to Write a Resume</a></li>
            <li><a href="#how-cv" className="hover:underline">How to Write CV</a></li>
            <li><a href="#how-cover-letter" className="hover:underline">How to Write a Cover Letter</a></li>
            <li><a href="#resume-examples" className="hover:underline">Resume Examples</a></li>
            <li><a href="#cover-letter-examples" className="hover:underline">Cover Letter Examples</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Other</h3>
          <ul className="space-y-2">
            <li><a href="#pricing" className="hover:underline">Pricing</a></li>
            <li><a href="#about-us" className="hover:underline">About Us</a></li>
            <li><a href="#ebook" className="hover:underline">eBook Store</a></li>
            <li><a href="#media-kit" className="hover:underline">Media Kit</a></li>
            <li><a href="#help" className="hover:underline">Help Center</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Legal / Contact</h3>
          <ul className="space-y-2">
            <li><a href="#terms" className="hover:underline">Terms of Use</a></li>
            <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#cookie" className="hover:underline">Cookie Policy</a></li>
            <li>
              <a href="mailto:info@cavernresume.com" className="hover:underline">
                info@cavernresume.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs text-gray-400 pb-6">
        &copy; {new Date().getFullYear()} Cavern Resume. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
