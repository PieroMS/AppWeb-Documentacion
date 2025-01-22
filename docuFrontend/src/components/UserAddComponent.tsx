import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const UserAddComponent = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRolId, setUserRolId] = useState('');
    const [userAreaId, setUserAreaId] = useState('');
    const [roles, setRoles] = useState([]);
    const [areas, setAreas] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});  // Estado para errores de validación

    const navigate = useNavigate();

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${config.apiUrl}/admin/auth/registerUser`, 
                {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    rol_id: userRolId,
                    area_id: userAreaId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/usuarios', { state: { successMessage: 'Dato agregado correctamente.' } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Solo mostrar los errores de validación
                setValidationErrors(error.response.data.error);
            } else {
                console.error('Error al agregar el usuario:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const [rolesResponse, developersResponse] = await axios.all([
                    axios.get(`${config.apiUrl}/admin/roles/listRoles`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${config.apiUrl}/admin/areas/listArea`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
    
                setRoles(rolesResponse.data.data.map(item => ({ id: item.id, name: item.name })));
                setAreas(developersResponse.data.data.map(item => ({ id: item.id, name: item.name })));
            } catch (error) {
                console.error("Error fetching roles or developers:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Agregar</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio / </Link>
                            <Link to="/usuarios" className='dark:text-gray-200'>Usuarios /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Agregar</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white mb-4">
                        Agregar Usuario
                    </h3>
                    <div className="p-4 md:p-4">
                        <form onSubmit={addUser}>
                            <div className="mb-6 flex flex-col gap-6 mr-0 xl:mr-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del usuario"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                    {validationErrors.name &&
                                        validationErrors.name.map((error, index) => (
                                            <p key={index} className="text-meta-1 text-sm">
                                                {error}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Email <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="usuario131@devdatep.com"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                    {validationErrors.email &&
                                        validationErrors.email.map((error, index) => (
                                            <p key={index} className="text-meta-1 text-sm">
                                                {error}
                                            </p>
                                        )
                                    )}
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Contraseña <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contraseña"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Rol <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={userRolId}
                                        onChange={(e) => setUserRolId(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-4 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    >
                                        <option value="" disabled>Selecciona un rol</option>
                                        {roles.map((rol) => (
                                            <option key={rol.id} value={rol.id}>{rol.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Desarrollador <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={userAreaId}
                                        onChange={(e) => setUserAreaId(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-4 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    >
                                        <option value="" disabled>Selecciona un desarrollador</option>
                                        {areas.map((dev) => (
                                            <option key={dev.id} value={dev.id}>{dev.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-start space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                                    Aceptar
                                </button>
                                <NavLink
                                    to="/usuarios"
                                    className="px-4 py-2 bg-[#d1d5db] dark:bg-[#c2c5ca] hover:dark:bg-[#d1d5db] hover:bg-[#c2c5ca] text-black rounded-md">
                                    Cancelar
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserAddComponent;
