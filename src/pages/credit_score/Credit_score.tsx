import { useState } from "react";
import Header from "../../component/Header";
import { creditScoreData } from "./creditscore";

const Credit_score = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setShowCreditModal(true);
  };

  const closeModal = () => {
    setShowCreditModal(false);
    setSelectedUser(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600 font-bold";
    if (score >= 70) return "text-blue-600 font-bold";
    if (score >= 50) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 90) return "bg-green-50";
    if (score >= 70) return "bg-blue-50";
    if (score >= 50) return "bg-yellow-50";
    return "bg-red-50";
  };

  const filteredData = creditScoreData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Credit Score</h1>

        {/* Controls Section */}
        <div className="flex justify-between items-center mb-6">
          {/* Left side - Sort and Filter dropdowns */}
          <div className="flex items-center space-x-4">
            {/* Sort By Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8 min-w-[120px]"
              >
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="score">Credit Score</option>
                <option value="date">Date</option>
              </select>
              <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-8 min-w-[100px]"
              >
                <option value="">Filter</option>
                <option value="excellent">Excellent (90+)</option>
                <option value="good">Good (70-89)</option>
                <option value="fair">Fair (50-69)</option>
                <option value="poor">Poor (Below 50)</option>
              </select>
              <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Right side - Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-80"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Credit Score Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Credit Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Loan Limit
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredData.map((item, index) => (
                  <tr key={item.id} className={`${index !== filteredData.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getScoreBackground(item.creditScore)}`}>
                        <span className={getScoreColor(item.creditScore)}>
                          {item.creditScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₦{item.loanLimit.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity text-sm font-medium"
                        style={{ backgroundColor: '#273E8E' }}
                        onClick={() => handleViewDetails(item)}
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

      {/* Credit Check Modal */}
      {showCreditModal && selectedUser && (
        <div className="fixed inset-0 backdrop-blur-lg flex items-end justify-end z-50 p-8">
          <div className="bg-white rounded-lg shadow-xl" style={{ width: '675px', height: '868px' }}>
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Credit Check - {selectedUser.name}</h2>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 h-full overflow-y-auto">
              {/* Credit Score Section with Gradient Background - Exact match to photo */}
              <div 
                className="relative rounded-2xl p-8 mb-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, #273E8E 0%, #FFA500 100%)',
                  height: '320px'
                }}
              >
                {/* Credit Score Circular Progress */}
                <div className="flex items-center justify-center h-full">
                  <div className="relative">
                    {/* White background circle with shadow */}
                    <div 
                      className="w-56 h-56 bg-white rounded-full flex items-center justify-center"
                      style={{
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.05)'
                      }}
                    >
                      <div className="relative w-48 h-48">
                        {/* SVG Credit Score Gauge - Exact match to photo */}
                        <svg className="w-48 h-48" viewBox="0 0 200 200">
                          {/* Define gradient for the arc from red to green */}
                          <defs>
                            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#FF0000" />
                              <stop offset="100%" stopColor="#008000" />
                            </linearGradient>
                          </defs>
                          
                          {/* Tick marks around the gauge - inside position like in photo */}
                          {Array.from({ length: 72 }, (_, i) => {
                            const angle = (i * 360) / 72;
                            const isMainTick = i % 18 === 0;
                            const tickLength = isMainTick ? 12 : 8;
                            const tickWidth = isMainTick ? 2 : 1;
                            // Reduced radius so tick marks are inside the arc
                            const radius = 75; // Inner radius for tick marks
                            const x1 = 100 + (radius - tickLength) * Math.cos(angle * Math.PI / 180);
                            const y1 = 100 + (radius - tickLength) * Math.sin(angle * Math.PI / 180);
                            const x2 = 100 + radius * Math.cos(angle * Math.PI / 180);
                            const y2 = 100 + radius * Math.sin(angle * Math.PI / 180);
                            
                            return (
                              <line
                                key={i}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#008000"
                                strokeWidth={tickWidth}
                              />
                            );
                          })}
                          
                          {/* Single arc with gradient from red to green - outside position like in photo */}
                          <path
                            d="M 10 100 A 90 90 0 0 1 190 100"
                            stroke="url(#arcGradient)"
                            strokeWidth="16"
                            fill="none"
                            strokeLinecap="round"
                          />
                          
                          {/* Needle - exact match to photo (thin and pointed) */}
                          <g transform="translate(100,100)">
                            {/* Needle triangle shape */}
                            <polygon
                              points="0,-70 -3,-5 3,-5"
                              fill="#374151"
                              transform={`rotate(${(selectedUser.creditScore / 100) * 180 - 90})`}
                            />
                            {/* Center circle with white dot */}
                            <circle cx="0" cy="0" r="6" fill="#374151" />
                            <circle cx="0" cy="0" r="2.5" fill="white" />
                          </g>
                        </svg>
                        
                        {/* Score text - positioned exactly like photo */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-xs text-gray-400 mb-1" style={{ marginTop: '45px' }}>My Credit Score</span>
                          <span className="text-4xl font-bold text-gray-900" style={{ lineHeight: '1' }}>{selectedUser.creditScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <span className="text-gray-900 font-medium">0001245659434</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                  <div className="bg-gray-50 p-4 rounded-lg border flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Access Bank</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <span className="text-gray-900 font-medium">{selectedUser.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Credit_score