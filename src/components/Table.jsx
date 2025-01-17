/* eslint-disable react/prop-types */
import { useState } from 'react';

// Month mapping for sorting
const monthMapping = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};

const Table = ({ data, handleDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Function to group data by month
    const groupedData = data?.reduce((acc, item) => {
        const fields = item?.doc?._document?.data?.value?.mapValue?.fields || {};
        const month = fields?.month?.stringValue;

        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(item);
        return acc;
    }, {});

    // Sort months based on monthMapping
    const sortedMonths = Object.keys(groupedData).sort((a, b) => monthMapping[a] - monthMapping[b]);

    // Flatten sorted data into a single array
    const flattenedData = sortedMonths.flatMap(month => groupedData[month]);

    // Filter data based on search term
    const filteredData = flattenedData?.filter((item) => {
        const fields = item?.doc?.data?.value?.mapValue?.fields || {};
        const searchTermLower = searchTerm?.toLowerCase();
        const projectName = fields?.projectName?.stringValue?.toLowerCase();
        const month = fields?.month?.stringValue?.toLowerCase();
        const year = (fields?.year?.integerValue || fields?.year?.doubleValue)?.toString();
        const directExpense = (fields?.directExpense?.integerValue || fields?.directExpense?.doubleValue)?.toString();
        const indirectExpense = (fields?.indirectExpense?.integerValue || fields?.indirectExpense?.doubleValue)?.toString();
        const totalExpense = (fields?.totalExpense?.integerValue || fields?.totalExpense?.doubleValue)?.toString();
        const gst = (fields?.gst?.integerValue || fields?.gst?.doubleValue)?.toString();
        const grandTotal = (fields?.grandTotal?.integerValue || fields?.grandTotal?.doubleValue)?.toString();
        const project = (fields?.project?.integerValue || fields?.project?.doubleValue)?.toString();

        return (
            projectName?.includes(searchTermLower) ||
            month?.includes(searchTermLower) ||
            year?.includes(searchTerm) ||
            directExpense?.includes(searchTerm) ||
            indirectExpense?.includes(searchTerm) ||
            totalExpense?.includes(searchTerm) ||
            gst?.includes(searchTerm) ||
            grandTotal?.includes(searchTerm) ||
            project?.includes(searchTerm)
        );
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
    const currentItems = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatNumber = (value, decimals = 2) => {
        if (value == null) return '0.00';
        return Number(value).toFixed(decimals);
    };

    const capitalizeFirstLetter = (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="relative bg-white overflow-x-auto mt-5 p-5 shadow-md sm:rounded-lg">
            <div className="relative mt-1">
                <input
                    type="text"
                    id="table-search"
                    className="block py-2 text-sm text-black px-2 border border-gray-300 rounded-lg w-72 xsm:w-80 bg-gray-50"
                    placeholder="Search for Projects"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table className="w-full text-sm text-left rtl:text-right mt-5">
                <thead className="text-xs uppercase border-b dark:border-gray-700">
                    <tr>
                        <th scope="col" className="text-black text-center px-6 py-3 text-nowrap dark:hover:bg-gray-300">Sr. No.</th>
                        <th scope="col" className="text-black text-center px-6 py-3 text-nowrap dark:hover:bg-gray-300">Project name</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Month</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Year</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Project Value (₹)</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Direct Expense (₹)</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Indirect Expense (₹)</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Total Expense (₹)</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">GST(12%)</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Grand Total Expense with GST (₹)</th>
                        <th scope="col" className="px-6 py-3 text-nowrap dark:hover:bg-gray-300 text-black text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems?.map((item, i) => {
                        const fields = item?.doc?.data?.value?.mapValue?.fields || {};
                        const projectId = item?.doc?.key?.path?.segments[6] || 'Unknown';

                        return (
                            <tr key={i} className="bg-white border-b dark:hover:bg-gray-300 dark:border-gray-700 hover:bg-gray-50">
                                <td className="text-black text-center px-6 py-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-center text-black">{capitalizeFirstLetter(fields?.projectName?.stringValue)}</th>
                                <td className="text-black text-center px-6 py-4">{fields?.month?.stringValue}</td>
                                <td className="text-black text-center px-6 py-4">{fields?.year?.integerValue || fields?.year?.doubleValue}</td>
                                <td className="text-black text-center px-6 py-4">{fields?.projectValue?.integerValue || fields?.projectValue?.doubleValue}</td>
                                <td className="text-black text-center px-6 py-4">{fields?.directExpense?.integerValue || fields?.directExpense?.doubleValue}</td>
                                <td className="text-black text-center px-6 py-4">{fields?.indirectExpense?.integerValue || fields?.indirectExpense?.doubleValue}</td>
                                <td className="text-black text-center px-6 py-4">{fields?.totalExpense?.integerValue || fields?.totalExpense?.doubleValue}</td>
                                <td className="text-black text-center px-6 py-4">{formatNumber(fields?.gst?.integerValue || fields?.gst?.doubleValue)}</td>
                                <td className="text-black text-center px-6 py-4">{formatNumber(fields?.grandTotal?.integerValue || fields?.grandTotal?.doubleValue)}</td>
                                <td className="text-black text-center px-6 py-4">
                                    <button onClick={() => handleDelete(projectId)} className="font-medium text-red-500 dark:text-red-500">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="flex justify-between items-center py-3">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
