import { useState } from 'react';
import Header from "../../component/Header";
import { balanceData } from './balance';
import type { BalanceData } from './balance';

const Balances = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(balanceData.map(user => user.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Balances</h1>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Loan Balance Card */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-6">Total Loan Balance</h3>
              <p className="text-4xl font-bold mb-8">N50,000,000</p>
              <div className="flex justify-end">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-blue-900 px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Fund Wallet
                </button>
              </div>
            </div>
          </div>

          {/* Total Shopping Balance Card */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-500 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-medium mb-6">Total Shopping Balance</h3>
              <p className="text-4xl font-bold">N50,000,000</p>
            </div>
          </div>
        </div>

        {/* Balance Summary Section */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Balance Summary</h2>
          
          {/* Controls Row */}
          <div className="flex justify-between items-center mb-4">
            {/* More Actions Dropdown */}
            <div className="relative">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[130px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8">
                <option value="">More Actions</option>
                <option value="export">Export Data</option>
                <option value="bulk-action">Bulk Action</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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

        {/* Balance Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    <input 
                      type="checkbox" 
                      className="rounded"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Loan Balance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Main Balance</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Total Topup</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Total Withdrawal</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {balanceData.map((balance: BalanceData, index: number) => (
                  <tr key={balance.id} className={`${index !== balanceData.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        className="rounded"
                        checked={selectedUsers.includes(balance.id)}
                        onChange={() => handleSelectUser(balance.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {balance.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {balance.loanBalance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {balance.mainBalance}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {balance.totalTopup}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {balance.totalWithdrawal}
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

export default Balances