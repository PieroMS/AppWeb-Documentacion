import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useLocation } from 'react-router-dom';
import trashIcon from '../images/svg/trash.svg';
import editIcon from '../images/svg/edit.svg';
import config from '../config/config';

const AreaComponent = () => {
    const [areaData, setAreaData] = useState([]); // Estado para almacenar data de developers (lista)
    const [loading, setLoading] = useState(true); // Estado para gestionar la carga
    const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal
    const [areaToDelete, setAreaToDelete] = useState(null); // Controla qué progreso eliminar
    const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
    const location = useLocation(); // Obtener la ubicación actual

    useEffect(() => {
        // Verificar si hay un mensaje de éxito en la ubicación y actualizar el estado
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
    }, [location]); // Dependencia para volver a ejecutar cuando cambia la ubicación

    const listDataProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiUrl}/admin/areas/listArea`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAreaData(response.data.data); // Guardar los datos obtenidos en el estado
            setLoading(false); // Finalizar el estado de carga
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        listDataProgress(); // Llamar a la función al montar el componente
    }, []);
    
    const handleDeleteClick = (area) => {
        setAreaToDelete(area); // Establecer el progreso a eliminar
        setShowModal(true); // Mostrar el modal
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${config.apiUrl}/admin/areas/deleteAreas/${areaToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAreaData(areaData.filter(item => item.id !== areaToDelete.id)); // Actualizar la lista de progresos
            setSuccessMessage("Dato eliminado correctamente");
            setShowModal(false); // Cerrar el modal
            
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error('Error al eliminar el area:', error);
        }
    };

    const cancelDelete = () => {
        setShowModal(false); // Cerrar el modal si el usuario cancela
        setAreaToDelete(null); // Resetear el progreso a eliminar
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-[#e5e7eb] dark:bg-[#37496B] p-6 rounded-xl shadow-2xl border border-gray-300 dark:border-[#c2c5ca] max-w-sm w-full">
                        <h2 className="text-lg dark:text-[#fff] font-semibold mb-1">
                            ¿Seguro que quieres eliminar "{areaToDelete?.name}"?
                        </h2>
                        <span className="text-lg dark:text-[#fff] mb-4">
                            Esta acción eliminará a los usuarios de esta área.
                        </span>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={confirmDelete}
                                className="px-5 py-2 bg-[#dc3545] hover:bg-[#bb2d3b] text-white font-medium rounded-lg shadow-md transition-all duration-300">
                                Eliminar
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-5 py-2 bg-[#d1d5db] dark:bg-[#c2c5ca] hover:dark:bg-[#d1d5db] hover:bg-[#c2c5ca] text-black dark:text-gray-200 font-medium rounded-lg shadow-md transition-all duration-300">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mensaje de exito */}
            {successMessage && (
            <div className="flex w-full border-l-6 mb-6 border-[#34D399] bg-[#34D399] dark:b bg-opacity-[15%] shadow-md dark:bg-[#1f966a] dark:bg-opacity-30 p-4">
                <div className="w-full">
                    <p className="text-base leading-relaxed text-[#125f43] dark:text-[#34D399]">
                        {successMessage}
                    </p>
                </div>
            </div>
            )}

            {/* Progresos */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Áreas</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Áreas</li>
                    </ol>
                </nav>
            </div>

            <NavLink
                to="/areas/agregar"
                className="group relative rounded-md py-2 px-4 font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                Agregar
            </NavLink>

            <div className="max-w-full overflow-x-auto mt-4">
                <table className="w-full table-auto dark:bg-boxdark">
                    <thead>
                        <tr className="bg-[#37496B] text-left">
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-11">Nombre</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {areaData.map((area, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark pl-11 bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{area.name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <div className="flex space-x-4">
                                        <Link to={`/areas/editar/${area.id}`}>
                                            <img src={editIcon} alt="editIcon" title="Editar" />
                                        </Link>
                                        <img
                                            src={trashIcon}
                                            alt="trashIcon"
                                            title="Eliminar"
                                            className="cursor-pointer"
                                            onClick={() => handleDeleteClick(area)} // Abre el modal
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AreaComponent;
