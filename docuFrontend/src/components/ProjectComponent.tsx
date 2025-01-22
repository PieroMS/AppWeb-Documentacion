import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useLocation } from 'react-router-dom';
import trashIcon from '../images/svg/trash.svg';
import editIcon from '../images/svg/edit.svg';
import eyeIcon from '../images/svg/eye.svg';
import config from '../config/config';

const ProjectComponent = () => {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const location = useLocation();

    useEffect(() => {
        // Verificar si hay un mensaje de éxito en la ubicación y actualizar el estado
        if (location.state && location.state.successMessage) {
            setSuccessMessage(location.state.successMessage);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
    }, [location]); // Dependencia para volver a ejecutar cuando cambia la ubicación

    const listDataProject = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiUrl}/dev/project/listProjects`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjectData(response.data.data); // Guardar los datos obtenidos en el estado
            setLoading(false); // Finalizar el estado de carga
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        listDataProject(); // Llamar a la función al montar el componente
    }, []);
    
    const handleDeleteClick = (roles) => {
        setProjectToDelete(roles); // Establecer el progreso a eliminar
        setShowModal(true); // Mostrar el modal
    };

    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${config.apiUrl}/dev/project/deleteProjects/${projectToDelete.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjectData(projectData.filter(item => item.id !== projectToDelete.id)); // Actualizar la lista de progresos
            setSuccessMessage("Dato eliminado correctamente");
            setShowModal(false); // Cerrar el modal
            
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error('Error al eliminar al desarrollador:', error);
        }
    };

    const cancelDelete = () => {
        setShowModal(false); // Cerrar el modal si el usuario cancela
        setProjectToDelete(null); // Resetear el progreso a eliminar
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-[#e5e7eb] dark:bg-[#37496B] p-6 rounded-lg shadow-2xl border dark:border-[#c2c5ca]">
                        <h2 className="text-xl dark:text-[#fff] mb-4 font-bold">¿Seguro que quieres eliminar "{projectToDelete?.project_name}"?</h2>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-[#dc3545] hover:bg-[#bb2d3b] text-white rounded-md">
                                Eliminar
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-[#d1d5db] dark:bg-[#c2c5ca] hover:dark:bg-[#d1d5db] hover:bg-[#c2c5ca] text-black rounded-md">
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
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Proyectos</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Proyectos</li>
                    </ol>
                </nav>
            </div>

            <NavLink
                to="/proyectos/agregar"
                className="group relative rounded-md py-2 px-4 font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                Agregar
            </NavLink>
            
            <div className="max-w-full overflow-x-auto mt-4">
                <table className="w-full table-auto dark:bg-boxdark">
                    <thead>
                        <tr className="bg-[#37496B] text-left">
                            <th className="min-w-[220px] py-4 font-medium text-white dark:text-white pl-11">Nombre</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Persona Asignada</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Fecha de Inicio</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Commentarios</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Progreso</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectData.map((project, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark pl-11 bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{project.project_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{project.assigned_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{project.start_date}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 pr-3 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <p className="text-black dark:text-white">{project.comments}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium p-1 w-[100px] text-center rounded-lg text-black dark:text-white" style={{ backgroundColor: project.color }}>{project.progress_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <div className="flex space-x-4">
                                        <Link to={`/proyectos/editar/${project.id}`}>
                                            <img src={editIcon} alt="editIcon" title="Editar" />
                                        </Link>
                                        <img
                                            src={trashIcon}
                                            alt="trashIcon"
                                            title="Eliminar"
                                            className="cursor-pointer"
                                            onClick={() => handleDeleteClick(project)} // Abre el modal
                                        />
                                        <Link to={`/proyectos/detalle-de-proyecto/${project.id}`}>
                                            <img src={eyeIcon} alt="eyeIcon" title="Ver Detalles" />
                                        </Link>
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

export default ProjectComponent;
