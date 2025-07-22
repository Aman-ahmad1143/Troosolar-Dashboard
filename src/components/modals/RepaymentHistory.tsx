import React from 'react';

interface RepaymentHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  loanId: string;
  loanStatus: "Pending" | "Active" | "Repaid" | "Overdue";
}

const RepaymentHistory: React.FC<RepaymentHistoryProps> = ({ 
  isOpen, 
  onClose, 
  loanId: _loanId, 
  loanStatus 
}) => {
  if (!isOpen) return null;

  // Get status-specific data
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return { bg: '#FFF4E6', text: '#FF8C00' };
      case 'active': return { bg: '#E6F7FF', text: '#008000' };
      case 'repaid': return { bg: '#E8E5FF', text: '#0000FF' };
      case 'overdue': return { bg: '#FFE6E6', text: '#FF0000' };
      default: return { bg: '#F5F5F5', text: '#6B7280' };
    }
  };

  const statusColors = getStatusColor(loanStatus);

  const renderContent = () => {
    switch (loanStatus) {
      case 'Pending':
        return (
          <div className="space-y-4">
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                No repayment history available.
              </p>
            </div>
          </div>
        );

      case 'Active':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                  <p className="text-lg font-semibold text-gray-900">05 July, 25</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">20</p>
                      <p className="text-xs text-gray-500">Days</p>
                    </div>
                    <span className="text-xl text-gray-400">:</span>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">18</p>
                      <p className="text-xs text-gray-500">Hours</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₦60,000</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                    <p className="text-lg font-semibold text-blue-600">Paid - 05 June, 25</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₦60,000</p>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                    <p className="text-lg font-semibold text-blue-600">Paid - 05 May, 25</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₦60,000</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Repaid':
        return (
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                  <p className="text-lg font-semibold text-blue-600">Paid - 05 June, 25</p>
                </div>
                <p className="text-lg font-bold text-gray-900">₦60,000</p>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                  <p className="text-lg font-semibold text-blue-600">Paid - 05 June, 25</p>
                </div>
                <p className="text-lg font-bold text-gray-900">₦60,000</p>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                  <p className="text-lg font-semibold text-blue-600">Paid - 05 May, 25</p>
                </div>
                <p className="text-lg font-bold text-gray-900">₦60,000</p>
              </div>
            </div>
          </div>
        );

      case 'Overdue':
        return (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                  <p className="text-lg font-semibold text-red-600">2 days overdue</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">00</p>
                      <p className="text-xs text-gray-500">Days</p>
                    </div>
                    <span className="text-xl text-gray-400">:</span>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">00</p>
                      <p className="text-xs text-gray-500">Hours</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₦60,000</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                    <p className="text-lg font-semibold text-blue-600">Paid - 05 June, 25</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₦60,000</p>
                </div>
              </div>
              
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Next Payment</p>
                    <p className="text-lg font-semibold text-blue-600">Paid - 05 May, 25</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">₦60,000</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start min-h-screen p-6">
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-white/30" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-xl z-10" style={{ width: '675px', height: '900px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Repayment History</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 h-full overflow-y-auto" style={{ height: 'calc(954px - 80px)' }}>
          {/* Loan Details Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Loan Details</h3>
            <div className="bg-gray-50 rounded-xl p-1 space-y-4">
              <div className="flex justify-between items-center py-0.5">
                <span className="text-sm text-gray-600 font-medium">Loan Status</span>
                <span 
                  className="px-4 py-1.5 text-sm font-medium rounded-full"
                  style={{ 
                    backgroundColor: statusColors.bg,
                    color: statusColors.text
                  }}
                >
                  {loanStatus}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 font-medium">Loan Amount</span>
                <span className="text-sm font-semibold text-gray-900">₦200,000</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 font-medium">Interest Rate</span>
                <span className="text-sm font-semibold text-gray-900">5%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 font-medium">Loan Period</span>
                <span className="text-sm font-semibold text-gray-900">6 months</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600 font-medium">Disbursement Date</span>
                <span className="text-sm font-semibold text-gray-900">July 3, 2025</span>
              </div>
            </div>
          </div>

          {/* Repayment History Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Repayment History</h3>
            {renderContent()}
          </div>

          {/* Send Notification Button */}
          <div className="absolute bottom-8 left-8 right-8">
            <button 
              className="w-full bg-[#2946A9] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#243c8c] transition-colors"
              onClick={() => {
                console.log('Send notification clicked');
                // Add notification logic here
              }}
            >
              Send Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepaymentHistory;
