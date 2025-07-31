import { useState } from 'react';
import type { ProductData } from './shpmgt';

import images from '../../constants/images';


interface ProductDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData | null;
}

const ProductDetails = ({ isOpen, onClose, product }: ProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !product) return null;

  // Sample product images - you can replace with actual product images
  const productImages = [
    product.image || "/assets/images/newman1.png",
    "/assets/images/newman1.png",
    "/assets/images/newmanbadge.png"
  ];

  return (
    <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex items-start justify-end z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full max-h-[95vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full  cursor-pointer"
          >
           <img src={images.cross} className="w-7 h-7" alt="" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Product Image Section */}
          <div className="mb-4">
            <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200" style={{height: '250px'}}>
              <img
                src={productImages[0]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/assets/images/newman1.png";
                }}
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium">
                1/{productImages.length}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <div className="text-2xl font-bold text-blue-900 mb-2">{product.price}</div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold text-gray-900">{product.stock}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Orders:</span>
                <span className="font-semibold text-gray-900">10</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Completed Orders:</span>
                <span className="font-semibold text-gray-900">8</span>
              </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 bg-gray-100 text-gray-700  cursor-pointer py-2.5 px-4 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
              Edit Product
            </button>
            <button className="flex-1 bg-red-600 text-white cursor-pointer py-2.5 px-4 rounded-full text-sm font-medium hover:bg-red-600 transition-colors">
              Delete Product
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <div className="flex">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-4 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-4 text-sm cursor-pointer font-medium border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'details' && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 text-sm mb-3">Product Details</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">Longer Life</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">Forecasting Anti Explosion Filter</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-gray-700 text-sm">Leak Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">MaxPowerful Grid Technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-gray-700 text-sm">Maintenance Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700 text-sm">Fahrenheit SchutzTM Heat Protection Case</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-sm mb-4">Reviews</h4>
              
              {/* Review Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                  <span className="text-sm text-gray-600">32 Reviews</span>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {/* Review 1 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">AD</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Adewale</h5>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4].map((star) => (
                            <svg key={star} className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">03-04-25</span>
                      <button className="text-red-500 text-xs hover:text-red-700">Delete</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 ml-13">The product is very good and i enjoyed using it</p>
                </div>

                {/* Review 2 */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">AD</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Adewale</h5>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4].map((star) => (
                            <svg key={star} className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">03-04-25</span>
                      <button className="text-red-500 text-xs hover:text-red-700">Delete</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 ml-13">The product is very good and i enjoyed using it</p>
                </div>

                {/* Review 3 */}
                <div className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium text-sm">AD</span>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 text-sm">Adewale</h5>
                        <div className="flex items-center gap-1 mt-1">
                          {[1, 2, 3, 4].map((star) => (
                            <svg key={star} className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">03-04-25</span>
                      <button className="text-red-500 text-xs hover:text-red-700">Delete</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 ml-13">The product is very good and i enjoyed using it</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
