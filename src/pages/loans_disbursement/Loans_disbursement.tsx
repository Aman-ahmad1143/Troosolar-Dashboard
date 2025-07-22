import { useState } from 'react';
import Header from "../../component/Header";
import { disbursementData, getDisbursementStatusColor, getLoanStatusColor } from './loandisbursement';
import FullLoanDetail from './FullLoanDetail';
import RepaymentHistory from '../../components/modals/RepaymentHistory';

const Loans_disbursement = () => {
  const [selectedFilter, setSelectedFilter] = useState("More Actions");
  const [loanStatusFilter, setLoanStatusFilter] = useState("Loan Status");
  const [disbursementStatusFilter, setDisbursementStatusFilter] = useState("Disbursement Status");
  const [showLoanDetail, setShowLoanDetail] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [disbursementList, setDisbursementList] = useState(disbursementData);
  const [showRepaymentHistory, setShowRepaymentHistory] = useState(false);
  const [selectedLoanForHistory, setSelectedLoanForHistory] = useState<{id: string, status: "Pending" | "Active" | "Repaid" | "Overdue"} | null>(null);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleViewLoanDetail = (loanId: string) => {
    setSelectedLoanId(loanId);
    setShowLoanDetail(true);
  };

  const handleCloseLoanDetail = () => {
    setShowLoanDetail(false);
    setSelectedLoanId(null);
  };

  const handleViewRepaymentHistory = (loanId: string, loanStatus: "Pending" | "Active" | "Repaid" | "Overdue") => {
    setSelectedLoanForHistory({ id: loanId, status: loanStatus });
    setShowRepaymentHistory(true);
  };

  const handleCloseRepaymentHistory = () => {
    setShowRepaymentHistory(false);
    setSelectedLoanForHistory(null);
  };

  // Handle disbursement status update
  const handleDisbursementUpdate = (loanId: string, status: string) => {
    setDisbursementList(prevList => 
      prevList.map(loan => 
        loan.id === loanId 
          ? { ...loan, disbursement: status as "Pending" | "Completed" }
          : loan
      )
    );
  };

  // Filter disbursement data based on selected filters
  const filteredDisbursementData = disbursementList.filter((loan) => {
    const loanStatusMatch = loanStatusFilter === "Loan Status" || loan.loanStatus === loanStatusFilter;
    const disbursementStatusMatch = disbursementStatusFilter === "Disbursement Status" || loan.disbursement === disbursementStatusFilter;
    return loanStatusMatch && disbursementStatusMatch;
  });
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header Component */}
      <Header 
        adminName="Hi, Admin"
        adminRole="Administrator"
        adminImage="/assets/layout/admin.png"
        showNotification={true}
        notificationCount={0}
        onNotificationClick={handleNotificationClick}
        showAdminRole={false}
      />

      {/* Main Content */}
      <div className="p-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Loans Disbursement</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Total Loans" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Loans</p>
                <p className="text-2xl font-bold text-blue-600">30</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Loans Disbursed" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Loans Disbursed</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Amount Disbursed" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Amount Disbursed</p>
                <p className="text-2xl font-bold text-blue-600">N2,000,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disbursement Summary Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Disbursement Summary</h2>
          
          {/* Filter Tabs and Dropdowns */}
          <div className="flex justify-between items-start">
            <div className="flex flex-col space-y-4">
              {/* Filter Tabs Row */}
              <div className="flex bg-white rounded-full border border-gray-200 p-1 shadow-sm">
                <button className="bg-[#273E8E] text-white px-4 py-1.5 rounded-full text-sm font-medium">
                  Partner Approved
                </button>
                <button className="text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-gray-100">
                  Pending Approval
                </button>
              </div>

              {/* Dropdowns Row */}
              <div className="flex items-center space-x-4">
                {/* More Actions Dropdown */}
                <div className="relative">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[130px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8"
                  >
                    <option value="More Actions">More Actions</option>
                    <option value="Export">Export</option>
                    <option value="Print">Print</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Loan Status Dropdown */}
                <div className="relative">
                  <select
                    value={loanStatusFilter}
                    onChange={(e) => setLoanStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[130px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8"
                  >
                    <option value="Loan Status">Loan Status</option>
                    <option value="Active">Active</option>
                    <option value="Repaid">Repaid</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Disbursement Status Dropdown */}
                <div className="relative">
                  <select
                    value={disbursementStatusFilter}
                    onChange={(e) => setDisbursementStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[170px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8"
                  >
                    <option value="Disbursement Status">Disbursement Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Disbursement Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Disbursement</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Loan Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredDisbursementData.map((loan, index) => (
                  <tr key={loan.id} className={`${index !== filteredDisbursementData.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {loan.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {loan.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {loan.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                        style={getDisbursementStatusColor(loan.disbursement)}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-1.5"
                          style={{
                            backgroundColor: loan.disbursement.toLowerCase() === "completed" 
                              ? '#008000' 
                              : loan.disbursement.toLowerCase() === "pending"
                              ? '#FF8C00'
                              : '#6B7280'
                          }}
                        ></span>
                        {loan.disbursement}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                        style={getLoanStatusColor(loan.loanStatus)}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-1.5"
                          style={{
                            backgroundColor: loan.loanStatus.toLowerCase() === "active" 
                              ? '#008000'
                              : loan.loanStatus.toLowerCase() === "repaid"
                              ? '#0000FF'
                              : loan.loanStatus.toLowerCase() === "overdue"
                              ? '#FF0000'
                              : loan.loanStatus.toLowerCase() === "pending"
                              ? '#FF8C00'
                              : '#6B7280'
                          }}
                        ></span>
                        {loan.loanStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button 
                          className="p-2 text-gray-600 hover:text-gray-900"
                          onClick={() => handleViewRepaymentHistory(loan.id, loan.loanStatus)}
                        >
                          <img 
                            src="/assets/images/eye.png" 
                            alt="View" 
                            className="w-6 h-6 object-contain"
                          />
                        </button>
                        {loan.disbursement === "Pending" ? (
                          <button 
                            className="text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-xs font-medium"
                            style={{ backgroundColor: '#273E8E' }}
                            onClick={() => handleViewLoanDetail(loan.id)}
                          >
                            Send Loan
                          </button>
                        ) : (
                          <button 
                            className="text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity text-xs font-medium"
                            style={{ backgroundColor: '#273E8E' }}
                            onClick={() => handleViewLoanDetail(loan.id)}
                          >
                            View Details
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Full Loan Detail Modal */}
      {showLoanDetail && selectedLoanId && (
        <FullLoanDetail
          isOpen={showLoanDetail}
          loanId={selectedLoanId}
          onClose={handleCloseLoanDetail}
          onDisbursementUpdate={handleDisbursementUpdate}
        />
      )}

      {/* Repayment History Modal */}
      {showRepaymentHistory && selectedLoanForHistory && (
        <RepaymentHistory
          isOpen={showRepaymentHistory}
          loanId={selectedLoanForHistory.id}
          loanStatus={selectedLoanForHistory.status}
          onClose={handleCloseRepaymentHistory}
        />
      )}
    </div>
  )
}

export default Loans_disbursement