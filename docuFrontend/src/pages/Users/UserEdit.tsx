// import React from 'react'
import { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import UserEditComponent from '../../components/UserEditComponent';

const UserEdit = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        <main>
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                <UserEditComponent />
                            </div>
                        </main>
                </div>
            </div>
        </div>
    );
}

export default UserEdit