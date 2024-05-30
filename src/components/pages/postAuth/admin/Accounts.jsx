import { BookCopy, LocateFixed, SquareCheckBig } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
    
    const navigate = useNavigate();
    const btn_comexforms = () => {
        console.log('COMEX Forms');
        navigate('/admin/comexforms');
    }

    return (
        <div className='flex-1 p-14 bg-white text-blue font-bold'>
            <div className=''>
            <h1 className='text-3xl'>Manage Accounts</h1>
            </div>

            <div className='bg-black flex'>
                
            </div>

        </div>
    );
};

export default Accounts;