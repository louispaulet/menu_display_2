import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import ScrollProgressBar from './components/ScrollProgressBar';

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
    <div className="page-shell animate-fade-in">
      <div className="mx-auto max-w-3xl space-y-4 p-8">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-10 w-3/4" />
        <div className="skeleton h-5 w-full max-w-md" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 rounded-lg border border-stone-200/60 bg-white/60 p-5">
              <div className="skeleton aspect-[4/3] w-full rounded-md" />
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
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
