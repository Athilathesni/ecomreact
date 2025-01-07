import React, { useEffect, useState } from 'react';
import './Sellpro.css';  // Make sure to import the CSS for styling
import { fetchSellerDetails, fetchCategoriesAndCount } from './requesthandler';

const Seller = () => {
  const [companyDetails, setCompanyDetails] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch seller company details and category item counts
    const getSellerData = async () => {
      const sellerData = await fetchSellerDetails();
      setCompanyDetails(sellerData);

      const categoryData = await fetchCategoriesAndCount();
      setCategories(categoryData);
    };

    getSellerData();
  }, []);

  return (
    <div className="seller-container">
      <div className="company-details">
        {companyDetails && (
          <div>
            <h2>{companyDetails.name}</h2>
            <p>{companyDetails.address}</p>
            <p>{companyDetails.contact}</p>
          </div>
        )}
      </div>
      <div className="category-details">
        <h3>Categories</h3>
        {categories.length > 0 ? (
          <ul>
            {categories.map((category) => (
              <li key={category.name}>
                {category.name} - {category.count} items
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default Seller;
