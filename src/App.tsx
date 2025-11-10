import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Story from './pages/Story';
import Level1Surabaya from './pages/Level1Surabaya';
import Level2Malang from './pages/Level2Malang';
import Level3Banyuwangi from './pages/Level3Banyuwangi';
import Level4Blitar from './pages/Level4Blitar';
import Level5Madura from './pages/Level5Madura';
import Ending from './pages/Ending';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/story" element={<Story />} />
        <Route path="/level1" element={<Level1Surabaya />} />
        <Route path="/level2" element={<Level2Malang />} />
        <Route path="/level3" element={<Level3Banyuwangi />} />
        <Route path="/level4" element={<Level4Blitar />} />
        <Route path="/level5" element={<Level5Madura />} />
        <Route path="/ending" element={<Ending />} />
      </Routes>
    </Router>
  );
}

export default App;
