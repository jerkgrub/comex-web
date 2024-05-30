import { BookCopy, LocateFixed, SquareCheckBig } from 'lucide-react';
import React, { useState } from 'react';

const Dashboard = () => {

    return (
        <div className='flex-1 p-14 bg-white text-blue font-bold'>
            <div className=''>
            <h1 className='text-3xl'>Welcome, Admin</h1>
            </div>

            <div className='mt-9 flex h-max w-ful '>
                <div className='flex gap-3'>
                    <button className='rounded-md flex m-3 p-16 bg-nucolor1 text-nucolor2'>
                        <SquareCheckBig className='self-center w-16 h-16 j'/>
                        <p className='ml-7 self-center text-2xl text-white'>COMEX Tracker</p>
                    </button>

                    <button className='rounded-md flex m-3 p-16 bg-nucolor1 text-nucolor2'>
                        <BookCopy className='self-center w-16 h-16 j'/>
                        <p className='ml-7 self-center text-2xl text-white'>COMEX Forms</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;