import React from 'react';
import './Profile.css'; // Import the CSS file for styling

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="left-side">
        <div className="user-info">
          <h3>Username: John Doe</h3>
          <p>Email: john.doe@example.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="action-buttons">
          <button className="btn logout">Logout</button>
          <button className="btn delete">Delete Account</button>
        </div>
      </div>

      <div className="right-side">
        <div className="profile-header">
          <button className="btn top-seller">Top Seller</button>
          <img src="profile-icon.png" alt="Profile" className="profile-icon" />
        </div>
        <div className="user-actions">
          <button className="btn cart">My Cart</button>
          <button className="btn wishlist">My Wishlist</button>
          <button className="btn orders">My Orders</button>
        </div>
        <div className="address">
          <h4>Address</h4>
          <div className="address-details">
            <p>123 Main St, City, Country</p>
            <button className="btn add-address">+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
