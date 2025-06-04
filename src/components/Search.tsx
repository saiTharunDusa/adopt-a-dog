import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "./constant";

const Search: React.FC = () => {

    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    {/* Logout */}
    const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(BASE_URL + "/auth/logout", {}, {
                withCredentials: true,
            });
            setIsAuthenticated(false);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="navbar bg-red-500 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-white text-xl">Adopt-A-Dog</a>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-red-500 rounded-box z-50 mt-3 w-52 p-2 shadow text-white">
                        <li><a href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Search;