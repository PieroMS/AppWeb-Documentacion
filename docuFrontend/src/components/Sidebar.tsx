import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo-devdatep-png-2f7232b4.png';
import closeIcon from '../images/svg/close-icon.svg';
import homeIcon from '../images/svg/home.svg';
import userIcon from '../images/svg/user.svg';
import briefcaseIcon from '../images/svg/briefcase.svg';
import repeatIcon from '../images/svg/repeat.svg';
import endpointIcon from '../images/svg/php.svg';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
  

  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = localStorage.getItem("userRol");
    setUserRole(role);
  }, []);


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-[#37496B] duration-300 ease-linear dark:bg-[#37496B]  lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      
      <div className="flex items-center justify-center pt-6">
        <NavLink to="/inicio">
          <img src={Logo} alt="Logo" className="w-13 my-0 mx-auto mb-1"/>
          <div className='text-white text-center text-base'>Empresa</div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <img src={closeIcon} alt="closeIcon"/>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-2 px-4 lg:mt-9 lg:px-4">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/inicio"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-[#5f78a8] dark:hover:bg-[#253450] ${
                    pathname.includes('inicio') &&
                    'bg-[#5f78a8] dark:bg-[#253450]'
                  }`}
                >
                  <img src={homeIcon} alt="homeIcon"/>
                  Inicio
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/proyectos"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-[#5f78a8] dark:hover:bg-[#253450] ${
                    pathname.includes('proyectos') &&
                    'bg-[#5f78a8] dark:bg-[#253450]'
                  }`}
                >
                  <img src={briefcaseIcon} alt="briefcaseIcon"/>
                  Proyectos
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/endpoints"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-[#5f78a8] dark:hover:bg-[#253450] ${
                    pathname.includes('endpoints') &&
                    'bg-[#5f78a8] dark:bg-[#253450]'
                  }`}
                >
                  <img src={endpointIcon} alt="endpointIcon"/>
                  Endpoints
                </NavLink>
              </li>

              {userRole === "admin" && (
                <li>
                  <NavLink
                    to="/usuarios"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-[#5f78a8] dark:hover:bg-[#253450] ${
                      pathname.includes('usuarios') &&
                      'bg-[#5f78a8] dark:bg-[#253450]'
                    }`}
                  >
                    <img src={userIcon} alt="userIcon"/>
                    Usuarios
                  </NavLink>
                </li>
              )}
              {userRole === "admin" && (
                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/processes' || pathname.includes('processes')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <NavLink
                          to="#"
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-[#5f78a8] dark:hover:bg-[#253450] ${
                            (pathname === '/processes' ||
                              pathname.includes('processes')) &&
                            'bg-[#5f78a8] dark:bg-[#253450]'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <img src={repeatIcon} alt="repeatIcon"/>
                          Procesos
                          <svg
                            className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                              open && 'rotate-180'
                            }`}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                              fill=""
                            />
                          </svg>
                        </NavLink>
                        {/* <!-- Dropdown Menu Start --> */}
                        <div
                          className={`translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/areas"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Áreas
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/progresos"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Progresos
                            </NavLink>
                          </li>
                          <li>
                              <NavLink
                                to="/tipo-requests"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Requests
                              </NavLink>
                            </li>
                          <li>
                              <NavLink
                                to="/roles"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Roles
                              </NavLink>
                            </li>
                            
                            
                          </ul>
                        </div>
                        {/* <!-- Dropdown Menu End --> */}
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
