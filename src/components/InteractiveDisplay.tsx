import React, { useState, useEffect } from 'react';
import './HouseholdsTable.css';

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
}

interface Transactions {
  HSHD_NUM: number;
  BASKET_NUM : number; 
  PRODUCT_NUM: number;
  PURCHASE_: string;
  SPEND: number;  
  UNITS: number;
  STORE_R: string;
  WEEK_NUM: number;
  YEAR: number;
}

interface Products {
  PRODUCT_NUM: number;  
  DEPARTMENT: string;
  COMMODITY: string;
  BRAND_TY: string; 
  NATURAL_ORGANIC_FLAG: string;
}

interface JoinedTable {
  HSHD_NUM: number;
  BASKET_NUM : number;
  PRODUCT_NUM: number;
  DEPARTMENT: string;
  COMMODITY: string;
  SPEND: number; 
  UNITS: number;
  STORE_R: string;
  WEEK_NUM: number;
  YEAR: number;
  L: string;
  AGE_RANGE: string;
  MARITAL: string;
  INCOME_RANGE: string;
  HOMEOWNER: string;
  HSHD_COMPOSITION: string;
  HH_SIZE: number;
  CHILDREN: number;
}

function HouseholdsTable() {
  const [data1, setData1] = useState<Households[]>([]);
  const [data2, setData2] = useState<Transactions[]>([]);
  const [data3, setData3] = useState<Products[]>([]);
  const [data4, setData4] = useState<JoinedTable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://varmacloud.onrender.com/api/gettables');
        const result = await response.json();

        if (response.ok) {
          setData1(result.entries1); 
          setData2(result.entries2);
          setData3(result.entries3);
          setData4(result.entries4);
        } else {
          setError(result.message); 
        }
      } catch (error) {
        console.log(error);
        setError('Failed to fetch data'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Households Data</h2>
      {data1.length === 0 ? (
        <p className="text-gray-600">No data available</p>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HSHD_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">L</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">AGE_RANGE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">MARITAL</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">INCOME_RANGE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HOMEOWNER</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HSHD_COMPOSITION</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HH_SIZE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">CHILDREN</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="py-2 px-4 text-sm text-gray-800">{row.HSHD_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.L}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.AGE_RANGE}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.MARITAL}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.INCOME_RANGE}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.HOMEOWNER}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.HSHD_COMPOSITION}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.HH_SIZE}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.CHILDREN}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-3xl font-semibold text-gray-900 mt-8 mb-4">Transactions Data</h2>
      {data2.length === 0 ? (
        <p className="text-gray-600">No data available</p>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HSHD_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">BASKET_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">PRODUCT_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">PURCHASE_</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">SPEND</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">UNITS</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">STORE_R</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">WEEK_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">YEAR</th>
            </tr>
          </thead>
          <tbody>
            {data2.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="py-2 px-4 text-sm text-gray-800">{row.HSHD_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.BASKET_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.PRODUCT_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.PURCHASE_}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.SPEND}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.UNITS}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.STORE_R}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.WEEK_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.YEAR}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-3xl font-semibold text-gray-900 mt-8 mb-4">Products Data</h2>
      {data3.length === 0 ? (
        <p className="text-gray-600">No data available</p>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 text-sm font-medium text-gray-600">PRODUCT_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">DEPARTMENT</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">COMMODITY</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">BRAND_TY</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">NATURAL_ORGANIC_FLAG</th>
            </tr>
          </thead>
          <tbody>
            {data3.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="py-2 px-4 text-sm text-gray-800">{row.PRODUCT_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.DEPARTMENT}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.COMMODITY}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.BRAND_TY}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.NATURAL_ORGANIC_FLAG}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-3xl font-semibold text-gray-900 mt-8 mb-4">Joint Data</h2>
      {data4.length === 0 ? (
        <p className="text-gray-600">No data available</p>
      ) : (
        <table className="min-w-full table-auto border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HSHD_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">BASKET_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">PRODUCT_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">DEPARTMENT</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">COMMODITY</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">SPEND</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">UNITS</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">STORE_R</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">WEEK_NUM</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">YEAR</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">L</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">AGE_RANGE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">MARITAL</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">INCOME_RANGE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HOMEOWNER</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HSHD_COMPOSITION</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">HH_SIZE</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-600">CHILDREN</th>
            </tr>
          </thead>
          <tbody>
            {data4.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition-colors duration-200">
                <td className="py-2 px-4 text-sm text-gray-800">{row.HSHD_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.BASKET_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.PRODUCT_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.DEPARTMENT}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.COMMODITY}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.SPEND}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.UNITS}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.STORE_R}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.WEEK_NUM}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.YEAR}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.L}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.AGE_RANGE}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.MARITAL}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.INCOME_RANGE}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.HOMEOWNER}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.HSHD_COMPOSITION}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.HH_SIZE}</td>
                <td className="py-2 px-4 text-sm text-gray-800">{row.CHILDREN}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HouseholdsTable;
