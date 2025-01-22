import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const RolesEditComponent = () => {
    const { id } = useParams(); // Obtiene el id de los parámetros de la URL
    const [rolesName, setRolesName] = useState(''); // Estado para el nombre
    const [rolesDescription, setRolesDescription] = useState(''); // Estado para el Description
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.apiUrl}/admin/roles/listRolesById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const { name, description } = response.data.data;
                setRolesName(name);
                setRolesDescription(description);
            } catch (error) {
                console.error('Error al obtener el desarrollador:', error);
            }
        };

        fetchRoles();
    }, [id]);

    const updateRoles = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${config.apiUrl}/admin/roles/updateRoles/${id}`,
                {
                    name: rolesName,
                    description: rolesDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/roles', { state: { successMessage: 'Dato actualizado correctamente.' } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                console.error('Error al actualizar el request:', error);
            }
        }
    };

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Editar</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio / </Link>
                            <Link to="/roles" className='dark:text-gray-200'>Roles /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Editar</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white mb-4">
                        Editar Roles
                    </h3>
                    <div className="p-4 md:p-4">
                        <form onSubmit={updateRoles}>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={rolesName}
                                        onChange={(e) => setRolesName(e.target.value)}
                                        required
                                        name='rolesName'
                                        maxLength={20}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                    />
                                    {validationErrors.name && <p className="text-meta-1 text-sm">{validationErrors.name[0]}</p>}
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Descripción
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={rolesDescription}
                                        onChange={(e) => setRolesDescription(e.target.value)}
                                        className="w-full rounded-lg border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1] resize-none"
                                        maxLength={250}
                                        name='rolesDescription'
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-start space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                                    Aceptar
                                </button>
                                <NavLink
                                    to="/roles"
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
export default RolesEditComponent;