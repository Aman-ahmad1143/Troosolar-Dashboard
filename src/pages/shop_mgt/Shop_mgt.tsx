import { useState } from 'react';
import Header from "../../component/Header";
import { shopOrderData, getOrderStatusColor } from './shpmgt';
import type { ShopOrderData } from './shpmgt';
import OrderDetailModal from './OrderDetailModal';
import Product from './Product';
import ProductBuilder from './ProductBuilder';
import AddProduct from './AddProduct';

const Shop_mgt = () => {
  const [activeTab, setActiveTab] = useState("Shop Orders");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Status");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ShopOrderData | null>(null);
  const [isProductBuilderOpen, setIsProductBuilderOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(shopOrderData.map(order => order.id));
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

  const handleViewDetails = (order: ShopOrderData) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const closeModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  // Filter data based on status
  const filteredOrderData = shopOrderData.filter((order: ShopOrderData) => {
    const statusMatch = statusFilter === "Status" || order.status === statusFilter;
    return statusMatch;
  });

  return (
    <div className="bg-[#F5F7FF] min-h-screen">
      {/* Header Component */}
      <Header 
        adminName="Hi, Admin"
        adminImage="/assets/layout/admin.png"
        onNotificationClick={handleNotificationClick}
      />

      {/* Main Content */}
      <div className="p-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shop Management</h1>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "Shop Orders"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("Shop Orders")}
                >
                  Shop Orders
                </button>
                <button
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "Products"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveTab("Products")}
                >
                  Products
                </button>
              </nav>

              {/* Action Buttons - Only show on Products tab */}
              {activeTab === "Products" && (
                <div className="flex items-center space-x-3 mb-2">
                  <button 
                    onClick={() => setIsAddProductOpen(true)}
                    className="bg-[#273E8E] hover:bg-[#1e3270] text-white px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-sm"
                  >
                    Upload Product
                  </button>
                  <button 
                    onClick={() => setIsProductBuilderOpen(true)}
                    className="bg-[#E8A91D] hover:bg-orange-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-sm"
                  >
                    Create Bundle
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards - Only show for Shop Orders tab */}
        {activeTab === "Shop Orders" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Orders Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 7h-3V6a3 3 0 0 0-6 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a1 1 0 0 1 2 0v1h-2V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">30</p>
                </div>
              </div>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-blue-600">5</p>
                </div>
              </div>
            </div>

            {/* Completed Orders Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Completed Orders</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary Section - Only show for Shop Orders tab */}
        {activeTab === "Shop Orders" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Filter Tabs and Controls */}
              <div className="flex justify-between items-center mb-4">
                {/* Filter Tabs */}
                <div className="flex items-center space-x-4">
                  <div className="flex bg-white rounded-full border border-gray-200 p-1 shadow-sm">
                    <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#273E8E] text-white">
                      All
                    </button>
                    <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">
                      Users
                    </button>
                    <button className="px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100">
                      Orders
                    </button>
                  </div>

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

                  {/* Status Filter */}
                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[130px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8"
                    >
                      <option value="Status">Status</option>
                       <option value="Ordered">Ordered placed</option>
                      <option value="Pending">Pending</option>

                    
                      <option value="Delivered">Delivered</option>
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

            {/* Orders Table */}
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
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Product name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredOrderData.map((order: ShopOrderData, index: number) => (
                      <tr key={order.id} className={`${index !== filteredOrderData.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="checkbox" 
                            className="rounded"
                            checked={selectedUsers.includes(order.id)}
                            onChange={() => handleSelectUser(order.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.productName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {order.date}/{order.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span 
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full"
                            style={getOrderStatusColor(order.status)}
                          >
                            <span 
                              className="w-1.5 h-1.5 rounded-full mr-1.5"
                              style={{
                                backgroundColor: order.status.toLowerCase() === "delivered" 
                                  ? '#008000' 
                                  : order.status.toLowerCase() === "pending"
                                  ? '#FF8C00'
                                  : order.status.toLowerCase() === "ordered"
                                  ? '#5A67D8'
                                  : '#6B7280'
                              }}
                            ></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            className="bg-[#273E8E] hover:bg-[#1e3270] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                            onClick={() => handleViewDetails(order)}
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
          </>
        )}

        {/* Products Tab Content */}
        {activeTab === "Products" && <Product />}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={showOrderModal}
        order={selectedOrder}
        onClose={closeModal}
      />

      {/* Product Builder Modal */}
      <ProductBuilder
        isOpen={isProductBuilderOpen}
        onClose={() => setIsProductBuilderOpen(false)}
      />

      {/* Add Product Modal */}
      <AddProduct
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      />
    </div>
  );
};

export default Shop_mgt