import { useState, useEffect } from 'react';
import Header from "../../component/Header";
import { transactionData, getTransactionStatusColor } from './transaction';
import type { TransactionData } from './transaction';
import TransactionDetail from './TransactionDetail';

const Transactions = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Status");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleDropdownToggle = (transactionId: string) => {
    setOpenDropdownId(openDropdownId === transactionId ? null : transactionId);
  };

  const handleDropdownAction = (action: string, transactionId: string) => {
    console.log(`${action} for transaction:`, transactionId);
    
    if (action === 'View Transaction details') {
      const transaction = transactionData.find(t => t.id === transactionId);
      if (transaction) {
        setSelectedTransaction(transaction);
        setShowTransactionDetail(true);
      }
    }
    
    setOpenDropdownId(null);
  };

  const handleCloseTransactionDetail = () => {
    setShowTransactionDetail(false);
    setSelectedTransaction(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (_event: MouseEvent) => {
      if (openDropdownId) {
        setOpenDropdownId(null);
      }
    };

    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  // Filter transaction data based on selected filters
  const filteredTransactionData = transactionData.filter((transaction: TransactionData) => {
    const statusMatch = statusFilter === "Status" || transaction.status === statusFilter;
    return statusMatch;
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
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Total Users" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">30</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Total Transactions" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Total Transactions</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                <img 
                  src="/assets/images/Users.png" 
                  alt="Transactions" 
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-600">Transactions</p>
                <p className="text-2xl font-bold text-blue-600">N2,000,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Summary Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Summary</h2>
          
          {/* Filter Tabs and Dropdowns */}
          <div className="flex justify-between items-center">
            {/* Single Row with Tabs and Status Dropdown */}
            <div className="flex items-center space-x-4">
              {/* Filter Tabs */}
              <div className="flex bg-white rounded-full border border-gray-200 p-1 shadow-sm">
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === 'All' 
                      ? 'bg-[#273E8E] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFilter('All')}
                >
                  All
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === 'Deposit' 
                      ? 'bg-[#273E8E] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFilter('Deposit')}
                >
                  Deposit
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === 'Withdrawals' 
                      ? 'bg-[#273E8E] text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFilter('Withdrawals')}
                >
                  Withdrawals
                </button>
              </div>

              {/* Status Dropdown */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[130px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8"
                >
                  <option value="Status">Status</option>
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

        {/* Transaction Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Tx ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredTransactionData.map((transaction: TransactionData, index: number) => (
                  <tr key={transaction.id} className={`${index !== filteredTransactionData.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.date}/{transaction.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {transaction.txId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                        style={getTransactionStatusColor(transaction.status)}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full mr-1.5"
                          style={{
                            backgroundColor: transaction.status.toLowerCase() === "completed" 
                              ? '#008000' 
                              : transaction.status.toLowerCase() === "pending"
                              ? '#FF8C00'
                              : '#6B7280'
                          }}
                        ></span>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 relative">
                        <button 
                          className="relative p-2 text-gray-600 hover:text-gray-900"
                          onClick={() => handleDropdownToggle(transaction.id)}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openDropdownId === transaction.id && (
                          <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="py-2">
                              <button
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => handleDropdownAction('View Transaction details', transaction.id)}
                              >
                                View Transaction details
                              </button>
                            </div>
                          </div>
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

      {/* Transaction Detail Modal */}
      <TransactionDetail
        isOpen={showTransactionDetail}
        transaction={selectedTransaction}
        onClose={handleCloseTransactionDetail}
      />
    </div>
  );
};

export default Transactions;