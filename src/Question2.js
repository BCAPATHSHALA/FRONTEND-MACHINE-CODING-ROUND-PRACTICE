import React from "react";

const dbpath = "https://jsonplaceholder.typicode.com/posts";

const Question2 = () => {
  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // 🔁 Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const stringData = await fetch(dbpath);
      const jsondata = await stringData.json();
      setUserData(jsondata);
    } catch (err) {
      console.log("Error fetching data:", err);
      setError(err);
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  React.useEffect(() => {
    fetchData(); // fetch data once on mount
  }, []);

  console.log("Fetched Data:", userData); // fetched all 100 records at once

  // ✅ Pagination Implementation
  // Goal: Display data in chunks of 10 items per page
  // ✅ Condition 1: On initial load, display the first 10 records (Page 1)
  // ✅ Condition 2: On "Next" click, move to the next page (show next 10 records)
  // ✅ Condition 3: On "Previous" click, move to the previous page (show previous 10 records)
  // ✅ Condition 4: On page number button click, jump to that page

  // Pagination State
  const [currentPage, setCurrentPage] = React.useState(1); // start from page 1
  const recordsLimitPerPage = 10;

  // Compute records to display on current page
  const indexOfLastRecord = currentPage * recordsLimitPerPage; // e.g. 1 * 10 = 10
  const indexOfFirstRecord = indexOfLastRecord - recordsLimitPerPage; // e.g. 10 - 10 = 0
  const currentRecords = userData.slice(indexOfFirstRecord, indexOfLastRecord);
  console.log("Current Records:", currentRecords);

  // Handle "Previous" button click
  const onPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1)); // ensure it doesn't go below page 1
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(userData.length / recordsLimitPerPage); // e.g. 100 / 10 = 10
  console.log("Total Pages:", totalPages);

  // Handle "Next" button click
  const onNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages)); // ensure it doesn't go beyond last page
  };

  // Generate page numbers for intermediate page buttons
  const intermediatePages = [...Array(totalPages)];
  console.log(
    "Intermediate Pages:",
    intermediatePages.map((_, index) => index + 1)
  );

  // Handle specific page button click
  const onInterMid = (pageNo) => {
    setCurrentPage(pageNo);
  };

  return (
    <>
      <h1>Pagination Logic on User Data</h1>

      {!currentRecords.length ? (
        <h2>No Records Found</h2>
      ) : (
        <div>
          <h2>User Data List</h2>
          {currentRecords.map((item) => (
            <p key={item.id}>
              <strong>{item.id}</strong> {item.title}
            </p>
          ))}

          {/* Pagination Controls */}
          <div>
            {/* Previous Button */}
            <button onClick={onPrevious}>Previous</button>

            {/* Page Number Buttons */}
            {intermediatePages.map((_, index) => (
              <button
                key={index + 1}
                onClick={() => onInterMid(index + 1)}
                style={{
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                  margin: "0 5px",
                }}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button onClick={onNext}>Next</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Question2;
