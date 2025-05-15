import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '@/pages/Home'
import LastMatch from '@/pages/LastMatch';
import MatchDetails from '@/pages/MatchDetails';
import SquadPage from '@/pages/Squad';
import MatchesPage from '@/pages/Matches';
import Competition from '@/pages/Competition';
import Standing from '@/pages/Standing';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/elenco" element={<SquadPage />} />
        <Route path="/partidas/ultima" element={<LastMatch />} />
        <Route path="/partidas/:id" element={<MatchDetails />} />
        <Route path="/partidas" element={<MatchesPage />} />
        <Route path="/competicoes" element={<Competition />} />
        <Route path="/classificacao" element={<Standing />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;