import type { ShopOrderData } from './shpmgt';

interface OrderDetailModalProps {
  isOpen: boolean;
  order: ShopOrderData | null;
  onClose: () => void;
}

const OrderDetailModal = ({ isOpen, order, onClose }: OrderDetailModalProps) => {
  if (!isOpen || !order) return null;

  // Convert amount string to number for calculations
  const amountNumber = parseInt(order.amount.replace(/[N,]/g, ''));

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-end justify-end z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Change Status Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Change Status</span>
              <span>Change order status</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-4 space-y-4">
            {/* Status Badge */}
            <div className="text-center py-4">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                order.status === "Delivered" 
                  ? "bg-green-100" 
                  : order.status === "Pending" 
                  ? "bg-orange-100" 
                  : "bg-blue-100"
              }`}>
                {order.status === "Delivered" ? (
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : order.status === "Pending" ? (
                  <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                {order.status === "Delivered" ? "Order Delivered" : 
                 order.status === "Pending" ? "Order Pending" : "Order Placed"}
              </p>
              <p className="text-xs text-gray-600 mb-3">
                {order.status === "Delivered" 
                  ? `Order has been successfully delivered on ${order.date}`
                  : order.status === "Pending"
                  ? `Order is being processed. Expected delivery: July 7, 2024`
                  : `Order has been placed successfully on ${order.date}`
                }
              </p>
              <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                order.status === "Delivered" 
                  ? "bg-green-50 text-green-700" 
                  : order.status === "Pending" 
                  ? "bg-orange-50 text-orange-700" 
                  : "bg-blue-50 text-blue-700"
              }`}>
                Order ID: {order.id}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Product Details</h3>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img src="/assets/images/newman1.png" alt={order.productName} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{order.productName}</h4>
                  <p className="text-lg font-bold text-gray-900">{order.amount}</p>
                  <p className="text-xs text-gray-600">Order Date: {order.date}/{order.time}</p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Customer Details</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-600">Customer Name</span>
                  </div>
                  <p className="text-gray-900 font-medium">{order.name}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Contact</span>
                    <span className="text-gray-900">07012345678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status</span>
                    <span className={`font-medium ${
                      order.status === "Delivered" 
                        ? "text-green-600" 
                        : order.status === "Pending" 
                        ? "text-orange-600" 
                        : "text-blue-600"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Delivery Details</h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-600">Delivery Address</span>
                  </div>
                  <p className="text-gray-900 font-medium">No 1 Janos street, Wuse Lagos</p>
                  <p className="text-gray-600">Contact: 07012345678</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="text-gray-900">July 7, 2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className={`font-medium ${
                      order.status === "Delivered" 
                        ? "text-green-600" 
                        : order.status === "Pending" 
                        ? "text-orange-600" 
                        : "text-blue-600"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Installation */}
            {order.status === "Delivered" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Installation</h3>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-2">
                    Installation slot is available for delivered product. Contact our team to schedule.
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Available from</span>
                    <span>July 7, 2024</span>
                  </div>
                  <div>
                    <span className="text-xs text-green-600 font-medium">AVAILABLE</span>
                  </div>
                </div>
              </div>
            )}

            {order.status === "Pending" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Installation</h3>
                <div className="border-2 border-dashed border-orange-300 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-2">
                    Installation slot will be available after delivery.
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Est install time</span>
                    <span>July 7, 2024</span>
                  </div>
                  <div>
                    <span className="text-xs text-orange-600 font-medium">PENDING DELIVERY</span>
                  </div>
                </div>
              </div>
            )}

            {order.status === "Ordered" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Installation</h3>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-2">
                    Installation slot will be available after delivery confirmation.
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Est install time</span>
                    <span>July 7, 2024</span>
                  </div>
                  <div>
                    <span className="text-xs text-blue-600 font-medium">ORDER CONFIRMED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Payment Summary</h3>
              <div className="space-y-2 text-xs bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Amount</span>
                  <span className="text-gray-900">{order.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">N50,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Installation Fee</span>
                  <span className="text-gray-900">N100,000</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-medium">
                  <span className="text-gray-900">Total Amount</span>
                  <span className="text-blue-600">N{(amountNumber + 150000).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="text-green-600 font-medium">PAID</span>
                </div>
              </div>
            </div>

            {/* Customer Review (only for delivered orders) */}
            {order.status === "Delivered" && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Customer Review</h3>
                <div className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 flex-shrink-0">
                    {order.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium text-gray-900">{order.name}</span>
                      <div className="flex ml-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      Excellent product quality! The {order.productName.toLowerCase()} works perfectly and delivery was prompt. Very satisfied with this solar solution.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
