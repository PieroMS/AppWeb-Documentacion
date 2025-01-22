//EndpointListProjectComponent
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useLocation } from 'react-router-dom';
import config from '../config/config';

const EndpointListProjectComponent = () => {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Endpoints</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Endpoints</li>
                    </ol>
                </nav>
            </div>
            <h2 className="text-lg text-black dark:text-white mb-6">Seleccione el Proyecto</h2>

            {projectData.map((project, index) => (
               <Link 
               to={`/endpoints-details/${project.id}`}
               key={index} 
               className="bg-white hover:bg-[#eceaea] dark:bg-[#24303f] dark:hover:bg-[#37496B] shadow-xl rounded-lg p-6 w-full sm:w-80 md:w-96 lg:w-full mb-6 border block"
                >
                    <h5 className="font-semibold text-black dark:text-white text-xl">{project.project_name}</h5>
                </Link>
            ))}
        </>
    );
};

export default EndpointListProjectComponent;
