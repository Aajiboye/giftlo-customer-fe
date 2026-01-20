import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-footer-radial text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col gap-6">
          {/* Social row */}
          <div className="flex items-center gap-4 text-sm">
            <span className="opacity-80">Follow US</span>
            <div className="flex gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:opacity-80" />
              <Twitter className="w-5 h-5 cursor-pointer hover:opacity-80" />
              <Facebook className="w-5 h-5 cursor-pointer hover:opacity-80" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:opacity-80" />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/40" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <nav className="flex gap-6">
              <p className="hover:opacity-80">
                Home
              </p>
              <p className="hover:opacity-80">
                About Us
              </p>
              <p className="hover:opacity-80">
                Services
              </p>
            </nav>

            <span className="opacity-80">© 2024</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
