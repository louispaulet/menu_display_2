import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';

const Homepage = lazy(() => import('./pages/Homepage'));
const About = lazy(() => import('./pages/About'));
const Menu = lazy(() => import('./pages/Menu'));
const V1 = lazy(() => import('./pages/V1'));
const HotSaucePage = lazy(() => import('./pages/HotSaucePage'));
const HotSauceDetails = lazy(() => import('./components/HotSauceDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Recipe = lazy(() => import('./components/Recipe'));
const WineList = lazy(() => import('./pages/WineList'));
const WineBottle = lazy(() => import('./pages/WineBottle'));
const MenuStudio = lazy(() => import('./pages/MenuStudio'));

function PageFallback() {
  return (
    <div className="page-shell">
      <div className="mx-auto max-w-3xl soft-panel p-8 text-center">
        <p className="page-kicker">Exquisite Menus</p>
        <p className="mt-3 text-base text-stone-600">Setting the table...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/about" element={<About />} />
            <Route path="/v1" element={<V1 />} />
            <Route path="/menu/:id" element={<Menu />} />
            <Route path="/hot-sauces" element={<HotSaucePage />} />
            <Route path="/hot-sauce/:id" element={<HotSauceDetails />} />
            <Route path="/recipe/:recipeName" element={<Recipe />} />
            <Route path="/wines" element={<WineList />} />
            <Route path="/wines/:wineKey" element={<WineBottle />} />
            <Route path="/menu-studio" element={<MenuStudio />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <BackToTopButton />
      <Footer />
    </div>
  );
}

export default App;
