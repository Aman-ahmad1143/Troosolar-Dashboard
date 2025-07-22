import { useState, useEffect, useRef } from 'react';
import { productData } from './shpmgt';
import type { ProductData } from './shpmgt';
import ProductDetails from './ProductDetails';

const Product = () => {
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isProductDetailsOpen, setIsProductDetailsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);

  // Brand options with customizable PNG paths - CUSTOMIZE THESE PATHS
  // To add your own icons, replace the icon paths below with your actual PNG file paths
  // Example: icon: "/assets/images/your-icon-name.png"
  const brandOptions = [
    { 
      value: "", 
      label: "Brand", 
      icon: null 
    },
    { 
      value: "solar-panels", 
      label: "Solar Panels", 
      icon: "/assets/images/solarpanel.png" // REPLACE WITH YOUR PNG PATH
      
    },
    { 
      value: "batteries", 
      label: "Batteries", 
      icon: "/assets/images/batteries.png" // REPLACE WITH YOUR PNG PATH
    },
    { 
      value: "inverters", 
      label: "Inverters", 
      icon: "/assets/images/inverters.png" // REPLACE WITH YOUR PNG PATH
    },
    { 
      value: "mttp-chargers", 
      label: "MTTP Chargers", 
      icon: "/assets/images/mttpcharger.png" // REPLACE WITH YOUR PNG PATH
    },
    { 
      value: "led-bulbs", 
      label: "LED Bulbs", 
      icon: "/assets/images/bulb.png" // REPLACE WITH YOUR PNG PATH
    },
    { 
      value: "solar-fans", 
      label: "Solar Fans", 
      icon: "/assets/images/solarfans.png" // REPLACE WITH YOUR PNG PATH
    }
  ];

  // Custom dropdown handlers
  const handleBrandSelect = (brand: { value: string; label: string; icon: string | null }) => {
    setSelectedBrand(brand.value);
    setIsBrandDropdownOpen(false);
  };

  const toggleBrandDropdown = () => {
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
  };

  const getSelectedBrandOption = () => {
    return brandOptions.find(option => option.value === selectedBrand) || brandOptions[0];
  };

  // Handle opening product details modal
  const handleViewDetails = (product: ProductData) => {
    setSelectedProduct(product);
    setIsProductDetailsOpen(true);
  };

  const handleCloseProductDetails = () => {
    setIsProductDetailsOpen(false);
    setSelectedProduct(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setIsBrandDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
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

          <div className="relative" ref={brandDropdownRef}>
            <button 
              onClick={toggleBrandDropdown}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors min-w-[100px] bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer pr-8 flex items-center justify-between w-full"
            >
              <div className="flex items-center">
                {getSelectedBrandOption().icon && (
                  <img 
                    src={getSelectedBrandOption().icon || ""} 
                    alt={getSelectedBrandOption().label}
                    className="w-4 h-4 mr-2 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                <span>{getSelectedBrandOption().label}</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Custom Dropdown Menu */}
            {isBrandDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-y-auto" style={{width: '397px', height: '400px'}}>
                {brandOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleBrandSelect(option)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center transition-colors ${
                      index === 0 ? 'rounded-t-lg' : ''
                    } ${
                      index === brandOptions.length - 1 ? 'rounded-b-lg' : ''
                    } ${
                      selectedBrand === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {option.icon && (
                      <div className="w-8 h-8 mr-3 flex items-center justify-center bg-gray-100 rounded-full">
                        <img 
                          src={option.icon || ""} 
                          alt={option.label}
                          className="w-5 h-5 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            )}
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
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-96"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-4">
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
                  <h3 className="font-medium text-black text-sm mb-6 leading-tight">{product.name}</h3>
                  
                  {/* Price and Progress Section */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-0.5xl font-bold text-[#273E8E]">{product.price}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-600">12/50</span>
                      <div className="w-8 bg-gray-200 rounded-full h-2 mt-1">
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
                    <span className="text-xs font-semibold text-black">{product.stock} Orders</span>
                    <button 
                      onClick={() => handleViewDetails(product)}
                      className="bg-[#273E8E] hover:bg-[#1e3270] text-white py-1 px-1.5 rounded-full text-xs font-semibold transition-colors"
                    >
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

      {/* Product Details Modal */}
      <ProductDetails
        isOpen={isProductDetailsOpen}
        onClose={handleCloseProductDetails}
        product={selectedProduct}
      />
    </>
  );
};

export default Product;
