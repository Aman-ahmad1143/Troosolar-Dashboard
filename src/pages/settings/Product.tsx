import { useState, useRef, useEffect } from 'react';
import { productCategories, brands } from './product';
import type { ProductCategory, Brand } from './product';
import AddNewCategory from './AddNewCategory';
import AddNewBrand from './AddNewBrand';

const Product = () => {
  const [categories, setCategories] = useState<ProductCategory[]>(productCategories);
  const [brandList, setBrandList] = useState<Brand[]>(brands);
  const [activeTab, setActiveTab] = useState<'categories' | 'brand'>('categories');
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);

  // Enhanced dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  // Category options with customizable PNG paths
  const categoryOptions = [
    { 
      value: "", 
      label: "Categories", 
      icon: null 
    },
    { 
      value: "solar-panels", 
      label: "Solar Panels", 
      icon: "/assets/images/solarpanel.png"
    },
    { 
      value: "batteries", 
      label: "Batteries", 
      icon: "/assets/images/batteries.png"
    },
    { 
      value: "inverters", 
      label: "Inverters", 
      icon: "/assets/images/inverters.png"
    },
    { 
      value: "mttp-chargers", 
      label: "MTTP Chargers", 
      icon: "/assets/images/mttpcharger.png"
    },
    { 
      value: "led-bulbs", 
      label: "LED Bulbs", 
      icon: "/assets/images/bulb.png"
    },
    { 
      value: "solar-fans", 
      label: "Solar Fans", 
      icon: "/assets/images/solarfans.png"
    }
  ];

  // Custom dropdown handlers
  const handleCategorySelect = (category: { value: string; label: string; icon: string | null }) => {
    setSelectedCategoryFilter(category.value);
    setIsCategoryDropdownOpen(false);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const getSelectedCategoryOption = () => {
    return categoryOptions.find(option => option.value === selectedCategoryFilter) || categoryOptions[0];
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectCategory = (id: string) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id
          ? { ...category, isSelected: !category.isSelected }
          : category
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setCategories(prev =>
      prev.map(category => ({ ...category, isSelected: checked }))
    );
  };

  const handleEdit = (id: string) => {
    console.log('Edit category:', id);
    // Add edit functionality here
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const handleSelectBrand = (id: string) => {
    setBrandList(prev =>
      prev.map(brand =>
        brand.id === id
          ? { ...brand, isSelected: !brand.isSelected }
          : brand
      )
    );
  };

  const handleSelectAllBrands = (checked: boolean) => {
    setBrandList(prev =>
      prev.map(brand => ({ ...brand, isSelected: checked }))
    );
  };

  const handleEditBrand = (id: string) => {
    console.log('Edit brand:', id);
    // Add edit functionality here
  };

  const handleDeleteBrand = (id: string) => {
    setBrandList(prev => prev.filter(brand => brand.id !== id));
  };

  const handleAddNewCategory = (categoryName: string, image: File | null, status: string) => {
    if (image) {
      const imageUrl = URL.createObjectURL(image);
      const newCategory: ProductCategory = {
        id: (categories.length + 1).toString(),
        categoryName,
        image: imageUrl,
        dateCreated: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(/\//g, '-').replace(',', '/'),
        status: status as 'Active' | 'Pending',
        isSelected: false
      };
      setCategories(prev => [...prev, newCategory]);
    }
  };

  const handleAddNewBrand = (categoryName: string, brandName: string, status: string) => {
    const newBrand: Brand = {
      id: (brandList.length + 1).toString(),
      brandName,
      category: categoryName,
      dateCreated: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).replace(/\//g, '-').replace(',', '/'),
      status: status as 'Active' | 'Pending',
      isSelected: false
    };
    setBrandList(prev => [...prev, newBrand]);
  };

  const allSelected = categories.every(category => category.isSelected);
  const someSelected = categories.some(category => category.isSelected);
  
  const allBrandsSelected = brandList.every(brand => brand.isSelected);
  const someBrandsSelected = brandList.some(brand => brand.isSelected);

  return (
    <div className="w-full ">
      {/* Filters and Add New Category Button */}
      <div className="mb-6 flex justify-between items-center">
        {/* Left side - Tab Navigation / Filters */}
        <div className="flex items-center space-x-4">
          <div className="bg-[#FFFFFF] rounded-full p-2 flex border border-gray-200">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'categories'
                  ? 'bg-[#273E8E] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('brand')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'brand'
                  ? 'bg-[#273E8E] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Brand
            </button>
          </div>

          {/* Categories Dropdown Filter */}
          <div className="relative" ref={categoryDropdownRef}>
            <button 
              onClick={toggleCategoryDropdown}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 flex items-center justify-between min-w-[140px] focus:ring-2 focus:ring-[#273E8E] focus:border-[#273E8E]"
            >
              <div className="flex items-center">
                {getSelectedCategoryOption().icon && (
                  <img 
                    src={getSelectedCategoryOption().icon || ""} 
                    alt={getSelectedCategoryOption().label}
                    className="w-4 h-4 mr-2 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )}
                <span>{getSelectedCategoryOption().label}</span>
              </div>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Custom Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-y-auto" style={{width: '397px', height: '400px'}}>
                {categoryOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleCategorySelect(option)}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 flex items-center transition-colors ${
                      index === 0 ? 'rounded-t-lg' : ''
                    } ${
                      index === categoryOptions.length - 1 ? 'rounded-b-lg' : ''
                    } ${
                      selectedCategoryFilter === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
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
        </div>

        {/* Add New Category Button */}
        <button 
          onClick={() => {
            if (activeTab === 'categories') {
              setIsAddCategoryModalOpen(true);
            } else {
              setIsAddBrandModalOpen(true);
            }
          }}
          className="bg-[#273E8E] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#1f2f7a] transition-colors"
        >
          {activeTab === 'categories' ? 'Add New Category' : 'Add New Brand'}
        </button>
      </div>

      {/* Categories Table */}
      {activeTab === 'categories' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#EBEBEB] px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-[#273E8E] bg-gray-100 border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                />
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-gray-700">Category Name</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Image</span>
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-gray-700">Date Created</span>
              </div>
              <div className="col-span-1">
                <span className="text-sm font-medium text-gray-700">Status</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Action</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div key={category.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={category.isSelected || false}
                      onChange={() => handleSelectCategory(category.id)}
                      className="w-4 h-4 text-[#273E8E] bg-gray-100 border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                    />
                  </div>

                  {/* Category Name */}
                  <div className="col-span-3">
                    <span className="text-sm font-medium text-gray-900">{category.categoryName}</span>
                  </div>

                  {/* Image */}
                  <div className="col-span-2">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={category.image}
                        alt={`${category.categoryName} category`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = "/assets/images/category.png"; // Fallback image
                        }}
                      />
                    </div>
                  </div>

                  {/* Date Created */}
                  <div className="col-span-3">
                    <span className="text-sm text-gray-600">{category.dateCreated}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {category.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(category.id)}
                      className="bg-[#273E8E] text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-[#1f2f7a] transition-colors"
                    >
                      Edit Category
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No categories found.</p>
            </div>
          )}
        </div>
      )}

      {/* Brand Tab Content */}
      {activeTab === 'brand' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="bg-[#EBEBEB] px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  checked={allBrandsSelected}
                  ref={input => {
                    if (input) input.indeterminate = someBrandsSelected && !allBrandsSelected;
                  }}
                  onChange={(e) => handleSelectAllBrands(e.target.checked)}
                  className="w-4 h-4 text-[#273E8E] bg-gray-100 border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                />
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-gray-700">Brand Name</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Category</span>
              </div>
              <div className="col-span-3">
                <span className="text-sm font-medium text-gray-700">Date Created</span>
              </div>
              <div className="col-span-1">
                <span className="text-sm font-medium text-gray-700">Status</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-700">Action</span>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {brandList.map((brand) => (
              <div key={brand.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={brand.isSelected || false}
                      onChange={() => handleSelectBrand(brand.id)}
                      className="w-4 h-4 text-[#273E8E] bg-gray-100 border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                    />
                  </div>

                  {/* Brand Name */}
                  <div className="col-span-3">
                    <span className="text-sm font-medium text-gray-900">{brand.brandName}</span>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span className="text-sm text-gray-600">{brand.category}</span>
                  </div>

                  {/* Date Created */}
                  <div className="col-span-3">
                    <span className="text-sm text-gray-600">{brand.dateCreated}</span>
                  </div>

                  {/* Status */}
                  <div className="col-span-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      brand.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {brand.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex space-x-2">
                    <button
                      onClick={() => handleEditBrand(brand.id)}
                      className="bg-[#273E8E] text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-[#1f2f7a] transition-colors"
                    >
                      Edit Brand
                    </button>
                    <button
                      onClick={() => handleDeleteBrand(brand.id)}
                      className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {brandList.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No brands found.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Add New Category Modal */}
      <AddNewCategory
        isOpen={isAddCategoryModalOpen}
        onClose={() => setIsAddCategoryModalOpen(false)}
        onSave={handleAddNewCategory}
      />
      
      {/* Add New Brand Modal */}
      <AddNewBrand
        isOpen={isAddBrandModalOpen}
        onClose={() => setIsAddBrandModalOpen(false)}
        onSave={handleAddNewBrand}
      />
    </div>
  );
};

export default Product;
