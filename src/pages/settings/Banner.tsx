import { useState } from 'react';
import NewBannerModal from './NewBannerModal';

interface BannerItem {
  id: string;
  image: string;
  dateCreated: string;
  isSelected?: boolean;
}

interface BannerProps {
  isModalOpen?: boolean;
  setIsModalOpen?: (open: boolean) => void;
}

const Banner = ({ isModalOpen = false, setIsModalOpen }: BannerProps = {}) => {
  const [bannerList, setBannerList] = useState<BannerItem[]>([
    {
      id: '1',
      image: "/public/assets/images/banner.png", // You can replace with your actual image path
      dateCreated: '05-07-25/07:22AM',
      isSelected: false
    },
    {
      id: '2',
      image: '/public/assets/images/banner.jpg', // You can replace with your actual image path
      dateCreated: '05-07-25/07:22AM',
      isSelected: false
    },
    {
      id: '3',
      image: '/public/assets/images/banner.jpg', // You can replace with your actual image path
      dateCreated: '05-07-25/07:22AM',
      isSelected: false
    }
  ]);

  const handleSelectBanner = (id: string) => {
    setBannerList(prev =>
      prev.map(banner =>
        banner.id === id
          ? { ...banner, isSelected: !banner.isSelected }
          : banner
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setBannerList(prev =>
      prev.map(banner => ({ ...banner, isSelected: checked }))
    );
  };

  const handleEdit = (id: string) => {
    console.log('Edit banner:', id);
    // Add edit functionality here
  };

  const handleDelete = (id: string) => {
    setBannerList(prev => prev.filter(banner => banner.id !== id));
  };

  const handleNewBanner = (image: File | null, ) => {
    if (image) {
      // Create a URL for the uploaded image (in real app, you'd upload to server)
      const imageUrl = URL.createObjectURL(image);
      const newBanner: BannerItem = {
        id: (bannerList.length + 1).toString(),
        image: imageUrl,
        dateCreated: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).replace(/\//g, '-').replace(',', '/'),
        isSelected: false
      };
      setBannerList(prev => [...prev, newBanner]);
    }
  };

  const allSelected = bannerList.every(banner => banner.isSelected);
  const someSelected = bannerList.some(banner => banner.isSelected);

  return (
    <div className="w-full">
      {/* Banner Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
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
            <div className="col-span-6">
              <span className="text-sm font-medium text-gray-700">Banner Image</span>
            </div>
            <div className="col-span-3">
              <span className="text-sm font-medium text-gray-700">Date Created</span>
            </div>
            <div className="col-span-2">
              <span className="text-sm font-medium text-gray-700">Action</span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {bannerList.map((banner) => (
            <div key={banner.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Checkbox */}
                <div className="col-span-1">
                  <input
                    type="checkbox"
                    checked={banner.isSelected || false}
                    onChange={() => handleSelectBanner(banner.id)}
                    className="w-4 h-4 text-[#273E8E] bg-gray-100 border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                  />
                </div>

                {/* Banner Image */}
                <div className="col-span-6">
                  <div className="w-48 h-20 rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={banner.image}
                      alt={`Banner ${banner.id}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/assets/images/banner.png"; // Fallback image
                      }}
                    />
                  </div>
                </div>

                {/* Date Created */}
                <div className="col-span-3">
                  <span className="text-sm text-gray-600">{banner.dateCreated}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-row">
                  <div>
                     <button
                    onClick={() => handleEdit(banner.id)}
                    className="bg-[#273E8E] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#1f2f7a] transition-colors"
                  >
                    Edit Banner
                  </button>
                  </div>
                 
                 <div> <button
                    onClick={() => handleDelete(banner.id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bannerList.length === 0 && (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500">No banners found.</p>
          </div>
        )}
      </div>

      {/* New Banner Modal */}
      <NewBannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen && setIsModalOpen(false)}
        onSave={handleNewBanner}
      />
    </div>
  );
};

export default Banner;
