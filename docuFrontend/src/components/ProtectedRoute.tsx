import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/"); // Redirigir al login si no hay token
        }
    }, [token, navigate]);

    // Mientras verifica el token o redirige, no renderiza nada (puedes mostrar un mensaje de carga si prefieres)
    if (!token) {
        return null;
    }
    return children; // Si hay token, renderiza el componente protegido
};

export default ProtectedRoute;

