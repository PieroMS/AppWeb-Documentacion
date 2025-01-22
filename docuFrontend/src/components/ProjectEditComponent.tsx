import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const UserEditComponent = () => {
    const { id } = useParams(); // Captura el ID del usuario desde la URL
    const [projectName, setProjectName] = useState('');
    const [projectAssignedName, setProjectAssignedName] = useState('');
    const [projectStartDate, setProjectStartDate] = useState('');
    const [projectComment, setProjectComment] = useState('');
    const [projectProgressId, setProjectProgressId] = useState('');
    const [progress, setProgress] = useState([]);
    
    const navigate = useNavigate();

    // Carga los datos del usuario, roles y desarrolladores al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Realizar las solicitudes para obtener roles, desarrolladores y datos del usuario
                const [progressResponse, projectResponse] = await axios.all([
                    axios.get(`${config.apiUrl}/dev/progress/listProgress`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${config.apiUrl}/dev/project/listProjectsById/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                // Actualizar los estados con los datos obtenidos
                setProgress(progressResponse.data.data.map(item => ({ id: item.id, name: item.name })));

                // Cargar datos del usuario en los campos correspondientes
                const project = projectResponse.data.data;
                setProjectName(project.name);
                setProjectAssignedName(project.assigned_name);
                setProjectStartDate(project.start_date);
                setProjectComment(project.comments);
                setProjectProgressId(project.progress_id);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchData();
    }, [id]);

    // Función para actualizar el usuario
    const updateProject = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${config.apiUrl}/dev/project/updateProjects/${id}`, 
                {
                    name : projectName,
                    assigned_name : projectAssignedName,
                    start_date : projectStartDate,
                    comments : projectComment,
                    progress_id : projectProgressId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/proyectos', { state: { successMessage: 'Proyecto actualizado correctamente.' } });
        } catch (error) {
            // if (error.response && error.response.data && error.response.data.errors) {
            //     setValidationErrors(error.response.data.errors);
            // } else {
            //     console.error('Error al actualizar el usuario:', error);
            // }
            console.error('Error al actualizar el usuario:', error);
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
                            <Link to="/proyectos" className='dark:text-gray-200'>Proyectos /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Editar</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white mb-4">
                        Editar Proyecto
                    </h3>
                    <div className="p-4 md:p-4">
                        <form onSubmit={updateProject}>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del usuario"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                        name='projectName'
                                    />
                                </div>                                
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Persona asignada 
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Nombre del asignado"
                                        value={projectAssignedName}
                                        onChange={(e) => setProjectAssignedName(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        name='projectAssignedName'
                                    />
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Fecha de inicio <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={projectStartDate}
                                        onChange={(e) => setProjectStartDate(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Progreso <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={progress.some((item) => item.id == projectProgressId) ? projectProgressId : ""}
                                        onChange={(e) => setProjectProgressId(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-4 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        name="projectProgressId"
                                        required
                                    >
                                        <option value="" disabled>Selecciona el progreso</option>
                                        {progress.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:mr-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Descripción
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Descripción opcional"
                                        onChange={(e) => setProjectComment(e.target.value)}
                                        className="w-full rounded-lg border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1] resize-none"
                                        maxLength={255}
                                        value={projectComment}
                                        name='projectComment'
                                    ></textarea>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-start space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-md font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                                    Aceptar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/proyectos')}
                                    className="px-4 py-2 bg-[#d1d5db] dark:bg-[#c2c5ca] hover:dark:bg-[#d1d5db] hover:bg-[#c2c5ca] text-black rounded-md">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserEditComponent;
