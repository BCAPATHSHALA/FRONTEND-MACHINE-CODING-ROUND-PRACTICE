import React, { useState, useEffect } from 'react';
import './style.css';

const dbpath = 'https://jsonplaceholder.typicode.com/posts';

export default function Question1() {
  const [userData, setUserData] = useState([]);
  const [toggle, setToggle] = useState(true);

  // Fetch & fileter the data
  const useFetch = async () => {
    try {
      const stringData = await fetch(dbpath);
      const jsonData = await stringData.json();

      const filterData = jsonData.filter((data) => {
        return toggle ? data.id % 2 == 0 : data.id % 2 != 0;
      });

      // console.log("Filter Data:", filterData)
      setUserData(filterData);
    } catch {
      setUserData([]);
    }
  };

  // console.log('User Data:', userData);

  useEffect(() => {
    useFetch();
  }, [toggle]); // I am getting even data by default based on userdata ids

  const toggleFilter = () => {
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleFilter}>
        Get Filter Data Based on {toggle ? 'even' : 'odd'} ids
      </button>

      {!userData.length ? (
        <p>No Data Found</p>
      ) : (
        <ul>
          {userData.map((data) => {
            return (
              <li key={data.id}>
                Title: {data.title} & Id: {data.id}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
