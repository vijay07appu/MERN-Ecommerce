import React from 'react';
import './PaginationComponent.css'
import dotenv from 'dotenv'


function PaginationComponent({ page, setPage, totalPages }) {
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                Next
            </button>
        </div>
    );
}

export default PaginationComponent;
