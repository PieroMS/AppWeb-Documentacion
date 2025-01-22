import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const AreaAddComponent = () => {
    const [areaName, setAreaName] = useState(''); // Estado para el nombre
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    const addArea = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${config.apiUrl}/admin/areas/createAreas`, 
                {
                    name: areaName
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/areas', { state: { successMessage: 'Dato agregado correctamente.' } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            } else {
                console.error('Error al actualizar el request:', error);
            }
        }
    }

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Agregar</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio / </Link>
                            <Link to="/areas" className='dark:text-gray-200'>Áreas /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Agregar</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white mb-4">
                        Agregar Área
                    </h3>
                    <div className="p-4 md:p-4">
                        <form onSubmit={addArea}>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del área"
                                        value={areaName}
                                        onChange={(e) => setAreaName(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                        maxLength={20}
                                        name='areaName'
                                    />
                                    {validationErrors.name && <p className="text-meta-1 text-sm">{validationErrors.name[0]}</p>}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-start space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                                    Aceptar
                                </button>
                                <NavLink
                                    to="/areas"
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

export default AreaAddComponent;
