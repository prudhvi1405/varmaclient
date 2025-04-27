import React, { useState, FormEvent } from 'react';
import './DashDashboard.css'
import DemographicsChart from './charts/DemographicsChart';

// Interfaces for the different data types
interface ApiErrorResponse {
  message: string;
}

interface Households {
  HSHD_NUM: number;
  L: string;
  AGE_RANGE: string;
  MARITAL: string;
  INCOME_RANGE: string;
  HOMEOWNER: string;
  HSHD_COMPOSITION: string;
  HH_SIZE: number;
  CHILDREN: number;
  BASKET_NUM: number;
  PRODUCT_NUM: number;
  PURCHASE_: string;
  SPEND: number;
  UNITS: number;
  STORE_R: string;
  WEEK_NUM: number;
  YEAR: number;
  DEPARTMENT: string;
  COMMODITY: string;
  BRAND_TY: string;
  NATURAL_ORGANIC_FLAG: string;
  [key: string]: string | number;
}

const DashDashboard: React.FC = () => {
  // States to handle the response data and errors
  const [backendData, setbackendData] = useState<Households[]>([]);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [notEmpty, setnotEmpty] = useState<boolean>();
  const [query, setQuery] = useState<string>(''); // Holds the user's input query

  // Handle the SQL input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Prevent page reload on form submission
    setErrorMessage('');
    setResponseMessage('');

    if (!query.trim()) {
      setErrorMessage('Please enter a valid SQL query.');
      return;
    }

    try {
      // Send a request to the backend with the user-provided query
      const response = await fetch('https://varmacloud.onrender.com/api/userquery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: query }), // Send the user's query
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // Parse the response as JSON
      setbackendData(data.entries);
      setResponseMessage(data.message || 'Success!');
      setnotEmpty(true)
    } catch (error) {
      // Handle errors
      const err = error as ApiErrorResponse;
      setErrorMessage(err.message || 'An error occurred');
    }
  };

  // Function to render the table based on dataset_category
  const renderTable = () => {
    if(notEmpty === true ) {
      return (
        <table className="table">
          <thead>
            <tr>
              {backendData[0].HSHD_NUM && <th className="table-header">HSHD_NUM</th> }
              {backendData[0].L && <th className="table-header">L</th>}
              {backendData[0].AGE_RANGE && <th className="table-header">AGE_RANGE</th>}
              {backendData[0].MARITAL && <th className="table-header">MARITAL</th>}
              {backendData[0].INCOME_RANGE && <th className="table-header">INCOME_RANGE</th>}
              {backendData[0].HOMEOWNER && <th className="table-header">HOMEOWNER</th>}
              {backendData[0].HSHD_COMPOSITION && <th className="table-header">HSHD_COMPOSITION</th>}
              {backendData[0].HH_SIZE && <th className="table-header">HH_SIZE</th>}
              {backendData[0].CHILDREN && <th className="table-header">CHILDREN</th>}
              {backendData[0].BASKET_NUM && <th className="table-header">BASKET_NUM</th>}
              {backendData[0].PRODUCT_NUM && <th className="table-header">PRODUCT_NUM</th>}
              {backendData[0].PURCHASE_ && <th className="table-header">PURCHASE_</th>}
              {backendData[0].SPEND && <th className="table-header">SPEND</th>}
              {backendData[0].UNITS && <th className="table-header">UNITS</th>}
              {backendData[0].STORE_R && <th className="table-header">STORE_R</th>  }
              {backendData[0].WEEK_NUM && <th className="table-header">WEEK_NUM</th>}
              {backendData[0].YEAR && <th className="table-header">YEAR</th>}
              {backendData[0].DEPARTMENT && <th className="table-header">DEPARTMENT</th>}
              {backendData[0].COMMODITY && <th className="table-header">COMMODITY</th>}
              {backendData[0].BRAND_TY && <th className="table-header">BRAND_TY</th>}
              {backendData[0].NATURAL_ORGANIC_FLAG && <th className="table-header">NATURAL_ORGANIC_FLAG</th>}
              {/* Dynamically render any other key */}
              {Object.keys(backendData[0]).map((key, keyIndex) => {
                // Skip rendering already manually handled columns
                if (['HSHD_NUM', 'L', 'AGE_RANGE', 'MARITAL', 'INCOME_RANGE', 'HOMEOWNER', 'HSHD_COMPOSITION', 'HH_SIZE', 'CHILDREN'].includes(key)) {
                  return null; // Skip these keys
                }

                return (
                  <td key={keyIndex} className="table-header">{key}</td>
                );
              })}

            </tr>
          </thead>
          <tbody className="scrollable-tbody">
            {backendData.map((row, index) => (
              <tr key={index} className="table-row">
                {/* Render specific fields directly */}
                {row.HSHD_NUM && <td className="table-cell">{row.HSHD_NUM}</td>}
                {row.L && <td className="table-cell">{row.L}</td>}
                {row.AGE_RANGE && <td className="table-cell">{row.AGE_RANGE}</td>}
                {row.MARITAL && <td className="table-cell">{row.MARITAL}</td>}
                {row.INCOME_RANGE && <td className="table-cell">{row.INCOME_RANGE}</td>}
                {row.HOMEOWNER && <td className="table-cell">{row.HOMEOWNER}</td>}
                {row.HSHD_COMPOSITION && <td className="table-cell">{row.HSHD_COMPOSITION}</td>}
                {row.HH_SIZE && <td className="table-cell">{row.HH_SIZE}</td>}
                {row.CHILDREN && <td className="table-cell">{row.CHILDREN}</td>}
                {row.BASKET_NUM && <td className="table-cell">{row.BASKET_NUM}</td>}
                {row.PRODUCT_NUM && <td className="table-cell">{row.PRODUCT_NUM}</td>}
                {row.PURCHASE_ && <td className="table-cell">{row.PURCHASE_}</td>}
                {row.SPEND && <td className="table-cell">{row.SPEND}</td>}
                {row.UNITS && <td className="table-cell">{row.UNITS}</td>}
                {row.STORE_R && <td className="table-cell">{row.STORE_R}</td>}
                {row.WEEK_NUM && <td className="table-cell">{row.WEEK_NUM}</td>}
                {row.YEAR && <td className="table-cell">{row.YEAR}</td>}
                {row.DEPARTMENT && <td className="table-cell">{row.DEPARTMENT}</td>}
                {row.COMMODITY && <td className="table-cell">{row.COMMODITY}</td>}
                {row.BRAND_TY && <td className="table-cell">{row.BRAND_TY}</td>}
                {row.NATURAL_ORGANIC_FLAG && <td className="table-cell">{row.NATURAL_ORGANIC_FLAG}</td>}

                {/* Dynamically render any other key */}
                {Object.keys(row).map((key, keyIndex) => {
                  // Skip rendering already manually handled columns like 'HSHD_NUM' and others
                  if (['HSHD_NUM', 'L', 'AGE_RANGE', 'MARITAL', 'INCOME_RANGE', 'HOMEOWNER', 'HSHD_COMPOSITION', 'HH_SIZE', 'CHILDREN'].includes(key)) {
                    return null; // Skip these keys
                  }

                  return (
                    <td key={keyIndex} className="table-cell">{row[key]}</td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>
      );
    }
    // } else if (datasetCategory === 'NewTransactions') {
    //   return (
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th className="table-header">HSHD_NUM</th>
    //           <th className="table-header">BASKET_NUM</th>
    //           <th className="table-header">PRODUCT_NUM</th>
    //           <th className="table-header">PURCHASE_</th>
    //           <th className="table-header">SPEND</th>
    //           <th className="table-header">UNITS</th>
    //           <th className="table-header">STORE_R</th>
    //           <th className="table-header">WEEK_NUM</th>
    //           <th className="table-header">YEAR</th>
    //         </tr>
    //       </thead>
    //       <tbody className="scrollable-tbody">
    //         {transactionsData.map((row, index) => (
    //           <tr key={index} className="table-row">
    //             <td className="table-cell">{row.HSHD_NUM}</td>
    //             <td className="table-cell">{row.BASKET_NUM}</td>
    //             <td className="table-cell">{row.PRODUCT_NUM}</td>
    //             <td className="table-cell">{row.PURCHASE_}</td>
    //             <td className="table-cell">{row.SPEND}</td>
    //             <td className="table-cell">{row.UNITS}</td>
    //             <td className="table-cell">{row.STORE_R}</td>
    //             <td className="table-cell">{row.WEEK_NUM}</td>
    //             <td className="table-cell">{row.YEAR}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   );
    // } else if (datasetCategory === 'Products') {
    //   return (
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           <th className="table-header">PRODUCT_NUM</th>
    //           <th className="table-header">DEPARTMENT</th>
    //           <th className="table-header">COMMODITY</th>
    //           <th className="table-header">BRAND_TY</th>
    //           <th className="table-header">NATURAL_ORGANIC_FLAG</th>
    //         </tr>
    //       </thead>
    //       <tbody className="scrollable-tbody">
    //         {productsData.map((row, index) => (
    //           <tr key={index} className="table-row">
    //             <td className="table-cell">{row.PRODUCT_NUM}</td>
    //             <td className="table-cell">{row.DEPARTMENT}</td>
    //             <td className="table-cell">{row.COMMODITY}</td>
    //             <td className="table-cell">{row.BRAND_TY}</td>
    //             <td className="table-cell">{row.NATURAL_ORGANIC_FLAG}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   );
    // }
  };

  return (
    <div className="DashDashboard">

      <h1 className="main-heading">Available Datasets</h1>
      <p className="description">
        Select a dataset and enter a <strong>SELECT</strong> SQL query below.
      </p>

      <ul className="columns-list">
        <li>Table name is <strong>Households</strong></li>
        <li><strong>HSHD_NUM</strong> - Household number</li>
        <li><strong>L</strong> - Location</li>
        <li><strong>AGE_RANGE</strong> - Age range</li>
        <li><strong>MARITAL</strong> - Marital status</li>
        <li><strong>INCOME_RANGE</strong> - Income range</li>
        <li><strong>HOMEOWNER</strong> - Homeowner status</li>
        <li><strong>HSHD_COMPOSITION</strong> - Household composition</li>
        <li><strong>HH_SIZE</strong> - Household size</li>
        <li><strong>CHILDREN</strong> - Number of children</li>
      </ul>

      <ul className="columns-list">
        <li>Table name is <strong>Transactions</strong></li>
        <li><strong>HSHD_NUM</strong> - Household number</li>
        <li><strong>BASKET_NUM</strong> - Basket Number</li>
        <li><strong>PRODUCT_NUM</strong> - Product Number</li>
        <li><strong>PURCHASE_</strong> - Purchase Date</li>
        <li><strong>SPEND</strong> - Spend</li>
        <li><strong>UNITS</strong> - Units</li>
        <li><strong>STORE_R</strong> - Store Region</li>
        <li><strong>WEEK_NUM</strong> - Week number</li>
        <li><strong>YEAR</strong> - Year</li>
      </ul>

      <ul className="columns-list">
        <li>Table name is <strong>Products</strong></li>
        <li><strong>PRODUCT_NUM</strong> - Product number</li>
        <li><strong>DEPARTMENT</strong> - Department</li>
        <li><strong>COMMODITY</strong> - Commodity</li>
        <li><strong>BRAND_TY</strong> - Brand TY</li>
        <li><strong>NATURAL_ORGANIC_FLAG</strong> - Natural Organic Flag</li>
      </ul>

      <h1 className="main-heading">Dataset Results</h1>
      <p className="description">Results based on your SQL query are shown below.</p>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            type="text"
            id="userInput"
            value={query} // Bind the input value to the query state
            onChange={handleInputChange} // Update state when the input changes
            required
            className="input-box"
            placeholder="Enter your SQL query"
          />
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>

      {responseMessage && <p className="response-message" style={{ color: 'green' }}>{responseMessage}</p>}

      {/* Render the corresponding table based on the dataset_category */}
      {renderTable()}

      {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}

      {backendData.length > 0 ? ( <div className="newdashboard">
        <main className="newdashboard-main">
          <section id="demographics">
            <h2>Demographics and Engagement</h2>
            <DemographicsChart data={backendData} />
          </section>
          {/* Add other sections as needed */}
        </main>
      </div>) : (<div />)}
    </div>
  );
};

export default DashDashboard;
