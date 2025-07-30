import { useState } from 'react';
import AddPartner from './AddPartner';

interface Partner {
  id: string;
  name: string;
  numberOfLoans: number;
  amount: string;
  dateCreated: string;
  status: 'Active' | 'Inactive';
}

const FinancingPartner = () => {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'ABC Partner',
      numberOfLoans: 10,
      amount: 'N10,000,000',
      dateCreated: '05-07-25/07:22AM',
      status: 'Active'
    },
    {
      id: '2',
      name: 'ABC Partner',
      numberOfLoans: 10,
      amount: 'N10,000,000',
      dateCreated: '05-07-25/07:22AM',
      status: 'Active'
    },
    {
      id: '3',
      name: 'ABC Partner',
      numberOfLoans: 10,
      amount: 'N10,000,000',
      dateCreated: '05-07-25/07:22AM',
      status: 'Active'
    }
  ]);

  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);

  const handleAddNewPartner = () => {
    setIsAddPartnerModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddPartnerModalOpen(false);
  };

  const handleSavePartner = (partnerData: any) => {
    const newPartner: Partner = {
      id: (partners.length + 1).toString(),
      name: partnerData.partnerName,
      numberOfLoans: 0,
      amount: 'N0',
      dateCreated: new Date().toLocaleDateString(),
      status: partnerData.status
    };
    setPartners([...partners, newPartner]);
  };

  const handleEditCategory = (partnerId: string) => {
    // Handle edit category logic
    console.log('Edit category for partner:', partnerId);
  };

  const handleDelete = (partnerId: string) => {
    // Handle delete logic
    console.log('Delete partner:', partnerId);
  };

  return (
    <div className="w-full">
      {/* Add New Partner Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddNewPartner}
          className="bg-[#273E8E] text-white px-6 py-3 rounded-full font-medium hover:bg-[#273E8E] transition-colors"
        >
          Add New Partner
        </button>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#EBEBEB] px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-1 items-center">
            <div className="flex items-center space-x-1">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
              />
              <span className="font-medium text-gray-700 text-sm">Partner Name</span>
            </div>
            <div className="font-medium text-gray-700 text-sm">No of loans</div>
            <div className="font-medium text-gray-700 text-sm">Amount</div>
            <div className="font-medium text-gray-700 text-sm">Date Created</div>
            <div className="font-medium text-gray-700 text-sm">Status</div>
            <div className="font-medium text-gray-700 text-sm">Action</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {partners.map((partner) => (
            <div key={partner.id} className="px-8 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-6 gap-1 items-center">
                <div className="flex items-left space-x-1">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-[#273E8E] border-gray-300 rounded focus:ring-[#273E8E]" 
                  />
                  <span className="text-gray-800 text-sm font-medium">{partner.name}</span>
                </div>
                <div className="text-gray-600 text-sm">{partner.numberOfLoans}</div>
                <div className="text-gray-600 text-sm">{partner.amount}</div>
                <div className="text-gray-600 text-sm">{partner.dateCreated}</div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    partner.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {partner.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditCategory(partner.id)}
                    className="bg-[#273E8E] text-white px-3 py-2 rounded-full text-sm font-xs hover:bg-[#1f2f7a] transition-colors"
                  >
                    Edit Category
                  </button>
                  <button 
                    onClick={() => handleDelete(partner.id)}
                    className="bg-[#FF0000] text-white px-5 py-2 rounded-full text-sm font-xs hover:bg-[#FF0000] transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Partner Modal */}
      <AddPartner
        isOpen={isAddPartnerModalOpen}
        onClose={handleCloseModal}
        onSave={handleSavePartner}
      />
    </div>
  );
};

export default FinancingPartner;
