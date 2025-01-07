
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './Profile.css'; // Import the CSS file for styling

const ProfilePage = () => {
  const [address, setAddress] = useState("123 Main St, City, Country");
  const [userInfo, setUserInfo] = useState({
    username: "Anna",
    email: "annama@gmail.com",
    phone: "3779843652"
  });

  const [isEditing, setIsEditing] = useState({
    username: false,
    email: false,
    phone: false
  });

  // Logout handler with async/await using axios
  const handleLogout = () => {
    localStorage.removeItem("token")
    alert("Logout Successfully")
    navigate("/login")
  }


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

  // Handle user info update
  const handleUpdateUserInfo = () => {
    const updatedUsername = prompt("Enter new username:", userInfo.username);
    const updatedEmail = prompt("Enter new email:", userInfo.email);
    const updatedPhone = prompt("Enter new phone:", userInfo.phone);

    if (updatedUsername && updatedEmail && updatedPhone) {
      setUserInfo({
        username: updatedUsername,
        email: updatedEmail,
        phone: updatedPhone
      });
    }
  };

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  // Toggle edit state
  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Save user info after editing
  const handleSaveUserInfo = () => {
    // Make an API call to update the user information
    axios.post('/api/updateUserInfo', userInfo, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          alert("User info updated successfully!");
        } else {
          console.error("Failed to update user info");
        }
      })
      .catch(error => console.error("Error updating user info:", error));
  };

  return (
    <div className="profile-page">
      <div className="left-side">
        <div className="user-info">
          <p>
            Username: <br/>
            <input
              type="text"
              className="a1"
              name="username"
              value={userInfo.username}
              onChange={handleChange}
              disabled={!isEditing.username}
            />
            <button className='btnse' onClick={() => handleEditClick('username')}>
              {isEditing.username ? 'Save' : 'Edit'}
            </button>
          </p>
          <p>
            Email:  <br/>
            <input
              type="email"
              className="a1"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              disabled={!isEditing.email}
            />
            <button className='btnse' onClick={() => handleEditClick('email')}>
              {isEditing.email ? 'Save' : 'Edit'}
            </button>
          </p>
          <p>
            Phone: <br/>
            <input
              type="text"
              className="a2"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              disabled={!isEditing.phone}
            />
            <button className='btnse' onClick={() => handleEditClick('phone')}>
              {isEditing.phone ? 'Save' : 'Edit'}
            </button>
          </p>
        </div>
        <div className="action-buttons">
          <button className="btn logout" onClick={handleLogout}>Logout</button>
          <button className="btn delete" onClick={handleDelete}>Delete</button>
          {/* <button className="btn update-user-info" onClick={handleSaveUserInfo}>Save All Changes</button> */}
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
  );
};

export default ProfilePage;
