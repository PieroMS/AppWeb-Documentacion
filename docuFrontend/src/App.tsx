import { useEffect, useState, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";

import Loader from './common/Loader';
import Login from './pages/Authentication/Login';
import routes from './routes';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulación de carga
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />
        
        {/* Rutas protegidas */}
        {routes.map((route, index) => {
          const { path, component: Component } = route;
          return (
            <Route
              key={index}
              path={path}
              element={
                <ProtectedRoute>
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;

