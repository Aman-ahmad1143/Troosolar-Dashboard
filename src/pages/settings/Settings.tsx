import { useState } from 'react'
import Admin from './Admin.tsx'
import Header from '../../component/Header.tsx'
import FinancingPartner from './FinancingPartner.tsx'
import Tools from './Tools.tsx'
import Notifications from './Notifications.tsx'
import Product from './Product.tsx'

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'admins' | 'tools' | 'product' | 'financing' | 'notifications'>('admins');

  const tabs = [
    { id: 'admins', label: 'Admins' },
    { id: 'tools', label: 'Tools' },
    { id: 'product', label: 'Product' },
    { id: 'financing', label: 'Financing Partner' },
    { id: 'notifications', label: 'Notifications' }
  ];

  return (
    <div className="min-[#F5F7FF]  bg-[#F5F7FF]">
      {/* Header */}
      <Header />

      <div className="p-6">
        <h1 className="text-3xl font-semibold mb-8">Settings</h1>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-400 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className={activeTab === 'admins' ? '' : 'px-6'}>
        {activeTab === 'admins' && <Admin />}
        {activeTab === 'tools' && <Tools />}
        {activeTab === 'product' && <Product />}
        {activeTab === 'financing' && <FinancingPartner />}
        {activeTab === 'notifications' && <Notifications />}
      </div>
      </div>
    </div>
  )
}

export default Settings