// import React, { useState, useContext } from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/assets'
// import {Link} from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext'; 

// const Navbar = ({setShowLogin}) => {

//     const [menu,setMenu] = useState("menu");
//     const [showDropdown, setShowDropdown] = useState(false);

//     const {getTotalCartAmount,token,setToken}=useContext(StoreContext);

//   return (
//     <div className='navbar'>
//       <Link to='/'> <img src={assets.logo} alt="" className="logo" /></Link>
//       <ul className="navbar-menu">
//         <Link to ='/'onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
//         <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
//         <a href='#app-download' onClick={()=>setMenu("mobile_app")} className={menu==="mobile_app"?"active":""}>mobile-app</a>
//         <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>
//       </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />
//         <div className="navbar-search-icon">
//             <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//             <div className={getTotalCartAmount()===0?"":"dot"}></div>
//         </div>
//         {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
//         :<div className='navbar-profile'>
//           <img src={assets.profile_icon} alt="" />
//           <ul className="nav-profile-dropdown">
//             <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
//             <hr />
//             <li><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
//           </ul>
          
        
//       </div>}
//     </div>
//     </div>
//   )
// }

// export default Navbar;

import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom'; // ✅ useNavigate, not Navigate
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [showDropdown, setShowDropdown] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate(); // ✅ Add this

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setShowDropdown(false);
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile_app")} className={menu === "mobile_app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img
              src={assets.profile_icon}
              alt=""
              onClick={() => setShowDropdown(!showDropdown)}
              style={{ cursor: "pointer" }}
            />
            {showDropdown && (
              <ul className="nav-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={handleLogout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
