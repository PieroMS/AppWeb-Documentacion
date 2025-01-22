import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from '../images/user/user.jpg';
import logoutIcon from '../images/svg/logout.svg';
import config from '../config/config';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const navigate = useNavigate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // Función para hacer logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      await axios.post(`${config.apiUrl}/dev/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRol');
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  
  const nombreUsuario = localStorage.getItem('userName');

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block font-medium text-black dark:text-white">
            {nombreUsuario}
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserProfile} alt="UserProfile" className='rounded-full' />
        </span>

        <svg
          className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'}`}
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 py-4 px-6 text-black dark:text-white text-sm font-medium duration-300 ease-in-out hover:bg-[#eceaea] active:bg-[#f1efef] dark:hover:bg-[#37496B] dark:active:dark:bg-[#253450] lg:text-base"
        >
          <img src={logoutIcon} alt="logout" />
          Cerrar Sesión
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
