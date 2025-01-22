import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import EndpointsDetailsComponent from '../../components/EndpointsDetailsComponent';


const EndpointDetails = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-6 2xl:pt-10">
                            <EndpointsDetailsComponent />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default EndpointDetails;
