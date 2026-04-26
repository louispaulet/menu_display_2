import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import Homepage from './pages/Homepage';
import About from './pages/About';
import Menu from './pages/Menu';
import V1 from './pages/V1';
import HotSaucePage from './pages/HotSaucePage';
import HotSauceDetails from './components/HotSauceDetails';
import NotFound from './pages/NotFound';
import Recipe from './components/Recipe';
import WineList from './pages/WineList';
import WineBottle from './pages/WineBottle';

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
          <Route path="/recipe/:recipeName" element={<Recipe />} /> {/* New Recipe Route */}
          <Route path="/wines" element={<WineList />} />
          <Route path="/wines/:id" element={<WineBottle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;
