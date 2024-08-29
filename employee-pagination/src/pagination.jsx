import React, { useState, useEffect } from 'react';

const Pagination = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch data from the API
    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setTotalPages(Math.ceil(data.length / 10)); // Calculate total pages
            })
            .catch(error => {
                alert('failed to fetch data'); // Handle fetch error
            });
    }, []);

    // Handle Previous button click
    const handlePrevious = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    // Handle Next button click
    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    // Calculate indexes for the current page data
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map(member => (
                        <tr key={member.id}>
                            <td>{member.id}</td>
                            <td>{member.name}</td>
                            <td>{member.email}</td>
                            <td>{member.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrevious} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>{currentPage} of {totalPages} </span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Pagination;
