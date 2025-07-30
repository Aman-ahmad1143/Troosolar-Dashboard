import { useState } from 'react';
import { solarRoomTypes } from './solarpanelcal';
import type { SolarApplianceItem } from './solarpanelcal';

const SolarPanelCal = () => {
  // Solar Panel Calculator state
  const [solarCurrentAppliances, setSolarCurrentAppliances] = useState<SolarApplianceItem[]>(
    solarRoomTypes.find(room => room.id === '1bedroom')?.appliances || []
  );

  // Calculate total load for solar panel calculator
  const totalLoad = solarCurrentAppliances.reduce((total, appliance) => total + appliance.totalWattage, 0);
  
  // Calculate inverter rating (typically 20% more than total load)
  const inverterRating = Math.round(totalLoad * 1.2);

  // Solar Panel Calculator handlers
  const handleSolarQuantityChange = (applianceId: string, change: number) => {
    setSolarCurrentAppliances(prev => 
      prev.map(appliance => {
        if (appliance.id === applianceId) {
          const newQuantity = Math.max(0, appliance.quantity + change);
          return {
            ...appliance,
            quantity: newQuantity,
            totalWattage: appliance.wattage * newQuantity
          };
        }
        return appliance;
      })
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Solar Panel Calculator</h2>
      
      <div className="flex gap-5">
        {/* Appliances List */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Appliances Rows */}
            <div className="divide-y divide-gray-100">
              {solarCurrentAppliances.map((appliance) => (
                <div key={appliance.id} className="px-6 py-3">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    {/* Appliance Name */}
                    <div className="text-gray-800 text-sm font-medium">
                      {appliance.name}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleSolarQuantityChange(appliance.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#273E8E] text-white rounded font-bold hover:bg-[#1f2f7a] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-800">
                        {appliance.quantity}
                      </span>
                      <button
                        onClick={() => handleSolarQuantityChange(appliance.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#273E8E] text-white rounded font-bold hover:bg-[#1f2f7a] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Wattage */}
                    <div className="text-center">
                      <span className="text-gray-600 text-sm">{appliance.totalWattage}w</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


 {/* Summary Box */}
        <div className="w-1/3 ">
          <div className="bg-[#273e8e] w-full text-white rounded-xl px-6 py-3 flex justify-between items-center gap-6 shadow-lg">
            {/* Total Power in Watts */}
            <div className="w-full">
              <h2 className="text-sm font-medium mb-2">Total Load</h2>
              <div className="bg-white h-[80px] w-full rounded-xl flex justify-center items-center gap-2 text-[#273e8e] shadow-inner">
                <span className="text-4xl font-bold">{totalLoad.toLocaleString()}</span>
                <span className="text-lg">Watts</span>
              </div>
            </div>

            {/* Total Energy in Watt-hours */}
            <div className="w-full">
              <h2 className="text-sm font-medium mb-2">Inverter Rating</h2>
              <div className="bg-white h-[80px] w-full rounded-xl flex justify-center items-center gap-2 text-[#273e8e] shadow-inner">
                <span className="text-4xl font-bold">{inverterRating.toLocaleString()}</span>
                <span className="text-lg">VA</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    
  )};



export default SolarPanelCal;
