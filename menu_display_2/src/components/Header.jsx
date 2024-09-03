// src/components/Header.jsx

function Header() {
  return (
    <header className="bg-gradient-to-r from-red-400 via-yellow-500 to-orange-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold font-montserrat">
          <h1>🍽️ Exquisite Menus</h1>
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#hot-sauces" className="hover:underline">Hot sauces</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#v1" className="hover:underline">V1</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
