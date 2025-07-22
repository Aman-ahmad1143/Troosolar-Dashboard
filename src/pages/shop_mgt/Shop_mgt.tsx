import { useState } from 'react';
import Header from "../../component/Header";
import { shopOrderData, getOrderStatusColor, productData } from './shpmgt';
import type { ShopOrderData, ProductData } from './shpmgt';
import OrderDetailModal from './OrderDetailModal';

const Shop_mgt = () => {
  const [activeTab, setActiveTab] = useState("Shop Orders");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Status");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ShopOrderData | null>(null);

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
                  <button className="bg-[#273E8E] hover:bg-[#1e3270] text-white px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-sm">
                    Upload Product
                  </button>
                  <button className="bg-[#E8A91D] hover:bg-orange-600 text-white px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-sm">
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
        {activeTab === "Products" && (
          <>
            {/* Header with filters */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                {/* Filter Dropdowns */}
                <div className="relative">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[120px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8">
                    <option value="">Categories</option>
                    <option value="solar-equipment">Solar Equipment</option>
                    <option value="energy-storage">Energy Storage</option>
                    <option value="accessories">Accessories</option>
                    <option value="electronics">Electronics</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[100px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8">
                    <option value="">Brand</option>
                    <option value="newman">Newman</option>
                    <option value="solar-tech">Solar Tech</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[120px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-8">
                    <option value="">Availability</option>
                    <option value="in-stock">All</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="flex gap-6">
              {/* All Products Section */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-900 mb-6">All Products</h2>
                
                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {productData.map((product: ProductData) => (
                    <div key={product.id} className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
                      
                      {/* Product Image - You can customize the image source here */}
                      <div className="aspect-square bg-white overflow-hidden p-8">
                        <img
                          src={product.image || "/assets/images/newman1.png"} // Default fallback image
                          alt={product.name}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            // Fallback if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.src = "/assets/images/newmanbadge.png";
                          }}
                        />
                      </div>

                      {/* Separator Line */}
                      <div className="border-t border-gray-200"></div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="font-medium text-black text-lg mb-6 leading-tight">{product.name}</h3>
                        
                        {/* Price and Progress Section */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-1xl font-bold text-[#273E8E]">{product.price}</span>
                          <div className="flex flex-col items-end">
                            <span className="text-sm font-medium text-gray-600">12/50</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                              <div className="bg-gradient-to-r from-red-600 to-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Original Price and Discount */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-gray-400 line-through">N5,500,000</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">-50%</span>
                        </div>

                        {/* Separator Line */}
                        <div className="border-t border-gray-200 mb-4"></div>
                        
                        {/* Star Rating */}
                        <div className="flex items-center justify-center mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-4 h-4 text-blue-500 mx-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364 1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Bottom Section - Orders and Button */}
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-black">{product.stock} Orders</span>
                          <button className="bg-[#273E8E] hover:bg-[#1e3270] text-white py-3 px-6 rounded-full text-sm font-semibold transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bundles Section */}
              <div className="w-80">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Bundles</h2>
                
                {/* Bundle Cards */}
                <div className="space-y-4">
                  {/* Bundle 1 */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm relative">
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Mini Bundle
                      </span>
                    </div>
                    
                    <div className="aspect-[4/3] bg-gray-50 rounded-t-lg overflow-hidden p-4">
                      <img
                        src="/assets/images/newman1.png"
                        alt="Newman Inverter Bundle"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">2 Newman Inverters + 1 Solar panel + 4 LED bulbs</h3>
                      
                      {/* Price and Progress Section */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-gray-900">N2,500,000</span>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-medium text-gray-600">12/50</span>
                          <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-gradient-to-r from-red-600 to-green-600 h-1.5 rounded-full" style={{width: '60%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-sm text-gray-400 line-through">N2,800,000</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                     
                    </div>
                  </div>

                  {/* Bundle 2 */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm relative">
                    <div className="absolute top-2 right-2 z-10">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Maxi Bundle
                      </span>
                    </div>
                    
                    <div className="aspect-[4/3] bg-gray-50 rounded-t-lg overflow-hidden p-4">
                      <img
                        src="/assets/images/newman1.png"
                        alt="Newman Inverter Bundle"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">2 Newman Inverters + 1 Solar panel + 4 LED bulbs</h3>
                      
                      {/* Price and Progress Section */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-gray-900">N2,500,000</span>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-medium text-gray-600">12/50</span>
                          <div className="w-12 bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="bg-gradient-to-r from-red-600 to-green-600 h-1.5 rounded-full" style={{width: '80%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-sm text-gray-400 line-through">N2,800,000</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        isOpen={showOrderModal}
        order={selectedOrder}
        onClose={closeModal}
      />
    </div>
  );
};

export default Shop_mgt