import {
  FaGraduationCap,
  FaEnvelope,
  FaUsers,
  FaChartLine,
  FaFilter,
  FaFileExcel,
  FaFilePdf,
  FaDownload,
  FaCalendarDay,
  FaHistory,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// asdbasjdhaskhkjasdhaksh
const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCourseEnquiries: 0,
    totalContactEnquiries: 0,
    totalSyllabusEnquiries: 0,
    todayEnquiries: 0,
    allEnquiries: 0,
  });
  const [enquiries, setEnquiries] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactsSyllabus, setContactsSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("today"); // 'today' or 'all'
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [todaysData, setTodaysData] = useState([]);
  const [selectedDataType, setSelectedDataType] = useState("all"); // 'all', 'course', 'contact', 'syllabus'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enquiriesData, contactsData, syllabusData] = await Promise.all([
          fetchEnquiries(),
          fetchContacts(),
          fetchContactsSyllabus(),
        ]);

        const today = new Date().toISOString().split("T")[0];

        // Filter today's data
        const todayEnqs = enquiriesData.filter(
          (enquiry) =>
            enquiry.createdAt && enquiry.createdAt.split("T")[0] === today
        );
        const todayContacts = contactsData.filter(
          (contact) =>
            contact.createdAt && contact.createdAt.split("T")[0] === today
        );
        const todaySyllabus = syllabusData.filter(
          (contact) =>
            contact.createdAt && contact.createdAt.split("T")[0] === today
        );

        // console.log(todaySyllabus, "data today")

        const allTodayData = [...todayEnqs, ...todayContacts, ...todaySyllabus];
        const allHistoricalData = [
          ...enquiriesData,
          ...contactsData,
          ...syllabusData,
        ];

        setTodaysData(allTodayData);
        setFilteredData([...allHistoricalData].reverse());

        setStats({
          totalCourseEnquiries: enquiriesData.length,
          totalContactEnquiries: contactsData.length,
          totalSyllabusEnquiries: syllabusData.length,
          todayEnquiries: allTodayData.length,
          allEnquiries: allHistoricalData.length,
        });

        setEnquiries(enquiriesData);
        setContacts(contactsData);
        setContactsSyllabus(syllabusData);
      } catch (err) {
        setError(err.message);
        toast.error("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === "today") {
      // For today's data, we don't apply date filters
      let dataToShow = todaysData;

      if (selectedDataType === "course") {
        dataToShow = todaysData.filter((item) => item.productId);
      } else if (selectedDataType === "contact") {
        dataToShow = todaysData.filter(
          (item) => !item.productId && !item.syllabus
        );
      } else if (selectedDataType === "syllabus") {
        dataToShow = todaysData.filter((item) => item);
      }

      setFilteredData(dataToShow);
    } else {
      // For all data, apply date filters if they exist
      let dataToFilter = [...enquiries, ...contacts, ...contactsSyllabus];

      if (selectedDataType === "course") {
        dataToFilter = enquiries;
      } else if (selectedDataType === "contact") {
        dataToFilter = contacts;
      } else if (selectedDataType === "syllabus") {
        dataToFilter = contactsSyllabus;
      }

      if (startDate && endDate) {
        dataToFilter = dataToFilter.filter((item) => {
          if (!item.createdAt) return false;
          const itemDate = new Date(item.createdAt);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }

      setFilteredData([...dataToFilter].reverse());
    }
  }, [
    activeTab,
    startDate,
    endDate,
    selectedDataType,
    enquiries,
    contacts,
    contactsSyllabus,
    todaysData,
  ]);

  const fetchEnquiries = async () => {
    const response = await fetch("http://localhost:8000/enroll/alldisplay");
    if (!response.ok) throw new Error("Failed to fetch enquiries");
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  };

  const fetchContacts = async () => {
    const response = await fetch("http://localhost:8000/contact/allcontact");
    if (!response.ok) throw new Error("Failed to fetch contacts");
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  };

  const fetchTodayContacts = async () => {
    const response = await fetch("http://localhost:8000/contact/allcontact");
    if (!response.ok) throw new Error("Failed to fetch contacts");
    const data = await response.json();

    return Array.isArray(data) ? data : data.data || [];
  };

  const fetchContactsSyllabus = async () => {
    const response = await fetch("http://localhost:8000/register/allcontact");
    if (!response.ok) throw new Error("Failed to fetch syllabus contacts");
    const data = await response.json();

    return Array.isArray(data) ? data : data.data || [];
  };

  const exportToExcel = (data, filename) => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        Type: item.productId
          ? "Course Enquiry"
          : item.syllabus
          ? "Syllabus Enquiry"
          : "Contact Enquiry",
        Name: item.name || "-",
        Email: item.email || "-",
        Phone: item.phone || "-",
        Details:
          item.productId?.Coursename || item.message || item.syllabus || "-",
        Date: item.createdAt
          ? new Date(item.createdAt).toLocaleDateString()
          : "-",
        Time: item.createdAt
          ? new Date(item.createdAt).toLocaleTimeString()
          : "-",
        Status: item.status || "new",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  };

  const exportToPDF = (data, filename) => {
    const doc = new jsPDF();
    const tableColumn = [
      "Type",
      "Name",
      "Email",
      "Phone",
      "Details",
      "Date",
      "Time",
    ];
    const tableRows = [];

    data.forEach((item) => {
      const rowData = [
        item.productId
          ? "Course Enquiry"
          : item.syllabus
          ? "Syllabus Enquiry"
          : "Contact Enquiry",
        item.name || "-",
        item.email || "-",
        item.phone || "-",
        item.productId?.Coursename || item.message || item.syllabus || "-",
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
        item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : "-",
      ];
      tableRows.push(rowData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text(
      `${activeTab === "today" ? "Today's" : "All"} Enquiries Report`,
      14,
      15
    );
    doc.save(`${filename}.pdf`);
  };

  const columns = [
    {
      name: "Sr. No.",
      selector: (row, index) => index + 1,
      cell: (row, index) => <span className='font-medium'>{index + 1}</span>,
      sortable: false, // Sr. No. usually not sortable
      width: "80px", // Optional: control width
    },

    {
      name: "Name",
      selector: (row) => row.name || "-",
      sortable: true,
      cell: (row) => <span className='font-medium'>{row.name || "-"}</span>,
    },
    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
      cell: (row) => (
        <a
          href={`mailto:${row.email}`}
          className='text-blue-600 hover:underline'
        >
          {row.email || "-"}
        </a>
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.phone || "-",
      cell: (row) => (
        <a href={`tel:${row.phone}`} className='text-blue-600 hover:underline'>
          {row.phone || "-"}
        </a>
      ),
    },
    {
      name: "Details",
      selector: (row) => row.details || "-",
      cell: (row) => (
        <div className='max-w-xs'>
          {row.productId?.Coursename || row.message || row.syllabus || "-"}
        </div>
      ),
    },
    {
      name: "Date",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleTimeString() : "-",
    },
    {
      name: "Status",
      selector: (row) => row.status || "new",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.status === "converted"
              ? "bg-green-100 text-green-800"
              : row.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {row.status || "new"}
        </span>
      ),
    },
  ];

  // helper that returns the *current* source array
  const getBase = () => {
    switch (selectedDataType) {
      case "course":
        return enquiries;
      case "contact":
        return contacts;
      case "syllabus":
        return contactsSyllabus;
      default:
        return [...enquiries, ...contacts, ...contactsSyllabus];
    }
  };

  const handleDateFilter = () => {
    if (!startDate || !endDate || activeTab !== "all") return;

    const base = getBase();
    const s = new Date(startDate);
    const e = new Date(endDate);
    s.setHours(0, 0, 0, 0);
    e.setHours(23, 59, 59, 999);

    const filtered = base.filter(
      (item) =>
        item.createdAt &&
        new Date(item.createdAt) >= s &&
        new Date(item.createdAt) <= e
    );

    setFilteredData([...filtered].reverse());
  };

  const clearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
    const base = getBase();
    setFilteredData([...base].reverse());
  };

  // const handleDateFilter = () => {
  //   if (startDate && endDate && activeTab === "all") {
  //     let dataToFilter = [...enquiries, ...contacts, ...contactsSyllabus];

  //     if (selectedDataType === "course") {
  //       dataToFilter = enquiries;
  //     } else if (selectedDataType === "contact") {
  //       dataToFilter = contacts;
  //     } else if (selectedDataType === "syllabus") {
  //       dataToFilter = contactsSyllabus;
  //     }

  //     const filtered = dataToFilter.filter((item) => {
  //       if (!item.createdAt) return false;
  //       const itemDate = new Date(item.createdAt);
  //       return itemDate >= startDate && itemDate <= endDate;
  //     });

  //     setFilteredData([...filtered].reverse());
  //   }
  // };

  // const clearDateFilter = () => {
  //   setStartDate(null);
  //   setEndDate(null);
  //   let dataToShow = [...enquiries, ...contacts, ...contactsSyllabus];

  //   if (selectedDataType === "course") {
  //     dataToShow = enquiries;
  //   } else if (selectedDataType === "contact") {
  //     dataToShow = contacts;
  //   } else if (selectedDataType === "syllabus") {
  //     dataToShow = contactsSyllabus;
  //   }

  //   setFilteredData([...dataToShow].reverse());
  // };

  const handleDataTypeChange = (type) => {
    setSelectedDataType(type);

    if (activeTab === "today") {
      let dataToShow = todaysData;

      if (type === "course") {
        dataToShow = todaysData.filter((item) => item.productId);
      } else if (type === "contact") {
        dataToShow = todaysData.filter(
          (item) => !item.productId && !item.syllabus
        );
      } else if (type === "syllabus") {
        dataToShow = todaysData.filter((item) => item.syllabus);
      }

      setFilteredData(dataToShow);
    } else {
      let dataToShow = [...enquiries, ...contacts, ...contactsSyllabus];

      if (type === "course") {
        dataToShow = enquiries;
      } else if (type === "contact") {
        dataToShow = contacts;
      } else if (type === "syllabus") {
        dataToShow = contactsSyllabus;
      }

      if (startDate && endDate) {
        dataToShow = dataToShow.filter((item) => {
          if (!item.createdAt) return false;
          const itemDate = new Date(item.createdAt);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }

      setFilteredData([...dataToShow].reverse());
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-3xl font-bold text-gray-800 mb-8'>
        Dashboard Overview
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <div className='bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm font-medium opacity-80'>Course Enquiries</p>
              <h2 className='text-3xl font-bold mt-2'>
                {stats.totalCourseEnquiries}
              </h2>
            </div>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <FaGraduationCap className='text-2xl' />
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm font-medium opacity-80'>
                Contact Enquiries
              </p>
              <h2 className='text-3xl font-bold mt-2'>
                {stats.totalContactEnquiries}
              </h2>
            </div>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <FaEnvelope className='text-2xl' />
            </div>
          </div>
        </div>

        <div className='bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl shadow-lg p-6 text-white'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm font-medium opacity-80'>
                Syllabus Enquiries
              </p>
              <h2 className='text-3xl font-bold mt-2'>
                {stats.totalSyllabusEnquiries}
              </h2>
            </div>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <FaUsers className='text-2xl' />
            </div>
          </div>
        </div>

        <div
          className={`rounded-xl shadow-lg p-6 text-white cursor-pointer transition-all ${
            activeTab === "today"
              ? "bg-gradient-to-r from-amber-500 to-pink-500"
              : "bg-gradient-to-r from-gray-600 to-gray-800"
          }`}
          onClick={() => setActiveTab("today")}
        >
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-sm font-medium opacity-80'>
                Today's Enquiries
              </p>
              <h2 className='text-3xl font-bold mt-2'>
                {stats.todayEnquiries}
              </h2>
            </div>
            <div className='p-3 bg-white bg-opacity-20 rounded-full'>
              <FaCalendarDay className='text-2xl' />
            </div>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex space-x-4'>
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-2 rounded flex items-center ${
                activeTab === "today"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <FaCalendarDay className='mr-2' />
              Today's Data ({stats.todayEnquiries})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded flex items-center ${
                activeTab === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              <FaHistory className='mr-2' />
              All Data ({stats.allEnquiries})
            </button>
          </div>

          <div className='flex space-x-2'>
            <button
              onClick={() =>
                exportToExcel(
                  activeTab === "today" ? todaysData : filteredData,
                  activeTab === "today" ? "todays_enquiries" : "all_enquiries"
                )
              }
              className='bg-green-600 text-white px-3 py-2 rounded flex items-center'
            >
              <FaFileExcel className='mr-1' />
              Export Excel
            </button>
            <button
              onClick={() =>
                exportToPDF(
                  activeTab === "today" ? todaysData : filteredData,
                  activeTab === "today" ? "todays_enquiries" : "all_enquiries"
                )
              }
              className='bg-red-600 text-white px-3 py-2 rounded flex items-center'
            >
              <FaFilePdf className='mr-1' />
              Export PDF
            </button>
          </div>
        </div>

        {activeTab === "all" && (
          <div className='mb-4 flex justify-between items-center'>
            <div className='flex space-x-4'>
              <button
                onClick={() => handleDataTypeChange("all")}
                className={`px-4 py-2 rounded ${
                  selectedDataType === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                All Data
              </button>
              <button
                onClick={() => handleDataTypeChange("course")}
                className={`px-4 py-2 rounded ${
                  selectedDataType === "course"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Course Enquiries
              </button>
              <button
                onClick={() => handleDataTypeChange("contact")}
                className={`px-4 py-2 rounded ${
                  selectedDataType === "contact"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Contact Enquiries
              </button>
              <button
                onClick={() => handleDataTypeChange("syllabus")}
                className={`px-2 py-2 rounded ${
                  selectedDataType === "syllabus"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Syllabus Enquiries
              </button>
            </div>

            <div className='flex items-center space-x-2'>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText='Start Date'
                className='border rounded px-3 py-1 text-sm'
                dateFormat='yyyy-MM-dd'
              />
              <span>to</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText='End Date'
                className='border rounded px-3 py-1 text-sm'
                dateFormat='yyyy-MM-dd'
              />
              <button
                onClick={handleDateFilter}
                disabled={!startDate || !endDate}
                className={`px-3 py-1 rounded flex items-center 
      ${
        !startDate || !endDate
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-blue-500 text-white"
      }
    `}
              >
                <FaFilter className='mr-1' />
                Filter
              </button>
              <button
                onClick={clearDateFilter}
                className='bg-gray-500 text-white px-3 py-1 rounded'
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {activeTab === "today" && (
          <div className='mb-4 flex space-x-4'>
            <button
              onClick={() => handleDataTypeChange("all")}
              className={`px-4 py-2 rounded ${
                selectedDataType === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              All Today's Data
            </button>
            <button
              onClick={() => handleDataTypeChange("course")}
              className={`px-4 py-2 rounded ${
                selectedDataType === "course"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Course Enquiries
            </button>
            <button
              onClick={() => handleDataTypeChange("contact")}
              className={`px-4 py-2 rounded ${
                selectedDataType === "contact"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Contact Enquiries
            </button>
            <button
              onClick={() => handleDataTypeChange("syllabus")}
              className={`px-4 py-2 rounded ${
                selectedDataType === "syllabus"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Syllabus Enquiries
            </button>
          </div>
        )}

        <div className='mb-4'>
          {activeTab === "all" && startDate && endDate && (
            <p className='text-sm text-gray-600'>
              Showing {filteredData.length} records from{" "}
              {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
              {selectedDataType !== "all" && ` (${selectedDataType} only)`}
            </p>
          )}
          {activeTab === "today" && (
            <p className='text-sm text-gray-600'>
              Showing {filteredData.length} enquiries for{" "}
              {new Date().toLocaleDateString()}
              {selectedDataType !== "all" && ` (${selectedDataType} only)`}
            </p>
          )}
        </div>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          className='border rounded-lg overflow-hidden'
          noDataComponent={
            <div className='p-4 text-gray-500'>No data found</div>
          }
        />
      </div>

      <div className='bg-white rounded-xl shadow-lg p-6'>
        <h2 className='text-xl font-semibold text-gray-800 mb-4'>
          Quick Overview
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-3'>
              Recent Course Enquiries (Last 5)
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Name
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Course
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {enquiries
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((enquiry, index) => (
                      <tr key={`enquiry-${index}`}>
                        <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {enquiry.name || "-"}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          {enquiry?.productId?.Coursename || "-"}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          {enquiry.createdAt
                            ? new Date(enquiry.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-3'>
              Recent Contact Enquiries (Last 5)
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Name
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Email
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {contacts
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((contact, index) => (
                      <tr key={`contact-${index}`}>
                        <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {contact.name || "-"}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          {contact.email || "-"}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className='text-lg font-medium text-gray-700 mb-3'>
              Recent Syllabus Enquiries (Last 5)
            </h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Name
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Email
                    </th>
                    <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {contactsSyllabus
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((contact, index) => (
                      <tr key={`syllabus-${index}`}>
                        <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900'>
                          {contact.name || "-"}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          {contact.email || "-"}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap text-sm text-gray-500'>
                          {contact.createdAt
                            ? new Date(contact.createdAt).toLocaleDateString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// !-----------------------------------------------------
/*  Dashboard.jsx  */
// import {
//   FaGraduationCap,
//   FaEnvelope,
//   FaUsers,
//   FaCalendarDay,
//   FaHistory,
//   FaFilter,
//   FaFileExcel,
//   FaFilePdf,
// } from "react-icons/fa";
// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import * as XLSX from "xlsx";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";

// const Dashboard = () => {
//   /* ------------- state ------------- */
//   const [stats, setStats] = useState({
//     totalCourseEnquiries: 0,
//     totalContactEnquiries: 0,
//     totalSyllabusEnquiries: 0,
//     todayEnquiries: 0,
//     allEnquiries: 0,
//   });
//   const [enquiries, setEnquiries] = useState([]);
//   const [contacts, setContacts] = useState([]);
//   const [contactsSyllabus, setContactsSyllabus] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState("today"); // 'today' | 'all'
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [filteredData, setFilteredData] = useState([]);
//   const [todaysData, setTodaysData] = useState([]);
//   const [selectedDataType, setSelectedDataType] = useState("all"); // all | course | contact | syllabus

//   /* ------------- fetch ------------- */
//   const fetchEnquiries = async () => {
//     const res = await fetch(
//       "http://localhost:8000/enroll/alldisplay"
//     );
//     if (!res.ok) throw new Error("Failed to fetch enquiries");
//     const json = await res.json();
//     return Array.isArray(json) ? json : json.data || [];
//   };

//   const fetchContacts = async () => {
//     const res = await fetch(
//       "http://localhost:8000/contact/allcontact"
//     );
//     if (!res.ok) throw new Error("Failed to fetch contacts");
//     const json = await res.json();
//     return Array.isArray(json) ? json : json.data || [];
//   };

//   /* ------------- initial load ------------- */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [enquiriesData, contactsDataRaw] = await Promise.all([
//           fetchEnquiries(),
//           fetchContacts(),
//         ]);

//         // split the single contacts payload
//         const syllabusData = contactsDataRaw.filter((c) => c.syllabus);

// console.log(syllabusData, "sy")

//         const contactOnly = contactsDataRaw.filter((c) => !c.syllabus);

//         const today = new Date().toISOString().split("T")[0];

//         const todayEnqs = enquiriesData.filter(
//           (e) => e.createdAt?.split("T")[0] === today
//         );
//         const todayContacts = contactOnly.filter(
//           (c) => c.createdAt?.split("T")[0] === today
//         );
//         const todaySyllabus = syllabusData.filter(
//           (s) => s.createdAt?.split("T")[0] === today
//         );

//         const allToday = [...todayEnqs, ...todayContacts, ...todaySyllabus];
//         const allHistorical = [
//           ...enquiriesData,
//           ...contactOnly,
//           ...syllabusData,
//         ];

//         setTodaysData(allToday.reverse());
//         setFilteredData(allHistorical.reverse());

//         setStats({
//           totalCourseEnquiries: enquiriesData.length,
//           totalContactEnquiries: contactOnly.length,
//           totalSyllabusEnquiries: syllabusData.length,
//           todayEnquiries: allToday.length,
//           allEnquiries: allHistorical.length,
//         });

//         setEnquiries(enquiriesData);
//         setContacts(contactOnly);
//         setContactsSyllabus(syllabusData);
//       } catch (err) {
//         setError(err.message);
//         toast.error("Error fetching data: " + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   /* ------------- derived filters ------------- */
//   useEffect(() => {
//     let base;

//     if (activeTab === "today") {
//       base = todaysData;
//     } else {
//       base = [...enquiries, ...contacts, ...contactsSyllabus];
//       if (startDate && endDate) {
//         base = base.filter(
//           (row) =>
//             row.createdAt &&
//             new Date(row.createdAt) >= startDate &&
//             new Date(row.createdAt) <= endDate
//         );
//       }
//     }

//     if (selectedDataType === "course") {
//       base = base.filter((r) => r.productId);
//     } else if (selectedDataType === "contact") {
//       base = base.filter((r) => !r.productId && !r.syllabus);
//     } else if (selectedDataType === "syllabus") {
//       base = base.filter((r) => r.syllabus);
//     }

//     setFilteredData([...base].reverse());
//   }, [
//     activeTab,
//     startDate,
//     endDate,
//     selectedDataType,
//     enquiries,
//     contacts,
//     contactsSyllabus,
//     todaysData,
//   ]);

//   /* ------------- export helpers ------------- */
//   const exportToExcel = (data, filename) => {
//     const ws = XLSX.utils.json_to_sheet(
//       data.map((r) => ({
//         Type: r.productId
//           ? "Course Enquiry"
//           : r.syllabus
//           ? "Syllabus Enquiry"
//           : "Contact Enquiry",
//         Name: r.name || "-",
//         Email: r.email || "-",
//         Phone: r.phone || "-",
//         Details: r.productId?.Coursename || r.message || r.syllabus || "-",
//         Date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
//         Time: r.createdAt ? new Date(r.createdAt).toLocaleTimeString() : "-",
//         Status: r.status || "new",
//       }))
//     );
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
//     XLSX.writeFile(wb, `${filename}.xlsx`);
//   };

//   const exportToPDF = (data, filename) => {
//     const doc = new jsPDF();
//     const cols = ["Type", "Name", "Email", "Phone", "Details", "Date", "Time"];
//     const rows = data.map((r) => [
//       r.productId
//         ? "Course Enquiry"
//         : r.syllabus
//         ? "Syllabus Enquiry"
//         : "Contact Enquiry",
//       r.name || "-",
//       r.email || "-",
//       r.phone || "-",
//       r.productId?.Coursename || r.message || r.syllabus || "-",
//       r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
//       r.createdAt ? new Date(r.createdAt).toLocaleTimeString() : "-",
//     ]);
//     doc.autoTable(cols, rows, { startY: 20 });
//     doc.text(
//       `${activeTab === "today" ? "Today's" : "All"} Enquiries Report`,
//       14,
//       15
//     );
//     doc.save(`${filename}.pdf`);
//   };

//   /* ------------- table columns ------------- */
//   const columns = [
//     {
//       name: "Type",
//       cell: (row) => (
//         <span className='font-medium'>
//           {row.productId
//             ? "Course Enquiry"
//             : row.syllabus
//             ? "Syllabus Enquiry"
//             : "Contact Enquiry"}
//         </span>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row) => row.name,
//       cell: (row) => <span className='font-medium'>{row.name || "-"}</span>,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row) => row.email,
//       cell: (row) => (
//         <a
//           href={`mailto:${row.email}`}
//           className='text-blue-600 hover:underline'
//         >
//           {row.email || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Phone",
//       selector: (row) => row.phone,
//       cell: (row) => (
//         <a href={`tel:${row.phone}`} className='text-blue-600 hover:underline'>
//           {row.phone || "-"}
//         </a>
//       ),
//     },
//     {
//       name: "Details",
//       cell: (row) => (
//         <div className='max-w-xs'>
//           {row.productId?.Coursename || row.message || row.syllabus || "-"}
//         </div>
//       ),
//     },
//     {
//       name: "Date",
//       selector: (row) => new Date(row.createdAt).toLocaleDateString(),
//       sortable: true,
//     },
//     {
//       name: "Time",
//       selector: (row) => new Date(row.createdAt).toLocaleTimeString(),
//     },
//     {
//       name: "Status",
//       selector: (row) => row.status || "new",
//       cell: (row) => (
//         <span
//           className={`px-2 py-1 rounded-full text-xs ${
//             row.status === "converted"
//               ? "bg-green-100 text-green-800"
//               : row.status === "pending"
//               ? "bg-yellow-100 text-yellow-800"
//               : "bg-blue-100 text-blue-800"
//           }`}
//         >
//           {row.status || "new"}
//         </span>
//       ),
//     },
//   ];

//   /* ------------- UI ------------- */
//   if (loading)
//     return (
//       <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
//         <div className='text-center'>
//           <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto'></div>
//           <p className='mt-4 text-gray-600'>Loading dashboard data...</p>
//         </div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className='min-h-screen bg-gray-50 p-6 flex items-center justify-center'>
//         <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
//           <strong>Error:</strong> {error}
//         </div>
//       </div>
//     );

//   console.log(stats, "total syllabus data");

//   return (
//     <div className='min-h-screen bg-gray-50 p-6'>
//       <h1 className='text-3xl font-bold text-gray-800 mb-8'>
//         Dashboard Overview
//       </h1>

//       {/* ---------- stats ---------- */}
//       <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
//         <StatCard
//           title='Course Enquiries'
//           value={stats.totalCourseEnquiries}
//           icon={<FaGraduationCap />}
//           gradient='from-indigo-500 to-purple-600'
//         />
//         <StatCard
//           title='Contact Enquiries'
//           value={stats.totalContactEnquiries}
//           icon={<FaEnvelope />}
//           gradient='from-blue-500 to-teal-400'
//         />
//         <StatCard
//           title='Syllabus Enquiries'
//           value={stats.totalSyllabusEnquiries}
//           icon={<FaUsers />}
//           gradient='from-green-500 to-emerald-400'
//         />
//         <StatCard
//           title="Today's Enquiries"
//           value={stats.todayEnquiries}
//           icon={<FaCalendarDay />}
//           gradient={
//             activeTab === "today"
//               ? "from-amber-500 to-pink-500"
//               : "from-gray-600 to-gray-800"
//           }
//           onClick={() => setActiveTab("today")}
//         />
//       </div>

//       {/* ---------- table section ---------- */}
//       <div className='bg-white rounded-xl shadow-lg p-6'>
//         <div className='flex justify-between items-center mb-4 flex-wrap gap-2'>
//           <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
//           <div className='flex gap-2'>
//             <button
//               onClick={() =>
//                 exportToExcel(
//                   activeTab === "today" ? todaysData : filteredData,
//                   activeTab === "today" ? "todays_enquiries" : "all_enquiries"
//                 )
//               }
//               className='bg-green-600 text-white px-3 py-2 rounded flex items-center'
//             >
//               <FaFileExcel className='mr-1' />
//               Export Excel
//             </button>
//             <button
//               onClick={() =>
//                 exportToPDF(
//                   activeTab === "today" ? todaysData : filteredData,
//                   activeTab === "today" ? "todays_enquiries" : "all_enquiries"
//                 )
//               }
//               className='bg-red-600 text-white px-3 py-2 rounded flex items-center'
//             >
//               <FaFilePdf className='mr-1' />
//               Export PDF
//             </button>
//           </div>
//         </div>

//         {/* type & date filters */}
//         <Filters
//           activeTab={activeTab}
//           selectedDataType={selectedDataType}
//           setSelectedDataType={setSelectedDataType}
//           startDate={startDate}
//           setStartDate={setStartDate}
//           endDate={endDate}
//           setEndDate={setEndDate}
//         />

//         <p className='text-sm text-gray-600 mb-4'>
//           {activeTab === "today"
//             ? `Showing ${
//                 filteredData.length
//               } enquiries for ${new Date().toLocaleDateString()}`
//             : startDate && endDate
//             ? `Showing ${
//                 filteredData.length
//               } records from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
//             : `Showing ${filteredData.length} records (all dates)`}
//           {selectedDataType !== "all" && ` (${selectedDataType} only)`}
//         </p>

//         <DataTable
//           columns={columns}
//           data={filteredData}
//           pagination
//           highlightOnHover
//           responsive
//           className='border rounded-lg overflow-hidden'
//           noDataComponent={
//             <div className='p-4 text-gray-500'>No data found</div>
//           }
//         />
//       </div>

//       {/* ---------- quick overview tables ---------- */}
//       <QuickOverview
//         enquiries={enquiries}
//         contacts={contacts}
//         syllabus={contactsSyllabus}
//       />
//     </div>
//   );
// };

// /* ------------- tiny helpers ------------- */
// const StatCard = ({ title, value, icon, gradient, onClick }) => (
//   <div
//     className={`bg-gradient-to-r ${gradient} rounded-xl shadow-lg p-6 text-white cursor-pointer`}
//     onClick={onClick}
//   >
//     <div className='flex justify-between items-center'>
//       <div>
//         <p className='text-sm font-medium opacity-80'>{title}</p>
//         <h2 className='text-3xl font-bold mt-2'>{value}</h2>
//       </div>
//       <div className='p-3 bg-white bg-opacity-20 rounded-full'>{icon}</div>
//     </div>
//   </div>
// );

// const TabButtons = ({ activeTab, setActiveTab }) => (
//   <div className='flex gap-2'>
//     <button
//       onClick={() => setActiveTab("today")}
//       className={`px-4 py-2 rounded flex items-center ${
//         activeTab === "today"
//           ? "bg-blue-500 text-white"
//           : "bg-gray-200 text-gray-700"
//       }`}
//     >
//       <FaCalendarDay className='mr-2' />
//       Today's Data
//     </button>
//     <button
//       onClick={() => setActiveTab("all")}
//       className={`px-4 py-2 rounded flex items-center ${
//         activeTab === "all"
//           ? "bg-blue-500 text-white"
//           : "bg-gray-200 text-gray-700"
//       }`}
//     >
//       <FaHistory className='mr-2' />
//       All Data
//     </button>
//   </div>
// );

// const Filters = ({
//   activeTab,
//   selectedDataType,
//   setSelectedDataType,
//   startDate,
//   setStartDate,
//   endDate,
//   setEndDate,
// }) => (
//   <>
//     {(activeTab === "all" || activeTab === "today") && (
//       <div className='mb-4 flex flex-wrap gap-2 justify-between items-center'>
//         <div className='flex gap-2'>
//           {["all", "course", "contact", "syllabus"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setSelectedDataType(type)}
//               className={`px-4 py-2 rounded capitalize ${
//                 selectedDataType === type
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               {type === "all"
//                 ? activeTab === "today"
//                   ? "All Today's Data"
//                   : "All Data"
//                 : type === "course"
//                 ? "Course Enquiries"
//                 : type === "contact"
//                 ? "Contact Enquiries"
//                 : "Syllabus Enquiries"}
//             </button>
//           ))}
//         </div>

//         {activeTab === "all" && (
//           <div className='flex items-center gap-2'>
//             <DatePicker
//               selected={startDate}
//               onChange={setStartDate}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               placeholderText='Start Date'
//               className='border rounded px-3 py-1 text-sm'
//               dateFormat='yyyy-MM-dd'
//             />
//             <span>to</span>
//             <DatePicker
//               selected={endDate}
//               onChange={setEndDate}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate}
//               placeholderText='End Date'
//               className='border rounded px-3 py-1 text-sm'
//               dateFormat='yyyy-MM-dd'
//             />
//             <button
//               onClick={() => {
//                 /* already handled in useEffect */
//               }}
//               className='bg-blue-500 text-white px-3 py-1 rounded flex items-center'
//             >
//               <FaFilter className='mr-1' />
//               Filter
//             </button>
//             <button
//               onClick={() => {
//                 setStartDate(null);
//                 setEndDate(null);
//               }}
//               className='bg-gray-500 text-white px-3 py-1 rounded'
//             >
//               Clear
//             </button>
//           </div>
//         )}
//       </div>
//     )}
//   </>
// );

// const QuickOverview = ({ enquiries, contacts, syllabus }) => (
//   <div className='bg-white rounded-xl shadow-lg p-6 mt-6'>
//     <h2 className='text-xl font-semibold text-gray-800 mb-4'>Quick Overview</h2>
//     <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//       <MiniTable title='Recent Course Enquiries' rows={enquiries} />
//       <MiniTable title='Recent Contact Enquiries' rows={contacts} />
//       <MiniTable title='Recent Syllabus Enquiries' rows={syllabus} />
//     </div>
//   </div>
// );

// const MiniTable = ({ title, rows }) => (
//   <div>
//     <h3 className='text-lg font-medium text-gray-700 mb-3'>{title}</h3>
//     <div className='overflow-x-auto'>
//       <table className='min-w-full divide-y divide-gray-200'>
//         <thead className='bg-gray-50'>
//           <tr>
//             <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
//               Name
//             </th>
//             <th className='px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase'>
//               Date
//             </th>
//           </tr>
//         </thead>
//         <tbody className='bg-white divide-y divide-gray-200'>
//           {rows
//             .slice()
//             .reverse()
//             .slice(0, 5)
//             .map((row, i) => (
//               <tr key={i}>
//                 <td className='px-4 py-2 text-sm'>{row.name || "-"}</td>
//                 <td className='px-4 py-2 text-sm'>
//                   {row.createdAt
//                     ? new Date(row.createdAt).toLocaleDateString()
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// export default Dashboard;
