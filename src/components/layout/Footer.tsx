
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-sm text-gray-500">
            © 2025 BaseCampMart. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
