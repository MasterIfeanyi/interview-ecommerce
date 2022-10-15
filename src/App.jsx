import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './Layout/Layout';
import Content from './components/Content';
import Convert from './components/Convert';
import MarketWatch from './components/MarketWatch';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MarketWatch />} />
        <Route path="convert" element={<Convert />} />
        <Route path="stocks" element={<Content />} />
        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
