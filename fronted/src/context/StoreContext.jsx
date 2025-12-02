import { createContext, useEffect, useState } from "react";
import axios from "axios";
// import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // ✅ fixed typo here
  const url = "http://localhost:4000"
  const [token,setToken] = useState("");
  const [food_list,setFoodList] = useState([])


  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = ()=>{
     let totalAmount = 0;
       for(const item in cartItems)
        {
          if (cartItems[item]>0){
            let itemInfo = food_list.find((product)=>product._id === item);
          totalAmount += itemInfo.price* cartItems[item];
          }
     }
     return totalAmount;
  }

 
  const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");
    console.log("Fetched food list:", response.data);
    setFoodList(response.data.data);
  } catch (error) {
    console.error(" Error fetching food list:", error.message);
  }
};


 const loadCartData = async (token) =>{
  const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
  setCartItems(response.data.cartData);
 }



  useEffect(() => {
    
     async function loadData ()  {
      await fetchFoodList();
      if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;



// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const StoreContext = createContext(null);

// const StoreContextProvider = (props) => {
//   const [cartItems, setCartItems] = useState({});
//   const [token, setToken] = useState("");
//   const [food_list, setFoodList] = useState([]);

//   const url = "http://localhost:4000";

//   const addToCart = (itemId) => {
//     if (!cartItems[itemId]) {
//       setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
//     } else {
//       setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//     }
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
//   };

//   const getTotalCartAmount = () => {
//     let totalAmount = 0;
//     for (const item in cartItems) {
//       if (cartItems[item] > 0) {
//         const itemInfo = food_list.find((product) => product._id === item);
//         if (itemInfo) {
//           totalAmount += itemInfo.price * cartItems[item];
//         }
//       }
//     }
//     return totalAmount;
//   };

//   const fetchFoodList = async () => {
//     try {
//       const response = await axios.get(`${url}/api/food/list`);
//       setFoodList(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch food list:", error);
//     }
//   };

//   useEffect(() => {
//     async function loadData() {
//       await fetchFoodList();
//       const localToken = localStorage.getItem("token");
//       if (localToken) setToken(localToken);
//     }
//     loadData();
//   }, []);

//   const contextValue = {
//     food_list,
//     cartItems,
//     setCartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     url,
//     token,
//     setToken,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {props.children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;
