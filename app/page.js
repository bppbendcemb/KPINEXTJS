'use client';
import { useState, useEffect } from 'react';
import styles from "./styles.css";

export default function Home() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState('');
  const [inputYear, setInputYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // จำนวนรายการต่อหน้า

 
  // ตั้งค่า inputYear เป็นปีปัจจุบันเมื่อหน้าโหลด
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setInputYear(currentYear);
    setYear(currentYear); // ทำการดึงข้อมูลสำหรับปีปัจจุบันโดยอัตโนมัติ
    document.title = "KPI";
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
  const isEmptyValue = (value) => value === null || value === undefined || value === '';

  return (
    <>
      <div className="container">
        <div>
          <h1 className="item-center">BPP</h1>
          <p className="item-center">KPI Data from MongoDBXXXXXXXX</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "10px 0",
          }}
        >
          <div className={styles.table}>
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
                  className={index + 1 === currentPage ? "active" : ""}
                  style={{ margin: 2 }}
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

          <div>
            <label
              style={{
                marginRight: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              เลือกปี :
            </label>
            <select
              value={inputYear}
              onChange={handleYearChange}
              style={{
                padding: "5px 10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-respontsive">
          <table
            border="1"
            cellPadding="5"
            cellSpacing="0"
            className="data-table"
          >
            <thead>
              <tr>
                {/* <th>Unique ID</th> */}
                <th>ID</th>
                <th>Year</th>
                <th>แผนก</th>
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
                    <td>{item.activityid}</td>
                    <td>{item.year}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.activity_info.section}
                    </td>
                    <td style={{ width: 200, textAlign: "left" }}>
                      {item.activity_info.activity}
                    </td>
                    <td style={{ width: 100 }}>
                      {typeof item.pastworkyear === "number"
                        ? item.pastworkyear.toFixed(2)
                        : ""}
                    </td>
                    <td style={{ width: 100 }}>
                      {typeof item.target === "number"
                        ? item.target.toFixed(2)
                        : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m1) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m1 === "number" ? item.m1.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m2) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m2 === "number" ? item.m2.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m3) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m3 === "number" ? item.m3.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m4) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m4 === "number" ? item.m4.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m5) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m5 === "number" ? item.m5.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m6) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m6 === "number" ? item.m6.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m7) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m7 === "number" ? item.m7.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m8) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m8 === "number" ? item.m8.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m9) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m9 === "number" ? item.m9.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m10) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m10 === "number" ? item.m10.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m11) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m11 === "number" ? item.m11.toFixed(2) : ""}
                    </td>
                    <td
                      className={isEmptyValue(item.m12) ? "empty-cell" : ""}
                      style={{ width: 100 }}
                    >
                      {typeof item.m12 === "number" ? item.m12.toFixed(2) : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="17">No data found for the selected year</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
