import { useState } from 'react';
import { Link, useNavigate, useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const UpdatePasswordComponent = () => {
    const { id } = useParams();
    const [newPassword, setNewPasswrod] = useState('');
    const [confirmPassword, setConfirmPass] = useState('');
    const [validationErrors, setValidationErrors] = useState({});  // Estado para errores de validación

    const navigate = useNavigate();

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${config.apiUrl}/admin/auth/updatePassword/${id}`, 
                {
                    passwordOne: newPassword,
                    passwordTwo: confirmPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/usuarios', { state: { successMessage: 'Contraseña actualizada correctamente' } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Solo mostrar los errores de validación
                setValidationErrors(error.response.data.error);
            } else {
                console.error('Error al actualizar la contraseña:', error);
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
                            <Link to="/usuarios" className='dark:text-gray-200'>Usuarios /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Cambiar Contraseña</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white mb-4">
                        Cambiar Contraseña
                    </h3>
                    <div className="p-4 md:p-4">
                        <form onSubmit={addUser}>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nueva Contraseña <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contraseña"
                                        value={newPassword}
                                        onChange={(e) => setNewPasswrod(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Confirmar Contraseña <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                    {validationErrors.passwordTwo && (
                                        <p className="text-meta-1 text-sm">{validationErrors.passwordTwo[0]}</p>
                                    )}
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

export default UpdatePasswordComponent;
