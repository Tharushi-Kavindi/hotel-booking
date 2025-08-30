import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

function Navigation() {
  return (
    <nav className="z-50 bg-black/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 text-white py-3 rounded-full mx-4 my-3 relative">
      <div className="flex items-center space-x-8">
        <a href="/" className="text-xl font-bold">
          Horizone
        </a>
        <div className="hidden md:flex space-x-6">
          <a href={`/`} className="transition-colors text-sm">
            Home
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="hidden md:flex">
          <Globe className="h-4 w-4 mr-2" />
          EN
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-xs hidden md:flex"
        >
          <a href="/sign-in">Log In</a>
        </Button>
        <Button
          size="sm"
          asChild
          className="bg-white text-black hover:bg-gray-200 text-xs hidden md:flex"
        >
          <a href="/sign-up">Sign Up</a>
        </Button>
        {/* <a href="/about" className="transition-colors text-sm">
          About
        </a>
        <a href="/contact" className="transition-colors text-sm">
          Contact
        </a> */}
      </div>
    </nav>
  );
}
export default Navigation;
