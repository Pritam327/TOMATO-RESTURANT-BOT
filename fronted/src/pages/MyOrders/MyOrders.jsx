// import React, { useContext, useEffect, useState } from 'react'
// import "./MyOrders.css"
// import axios from 'axios';
// import { assets } from '../../assets/assets';
// import { StoreContext } from '../../context/StoreContext';
// const MyOrders = () => {

    
        
//         const {url,token} = useContext(StoreContext);
//         const [data,setData] = useState([]);
        
        
//         const fetchOrders = async () => {
//             const response = await axios.post(url+"/api/order/userorders",{},{headers:{Authorization: token}})
//             setData(response.data.data);

//         }
//         useEffect(()=>{
//             if(token){
//                 fetchOrders();
//             }
//         },[token])

//         return (
//             <div className="my-orders">
//                 <h2>My Orders</h2>
//                 <div className="container">
//                     {data.map((order,index)=>{
//                         return (
//                             <div key={index} className='my-orders-order'>
//                                 <img src={assets.parcel_icon} alt="" />
//                                 <p>{order.items.map((items,index)=>{
//                                     if(index === order.items.length-1){
//                                         return items.name+" X "+items.quantity
//                                     }
//                                     else{
//                                         return items.name+" X "+items.quantity+", "
//                                     }

//                                 })}</p>
//                                 <p>${order.amount}.00</p>
//                                 <p>Items:{order.items.length}</p>
//                                 <p><span>&#x25cf;</span> <b>{order.status}</b></p>
//                                 <button onClick={fetchOrders}>Track Order</button>

//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//         )

// };
// export default MyOrders;

import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + '/api/order/userorders',
        {},
        {
          headers: {
            token: token, 
          },
        }
      );

      console.log('Full order response:', response.data);

      if (response.data && response.data.success && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.warn('Invalid response format:', response.data);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setData([]);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 && <p>No orders found.</p>}

        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="parcel" />
            <p>
              {Array.isArray(order.items)
                ? order.items.map((item, i) => {
                    const str = `${item.name} x ${item.quantity}`;
                    return i === order.items.length - 1 ? str : str + ', ';
                  })
                : 'No items'}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items?.length || 0}</p>
            <p>
              <span>&#x25cf;</span> <b>{order.status || 'Processing'}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
