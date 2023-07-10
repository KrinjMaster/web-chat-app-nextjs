const NavBarSkeleton = () => {
  return (
        <section className='h-screen w-72 flex flex-col py-2 justify-between'>
            <div className='bg-gray-700 w-full h-8 rounded-md my-auto'>
                {/* item */}
            </div>
            <div className='flex flex-col gap-1.5 my-auto'>
                <p className='text-gray-500 font-bold ml-1'>Friends</p>
                <div className='bg-gray-700 w-full h-8 rounded-md'>
                    {/* item */}
                </div>
                <div className='bg-gray-700 w-full h-8 rounded-md'>
                    {/* item */}
                </div>
            </div>
            <div className='w-full mt-auto flex gap-2 p-1 items-end justify-between'>
               <div className='rounded-md w-12 h-12 bg-gray-600'/>
               <button className='hover:text-white text-gray-600 stroke-1 bg-zinc-800 bg-opacity-25 hover:bg-opacity-100 p-1.5 rounded-md text-center z-10 transition-colors duration-150 ease-linear'>
                 <svg width="16" height="16" fill="currentColor" className="w-10 h-10" viewBox="0 0 16 16">
                   <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                   <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                 </svg>
               </button>
            </div>
        </section>
  )
}

export default NavBarSkeleton