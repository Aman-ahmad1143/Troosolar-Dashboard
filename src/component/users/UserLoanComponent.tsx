import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import type { User } from "../../constants/usermgt";
import type { LoanDetail } from "./UserLoanData";

type UserLoanComponentProps = {
  user: User;
  userLoans: LoanDetail[];
};

const UserLoanComponent: React.FC<UserLoanComponentProps> = ({
  user,
  userLoans,
}) => {
  const navigate = useNavigate();
  const [showSendDropdown, setShowSendDropdown] = useState(false);
  const [showApprovalDropdown, setShowApprovalDropdown] = useState(false);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [showSendToPartnerModal, setShowSendToPartnerModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [activeTab, setActiveTab] = useState<"loan" | "financial">("loan");
  const [activeKycTab, setActiveKycTab] = useState<
    "personal" | "credit" | "kyc"
  >("personal");
  const [activeKycSubTab, setActiveKycSubTab] = useState<
    "document" | "beneficiary" | "loanDetails"
  >("document");
  const [selectedLoan, setSelectedLoan] = useState<LoanDetail | null>(null);

  // Form data states
  const [personalData, setPersonalData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    surname: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bvn: user?.bvn || "",
  });

  const [creditData, setCreditData] = useState({
    accountNumber: "",
    bankName: "",
    accountName: "",
  });

  const [kycData, setKycData] = useState({
    selectedDocument: "",
    beneficiaryName: "",
    beneficiaryRelationship: "",
    beneficiaryEmail: "",
    beneficiaryPhone: "",
    loanAmount: "",
    repaymentDuration: "",
  });

  const sendDropdownRef = useRef<HTMLDivElement>(null);
  const approvalDropdownRef = useRef<HTMLDivElement>(null);

  // Save functions
  const savePersonalDetails = () => {
    const userKey = `user_personal_${user?.name
      ?.replace(/\s+/g, "_")
      .toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(personalData));
    alert("Personal details saved successfully!");
  };

  const saveCreditCheck = () => {
    const userKey = `user_credit_${user?.name
      ?.replace(/\s+/g, "_")
      .toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(creditData));
    alert("Credit check details saved successfully!");
  };

  const saveKycDetails = () => {
    const userKey = `user_kyc_${user?.name
      ?.replace(/\s+/g, "_")
      .toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify(kycData));
    alert("KYC details saved successfully!");
  };

  const savePartnerSelection = () => {
    const userKey = `user_partner_${user?.name
      ?.replace(/\s+/g, "_")
      .toLowerCase()}`;
    localStorage.setItem(userKey, JSON.stringify({ selectedPartner }));
    alert("Partner selection saved successfully!");
    setShowSendToPartnerModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sendDropdownRef.current &&
        !sendDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSendDropdown(false);
      }
      if (
        approvalDropdownRef.current &&
        !approvalDropdownRef.current.contains(event.target as Node)
      ) {
        setShowApprovalDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to view loan details
  const viewLoanDetails = (loanId: string) => {
    const loan = userLoans.find((loan) => loan.id === loanId);
    if (loan) {
      setSelectedLoan(loan);
      setShowLoanModal(true);
    }
  };

  // Status Badge component
  const StatusBadge = ({
    status,
  }: {
    status: "Pending" | "Completed" | "Rejected";
  }) => {
    let style = { backgroundColor: "#FFA50033", color: "#FF8C00" }; // Default to pending
    let dotColor = "#FF8C00";

    if (status === "Completed") {
      style = { backgroundColor: "#00800033", color: "#008000" };
      dotColor = "#008000";
    } else if (status === "Rejected") {
      style = { backgroundColor: "#FF000033", color: "#FF0000" };
      dotColor = "#FF0000";
    }

    return (
      <span
        className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full min-w-[75px]"
        style={style}
      >
        <span
          className="w-1.5 h-1.5 rounded-full mr-1.5"
          style={{ backgroundColor: dotColor }}
        ></span>
        {status}
      </span>
    );
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* KYC Profile Modal */}
      {showKycModal && (
        <div className="fixed inset-0 z-50 flex justify-end items-end">
          <div
            className="fixed inset-0 backdrop-blur-md bg-opacity-0"
            onClick={() => setShowKycModal(false)}
          ></div>
          <div className="relative bg-white w-[675px] h-[910px] rounded-xl shadow-lg overflow-y-auto z-10">
            <div className="flex justify-between items-center px-5 pt-4 pb-2">
              <h2 className="text-xl font-semibold">User Details</h2>
              <div className="flex items-center">
                <button
                  className="bg-[#2946A9] text-white text-sm py-1 px-4 rounded-md mr-3"
                  onClick={() => {
                    setShowSendToPartnerModal(true);
                    setShowKycModal(false);
                  }}
                >
                  Send to Partner
                </button>
                <button
                  className="text-gray-600 hover:text-gray-900 p-1"
                  onClick={() => setShowKycModal(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-5">
              <button
                className={`py-2 px-0 mr-6 ${
                  activeKycTab === "personal"
                    ? "border-b-2 border-[#2946A9] font-medium text-[#2946A9]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveKycTab("personal")}
              >
                Personal Details
              </button>
              <button
                className={`py-2 px-0 mr-6 ${
                  activeKycTab === "credit"
                    ? "border-b-2 border-[#2946A9] font-medium text-[#2946A9]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveKycTab("credit")}
              >
                Credit Check
              </button>
              <button
                className={`py-2 px-0 ${
                  activeKycTab === "kyc"
                    ? "border-b-2 border-[#2946A9] font-medium text-[#2946A9]"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveKycTab("kyc")}
              >
                KYC Details
              </button>
            </div>

            {/* Personal Details Content */}
            {activeKycTab === "personal" && (
              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Enter your first name"
                    value={personalData.firstName}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Surname
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Enter your surname"
                    value={personalData.surname}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        surname: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Enter your email address"
                    value={personalData.email}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Enter your phone number"
                    value={personalData.phone}
                    onChange={(e) =>
                      setPersonalData({
                        ...personalData,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">BVN</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="BVN Number"
                    value={personalData.bvn}
                    onChange={(e) =>
                      setPersonalData({ ...personalData, bvn: e.target.value })
                    }
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
            {activeKycTab === "credit" && (
              <div className="p-5">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Enter your account number"
                    value={creditData.accountNumber}
                    onChange={(e) =>
                      setCreditData({
                        ...creditData,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Bank Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded p-2 pr-8 text-sm"
                      placeholder="Enter bank name"
                      value={creditData.bankName}
                      onChange={(e) =>
                        setCreditData({
                          ...creditData,
                          bankName: e.target.value,
                        })
                      }
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Account Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 text-sm"
                    placeholder="Enter account name"
                    value={creditData.accountName}
                    onChange={(e) =>
                      setCreditData({
                        ...creditData,
                        accountName: e.target.value,
                      })
                    }
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
            {activeKycTab === "kyc" && (
              <div className="p-5">
                {/* Sub tabs for KYC Details */}
                <div className="flex mb-6">
                  <button
                    onClick={() => {
                      setActiveKycSubTab("document");
                    }}
                    className={`text-sm py-2 px-6 rounded-l-lg ${
                      activeKycSubTab === "document"
                        ? "bg-[#2946A9] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    Document
                  </button>
                  <button
                    onClick={() => {
                      setActiveKycSubTab("beneficiary");
                    }}
                    className={`text-sm py-2 px-6 ${
                      activeKycSubTab === "beneficiary"
                        ? "bg-[#2946A9] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    Beneficiary
                  </button>
                  <button
                    onClick={() => {
                      setActiveKycSubTab("loanDetails");
                    }}
                    className={`text-sm py-2 px-6 rounded-r-lg ${
                      activeKycSubTab === "loanDetails"
                        ? "bg-[#2946A9] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    Loan Details
                  </button>
                </div>

                {/* Document Content */}
                {activeKycSubTab === "document" && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Select Document
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2 pr-8 text-sm"
                          placeholder="Select Document"
                          readOnly
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Upload Document
                      </label>
                      <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                        <div className="flex justify-center mb-2">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="4"
                              y="2"
                              width="16"
                              height="20"
                              rx="2"
                              stroke="#D1D5DB"
                              strokeWidth="2"
                            />
                            <path
                              d="M8 10H16"
                              stroke="#D1D5DB"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 14H16"
                              stroke="#D1D5DB"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 18H12"
                              stroke="#D1D5DB"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 text-sm">
                          Select a clear copy of your document to upload
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Beneficiary Content */}
                {activeKycSubTab === "beneficiary" && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Beneficiary Name
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        placeholder="Enter beneficiary name"
                        value={kycData.beneficiaryName}
                        onChange={(e) =>
                          setKycData({
                            ...kycData,
                            beneficiaryName: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Beneficiary Relationship
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2 pr-8 text-sm"
                          placeholder="Select Relationship"
                          value={kycData.beneficiaryRelationship}
                          onChange={(e) =>
                            setKycData({
                              ...kycData,
                              beneficiaryRelationship: e.target.value,
                            })
                          }
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Beneficiary Email
                      </label>
                      <input
                        type="email"
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        placeholder="Enter beneficiary email"
                        value={kycData.beneficiaryEmail}
                        onChange={(e) =>
                          setKycData({
                            ...kycData,
                            beneficiaryEmail: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Beneficiary Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        placeholder="Enter beneficiary phone number"
                        value={kycData.beneficiaryPhone}
                        onChange={(e) =>
                          setKycData({
                            ...kycData,
                            beneficiaryPhone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {/* Loan Details Content */}
                {activeKycSubTab === "loanDetails" && (
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Loan Amount
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded p-2 text-sm"
                        placeholder="Enter Loan Amount"
                        value={kycData.loanAmount}
                        onChange={(e) =>
                          setKycData({ ...kycData, loanAmount: e.target.value })
                        }
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">
                        Repayment Duration
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded p-2 pr-8 text-sm"
                          placeholder="Select Duration"
                          value={kycData.repaymentDuration}
                          onChange={(e) =>
                            setKycData({
                              ...kycData,
                              repaymentDuration: e.target.value,
                            })
                          }
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 9L12 15L18 9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-base font-medium mb-2">
                Select Partner
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-md p-4 pr-10 appearance-none text-base"
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                >
                  <option value="" disabled>
                    Select Partner
                  </option>
                  <option value="partner1">Sterling Bank</option>
                  <option value="partner2">Access Bank</option>
                  <option value="partner3">First Bank</option>
                  <option value="partner4">GTBank</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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

      {/* Loan Details Modal */}
      {showLoanModal && selectedLoan && (
        <div className="fixed inset-0 z-50 flex justify-end items-end">
          <div
            className="fixed inset-0 backdrop-blur-md bg-opacity-0"
            onClick={() => setShowLoanModal(false)}
          ></div>
          <div className="relative bg-white w-[675px] h-[900px] rounded-xl shadow-lg overflow-y-auto z-10">
            <div className="flex justify-between items-center px-5 pt-4 pb-2">
              <h2 className="text-xl font-semibold">Full Loan Details</h2>
              <button
                className="text-gray-600 hover:text-gray-900 p-1"
                onClick={() => setShowLoanModal(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-5">
              <button
                className={`py-2 px-0 mr-6 ${
                  activeTab === "loan"
                    ? "border-b-2 border-blue-600 font-medium text-blue-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("loan")}
              >
                Loan Details
              </button>
              <button
                className={`py-2 px-0 ${
                  activeTab === "financial"
                    ? "border-b-2 border-blue-600 font-medium text-blue-900"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("financial")}
              >
                Financial details
              </button>
            </div>

            {/* Loan Details Content */}
            {activeTab === "loan" && (
              <div className="px-5">
                <div className="mb-6">
                  <h3 className="text-sm font-medium my-3">Loan Details</h3>
                  <div className="space-y-0">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Name</span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.name}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Loan Limit</span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.loanLimit}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Loan Amount</span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.loanAmount}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Loan Period</span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.loanPeriod}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Repayment duration
                      </span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.repaymentDuration}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Financing partner
                      </span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.financingPartner}
                      </span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-500 text-sm">
                        Interest rate
                      </span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.interestRate}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium my-3">Loan Status</h3>
                  <div className="space-y-0">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Send Status (to partner)
                      </span>
                      <StatusBadge status={selectedLoan.sendStatus} />
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Send Date</span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.sendDate}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Approval Status (from partner)
                      </span>
                      <StatusBadge status={selectedLoan.approvalStatus} />
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Approval Date
                      </span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.approvalDate}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Disbursement Status
                      </span>
                      <StatusBadge status={selectedLoan.disbursementStatus} />
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-500 text-sm">
                        Disbursement Date
                      </span>
                      <span className="font-medium text-sm text-right">
                        {selectedLoan.disbursementDate}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium my-5">
                  Disburse Loan
                </button>
              </div>
            )}

            {/* Financial Details Content */}
            {activeTab === "financial" && (
              <div className="px-5">
                <div className="mb-6">
                  <h3 className="text-sm font-medium my-3">
                    Credit Check Data
                  </h3>
                  <div className="space-y-0 border border-gray-100 rounded-md overflow-hidden">
                    <div className="flex justify-between py-3 px-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">
                        Total Income
                      </span>
                      <span className="font-medium text-sm text-right">
                        ₦2,000,000
                      </span>
                    </div>
                    <div className="flex justify-between py-3 px-3">
                      <span className="text-gray-500 text-sm">
                        Monthly Income
                      </span>
                      <span className="font-medium text-sm text-right">
                        ₦200,000
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium my-3">Debt Status</h3>
                  <div className="space-y-0 border border-gray-100 rounded-md overflow-hidden">
                    <div className="flex justify-between py-3 px-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Debt Status</span>
                      <span className="font-medium text-sm text-right">
                        Owing 2 institutions
                      </span>
                    </div>
                    <div className="flex justify-between py-3 px-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">ABC Bank</span>
                      <span className="font-medium text-sm text-right">
                        ₦200,000
                      </span>
                    </div>
                    <div className="flex justify-between py-3 px-3 border-b border-gray-100">
                      <span className="text-gray-500 text-sm">Defa Bank</span>
                      <span className="font-medium text-sm text-right">
                        ₦200,000
                      </span>
                    </div>
                    <div className="flex justify-between py-3 px-3">
                      <span className="text-gray-500 text-sm">Total Owed</span>
                      <span className="font-medium text-sm text-right">
                        ₦400,000
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium my-3">
                    Account Statement
                  </h3>
                  <div className="flex items-center justify-between py-3 px-3 border border-gray-100 rounded-md">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <div className="pdf-icon">
                          <img
                            src="/assets/images/pdf.png"
                            alt="PDF"
                            width="24"
                            height="24"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          Download Account Statement
                        </div>
                        <div className="text-xs text-gray-500">200kb</div>
                      </div>
                    </div>
                    <button className="text-blue-600">
                      <div className="download-icon">
                        <img
                          src="/assets/images/download.png"
                          alt="Download"
                          width="24"
                          height="24"
                          className="object-contain"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header at the very top */}
      <Header />

      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{user.name}</h1>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          <button
            className="pb-2 text-gray-500"
            onClick={() => navigate(`/user-activity/${user.id}`)}
          >
            Activity
          </button>
          <button className="pb-2 border-b-2 border-blue-900 text-blue-900 font-semibold">
            Loans
          </button>
          <button
            className="pb-2 text-gray-500"
            onClick={() => navigate(`/user-activity/${user.id}/transactions`)}
          >
            Transactions
          </button>
          <button
            className="pb-2 text-gray-500"
            onClick={() => navigate(`/user-activity/${user.id}/orders`)}
          >
            Orders
          </button>
        </div>

        {/* Credit Score & Wallets */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div
            className="bg-gradient-to-br from-[#2946A9] to-[#f9d423] rounded-2xl shadow-lg p-0 flex items-center justify-center min-w-[350px] min-h-[250px] border-2 border-blue-200"
            style={{ boxShadow: "0 4px 24px 0 rgba(41,70,169,0.10)" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative w-[400px] h-[320px] flex items-center justify-center">
                <svg
                  width="340"
                  height="300"
                  viewBox="0 0 340 300"
                  style={{ zIndex: 1 }}
                >
                  <defs>
                    <filter
                      id="gauge-shadow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feDropShadow
                        dx="0"
                        dy="8"
                        stdDeviation="8"
                        flood-color="#bbb"
                      />
                    </filter>
                    <linearGradient id="gauge-arc" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e53e3e" />
                      <stop offset="100%" stopColor="#38a169" />
                    </linearGradient>
                  </defs>
                  {/* Large white background ellipse with shadow */}
                  <ellipse
                    cx="170"
                    cy="170"
                    rx="130"
                    ry="130"
                    fill="#fff"
                    filter="url(#gauge-shadow)"
                  />
                  {/* Gauge arc (red to green, thinner, fits inside circle) */}
                  <path
                    d="M60,170 A110,110 0 1,1 280,170"
                    fill="none"
                    stroke="url(#gauge-arc)"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Ticks (green, thin) */}
                  {Array.from({ length: 31 }).map((_, i) => {
                    const angle = Math.PI * (0.75 + (i * 1.5) / 30);
                    const x1 = 170 + 85 * Math.cos(angle);
                    const y1 = 170 + 85 * Math.sin(angle);
                    const x2 = 170 + 110 * Math.cos(angle);
                    const y2 = 170 + 110 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#38a169"
                        strokeWidth="2"
                      />
                    );
                  })}
                  {/* Needle as triangle */}
                  <polygon points="170,170 65,135 170,160" fill="#666" />
                  {/* Center circle overlays needle base */}
                  <circle cx="170" cy="170" r="13" fill="#444" />
                  {/* Centered text */}
                  <text
                    x="170"
                    y="210"
                    fontSize="15"
                    fontWeight="500"
                    fill="#888"
                    textAnchor="middle"
                  >
                    My Credit Score
                  </text>
                  <text
                    x="170"
                    y="250"
                    fontSize="40"
                    fontWeight="bold"
                    fill="#222"
                    textAnchor="middle"
                  >
                    0%
                  </text>
                </svg>
              </div>
            </div>
          </div>
          {/* Wallets */}
          <div className="flex flex-col gap-6 flex-1 min-w-[250px]">
            <div className="flex gap-6">
              <div className="bg-[#2946A9] text-white rounded-2xl shadow-lg flex-1 p-6 flex flex-col justify-between min-w-[200px]">
                <div className="text-lg font-semibold mb-2">Loan Wallet</div>
                <div className="text-3xl font-bold mb-6">N200,000</div>

                <div className="bg-[#2946A9]/30 rounded-xl p-4">
                  <div className="text-sm text-gray-200">Loan Eligible for</div>
                  <div className="text-xl font-semibold mt-1">
                    N500,000
                    <span className="text-lg font-normal">/12months</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#2946A9] text-white rounded-2xl shadow-lg flex-1 p-6 flex flex-col justify-between min-w-[200px]">
                <div className="text-lg font-semibold mb-2">General Wallet</div>
                <div className="text-3xl font-bold mb-2">N200,000</div>
                <button
                  className="bg-white text-[#2946A9] rounded-full px-6 py-2 font-semibold mt-2"
                  onClick={() => setShowKycModal(true)}
                >
                  KYC Profile
                </button>
              </div>
            </div>

            {/* Next Repayment Section */}
            <div
              className="bg-white rounded-2xl shadow-lg p-6 border border-red-200"
              style={{
                borderColor: "#FFCDD2",
                borderWidth: "1px",
                boxShadow: "0px 4px 16px 0px rgba(255,205,210,0.20)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                  <div className="text-gray-400 text-sm">Next Repayment</div>
                  <div className="text-red-500 text-base font-medium">
                    2 days overdue
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-gray-100 rounded-xl px-4 py-2 text-center">
                    <div className="text-2xl font-bold">00</div>
                    <div className="text-xs text-gray-500">Days</div>
                  </div>

                  <div className="flex flex-col mx-1 text-gray-600">
                    <div className="h-1 w-1 bg-gray-600 rounded-full mb-1"></div>
                    <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                  </div>

                  <div className="bg-gray-100 rounded-xl px-4 py-2 text-center">
                    <div className="text-2xl font-bold">00</div>
                    <div className="text-xs text-gray-500">Hours</div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="text-blue-900 text-2xl font-bold">
                    N50,000
                  </div>
                  <button className="bg-blue-900 text-white text-xs px-6 py-2 rounded-full">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loans Summary Table */}
        <div className="mb-4">
          <div className="mb-2">
            <h2 className="text-xl font-semibold">Loans Summary</h2>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="relative inline-block">
              <button className="border rounded px-3 py-2 text-sm flex items-center gap-1">
                More Actions
                <svg
                  width="12"
                  height="6"
                  viewBox="0 0 12 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L6 5L11 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="relative inline-block">
              {/* Send Status Dropdown */}
              <div ref={sendDropdownRef}>
                <button
                  className="border rounded px-3 py-2 text-sm flex items-center gap-1"
                  onClick={() => {
                    setShowSendDropdown(!showSendDropdown);
                    setShowApprovalDropdown(false);
                  }}
                >
                  Send Status
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 5L11 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {showSendDropdown && (
                  <div className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                        Pending
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                        Completed
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative inline-block">
              {/* Approval Status Dropdown */}
              <div ref={approvalDropdownRef}>
                <button
                  className="border rounded px-3 py-2 text-sm flex items-center gap-1"
                  onClick={() => {
                    setShowApprovalDropdown(!showApprovalDropdown);
                    setShowSendDropdown(false);
                  }}
                >
                  Approval Status
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6 5L11 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {showApprovalDropdown && (
                  <div className="absolute left-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                        Pending
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                        Completed
                      </button>
                      <button className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100">
                        Rejected
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-[#F8FAFC] text-gray-600">
                  <th className="p-4 w-12">
                    <input type="checkbox" />
                  </th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Amount</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Send Status</th>
                  <th className="p-4 text-left">Approval</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {userLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <input type="checkbox" />
                    </td>
                    <td className="p-4">{loan.name}</td>
                    <td className="p-4">₦{loan.loanAmount}</td>
                    <td className="p-4">05-07-25/07:22AM</td>
                    <td className="p-4">
                      <StatusBadge status={loan.sendStatus} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={loan.approvalStatus} />
                    </td>
                    <td className="p-4">
                      <button
                        className="bg-[#2946A9] text-white px-4 py-2 rounded-full text-sm"
                        onClick={() => viewLoanDetails(loan.id)}
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

export default UserLoanComponent;
