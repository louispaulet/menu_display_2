// src/App.jsx

import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Menu from './pages/Menu';
import V1 from './pages/V1';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/v1" element={<V1 />} />
          <Route path="/menu/:id" element={<Menu />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
