import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const ProjectDetailsHeaderComponent = () => {
    const { id } = useParams(); 
    const [projectName, setProjectName] = useState('');
    const [projectAssignedName, setProjectAssignedName] = useState('');
    const [projectStartDate, setProjectStartDate] = useState('');
    const [projectComment, setProjectComment] = useState('');
    const [projectProgressName, setProjectProgressName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const projectResponse = await axios.get(`${config.apiUrl}/dev/project/listAllProjectsById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const project = projectResponse.data.data[0];
                setProjectName(project.project_name.toUpperCase());
                setProjectAssignedName(project.assigned_name);
                setProjectStartDate(project.start_date);
                setProjectComment(project.comments);
                setProjectProgressName(project.progress_name);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <div className="mb-3 flex flex-col gap-3">
                <nav className='mb-3'>
                    <ol className="flex items-center gap-2 text-sm mb-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio / </Link>
                            <Link to="/proyectos" className='dark:text-gray-200'>Proyectos /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Detalle del proyecto</li>
                    </ol>
                </nav>
                <h2 className="text-4xl font-semibold border-b border-[#666666] dark:border-[#bdbdbd] pb-2 text-black dark:text-white mb-2">
                    {projectName}
                </h2>
            </div>
            <div>
                <div className="flex flex-col sm:flex-column gap-y-2 pb-12">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col sm:flex-row">
                            <span className="font-medium text-gray-600 dark:text-gray-400 mr-2">Persona asignada:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{projectAssignedName ? projectAssignedName : '-'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="font-medium text-gray-600 dark:text-gray-400 mr-2">Fecha de inicio:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{projectStartDate}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="font-medium text-gray-600 dark:text-gray-400 mr-2">Estado:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{projectProgressName ? projectProgressName : '-'}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row">
                            <span className="font-medium text-gray-600 dark:text-gray-400 mr-2">Descripción:</span>
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{projectComment ? projectComment : 'Sin descripción'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectDetailsHeaderComponent;
