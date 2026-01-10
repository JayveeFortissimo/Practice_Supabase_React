
const Profile = () => {
    
  return (
   <div className="flex flex-col gap-20">
    <header className="w-full flex flex-col justify-center items-center text-center min-h-[10rem] gap-5">
        <h1 className="text-5xl font-bold text-neutral-700">Profile Section</h1>
       <p className="text-xl text-gray-500">Hello, Jayvee!?</p>
    </header> 
     <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border roudned shadow-2xl">

      </div>

      <div className="border rounded shadow-2xl">

      </div>
    </div>
   </div>
  )
}

export default Profile
