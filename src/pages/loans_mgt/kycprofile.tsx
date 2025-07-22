import React, { useState, useEffect } from "react";

type KycProfileProps = {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  userBvn?: string;
  onSendToPartner: () => void;
};

const KycProfile: React.FC<KycProfileProps> = ({ 
  isOpen, 
  onClose, 
  userId,
  userName,
  userEmail = "",
  userPhone = "",
  userBvn = "",
  onSendToPartner
}) => {
  const [activeKycTab, setActiveKycTab] = useState<'personal' | 'credit' | 'kyc'>('personal');
  const [activeKycSubTab, setActiveKycSubTab] = useState<'document' | 'beneficiary' | 'loanDetails'>('document');

  // Helper functions for user-specific data
  const getUserBankName = (userId: number) => {
    const banks = ["Access Bank", "GTBank", "First Bank", "Zenith Bank", "UBA", "Sterling Bank"];
    return banks[(userId - 1) % banks.length];
  };

  const getUserRelationship = (userId: number) => {
    const relationships = ["Spouse", "Sibling", "Parent", "Child", "Friend", "Cousin"];
    return relationships[(userId - 1) % relationships.length];
  };

  const getLoanAmount = (userId: number) => {
    const amounts = ["₦300,000", "₦500,000", "₦750,000", "₦400,000", "₦600,000", "₦350,000"];
    return amounts[(userId - 1) % amounts.length];
  };

  const getRepaymentDuration = (userId: number) => {
    const durations = ["6 months", "12 months", "18 months", "9 months", "15 months", "24 months"];
    return durations[(userId - 1) % durations.length];
  };

  // Form data states - initialized with user-specific data
  const [personalData, setPersonalData] = useState({
    firstName: userName?.split(' ')[0] || "",
    surname: userName?.split(' ')[1] || userName?.split(' ').slice(1).join(' ') || "",
    email: userEmail,
    phone: userPhone,
    bvn: userBvn
  });

  const [creditData, setCreditData] = useState({
    accountNumber: `${userId.toString().padStart(10, '0')}`,
    bankName: getUserBankName(userId),
    accountName: userName
  });

  const [kycData, setKycData] = useState({
    selectedDocument: "National ID",
    beneficiaryName: `${userName} Next of Kin`,
    beneficiaryRelationship: getUserRelationship(userId),
    beneficiaryEmail: `${userName?.split(' ')[0]?.toLowerCase()}.kin@example.com`,
    beneficiaryPhone: `+234 90${userId.toString().padStart(2, '0')} 123 456${userId}`,
    loanAmount: getLoanAmount(userId),
    repaymentDuration: getRepaymentDuration(userId)
  });

  // Update form data whenever userId changes
  useEffect(() => {
    // Reset tabs to default state when user changes
    setActiveKycTab('personal');
    setActiveKycSubTab('document');

    // Update personal data
    setPersonalData({
      firstName: userName?.split(' ')[0] || "",
      surname: userName?.split(' ')[1] || userName?.split(' ').slice(1).join(' ') || "",
      email: userEmail,
      phone: userPhone,
      bvn: userBvn
    });

    // Update credit data
    setCreditData({
      accountNumber: `${userId.toString().padStart(10, '0')}`,
      bankName: getUserBankName(userId),
      accountName: userName
    });

    // Update KYC data
    setKycData({
      selectedDocument: "National ID",
      beneficiaryName: `${userName} Next of Kin`,
      beneficiaryRelationship: getUserRelationship(userId),
      beneficiaryEmail: `${userName?.split(' ')[0]?.toLowerCase()}.kin@example.com`,
      beneficiaryPhone: `+234 90${userId.toString().padStart(2, '0')} 123 456${userId}`,
      loanAmount: getLoanAmount(userId),
      repaymentDuration: getRepaymentDuration(userId)
    });
  }, [userId, userName, userEmail, userPhone, userBvn]);

  // Save functions
  const savePersonalDetails = () => {
    const userKey = `user_personal_${userName?.replace(/\s+/g, '_').toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(personalData));
    alert("Personal details saved successfully!");
  };

  const saveCreditCheck = () => {
    const userKey = `user_credit_${userName?.replace(/\s+/g, '_').toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(creditData));
    alert("Credit check details saved successfully!");
  };

  const saveKycDetails = () => {
    const userKey = `user_kyc_${userName?.replace(/\s+/g, '_').toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(kycData));
    alert("KYC details saved successfully!");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* KYC Profile Modal */}
      <div className="fixed inset-0 z-50 flex justify-end items-end">
        <div 
          className="fixed inset-0 backdrop-blur-md bg-opacity-0" 
          onClick={onClose}
        ></div>
        <div className="relative bg-white w-[675px] h-[910px] rounded-xl shadow-lg overflow-y-auto z-10">
          <div className="flex justify-between items-center px-5 pt-4 pb-2">
            <h2 className="text-xl font-semibold">User Details</h2>
            <div className="flex items-center">
              <button 
                className="bg-[#2946A9] text-white text-sm py-1 px-4 rounded-md mr-3"
                onClick={onSendToPartner}
              >
                Send to Partner
              </button>
              <button 
                className="text-gray-600 hover:text-gray-900 p-1"
                onClick={onClose}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b px-5">
            <button
              className={`py-2 px-0 mr-6 ${activeKycTab === 'personal' ? 'border-b-2 border-[#2946A9] font-medium text-[#2946A9]' : 'text-gray-500'}`}
              onClick={() => setActiveKycTab('personal')}
            >
              Personal Details
            </button>
            <button
              className={`py-2 px-0 mr-6 ${activeKycTab === 'credit' ? 'border-b-2 border-[#2946A9] font-medium text-[#2946A9]' : 'text-gray-500'}`}
              onClick={() => setActiveKycTab('credit')}
            >
              Credit Check
            </button>
            <button
              className={`py-2 px-0 ${activeKycTab === 'kyc' ? 'border-b-2 border-[#2946A9] font-medium text-[#2946A9]' : 'text-gray-500'}`}
              onClick={() => setActiveKycTab('kyc')}
            >
              KYC Details
            </button>
          </div>
          
          {/* Personal Details Content */}
          {activeKycTab === 'personal' && (
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="Enter your first name"
                  value={personalData.firstName}
                  onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Surname</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="Enter your surname"
                  value={personalData.surname}
                  onChange={(e) => setPersonalData({...personalData, surname: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="Enter your email address"
                  value={personalData.email}
                  onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="Enter your phone number"
                  value={personalData.phone}
                  onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">BVN</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="BVN Number"
                  value={personalData.bvn}
                  onChange={(e) => setPersonalData({...personalData, bvn: e.target.value})}
                />
              </div>
              
              <button 
                className="w-full bg-[#2946A9] text-white py-3 rounded-full mt-8"
                onClick={savePersonalDetails}
              >
                Save
              </button>
            </div>
          )}
          
          {/* Credit Check Content */}
          {activeKycTab === 'credit' && (
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Account Number</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="Enter your account number"
                  value={creditData.accountNumber}
                  onChange={(e) => setCreditData({...creditData, accountNumber: e.target.value})}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Bank Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded p-2 pr-8 text-sm" 
                    placeholder="Enter bank name"
                    value={creditData.bankName}
                    onChange={(e) => setCreditData({...creditData, bankName: e.target.value})}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Account Name</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded p-2 text-sm" 
                  placeholder="Enter account name"
                  value={creditData.accountName}
                  onChange={(e) => setCreditData({...creditData, accountName: e.target.value})}
                />
              </div>
              
              <button 
                className="w-full bg-[#2946A9] text-white py-3 rounded-full mt-8"
                onClick={saveCreditCheck}
              >
                Save
              </button>
            </div>
          )}
          
          {/* KYC Details Content */}
          {activeKycTab === 'kyc' && (
            <div className="p-5">
              {/* Sub tabs for KYC Details */}
              <div className="flex mb-6">
                <button 
                  onClick={() => {
                    setActiveKycSubTab('document');
                  }}
                  className={`text-sm py-2 px-6 rounded-l-lg ${activeKycSubTab === 'document' ? 'bg-[#2946A9] text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  Document
                </button>
                <button 
                  onClick={() => {
                    setActiveKycSubTab('beneficiary');
                  }}
                  className={`text-sm py-2 px-6 ${activeKycSubTab === 'beneficiary' ? 'bg-[#2946A9] text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  Beneficiary
                </button>
                <button 
                  onClick={() => {
                    setActiveKycSubTab('loanDetails');
                  }}
                  className={`text-sm py-2 px-6 rounded-r-lg ${activeKycSubTab === 'loanDetails' ? 'bg-[#2946A9] text-white' : 'bg-gray-100 text-gray-500'}`}
                >
                  Loan Details
                </button>
              </div>
              
              {/* Document Content */}
              {activeKycSubTab === 'document' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Select Document</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded p-2 pr-8 text-sm" 
                        placeholder="Select Document"
                        value={kycData.selectedDocument}
                        onChange={(e) => setKycData({...kycData, selectedDocument: e.target.value})}
                        readOnly
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Upload Document</label>
                    <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                      <div className="flex justify-center mb-2">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="4" y="2" width="16" height="20" rx="2" stroke="#D1D5DB" strokeWidth="2"/>
                          <path d="M8 10H16" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 14H16" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 18H12" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">Select a clear copy of your document to upload</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Beneficiary Content */}
              {activeKycSubTab === 'beneficiary' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Beneficiary Name</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded p-2 text-sm" 
                      placeholder="Enter beneficiary name"
                      value={kycData.beneficiaryName}
                      onChange={(e) => setKycData({...kycData, beneficiaryName: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Beneficiary Relationship</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded p-2 pr-8 text-sm" 
                        placeholder="Select Relationship"
                        value={kycData.beneficiaryRelationship}
                        onChange={(e) => setKycData({...kycData, beneficiaryRelationship: e.target.value})}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Beneficiary Email</label>
                    <input 
                      type="email" 
                      className="w-full border border-gray-300 rounded p-2 text-sm" 
                      placeholder="Enter beneficiary email"
                      value={kycData.beneficiaryEmail}
                      onChange={(e) => setKycData({...kycData, beneficiaryEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Beneficiary Phone Number</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded p-2 text-sm" 
                      placeholder="Enter beneficiary phone number"
                      value={kycData.beneficiaryPhone}
                      onChange={(e) => setKycData({...kycData, beneficiaryPhone: e.target.value})}
                    />
                  </div>
                </div>
              )}
              
              {/* Loan Details Content */}
              {activeKycSubTab === 'loanDetails' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Loan Amount</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded p-2 text-sm" 
                      placeholder="Enter Loan Amount"
                      value={kycData.loanAmount}
                      onChange={(e) => setKycData({...kycData, loanAmount: e.target.value})}
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Repayment Duration</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded p-2 pr-8 text-sm" 
                        placeholder="Select Duration"
                        value={kycData.repaymentDuration}
                        onChange={(e) => setKycData({...kycData, repaymentDuration: e.target.value})}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                className="w-full bg-[#2946A9] text-white py-3 rounded-full mt-8"
                onClick={saveKycDetails}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KycProfile;
