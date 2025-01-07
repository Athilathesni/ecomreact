// import React from 'react';
// import './Profile.css'; // Import the CSS file for styling

// const ProfilePage = () => {
//   return (
//     <div className="profile-page">
//       <div className='mainpro'>
//       <div className="left-side">
//         <div className="user-info">
//           <h3>Username: John Doe</h3>
//           <p>Email: john.doe@example.com</p>
//           <p>Phone: +1 234 567 890</p>
//         </div>
//         <div className="action-buttons">
//           <button className="btn logout">Logout</button>
//           <button className="btn delete">Delete</button>
//         </div>
//       </div>

//       <div className="right-side">
//         <div className="profile-header">
//           <button className="btn top-seller">Seller</button>
//           <img src="" alt="Profile" className="profile-icon" />
//         </div>
//         <div className="user-actions">
//           <button className="cart">My Cart</button>
//           <button className=" wishlist">My Wishlist</button>
//           <button className=" orders">My Orders</button>
//         </div>
//         <div className="address">
//           <h4>Address</h4>
//           <div className="address-details">
//             <p>123 Main St, City, Country</p>
//             <button className="btn add-address">+</button>
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './Profile.css'; // Import the CSS file for styling

const ProfilePage = () => {
  const [address, setAddress] = useState("123 Main St, City, Country");

  // Logout handler with async/await using axios
  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/logout', {}, { withCredentials: true });

      if (response.status === 200) {
        window.location.href = '/login'; // Redirect to login after logout
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Delete user account handler with async/await using axios
  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:3001/api/deleteAddress', { withCredentials: true });

      if (response.status === 200) {
        alert('Your account has been deleted');
        window.location.href = '/login'; // Redirect to login after deletion
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  // Add address handler with async/await using axios
  const handleAddAddress = async () => {
    const newAddress = prompt("Enter new address:");
    if (newAddress) {
      setAddress(newAddress); // Update the state to reflect the new address
      try {
        const response = await axios.post('http://localhost:3001/api/addAddress', 
          { address: newAddress }, 
          { withCredentials: true }
        );

        if (response.status !== 200) {
          console.error('Failed to update address');
        }
      } catch (error) {
        console.error('Error adding address:', error);
      }
    }
  };

  return (
    <div className="profile-page">
      <div className='mainpro'>
        <div className="left-side">
          <div className="user-info">
            <h3>Username: John Doe</h3>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className="action-buttons">
            <button className="btn logout" onClick={handleLogout}>Logout</button>
            <button className="btn delete" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div className="right-side">
          <div className="profile-header">
            <button className="btn top-seller"><a href="/Sellpro">Seller</a></button>
            <img src="" alt="Profile" className="profile-icon" />
          </div>
          <div className="user-actions">
            <button className="cart">My Cart</button>
            <button className="wishlist">My Wishlist</button>
            <button className="orders">My Orders</button>
          </div>
          <div className="address">
            <h4>Address</h4>
            <div className="address-details">
              <p>{address}</p>
              <button className="btn add-address" onClick={handleAddAddress}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
