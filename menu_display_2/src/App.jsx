import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Menu from './pages/Menu';
import V1 from './pages/V1';
import HotSaucePage from './pages/HotSaucePage'; // Import the HotSaucePage
import HotSauceDetails from './components/HotSauceDetails'; // Import the HotSauceDetails page
import NotFound from './pages/NotFound'; // Import the NotFound component

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
          <Route path="/hot-sauces" element={<HotSaucePage />} /> 
          <Route path="/hot-sauce/:id" element={<HotSauceDetails />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
