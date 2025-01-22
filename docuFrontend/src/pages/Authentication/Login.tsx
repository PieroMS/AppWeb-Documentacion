import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from '../../config/config';
// import SignIn from './pages/Authentication/SignIn';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {`${config.apiUrl}/admin/progress/listProgress`
      const response = await axios.post(`${config.apiUrl}/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Guarda el token en el localStorage
        localStorage.setItem('userName', response.data.user);
        localStorage.setItem('userRol', response.data.rol);
      }
      navigate("/inicio");
    } catch (error) {
      setErrorMessage("Datos inválidos. Por favor, verifica tu correo y contraseña.");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center justify-center w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <div className="w-full p-4 sm:p-8">
            <h2 className="mb-9 text-3xl font-bold text-black text-center">
              Iniciar Sesión
            </h2>

            {errorMessage && (
              <div className="mb-4 text-red-600 text-center">{errorMessage}</div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black">
                  Correo
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Correo"
                    className="w-full rounded-lg border-2 border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-[#37496B] focus-visible:shadow-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full rounded-lg border-2 border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-[#37496B] focus-visible:shadow-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Ingresar"
                  className="w-full cursor-pointer rounded-lg bg-[#adeeb6] p-4 text-[#37496B] font-medium transition hover:bg-opacity-80"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
