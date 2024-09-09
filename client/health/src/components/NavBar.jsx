import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "@/assets/assets_frontend/assets";

const NavBar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication...");
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          {
            withCredentials: true,
          }
        );
        console.log("Authentication response:", response);
        setIsAuthenticated(true);

        // Fetch user info
        // const userInfoResponse = await axios.get(
        //   "http://localhost:5000/api/auth/user-info",
        //   {
        //     withCredentials: true,
        //   }
        // );
        // console.log("User info response:", userInfoResponse);
        // setUser(userInfoResponse.data); // Store user data (e.g., name, email) from the response
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false); // If the request fails, user is not authenticated
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(response);
      console.log("logout");
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-500">
      <NavLink to={"/"}>
        <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
      </NavLink>
      <ul className="hidden md:flex items-start gap-4 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctor">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <NavLink to={"/my-profile"}>
                  <p className="hover:text-black cursor-pointer">My Profile</p>
                </NavLink>
                <NavLink to={"/my-appointments"}>
                  <p className="hover:text-black cursor-pointer">
                    My Appointments
                  </p>
                </NavLink>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            type="submit"
            className="btn btn-secondary rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;

// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { assets } from "@/assets/assets_frontend/assets";
// import axios from "axios";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // Check if the user is authenticated
//         await axios.get("http://localhost:5000/api/auth/check", {
//           withCredentials: true,
//         });
//         setIsAuthenticated(true);

//         // Fetch user info
//         const response = await axios.get(
//           "http://localhost:5000/api/auth/user-info",
//           { withCredentials: true }
//         );
//         setUser(response.data); // Store user data (e.g., name, email) from the response
//       } catch (error) {
//         setIsAuthenticated(false); // If the request fails, user is not authenticated
//       }
//     };
//     checkAuth();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         { withCredentials: true }
//       );
//       setIsAuthenticated(false);
//       setUser(null);
//       navigate("/login"); // Redirect to login page after logout
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-b-gray-500">
//       <NavLink to={"/"}>
//         <img className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
//       </NavLink>
//       <ul className="hidden md:flex items-start gap-4 font-medium">
//         <NavLink to={"/"}>
//           <li className="py-1">Home</li>
//           <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to="/doctor">
//           <li className="py-1">All Doctors</li>
//           <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to={"/about"}>
//           <li className="py-1">About</li>
//           <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
//         </NavLink>
//         <NavLink to={"/contact"}>
//           <li className="py-1">Contact</li>
//           <hr className="border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden" />
//         </NavLink>
//       </ul>
//       <div className="flex items-center gap-4">
//         {isAuthenticated ? (
//           <div className="flex items-center gap-2 cursor-pointer group relative">
//             <img
//               className="w-8 rounded-full"
//               src={assets.profile_pic}
//               alt="Profile"
//             />
//             <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />
//             <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
//               <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
//                 <NavLink to={"/my-profile"}>
//                   <p className="hover:text-black cursor-pointer">My Profile</p>
//                 </NavLink>
//                 <NavLink to={"/my-appointments"}>
//                   <p className="hover:text-black cursor-pointer">
//                     My Appointments
//                   </p>
//                 </NavLink>
//                 <p
//                   onClick={handleLogout}
//                   className="hover:text-black cursor-pointer"
//                 >
//                   Logout
//                 </p>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <button
//             onClick={() => navigate("/login")}
//             type="submit"
//             className="btn btn-secondary rounded-full"
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NavBar;
