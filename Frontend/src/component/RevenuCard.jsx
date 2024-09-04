// src/component/RevenuCard.jsx
import React from 'react';

export const RevenuCard = ({ title, ordercount, amount }) => {
  return (
    <div className='bg-white rounded shadow-md p-4'>
      <div className='text-gray-700'>
        {title}
      </div>
      <div className='flex justify-between'>
        <div className = 'text-2xl pt-2'> <b>
        {amount}  
        </b>
        </div>
        {ordercount ? (
          <div className = 'flex cursor-pointer underline flex flex-cols justify-center'>
            
            <div className = 'text-blue-700'>
            {ordercount} order(s)
            </div> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
            </div>
          
        ) : null}
      </div>
    </div>
  );
};

export default RevenuCard;
