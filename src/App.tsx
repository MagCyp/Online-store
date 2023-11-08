import { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import PrivateRoute from './utils/privateRoute/PrivateRoute';

import SignIn from './pages/auth/signIn/SignIn';
import SignUp from './pages/auth/signUp/SignUp';
import Home from './pages/home/Home';

const App: FC = () => {
  const auth = false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route
          path="/login"
          element={auth ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/register"
          element={auth ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
