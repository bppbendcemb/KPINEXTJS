'use client';
import { useState, useEffect } from 'react';
import './styles.css';

export default function Home() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15); // จำนวนรายการต่อหน้า

 
  // ตั้งค่า inputYear เป็นปีปัจจุบันเมื่อหน้าโหลด
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setInputYear(currentYear);
    setYear(currentYear); // ทำการดึงข้อมูลสำหรับปีปัจจุบันโดยอัตโนมัติ
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (year) {
        try {
          const res = await fetch(`/api/data?year=${year}`);
          if (!res.ok) throw new Error("Network response was not ok");
          const result = await res.json();
          setData(result);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    }
    fetchData();
  }, [year]);

  const years = Array.from({ length: 5 }, (_, i) => 2024 - i); // สร้างรายการปี

  // คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // เปลี่ยนหน้า
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleYearChange = (event) =>{
    const selectedYear = event.target.value;
    setInputYear(selectedYear);
    setYear(selectedYear);
    setCurrentPage(1); //รีเซ็ตหน้าเป็น 1 เมื่อเปลี่ยนปี
  };

  return (
    <>
     <head>
        <title>KPI</title>
        <meta name="KPI" content="KPI FROM BPP" />
      </head>

    <div className='container'>
      <h1>BPP</h1>
      <p>KPI Data from MongoDB</p>

      <div>
        <label>
          เลือกปี : 
          <select value={inputYear} onChange={handleYearChange}>
            {years.map(year =>(
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>

      <table border="1" cellPadding="5" cellSpacing="0" className='data-table'>
        <thead>
          <tr>
            {/* <th>Unique ID</th> */}
            <th>ID</th>
            <th>Year</th>
            <th>Activity</th>
            <th>Past Year</th>
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
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.uniqueid}</td> */}
                <td>{item.activityid}</td>
                <td>{item.year}</td>
                <td>{item.activity_info.activity}</td>
                <td>{typeof item.pastworkyear === 'number' ? item.pastworkyear.toFixed(2) : ''}</td>
                <td>{typeof item.target === 'number' ? item.target.toFixed(2) : ''}</td>
                <td>{typeof item.m1 === 'number' ? item.m1.toFixed(2) : ''}</td>
                <td>{typeof item.m2 === 'number' ? item.m2.toFixed(2) : ''}</td>
                <td>{typeof item.m3 === 'number' ? item.m3.toFixed(2) : ''}</td>
                <td>{typeof item.m4 === 'number' ? item.m4.toFixed(2) : ''}</td>
                <td>{typeof item.m5 === 'number' ? item.m5.toFixed(2) : ''}</td>
                <td>{typeof item.m6 === 'number' ? item.m6.toFixed(2) : ''}</td>
                <td>{typeof item.m7 === 'number' ? item.m7.toFixed(2) : ''}</td>
                <td>{typeof item.m8 === 'number' ? item.m8.toFixed(2) : ''}</td>
                <td>{typeof item.m9 === 'number' ? item.m9.toFixed(2) : ''}</td>
                <td>{typeof item.m10 === 'number' ? item.m10.toFixed(2) : ''}</td>
                <td>{typeof item.m11 === 'number' ? item.m11.toFixed(2) : ''}</td>
                <td>{typeof item.m12 === 'number' ? item.m12.toFixed(2) : ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="17">No data found for the selected year</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
}
