import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from '@/pages/Home'
import LastMatch from '@/pages/LastMatch';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/match/last" element={<LastMatch />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;