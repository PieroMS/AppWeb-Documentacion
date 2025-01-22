import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import RequestsTypeComponent from '../../components/RequestsTypeComponent';


const RequestsType = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            <RequestsTypeComponent />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default RequestsType;
