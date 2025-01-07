import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Sellpro.css';

const SellerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({ companyname: "", location: "" });

  const handleSaveClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/companyadd", companyDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error adding company:");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  useEffect(() => {
    // const fetchCompanyData = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:3000/api/companydetails", {
    //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    //     });
    //     setCompanyDetails(res.data);
       
    //   } catch (error) {
    //     console.error("Error fetching company data:", error);
    //   }
    // };
    // fetchCompanyData();
  }, []);

  return (
    <div className="seller-profile">
      <h2>Company Details</h2>
      {!companyDetails.companyname && !isEditing ? (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Add Company</button>
      ) : isEditing ? (
        <div className="edit-section">
          <input
            type="text"
            name="companyname"
            value={companyDetails.companyname}
            onChange={handleInputChange}
            placeholder="Company Name"
            className="input-field"
          />
          <input
            type="text"
            name="location"
            value={companyDetails.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="input-field"
          />
          <div className="action-buttons">
            <button className="save-btn" onClick={handleSaveClick}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="details-section">
          <p><strong>Company Name:</strong> {companyDetails.companyname}</p>
          <p><strong>Location:</strong> {companyDetails.location}</p>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
