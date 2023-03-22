import React, { useEffect, useRef } from 'react'

const Score = () => {
  const borderRef = useRef();
 useEffect(() => {
  let progressEnd = 90;
  let progressStart =0;
   const progress = setInterval(() => {
       progressStart++
       if(progressStart === progressEnd){
        clearInterval(progress)
       }
       borderRef.current.style.background = `conic-gradient(rgba(6, 186, 107, 1)${progressStart * 3.6}deg, rgba(6, 186, 107, 0.25) 0deg)`
      },10)

      return () => {
        clearInterval(progress)
      }
 })

  return (
    <section className='flex flex-col items-center gap-3'>
        <div className='stack w-min mx-auto'>
          <div className=' rounded-full scale-110 animate-load transition-all duration-500 ease-in' ref={borderRef} style={{
            background:`conic-gradient(rgba(6, 186, 107, 1) 0deg, rgba(6, 186, 107, 0.25) 0deg)`
          }} >
         
          </div>
            <div className='p-6 aspect-square grid relative after:absolute after:inset-0 after:w-full   after:rounded-full    place-items-center w-fit rounded-full bg-black' >
                <h1 className='text-[#06BA6B] font-semibold text-5xl lg:text-6xl'>81%</h1>
            </div>
        </div>
        <p className='text-[#C9C9C9] font-normal text-lg'>You scored 15/20</p>
        <p className='text-[#06BA6B] font-semibold text-2xl lg:text-3xl'>Congratulations ! 🎉</p>
        <span className='font-semibold text-2xl lg:text-3xl'>User</span>
    </section>
  )
}

export default Score