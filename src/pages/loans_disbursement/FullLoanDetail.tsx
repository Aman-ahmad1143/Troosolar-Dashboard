import React, { useState } from "react";
import DisburseModal from "../../components/modals/DisburseModal";
import images from "../../constants/images";
import type { LoanDetail } from "../../component/users/UserLoanData";

interface FullLoanDetailProps {
  isOpen: boolean;
  onClose: () => void;
  loanId: string;
  onDisbursementUpdate?: (loanId: string, status: string) => void;
}

const FullLoanDetail: React.FC<FullLoanDetailProps> = ({
  isOpen,
  onClose,
  loanId,
  onDisbursementUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<"loan" | "financial">("loan");
  const [showDisburseModal, setShowDisburseModal] = useState(false);
  const [loanData, setLoanData] = useState<LoanDetail | null>(null);

  // Sample loan data - in real app, this would come from props or API call based on loanId
  const getLoanById = (id: string): LoanDetail | null => {
    const sampleLoans: LoanDetail[] = [
      {
        id: "1",
        userId: "1",
        name: "Adewale Faizah",
        loanLimit: "₦500,000",
        loanAmount: "₦200,000",
        loanPeriod: "3 months",
        repaymentDuration: "Monthly",
        financingPartner: "Sterling Bank",
        interestRate: "15%",
        sendStatus: "Pending",
        sendDate: "Not yet sent",
        approvalStatus: "Pending",
        approvalDate: "Not yet approved",
        disbursementStatus: "Pending",
        disbursementDate: "Not yet disbursed",
      },
      {
        id: "2",
        userId: "2",
        name: "John Adam",
        loanLimit: "₦300,000",
        loanAmount: "₦200,000",
        loanPeriod: "3 months",
        repaymentDuration: "Monthly",
        financingPartner: "Access Bank",
        interestRate: "12%",
        sendStatus: "Completed",
        sendDate: "04-07-25/10:30AM",
        approvalStatus: "Completed",
        approvalDate: "05-07-25/14:45PM",
        disbursementStatus: "Completed",
        disbursementDate: "06-07-25/11:20AM",
      },
      {
        id: "3",
        userId: "3",
        name: "Chris Banner",
        loanLimit: "₦400,000",
        loanAmount: "₦200,000",
        loanPeriod: "3 months",
        repaymentDuration: "Monthly",
        financingPartner: "First Bank",
        interestRate: "13%",
        sendStatus: "Completed",
        sendDate: "03-07-25/16:00PM",
        approvalStatus: "Completed",
        approvalDate: "04-07-25/12:30PM",
        disbursementStatus: "Completed",
        disbursementDate: "05-07-25/08:45AM",
      },
      {
        id: "4",
        userId: "4",
        name: "Adam Waa",
        loanLimit: "₦600,000",
        loanAmount: "₦200,000",
        loanPeriod: "3 months",
        repaymentDuration: "Monthly",
        financingPartner: "GTBank",
        interestRate: "14%",
        sendStatus: "Completed",
        sendDate: "02-07-25/13:15PM",
        approvalStatus: "Completed",
        approvalDate: "03-07-25/10:00AM",
        disbursementStatus: "Completed",
        disbursementDate: "04-07-25/15:30PM",
      },
      {
        id: "5",
        userId: "5",
        name: "Anita Shawn",
        loanLimit: "₦450,000",
        loanAmount: "₦200,000",
        loanPeriod: "3 months",
        repaymentDuration: "Monthly",
        financingPartner: "UBA",
        interestRate: "13.5%",
        sendStatus: "Pending",
        sendDate: "Not yet sent",
        approvalStatus: "Pending",
        approvalDate: "Not yet approved",
        disbursementStatus: "Pending",
        disbursementDate: "Not yet disbursed",
      },
      {
        id: "6",
        userId: "6",
        name: "Chris Banner",
        loanLimit: "₦550,000",
        loanAmount: "₦200,000",
        loanPeriod: "3 months",
        repaymentDuration: "Monthly",
        financingPartner: "Zenith Bank",
        interestRate: "16%",
        sendStatus: "Completed",
        sendDate: "30-06-25/11:30AM",
        approvalStatus: "Completed",
        approvalDate: "01-07-25/16:45PM",
        disbursementStatus: "Completed",
        disbursementDate: "02-07-25/13:00PM",
      },
    ];

    return sampleLoans.find((loan) => loan.id === id) || null;
  };

  const selectedLoan = loanData || getLoanById(loanId);

  // Initialize loan data when component mounts
  React.useEffect(() => {
    if (!loanData) {
      setLoanData(getLoanById(loanId));
    }
  }, [loanId, loanData]);

  // Handle disbursement status change
  const handleDisburse = (loanId: string, status: string) => {
    if (selectedLoan) {
      const updatedLoan: LoanDetail = {
        ...selectedLoan,
        disbursementStatus: status as "Pending" | "Completed",
        disbursementDate:
          status === "Completed"
            ? new Date().toLocaleDateString()
            : "Not yet disbursed",
      };
      setLoanData(updatedLoan);

      // Notify parent component about the change
      if (onDisbursementUpdate) {
        onDisbursementUpdate(loanId, status);
      }
    }
  };

  // Status Badge component
  const StatusBadge = ({
    status,
  }: {
    status: string;
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

  if (!isOpen || !selectedLoan) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end items-end sm:items-center">
      <div
        className="fixed inset-0 bg-opacity-0 backdrop-brightness-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white w-[675px] h-full max-w-[100%] max-h-[100%] sm:rounded-xl shadow-lg overflow-y-auto z-10">
        <div className="flex justify-between items-center px-5 pt-4 pb-2">
          <h2 className="text-xl font-semibold">Full Loan Details</h2>
          <button className=" cursor-pointer " onClick={onClose}>
            {/* <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg> */}
            <img src={images.cross} className="w-7 h-7" alt="" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-5">
          <button
            className={`py-2 px-0 mr-6 cursor-pointer ${
              activeTab === "loan"
                ? "border-b-4 border-[#273E8E] font-medium text-black"
                : "text-[#00000080]"
            }`}
            onClick={() => setActiveTab("loan")}
          >
            Loan Details
          </button>
          <button
            className={`py-2 px-0 cursor-pointer ${
              activeTab === "financial"
                ? "border-b-4 border-[#273E8E] font-medium text-black"
                : "text-[#00000080]"
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
              <div className="space-y-0 border-[#00000080] border rounded-lg p-5">
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">Name</span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.name}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">Loan Limit</span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.loanLimit}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">Loan Amount</span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.loanAmount}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">Loan Period</span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.loanPeriod}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">
                    Repayment duration
                  </span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.repaymentDuration}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">
                    Financing partner
                  </span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.financingPartner}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#00000080] text-sm">
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
              <div className="space-y-0 border border-[#00000080] rounded-lg p-5">
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">
                    Send Status (to partner)
                  </span>
                  <StatusBadge status={selectedLoan.sendStatus} />
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">Send Date</span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.sendDate}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">
                    Approval Status (from partner)
                  </span>
                  <StatusBadge status={selectedLoan.approvalStatus} />
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">
                    Approval Date
                  </span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.approvalDate}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-[#CDCDCD]">
                  <span className="text-[#00000080] text-sm">
                    Disbursement Status
                  </span>
                  <StatusBadge status={selectedLoan.disbursementStatus} />
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-[#00000080] text-sm">
                    Disbursement Date
                  </span>
                  <span className="font-medium text-sm text-right">
                    {selectedLoan.disbursementDate}
                  </span>
                </div>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-full font-medium my-5 transition-colors cursor-pointer ${
                selectedLoan.disbursementStatus === "Completed"
                  ? "bg-[#939FC7] text-white cursor-not-allowed"
                  : "bg-[#273E8E] hover:bg-blue-700 text-white"
              }`}
              onClick={() =>
                selectedLoan.disbursementStatus !== "Completed" &&
                setShowDisburseModal(true)
              }
              disabled={selectedLoan.disbursementStatus === "Completed"}
            >
              Disburse Loan
            </button>
          </div>
        )}

        {/* Financial Details Content */}
        {activeTab === "financial" && (
          <div className="px-5">
            <div className="mb-6">
              <h3 className="text-sm font-medium my-3">Credit Check Data</h3>
              <div className="space-y-0 border border-[#00000080] rounded-lg p-2 overflow-hidden">
                <div className="flex justify-between py-3 px-3 border-b border-[#CDCDCD]">
                  <span className="text-gray-500 text-sm">Total Income</span>
                  <span className="font-medium text-sm text-right">
                    ₦2,000,000
                  </span>
                </div>
                <div className="flex justify-between py-3 px-3">
                  <span className="text-gray-500 text-sm">Monthly Income</span>
                  <span className="font-medium text-sm text-right">
                    ₦200,000
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium my-3">Debt Status</h3>
              <div className="space-y-0 border border-[#00000080] rounded-lg p-2 overflow-hidden">
                <div className="flex justify-between py-3 px-3 border-b border-[#CDCDCD]">
                  <span className="text-gray-500 text-sm">Debt Status</span>
                  <span className="font-medium text-sm text-right">
                    Owing 2 institutions
                  </span>
                </div>
                <div className="flex justify-between py-3 px-3 border-b border-[#CDCDCD]">
                  <span className="text-gray-500 text-sm">ABC Bank</span>
                  <span className="font-medium text-sm text-right">
                    ₦200,000
                  </span>
                </div>
                <div className="flex justify-between py-3 px-3 border-b border-[#CDCDCD]">
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
              <h3 className="text-sm font-medium my-3">Account Statement</h3>
              <div className="flex items-center justify-between py-3 px-3 border border-[#00000080] rounded-lg p-2">
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

      {/* Disburse Modal */}
      <DisburseModal
        isOpen={showDisburseModal}
        onClose={() => setShowDisburseModal(false)}
        loanId={loanId}
        amount={selectedLoan.loanAmount}
        onDisburse={handleDisburse}
      />
    </div>
  );
};

export default FullLoanDetail;
