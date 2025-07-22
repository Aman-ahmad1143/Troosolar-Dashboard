import React from "react";
import type { User } from "../../constants/dashboard";

interface DashboardLatestUsersProps {
  users: User[];
}

const DashboardLatestUsers: React.FC<DashboardLatestUsersProps> = ({ users }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Users</h2>
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-6 py-4 text-gray-600 font-medium">
              <input type="checkbox" className="rounded" />
            </th>
            <th className="px-6 py-4 text-gray-600 font-medium">Name</th>
            <th className="px-6 py-4 text-gray-600 font-medium">Email</th>
            <th className="px-6 py-4 text-gray-600 font-medium">Phone</th>
            <th className="px-6 py-4 text-gray-600 font-medium">BVN</th>
            <th className="px-6 py-4 text-gray-600 font-medium">Date Registered</th>
            <th className="px-6 py-4 text-gray-600 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.slice(0, 3).map((user, idx) => (
            <tr key={idx} className={`${idx !== users.slice(0, 3).length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.bvn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-700">{user.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-4">
                  <button
                    className="text-white px-4 py-2 rounded-full text-sm font-medium transition hover:opacity-90"
                    style={{ backgroundColor: '#273E8E' }}
                  >
                    View Details
                  </button>
                  <button className="bg-gray-200 w-8 h-8 rounded flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
                    <span className="text-lg font-bold leading-none">⋮</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default DashboardLatestUsers;
