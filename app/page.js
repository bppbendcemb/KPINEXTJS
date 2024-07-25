'use client';
import { useState, useEffect } from 'react';
import './styles.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState('');
  const [inputYear, setInputYear] = useState('');

   // ตั้งค่า inputYear เป็นปีปัจจุบันเมื่อหน้าโหลด
   useEffect(() => {
    const currentYear = new Date().getFullYear();
    setInputYear(currentYear);
    setYear(currentYear); // ทำการดึงข้อมูลสำหรับปีปัจจุบันโดยอัตโนมัติ
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (year) {
        const res = await fetch(`/api/data?year=${year}`);
        const result = await res.json();
        setData(result);
      }
    }
    fetchData();
  }, [year]);

  const handleYearChange = (e) => {
    setInputYear(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(inputYear);
  };

  return (
    <div>
      <h1>Data from MongoDB</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Year:
          <input type="number" value={inputYear} onChange={handleYearChange} />
        </label>
        <button type="submit">Fetch Data</button>
      </form>
      <table border="1" cellPadding="5" cellSpacing="0" className='data-table'>
        <thead>
          <tr>
            <th>Unique ID</th>
            <th>Activity ID</th>
            <th>Year</th>
            <th>Past Work Year</th>
            <th>Target</th>
            <th>m1</th>
            <th>m2</th>
            <th>m3</th>
            <th>m4</th>
            <th>m5</th>
            <th>m6</th>
            <th>m7</th>
            <th>m8</th>
            <th>m9</th>
            <th>m10</th>
            <th>m11</th>
            <th>m12</th>

          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.uniqueid}</td>
                <td>{item.activityid}</td>
                <td>{item.year}</td>
             
                <td>{typeof item.pastworkyear === 'number' ? item.pastworkyear.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.target === 'number' ? item.target.toFixed(2) : 'N/A'}</td>
              
                <td>{typeof item.m1 === 'number' ? item.m1.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m2 === 'number' ? item.m2.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m3 === 'number' ? item.m3.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m4 === 'number' ? item.m4.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m5 === 'number' ? item.m5.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m6 === 'number' ? item.m6.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m7 === 'number' ? item.m7.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m8 === 'number' ? item.m8.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m9 === 'number' ? item.m9.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m10 === 'number' ? item.m10.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m11 === 'number' ? item.m11.toFixed(2) : 'N/A'}</td>
                <td>{typeof item.m12 === 'number' ? item.m12.toFixed(2) : 'N/A'}</td>

               
                         
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data found for the selected year</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
