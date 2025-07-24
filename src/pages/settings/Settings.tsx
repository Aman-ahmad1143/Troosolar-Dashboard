import { useState } from 'react'
import Admin from './Admin.tsx'
import Header from '../../component/Header.tsx'
import FinancingPartner from './FinancingPartner.tsx'

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
    <div className="min-[#F5F7FF] bg-gray-50">
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
        {activeTab === 'tools' && (
          <div className="text-center py-8 text-gray-500">
            Tools content will be displayed here
          </div>
        )}
        {activeTab === 'product' && (
          <div className="text-center py-8 text-gray-500">
            Product content will be displayed here
          </div>
        )}
        {activeTab === 'financing' && <FinancingPartner />}
        {activeTab === 'notifications' && (
          <div className="text-center py-8 text-gray-500">
            Notifications content will be displayed here
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Settings