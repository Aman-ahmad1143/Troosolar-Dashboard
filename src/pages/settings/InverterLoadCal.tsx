import { useState } from 'react';
import { roomTypes } from './inverterloadcal';
import type { ApplianceItem } from './inverterloadcal';

const InverterLoadCal = () => {
  const [selectedRoom, setSelectedRoom] = useState<string>('1bedroom');
  const [currentAppliances, setCurrentAppliances] = useState<ApplianceItem[]>(
    roomTypes.find(room => room.id === '1bedroom')?.appliances || []
  );

  // Calculate total output for inverter
  const totalOutput = currentAppliances.reduce((total, appliance) => total + appliance.totalWattage, 0);

  // Handle room selection
  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    const room = roomTypes.find(r => r.id === roomId);
    if (room) {
      setCurrentAppliances([...room.appliances]);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (applianceId: string, change: number) => {
    setCurrentAppliances(prev => 
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

  // Handle individual wattage change
  const handleWattageChange = (applianceId: string, newWattage: number) => {
    setCurrentAppliances(prev => 
      prev.map(appliance => {
        if (appliance.id === applianceId) {
          return {
            ...appliance,
            wattage: newWattage,
            totalWattage: newWattage * appliance.quantity
          };
        }
        return appliance;
      })
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Inverter Load Calculator</h2>
      
      <div className="flex gap-8">
        {/* Room Selection Sidebar */}
        <div className="w-32 space-y-4">
          {roomTypes.map((room) => (
            <button
              key={room.id}
              onClick={() => handleRoomSelect(room.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selectedRoom === room.id
                  ? 'border-[#273E8E] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <img 
                  src={room.icon} 
                  alt={room.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs font-medium text-gray-700 text-center">
                {room.name}
              </div>
            </button>
          ))}
        </div>

        {/* Appliances List */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {/* Appliances Rows */}
            <div className="divide-y divide-gray-100">
              {currentAppliances.map((appliance) => (
                <div key={appliance.id} className="px-6 py-3">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    {/* Appliance Name */}
                    <div className="text-gray-800 text-sm font-medium">
                      {appliance.name}
                    </div>

                    {/* Wattage */}
                    <div className="text-center">
                      <input
                        type="number"
                        value={appliance.wattage}
                        onChange={(e) => handleWattageChange(appliance.id, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center border border-gray-300 rounded text-sm"
                      />
                      <span className="text-xs text-gray-500 ml-1">w</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(appliance.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-[#273E8E] text-white rounded font-bold hover:bg-[#1f2f7a] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-800">
                        {appliance.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(appliance.id, 1)}
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

        {/* Total Output Card */}
        <div className="w-90">
          <div className="bg-[#273e8e] text-white rounded-2xl px-2 py-6 flex gap-4 shadow-lg">
            <h2 className="text-xl font-semibold w-[40%] text-center">Total Output</h2>
            <div className="bg-white h-[60px] w-[60%] rounded-xl px-1 flex justify-center items-center gap-2 text-[#273e8e] shadow-inner">
              <span className="text-4xl font-bold">{totalOutput.toLocaleString()}</span>
              <span className="text-lg">Watts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InverterLoadCal;
