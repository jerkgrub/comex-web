import { BookCopy, LocateFixed } from 'lucide-react';
import React, { useState } from 'react';

const Events = () => {

    return (
        <div className='flex-1 p-14 bg-dark1 text-whitey'>
            <div className=''>
            <h1 className='text-3xl'>Manage Events</h1>
            </div>

            <div className='mt-9 flex h-max w-ful '>
                <div className='flex gap-3'>
                    <button className='rounded-md flex m-3 p-16 bg-gray-800 text-gray-300'>
                        <LocateFixed className='self-center w-16 h-16 j'/>
                        <p className='ml-7 self-center text-2xl'>Create Event</p>
                    </button>

                    <button className='rounded-md flex m-3 p-16 bg-gray-800 text-gray-300'>
                        <BookCopy className='self-center w-16 h-16 j'/>
                        <p className='ml-7 self-center text-2xl'>COMEX Community Programs</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Events;