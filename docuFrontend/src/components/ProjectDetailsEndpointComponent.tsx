import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config/config';

const ProjectDetailsEndpointComponent = () => {
    const { id } = useParams();
    const [endpointData, setEndpointData] = useState([]);

    const listDataEndpoint = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiUrl}/dev/endpoint/listEndpoints/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEndpointData(response.data.data);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        listDataEndpoint(); // Llamar a la función al montar el componente
    }, []);

    return (
        <>
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 pb-2 font-semibold text-black dark:text-white">Descripción</h2>
            </div>

            <div className="max-w-full overflow-x-auto">
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ProjectDetailsEndpointComponent;
