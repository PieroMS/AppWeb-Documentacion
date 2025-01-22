import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useLocation } from 'react-router-dom';
import trashIcon from '../images/svg/trash.svg';
import restoreIcon from '../images/svg/restore.svg';
import editIcon from '../images/svg/edit.svg';
import editLock from '../images/svg/padlock.svg'
import config from '../config/config';

const UserComponent = () => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userToModifyStatus, setUserToModifyStatus] = useState(null);
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

    const listDataProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.apiUrl}/admin/users/listUsers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        }
    };

    useEffect(() => {
        listDataProgress();
    }, []);
    
    const handleStatusClick = (user) => {
        setUserToModifyStatus(user);
        setShowModal(true);
    };

    const confirmModifyStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = `${config.apiUrl}/admin/users/${userToModifyStatus.status == 1 ? 'deleteUsers' : 'restoreUsers'}/${userToModifyStatus.id}`;
            const method = userToModifyStatus.status == 1 ? 'delete' : 'patch';

            await axios({
                method,
                url: endpoint,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedUserData = userData.map(user =>
                user.id == userToModifyStatus.id ? { ...user, status: userToModifyStatus.status == 1 ? 0 : 1 } : user
            );

            setUserData(updatedUserData);
            setSuccessMessage(`Usuario ${userToModifyStatus.status == 1 ? 'eliminado' : 'restaurado'} correctamente`);
            setShowModal(false);
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error('Error al modificar el estado del usuario:', error);
        }
    };

    const cancelModify = () => {
        setShowModal(false);
        setUserToModifyStatus(null);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-[#37496B] p-6 rounded-xl shadow-2xl border border-gray-300 dark:border-gray-700 max-w-sm w-full">
                        <h2 className="text-lg dark:text-[#fff] font-semibold dark:text-gray-200 mb-4">
                            ¿Seguro que quieres {userToModifyStatus?.status == 1 ? 'eliminar' : 'restaurar'} a "{userToModifyStatus?.user_name}"?
                        </h2>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={confirmModifyStatus}
                                className={`px-5 py-2 ${userToModifyStatus?.status == 1 ? 'bg-[#dc3545] hover:bg-[#bb2d3b]' : 'bg-[#3e80ff] hover:bg-[#3165c5]'} text-white font-medium rounded-lg shadow-md transition-all duration-300`}>
                                {userToModifyStatus?.status == 1 ? 'Eliminar' : 'Restaurar'}
                            </button>
                            <button
                                onClick={cancelModify}
                                className="px-5 py-2 bg-[#d1d5db] dark:bg-[#c2c5ca] hover:dark:bg-[#d1d5db] hover:bg-[#c2c5ca] text-black dark:text-gray-200 font-medium rounded-lg shadow-md transition-all duration-300">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {successMessage && (
                <div className="flex w-full border-l-6 mb-6 border-[#34D399] bg-[#34D399] dark:b bg-opacity-[15%] shadow-md dark:bg-[#1f966a] dark:bg-opacity-30 p-4">
                    <div className="w-full">
                        <p className="text-base leading-relaxed text-[#125f43] dark:text-[#34D399]">
                            {successMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">Usuarios</h2>
                <nav>
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link to="/inicio" className='dark:text-gray-200'>Inicio /</Link>
                        </li>
                        <li className="text-[#1d4ed8] dark:text-[#93c5fd]">Usuarios</li>
                    </ol>
                </nav>
            </div>

            <NavLink
                to="/usuarios/agregar"
                className="group relative rounded-md py-2 px-4 font-medium bg-[#adeeb6] hover:bg-[#a0dfa8] dark:bg-[#90cc98] dark:hover:bg-[#9ad8a2] dark:text-stroke">
                Agregar
            </NavLink>

            <div className="max-w-full overflow-x-auto mt-4">
                <table className="w-full table-auto dark:bg-boxdark">
                    <thead>
                        <tr className="bg-[#37496B] text-left">
                            <th className="min-w-[220px] py-4 font-medium text-white dark:text-white pl-11">Nombre</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Correo</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Estado</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Rol</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Área</th>
                            <th className="min-w-[150px] py-4 font-medium text-white dark:text-white">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((user, index) => (
                            <tr key={index}>
                                <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark pl-11 bg-[#eceaea] dark:bg-boxdark">
                                    <h5 className="font-medium text-black dark:text-white">{user.user_name}</h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <p className="text-black dark:text-white">{user.email}</p>
                                </td>
                                <td className={`border-b border-[#eee] bg-[#eceaea] py-5 dark:border-strokedark  dark:bg-boxdark`}>
                                    <p className={`text-center dark:text-white w-[80px] rounded-md ${
                                        user.status == 1 ? 'text-[#20b920] bg-[#C6EFCE] dark:text-[#C6EFCE] dark:bg-[#149e14] font-bold' : 'text-[#db2525] bg-[#FFC7CE] dark:text-[#FFC7CE] dark:bg-[#b91414] font-bold'
                                    }`}>
                                        {user.status == 1 ? 'Activo' : 'Inactivo'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <p className="text-black dark:text-white">{user.role_name}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <p className="text-black dark:text-white">{user.developer_name}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 dark:border-strokedark bg-[#eceaea] dark:bg-boxdark">
                                    <div className="flex space-x-4">
                                        <Link to={`/usuarios/editar/${user.id}`}>
                                            <img src={editIcon} alt="editIcon" title="Editar" />
                                        </Link>
                                        <img
                                            src={user.status == 1 ? trashIcon : restoreIcon}
                                            alt="trashIcon"
                                            title={user.status == 1 ? "Eliminar" : "Restaurar"}
                                            className="cursor-pointer"
                                            onClick={() => handleStatusClick(user)}
                                        />
                                        <Link to={`/usuarios/editar-contraseña/${user.id}`}>
                                            <img src={editLock} alt="editIcon" title="Password" />
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

export default UserComponent;

