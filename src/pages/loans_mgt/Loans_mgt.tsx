import { useState } from 'react';
import Header from "../../component/Header";
import { loanData, getStatusBgColor } from './loanmgt';
import KycProfile from './kycprofile';

const Loans_mgt = () => {
  const [selectedFilter, setSelectedFilter] = useState("View Actions");
  const [sendStatusFilter, setSendStatusFilter] = useState("Send Status");
  const [approvalStatusFilter, setApprovalStatusFilter] = useState("Approval Status");
  const [showKycModal, setShowKycModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{id: number, name: string, email?: string, phone?: string, bvn?: string} | null>(null);
  const [showSendToPartnerModal, setShowSendToPartnerModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  // Function to view user details
  const viewUserDetails = (userId: number, userName: string) => {
    // Create user-specific data based on userId
    const userData = getUserDataById(userId, userName);
    setSelectedUser(userData);
    setShowKycModal(true);
  };

  // Function to get user-specific data
  const getUserDataById = (userId: number, userName: string) => {
    // This would typically come from an API or database
    // For now, we'll create mock data based on userId
    const userData = {
      id: userId,
      name: userName,
      email: `${userName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: `+234 80${userId.toString().padStart(2, '0')} 234 567${userId}`,
      bvn: `123456789${userId.toString().padStart(2, '0')}`,
      // Add more user-specific fields as needed
      address: `${userId} Lagos Street, Victoria Island, Lagos`,
      occupation: getUserOccupation(userId),
      monthlyIncome: getUserMonthlyIncome(userId),
      bankAccount: `${userId.toString().padStart(10, '0')}`,
      bankName: getUserBankName(userId)
    };
    return userData;
  };

  // Helper functions for user-specific data
  const getUserOccupation = (userId: number) => {
    const occupations = ["Software Engineer", "Business Analyst", "Marketing Manager", "Sales Executive", "Product Manager", "Data Scientist"];
    return occupations[(userId - 1) % occupations.length];
  };

  const getUserMonthlyIncome = (userId: number) => {
    const incomes = ["₦450,000", "₦380,000", "₦520,000", "₦420,000", "₦600,000", "₦350,000"];
    return incomes[(userId - 1) % incomes.length];
  };

  const getUserBankName = (userId: number) => {
    const banks = ["Access Bank", "GTBank", "First Bank", "Zenith Bank", "UBA", "Sterling Bank"];
    return banks[(userId - 1) % banks.length];
  };

  // Function to handle send to partner
  const handleSendToPartner = () => {
    setShowKycModal(false);
    setShowSendToPartnerModal(true);
  };

  // Function to save partner selection
  const savePartnerSelection = () => {
    console.log("Partner selected:", selectedPartner);
    setShowSendToPartnerModal(false);
    setSelectedPartner("");
  };

  // Filter loan data based on selected filters
  const filteredLoanData = loanData.filter((loan) => {
    const sendStatusMatch = sendStatusFilter === "Send Status" || loan.sendStatus === sendStatusFilter;
    const approvalStatusMatch = approvalStatusFilter === "Approval Status" || loan.approval === approvalStatusFilter;
    return sendStatusMatch && approvalStatusMatch;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* KYC Profile Modal */}
      {selectedUser && (
        <KycProfile
          isOpen={showKycModal}
          onClose={() => setShowKycModal(false)}
          userId={selectedUser.id}
          userName={selectedUser.name}
          userEmail={selectedUser.email}
          userPhone={selectedUser.phone}
          userBvn={selectedUser.bvn}
          onSendToPartner={handleSendToPartner}
        />
      )}

      {/* Send to Partner Modal */}
      {showSendToPartnerModal && (
        <div className="fixed inset-0 z-50 flex justify-end items-start min-h-screen p-6">
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30" 
            onClick={() => setShowSendToPartnerModal(false)}
          ></div>
          <div className="relative bg-white w-[500px] rounded-xl shadow-lg z-10 p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Send to partner</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowSendToPartnerModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-base font-medium mb-2">Select Partner</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-md p-4 pr-10 appearance-none text-base"
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                >
                  <option value="" disabled>Select Partner</option>
                  <option value="Sterling Bank">Sterling Bank</option>
                  <option value="Access Bank">Access Bank</option>
                  <option value="First Bank">First Bank</option>
                  <option value="GTBank">GTBank</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <button 
              className="w-full bg-[#2946A9] text-white py-4 rounded-full font-semibold text-base hover:bg-[#243c8c] transition-colors"
              onClick={savePartnerSelection}
            >
              Save
            </button>
          </div>
        </div>
      )}

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
          <h1 className="text-2xl font-bold text-gray-900">Loans Management</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Loans Sent" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Loans Sent</p>
                <p className="text-2xl font-bold text-blue-600">20</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Loan Approved" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Loan Approved</p>
                <p className="text-2xl font-bold text-blue-600">15</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Summary Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Loans Summary</h2>
          
          {/* Filter Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* More Actions Button */}
              <button
                onClick={() => setSelectedFilter("More Actions")}
                className={`flex items-center justify-between px-6 py-3 border rounded-xl text-sm font-medium transition-colors min-w-[140px] ${
                  selectedFilter === "More Actions"
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>More Actions</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Send Status Dropdown */}
              <div className="relative">
                <select
                  value={sendStatusFilter}
                  onChange={(e) => setSendStatusFilter(e.target.value)}
                  className="px-6 py-3 border rounded-xl text-sm font-medium transition-colors min-w-[140px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-10"
                >
                  <option value="Send Status">Send Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Approval Status Dropdown */}
              <div className="relative">
                <select
                  value={approvalStatusFilter}
                  onChange={(e) => setApprovalStatusFilter(e.target.value)}
                  className="px-6 py-3 border rounded-xl text-sm font-medium transition-colors min-w-[140px] bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-10"
                >
                  <option value="Approval Status">Approval Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
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

        {/* Loans Table */}
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Send Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Approval</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredLoanData.map((loan, index) => (
                  <tr key={loan.id} className={`${index !== filteredLoanData.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
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
                      {loan.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                        style={getStatusBgColor(loan.sendStatus)}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-1.5"
                          style={{
                            backgroundColor: loan.sendStatus.toLowerCase() === "completed" 
                              ? '#008000' 
                              : loan.sendStatus.toLowerCase() === "pending"
                              ? '#FF8C00'
                              : loan.sendStatus.toLowerCase() === "delivered"
                              ? '#008000'
                              : loan.sendStatus.toLowerCase() === "rejected"
                              ? '#FF0000'
                              : '#6B7280'
                          }}
                        ></span>
                        {loan.sendStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                        style={getStatusBgColor(loan.approval)}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-1.5"
                          style={{
                            backgroundColor: loan.approval.toLowerCase() === "completed" 
                              ? '#008000' 
                              : loan.approval.toLowerCase() === "pending"
                              ? '#FF8C00'
                              : loan.approval.toLowerCase() === "delivered"
                              ? '#008000'
                              : loan.approval.toLowerCase() === "rejected"
                              ? '#FF0000'
                              : '#6B7280'
                          }}
                        ></span>
                        {loan.approval}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity text-sm font-medium"
                        style={{ backgroundColor: '#273E8E' }}
                        onClick={() => viewUserDetails(loan.id, loan.name)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans_mgt;