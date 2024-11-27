import { type FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Issue from './pages/Issue/Issue';
import Stats from './pages/Stats/Stats';
import ErrorNotFound from './pages/ErrorNotFound/ErrorNotFound';
import MainLayout from './components/MainLayout/MainLayout';

const App: FC = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Issue />} path="/issue/:user/:repo/:number" />
        <Route element={<Stats />} path="/stats" />
        <Route element={<ErrorNotFound />} path="*" />
      </Routes>
    </MainLayout>
  </Router>
);

export default App;
