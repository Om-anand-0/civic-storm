
import { Flag, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <Flag className="h-6 w-6 text-civic-blue" />
              <span className="text-xl font-bold text-civic-blue">CivicStorm</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 max-w-md">
              Empowering citizens to improve their communities through effective reporting and problem solving.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Resources</h3>
              <ul className="text-gray-600 space-y-2">
                <li>
                  <Link to="/report" className="hover:underline">Report Issue</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                </li>
                <li>
                  <a href="#" className="hover:underline">FAQ</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase mb-4">Contact</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:info@civicstorm.com" className="hover:underline">info@civicstorm.com</a>
                </li>
                <li className="flex items-center">
                  <Github className="h-4 w-4 mr-2" />
                  <a href="#" className="hover:underline">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500">© 2025 CivicStorm. All Rights Reserved.</span>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
