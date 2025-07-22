import React, { useState } from 'react';

interface DisburseModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanId: string;
  amount: string;
  onDisburse: (loanId: string, status: string) => void;
}

const DisburseModal: React.FC<DisburseModalProps> = ({ 
  isOpen, 
  onClose, 
  loanId, 
  amount, 
  onDisburse 
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Rejected', label: 'Rejected' }
  ];

  const handleDisburse = () => {
    if (selectedStatus) {
      onDisburse(loanId, selectedStatus);
      onClose();
      setSelectedStatus('');
      setShowDropdown(false);
    }
  };

  const handleClose = () => {
    onClose();
    setSelectedStatus('');
    setShowDropdown(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-start min-h-screen p-6">
      <div 
        className="fixed inset-0 backdrop-blur-sm bg-white/30" 
        onClick={handleClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-xl z-10 w-[500px] max-w-[90vw]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Loan Disbursement</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount to disburse */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount to disburse
            </label>
            <input
              type="text"
              value={amount}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium"
            />
          </div>

          {/* Change status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change status
            </label>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
              >
                <span className={selectedStatus ? 'text-gray-900' : 'text-gray-500'}>
                  {selectedStatus || 'Change status'}
                </span>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {statusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedStatus(option.value);
                        setShowDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDisburse}
            disabled={!selectedStatus}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedStatus
                ? 'bg-[#273E8E] text-white hover:bg-[#1e2f6b]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Disburse
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisburseModal;
