import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-red-400 via-yellow-500 to-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold font-montserrat">
          <h1>🍽️ Exquisite Menus</h1>
        </a>
        <nav className="md:block hidden">
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#hot-sauces" className="hover:underline">Hot sauces</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#v1" className="hover:underline">V1</a></li>
          </ul>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-gradient-to-r from-red-400 via-yellow-500 to-orange-500 p-4">
          <ul className="space-y-4">
            <li><a href="#" className="block text-white hover:underline">Home</a></li>
            <li><a href="#hot-sauces" className="block text-white hover:underline">Hot sauces</a></li>
            <li><a href="#about" className="block text-white hover:underline">About</a></li>
            <li><a href="#v1" className="block text-white hover:underline">V1</a></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
