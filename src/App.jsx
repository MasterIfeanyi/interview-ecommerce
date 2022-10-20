import { Routes, Route, Navigate } from "react-router-dom"
import Layout from './Layout/Layout';
import RequireAuth from './feature/auth/RequireAuth';
import Login from './feature/auth/Login';
import Register from './feature/register/Register';
import Product from './feature/products/Product';
import Profile from './feature/profile/Profile';
import Update from './feature/profile/Update';
import Home from "./components/Home";

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
          <Route path="profile/:id" element={<Profile />} />
          <Route path="products" element={<Product />} />
          <Route path="update/:id" element={<Update />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
