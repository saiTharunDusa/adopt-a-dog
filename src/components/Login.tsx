import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await axios.post('https://frontend-take-home-service.fetch.com/auth/login',{
                name,
                email
            },{
                withCredentials : true
            });

            const res = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                withCredentials : true
            });

            console.log(res);
            
            navigate("/dogs/search");
        }
        catch(err){
            navigate("/");
            console.log(err);
        }
    };
      
      
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Adopt-A-Dog
      </h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 md:p-10 lg:p-12 bg-white border border-gray-300 text-black rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-lg"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Full Name"
          className="p-3 sm:p-4 my-3 sm:my-4 w-full bg-gray-100 rounded-lg placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
          className="p-3 sm:p-4 my-3 sm:my-4 w-full bg-gray-100 rounded-lg placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="p-3 sm:p-4 my-4 sm:my-6 w-full bg-red-600 hover:bg-red-700 text-white transition-colors rounded-lg font-semibold"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
