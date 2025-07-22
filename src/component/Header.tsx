interface HeaderProps {
  adminName?: string;
  adminRole?: string;
  adminImage?: string;
  showNotification?: boolean;
  notificationCount?: number;
  onNotificationClick?: () => void;
  showAdminRole?: boolean;
}

const Header = ({ 
  adminName = "Hi, Admin",
  adminRole = "Administrator", 
  adminImage = "/assets/layout/admin.png",
  showNotification = true,
  notificationCount = 0,
  onNotificationClick,
  showAdminRole = false
}: HeaderProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex justify-end items-center">
        <div className="flex items-center space-x-5">
          {showNotification && (
            <button 
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition relative"
              onClick={onNotificationClick}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5V7a5 5 0 00-10 0v5l-5 5h5a5 5 0 0010 0z" />
              </svg>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{notificationCount > 9 ? '9+' : notificationCount}</span>
                </span>
              )}
              {notificationCount === 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200">
              <img src={adminImage} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{adminName}</p>
              {showAdminRole && <p className="text-xs text-gray-500">{adminRole}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
