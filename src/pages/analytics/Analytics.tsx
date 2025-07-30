import { useState } from 'react';
import { analyticsData, timePeriods, revenueProductOptions } from './analytics.ts';
import Header from '../../component/Header';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('alltime');
  const [revenueProduct, setRevenueProduct] = useState('all');

  const StatCard = ({ title, value }: { title: string; value: string }) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <Header />
      
      <div className="p-6">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics</h1>

        {/* Time Period Filters */}
        <div className="bg-white rounded-full p-1 inline-flex gap-1 mb-8 shadow-sm border border-gray-200">
          {timePeriods.map(period => (
            <button
              key={period.value}
              onClick={() => setSelectedPeriod(period.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedPeriod === period.value
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* General Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
            {analyticsData.general.slice(0, 6).map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.general[6].title} value={analyticsData.general[6].value} />
            </div>
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.general[7].title} value={analyticsData.general[7].value} />
            </div>
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.general[8].title} value={analyticsData.general[8].value} />
            </div>
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.general[9].title} value={analyticsData.general[9].value} />
            </div>
            <div className="xl:col-span-2"></div> {/* Empty space for alignment */}
          </div>
        </div>

        {/* Financial Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
            {analyticsData.financial.slice(0, 6).map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.financial[6].title} value={analyticsData.financial[6].value} />
            </div>
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.financial[7].title} value={analyticsData.financial[7].value} />
            </div>
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.financial[8].title} value={analyticsData.financial[8].value} />
            </div>
            <div className="xl:col-span-1">
              <StatCard title={analyticsData.financial[9].title} value={analyticsData.financial[9].value} />
            </div>
            <div className="xl:col-span-2"></div> {/* Empty space for alignment */}
          </div>
        </div>

        {/* Revenue Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {analyticsData.revenue.map((stat, index) => {
              if (stat.title === "Revenue by product") {
                return (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
                    <div className="relative">
                      <select 
                        value={revenueProduct}
                        onChange={(e) => setRevenueProduct(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                      >
                        {revenueProductOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {stat.value}
                          </option>
                        ))}
                      </select>
                      <svg className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                );
              }
              return <StatCard key={index} title={stat.title} value={stat.value} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;