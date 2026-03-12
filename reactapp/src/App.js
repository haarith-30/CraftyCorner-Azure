import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import ViewCraft from './CraftMasterComponents/ViewCraft';
import CraftForm from './CraftMasterComponents/CraftForm';
import CraftSeekerViewCraft from './CraftSeekerComponents/CraftSeekerViewCraft';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';

function App() {
  const token = localStorage.getItem('token');
  let role = '';

  if (token && token.split('.').length === 3) {
    try {
      const decoded = jwtDecode(token);
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (!isExpired) {
        role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      }
    } catch {
      role = '';
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={token ? "/home" : "/login"} />} />
        <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/home" /> : <Signup />} />

        <Route path="/home" element={
          <PrivateRoute roles={['CraftMaster', 'CraftSeeker']} token={token} role={role}>
            <HomePage />
          </PrivateRoute>
        } />
        <Route path="/view-craft" element={
          <PrivateRoute roles={['CraftMaster']} token={token} role={role}>
            <ViewCraft />
          </PrivateRoute>
        } />
        <Route path="/add-craft" element={
          <PrivateRoute roles={['CraftMaster']} token={token} role={role}>
            <CraftForm isEdit={false} />
          </PrivateRoute>
        } />
        <Route path="/edit-craft/:id" element={
          <PrivateRoute roles={['CraftMaster']} token={token} role={role}>
            <CraftForm isEdit={true} />
          </PrivateRoute>
        } />
        <Route path="/explore-crafts" element={
          <PrivateRoute roles={['CraftSeeker']} token={token} role={role}>
            <CraftSeekerViewCraft />
          </PrivateRoute>
        } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;