import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ProjectDetailsHeaderComponent from '../../components/ProjectDetailsHeaderComponent';
import ProjectDetailsEndpointComponent from '../../components/ProjectDetailsEndpointComponent';
import ProjectDetailsDonutComponent from '../../components/ProjectDetailsDonutComponent';


const ProjectsDetails = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    return (
        <>            
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {successMessage && (
                            <div className="flex w-full border-l-6 mb-6 border-[#34D399] bg-[#34D399] dark:b bg-opacity-[15%] shadow-md dark:bg-[#1f966a] dark:bg-opacity-30 p-4">
                                <div className="w-full">
                                    <p className="text-base leading-relaxed text-[#125f43] dark:text-[#34D399]">
                                        {successMessage}
                                    </p>
                                </div>
                            </div>
                            )}
                            <ProjectDetailsHeaderComponent />
                            <ProjectDetailsEndpointComponent />
                            <ProjectDetailsDonutComponent />
                        </div>
                    </main>
                </div>
            </div>
        </div></>
    );
};

export default ProjectsDetails;
