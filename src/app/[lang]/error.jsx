'use client'
 
export default function Error({ error, reset }) {
  return (
    <div className="h-[85vh] flex flex-col justify-center items-center ">
      <h2 className="font-semibold text-xl">Something went wrong!</h2>
      <button className="mt-5 bg-custom-blue text-white py-1.5 px-5 rounded-md hover:opacity-70" onClick={() => reset()}>Try again</button>
    </div>
  )
}