function AdminLogin(){

    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Admin Login
                </h2>

            <input 
               type="email"
               placeholder="Enter Email"  
               className="w-full border p-3 mb-4 rounded"/>

            <input
               type="password"
               placeholder="Enter Password"  
               className="w-full border p-3 mb-4 rounded"/>

            <button className="w-full bg-green-500 text-white p-3 rounded">
                Login
                </button>      
            </div>
        </div>
    );
}

export default AdminLogin;