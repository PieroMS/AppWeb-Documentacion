import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../config/config';

const EndpointDetailsAddComponent = () => {
    const { id } = useParams();
    const [endDirController, setEndDirController] = useState('');
    const [endName, setEndName] = useState('');
    const [endUrl, setEndUrl] = useState('');
    const [endProcedure, setEndProcedure] = useState('');
    const [endBrunoData, setEndBrunoData] = useState('');
    const [endRequestId, setEndRequestId] = useState('');
    const [endDescription, setEndDescription] = useState('');
    const [endProgressId, setEndProgressId] = useState('');
    const [endUserId, setEndUserId] = useState('');
    const [request, setRequest] = useState([]);
    const [progress, setProgress] = useState([]);
    const [user, setUser] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    const navigate = useNavigate();

    const addEndpoint= async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${config.apiUrl}/dev/endpoint/createEndpoints/${id}`, 
                {
                    dir_controller : endDirController,
                    endpoint_name : endName,
                    url : endUrl,
                    procedure : endProcedure,
                    bruno_data : endBrunoData,
                    request_id : endRequestId,
                    description : endDescription,
                    progress_id : endProgressId,
                    user_id : endUserId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate(`/endpoints-details/${id}`, { state: { successMessage: 'Dato agregado correctamente.' } });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            }
             else {
                console.error('Error al agregar el usuario:', error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                const [requestResponse, progressResponse, userResponse] = await axios.all([
                    axios.get(`${config.apiUrl}/dev/requestType/listRequestsType`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${config.apiUrl}/dev/progress/listProgress`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`${config.apiUrl}/dev/user/listJustUser`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
    
                setRequest(requestResponse.data.data.map(item => ({ id: item.id, name: item.name })));
                setProgress(progressResponse.data.data.map(item => ({ id: item.id, name: item.name })));
                setUser(userResponse.data.data.map(item => ({ id: item.id, name: item.name })));
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Agregar</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio / </Link>
                            <Link to="/endpoints" className='dark:text-gray-200'>Endpoints / </Link>
                            <Link to={`/endpoints-details/${id}`} className='dark:text-gray-200'>Detalles / </Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Agregar</li>
                    </ol>
                </nav>
            </div>

            <div className="mb-10 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white mb-4">
                        Agregar Endpoint
                    </h3>
                    <div className="p-4 md:p-4">
                        <form onSubmit={addEndpoint}>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Ruta Controlador <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="ControllerFolder/ExampleController"
                                        value={endDirController}
                                        maxLength={100}
                                        onChange={(e) => setEndDirController(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Nombre Endpoint <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Endpoint"
                                        value={endName}
                                        maxLength={100}
                                        onChange={(e) => setEndName(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                    {validationErrors.endpoint_name &&
                                        validationErrors.endpoint_name.map((error, index) => (
                                            <p key={index} className="text-meta-1 text-sm">
                                                {error}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        URL <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="{{localhots}}/admin/example"
                                        value={endUrl}
                                        maxLength={255}
                                        onChange={(e) => setEndUrl(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Procedure
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="usp_example"
                                        value={endProcedure}
                                        maxLength={100}
                                        onChange={(e) => setEndProcedure(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                    />
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Ruta Bruno <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="BrunoFolder/Example"
                                        value={endBrunoData}
                                        maxLength={100}
                                        onChange={(e) => setEndBrunoData(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    />
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Request <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={endRequestId}
                                        onChange={(e) => setEndRequestId(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-4 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    >
                                        <option value="" disabled>Selecciona el request</option>
                                        {request.map((request) => (
                                            <option key={request.id} value={request.id}>{request.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Progreso <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={endProgressId}
                                        onChange={(e) => setEndProgressId(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-4 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    >
                                        <option value="" disabled>Selecciona el progreso</option>
                                        {progress.map((progress) => (
                                            <option key={progress.id} value={progress.id}>{progress.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Encargado <span className="text-meta-1">*</span>
                                    </label>
                                    <select
                                        value={endUserId}
                                        onChange={(e) => setEndUserId(e.target.value)}
                                        className="w-full rounded border-[1.5px] border-[#c6cedd] bg-transparent py-4 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1]"
                                        required
                                    >
                                        <option value="" disabled>Selecciona el encargado</option>
                                        {user.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col gap-6 xl:mr-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Descripción <span className="text-meta-1">*</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Descripción"
                                        onChange={(e) => setEndDescription(e.target.value)}
                                        className="w-full rounded-lg border-[1.5px] border-[#c6cedd] bg-transparent py-3 px-5 font-medium outline-none focus:border-[#37496B] disabled:cursor-default disabled:bg-whiter dark:border-[#414141] dark:bg-form-input dark:focus:border-[#d1d1d1] resize-none"
                                        maxLength={255}
                                        required
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
                                    to={`/endpoints-details/${id}`}
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

export default EndpointDetailsAddComponent;
