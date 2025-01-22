import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import trashIcon from '../images/svg/trash.svg';
import editIcon from '../images/svg/edit.svg';
import config from '../config/config';

const EndpointsDetailsComponent = () => {
    const { id } = useParams();
    const [endpointData, setEndpointData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [endpointToDelete, setEndpointToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
    }, [location]);

    const listDataEndpoint = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiUrl}/dev/endpoint/listEndpoints/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEndpointData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        listDataEndpoint(); // Llamar a la función al montar el componente
    }, []);
    
    const handleDeleteClick = (endpoint) => {
        setEndpointToDelete(endpoint); // Establecer el progreso a eliminar
        setShowModal(true); // Mostrar el modal
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${config.apiUrl}/dev/endpoint/deleteEndpoint/${endpointToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEndpointData(endpointData.filter(item => item.id !== endpointToDelete.id)); // Actualizar la lista de progresos
            setSuccessMessage("Dato eliminado correctamente");
            setShowModal(false); // Cerrar el modal
            
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error('Error al eliminar el endpoint:', error);
        }
    };

    const cancelDelete = () => {
        setShowModal(false); // Cerrar el modal si el usuario cancela
        setEndpointToDelete(null); // Resetear el progreso a eliminar
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
                            ¿Seguro que quieres eliminar "{endpointToDelete?.endpoint_name}"?
                        </h2>
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
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Descripción</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio /</Link>
                        </li>
                        <li>
                            <Link to="/endpoints" className='dark:text-gray-200'>Endpoints /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Detalles</li>
                    </ol>
                </nav>
            </div>

            <NavLink
                to={`/endpoints-details/agregar/${id}`}
                className="group relative rounded-md py-2 px-4 font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                Agregar
            </NavLink>

            <div className="max-w-full overflow-x-auto mt-4">
                <table className="w-full table-auto dark:bg-boxdark">
                    <thead>
                        <tr className="bg-[#37496B] text-left">
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Ruta Controlador</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Nombre Endpoint</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">URL</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Procedure</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Info Bruno</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Request</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Descripción</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Progreso</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Encargado</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white pl-4">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {endpointData.map((endpoint, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.dir_controller}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.endpoint_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.url}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.procedure}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.bruno_data}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className={`font-semibold ${
                                        endpoint.request_name == 'GET' ? 'text-[#33a33c]' : 
                                        endpoint.request_name == 'POST' ? 'text-[#8238e4]' : 
                                        endpoint.request_name == 'PATCH' ? 'text-[#ffba60]' : 
                                        endpoint.request_name == 'PUT' ? 'text-[#d67628]' : 
                                        endpoint.request_name == 'DELETE' ? 'text-[#df2d2d]' : 
                                        'text-black dark:text-white'
                                    }`}>{endpoint.request_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.description}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white w-[100px] text-center rounded-lg" style={{ backgroundColor: endpoint.progress_color }}>{endpoint.progress_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pl-4 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{endpoint.user_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <div className="flex space-x-4">
                                        <Link to={`/endpoints-details/editar/${endpoint.id}`}>
                                            <img src={editIcon} alt="editIcon" title="Editar" />
                                        </Link>
                                        <img
                                            src={trashIcon}
                                            alt="trashIcon"
                                            title="Eliminar"
                                            className="cursor-pointer"
                                            onClick={() => handleDeleteClick(endpoint)} // Abre el modal
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

export default EndpointsDetailsComponent;
