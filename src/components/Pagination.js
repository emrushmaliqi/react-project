import React from "react";

function Pagination({ page, setPage }) {
  return (
    <div className="d-flex mb-4 justify-content-center gap-4">
      {page > 1 && (
        <i
          className="bi bi-arrow-left fs-4"
          role="button"
          onClick={() => setPage(prev => prev - 1)}
        ></i>
      )}
      <i
        className="bi bi-arrow-right fs-4"
        role="button"
        onClick={() => setPage(prev => prev + 1)}
      ></i>
    </div>
  );
}

export default Pagination;
