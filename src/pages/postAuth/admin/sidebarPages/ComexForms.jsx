import { BookCopy, LocateFixed, SquareCheckBig } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ComexForms = () => {
    
    const navigate = useNavigate();

    return (
        <div className='flex-1 p-14 bg-white text-blue font-bold'>
            <div className=''>
            <h1 className='text-3xl'>Manage Forms</h1>
            </div>

            <div className='mt-9 flex h-max w-ful'>
                <div className='flex gap-3'>

                    <button className='rounded-md flex m-3 p-16 bg-nucolor1 text-nucolor2'>
                        <SquareCheckBig className='self-center w-16 h-16 j'/>
                        <p className='ml-7 self-center text-2xl text-white'>COMEX Tracker</p>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ComexForms;