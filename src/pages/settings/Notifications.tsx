import { useState } from 'react';
import { notifications, notificationTypes } from './notifications';
import type { NotificationItem } from './notifications';
import Banner from './Banner';
import NewNotificationModal from './NewNotificationModal';

const Notifications = () => {
  const [activeType, setActiveType] = useState('notification');
  const [notificationList, setNotificationList] = useState<NotificationItem[]>(notifications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const handleSelectNotification = (id: string) => {
    setNotificationList(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isSelected: !notification.isSelected }
          : notification
      )
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setNotificationList(prev =>
      prev.map(notification => ({ ...notification, isSelected: checked }))
    );
  };

  const handleEdit = (id: string) => {
    console.log('Edit notification:', id);
    // Add edit functionality here
  };

  const handleDelete = (id: string) => {
    setNotificationList(prev => prev.filter(notification => notification.id !== id));
  };

  const handleNewNotification = (subject: string, message: string) => {
    const newNotification: NotificationItem = {
      id: (notificationList.length + 1).toString(),
      message: `${subject} - ${message}`,
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
    setNotificationList(prev => [...prev, newNotification]);
  };

  const allSelected = notificationList.every(notification => notification.isSelected);
  const someSelected = notificationList.some(notification => notification.isSelected);

  return (
    <div className="w-full">
      {/* Notification Types */}
      <div className="flex items-center justify-between mb-6">
        <div className="inline-flex bg-white rounded-full p-1 border border-gray-200">
          {notificationTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeType === type.id
                  ? 'bg-[#273E8E] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* New Notification Button */}
        <button 
          onClick={() => {
            if (activeType === 'notification') {
              setIsModalOpen(true);
            } else {
              setIsBannerModalOpen(true);
            }
          }}
          className="bg-[#273E8E] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1f2f7a] transition-colors"
        >
          {activeType === 'banner' ? 'New Banner' : 'New Notification'}
        </button>
      </div>

      {/* Conditional Content based on activeType */}
      {activeType === 'notification' ? (
        /* Notifications Table */
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
                  className="w-4 h-4 text-[#273E8E] bg-[#F8F8F8] border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                />
              </div>
              <div className="col-span-6">
                <span className="text-sm font-medium text-gray-700">Notification</span>
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
            {notificationList.map((notification) => (
              <div key={notification.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Checkbox */}
                  <div className="col-span-1">
                    <input
                      type="checkbox"
                      checked={notification.isSelected || false}
                      onChange={() => handleSelectNotification(notification.id)}
                      className="w-4 h-4 text-[#273E8E] bg-gray-100 border-gray-300 rounded focus:ring-[#273E8E] focus:ring-2"
                    />
                  </div>

                  {/* Notification Message */}
                  <div className="col-span-6">
                    <span className="text-sm text-gray-800">{notification.message}</span>
                  </div>

                  {/* Date Created */}
                  <div className="col-span-3">
                    <span className="text-sm text-gray-600">{notification.dateCreated}</span>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(notification.id)}
                      className="bg-[#273E8E] text-white px-3 py-2 rounded-full text-sm font-medium hover:bg-[#1f2f7a] transition-colors"
                    >
                      Edit Notification
                    </button>
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="bg-[#FF0000] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {notificationList.length === 0 && (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500">No notifications found.</p>
            </div>
          )}
        </div>
      ) : (
        /* Banner Component */
        <Banner 
          isModalOpen={isBannerModalOpen}
          setIsModalOpen={setIsBannerModalOpen}
        />
      )}

      {/* New Notification Modal */}
      <NewNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleNewNotification}
      />
    </div>
  );
};

export default Notifications;
