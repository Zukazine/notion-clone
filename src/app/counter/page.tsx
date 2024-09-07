'use client'

import { useState } from 'react';
import { BiSolidArrowToLeft } from 'react-icons/bi';
import Link from 'next/link';

const Counter = () => {
	const [count, setCount] = useState(0);

  return (
		<>
		<Link
			href={'./'}
		>
			<BiSolidArrowToLeft className='absolute text-white text-6xl ml-8 mt-4'/>
    </Link>
		<div className='grid h-screen place-items-center bg-black text-white'>
			<div className='flex flex-col items-center gap-12'>
				<div className='text-6xl'>Click Count: <span className='text-sky-300'>{count}</span></div>
				<div className='flex space-x-4'>
					<button 
						onClick={() => setCount(count + 1)}
						className='border-2 border-white py-2 px-8 rounded-2xl hover:border-sky-300 hover:bg-sky-300 hover:text-black'
					>Plus Me!</button>	
					<button 
						onClick={() => setCount(count - 1)}
						className='border-2 border-white py-2 px-8 rounded-2xl hover:border-red-300 hover:bg-red-300 hover:text-black'
					>Subtract Me!</button>
				</div>
			</div>
		</div>
		</>
  );

}

export default Counter;