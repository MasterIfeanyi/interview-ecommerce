import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './Layout/Layout';
import RequireAuth from './features/auth/RequireAuth';
import Content from './components/Content';
import Convert from './components/Convert';
import MarketWatch from './components/MarketWatch';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="profile" element={<Bank />} />
          <Route path="history/:id" element={<History />} />
          <Route path="deposit/:id" element={<Deposit />} />
          <Route path="withdraw/:id" element={<Withdraw />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
