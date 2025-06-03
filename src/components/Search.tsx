import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";


const Search : React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try{    
            const res = await axios.post("https://frontend-take-home-service.fetch.com/auth/logout", {}, {
                withCredentials: true,
            });
            navigate("/");
            console.log(res);
        }catch(err){
            console.log(err);
        }
        console.log("Logging out...");
      };
      
    return(
        <div className="navbar bg-red-500 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-white text-xl">Adopt-A-Dog</a>
            </div>
            <div className="flex gap-2">
                <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto text-black bg-white" />
                <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-red-500 rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
                </div>
            </div>
        </div>
    )
}

export default Search;