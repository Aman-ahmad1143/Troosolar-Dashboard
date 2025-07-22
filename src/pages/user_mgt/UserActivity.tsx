
import { useParams, useNavigate } from "react-router-dom";
import { users } from "../../constants/usermgt";
import React, { useState } from "react";
import Header from "../../component/Header";

const activities = [
  { activity: "User Created account", date: "05-07-25/07:22AM" },
  { activity: "User Created account", date: "05-07-25/07:22AM" },
  { activity: "User Created account", date: "05-07-25/07:22AM" },
];

const UserActivity: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = users.find(u => u.id === id);
  const [showEdit, setShowEdit] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.name.split(" ")[1] || "",
    surname: user?.name.split(" ")[0] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bvn: user?.bvn || "",
    password: "",
    referral: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the user in your backend or state
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowEdit(false);
    }, 1200);
  };
  
  // Handle notification click
  const handleNotificationClick = () => {
    console.log("Notification clicked in User Activity");
  };
  
  if (!user) return <div className="p-8 text-xl">User not found</div>;
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header Component */}
      <Header 
        adminName="Hi, Admin"
        adminRole="Administrator"
        adminImage="/assets/layout/admin.png"
        showNotification={true}
        notificationCount={0}
        onNotificationClick={handleNotificationClick}
      />
      
      {/* Main Content */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">{user.name}</h1>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-6">
        <button className="pb-2 border-b-2 border-blue-900 text-blue-900 font-semibold">Activity</button>
        <button className="pb-2 text-gray-500" onClick={() => navigate(`/user-activity/${user.id}/loans`)}>Loans</button>
        <button className="pb-2 text-gray-500" onClick={() => navigate(`/user-activity/${user.id}/transactions`)}>Transactions</button>
        <button className="pb-2 text-gray-500" onClick={() => navigate(`/user-activity/${user.id}/orders`)}>Orders</button>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-[#4e4376] to-[#f9d423] rounded-2xl shadow-lg p-8 flex gap-8 items-center mb-8">
        <div className="flex flex-col items-center w-60">
          <img
            src={"/assets/images/profile.png"}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white mb-4"
          />
          <div className="text-white text-xl font-semibold mb-1">{user.name}</div>
          <div className="text-white text-sm mb-2">{user.email}</div>
          <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-semibold shadow" onClick={() => setShowEdit(true)}>Edit Profile</button>
        {showEdit && (
          <div className="fixed inset-0 z-50 flex justify-end items-end backdrop-blur-sm bg-white/30">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-black" onClick={() => setShowEdit(false)}>&times;</button>
              <h2 className="text-2xl font-semibold mb-6 text-center">Edit Profile</h2>
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                  <span className="material-icons text-5xl text-gray-400">person</span>
                </div>
              </div>
              <form className="space-y-4" onSubmit={handleSave}>
                <div>
                  <label className="block text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full border rounded px-4 py-2" placeholder="Enter your first name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Surname</label>
                  <input type="text" className="w-full border rounded px-4 py-2" placeholder="Enter your surname" value={form.surname} onChange={e => setForm(f => ({ ...f, surname: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Email Address</label>
                  <input type="email" className="w-full border rounded px-4 py-2" placeholder="Enter your email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Phone Number</label>
                  <input type="text" className="w-full border rounded px-4 py-2" placeholder="Enter your phone number" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">BVN</label>
                  <input type="text" className="w-full border rounded px-4 py-2" placeholder="BVN Number" value={form.bvn} onChange={e => setForm(f => ({ ...f, bvn: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Password</label>
                  <input type="password" className="w-full border rounded px-4 py-2" placeholder="Enter Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">Referral Code</label>
                  <input type="text" className="w-full border rounded px-4 py-2" placeholder="Enter Referral Code (Optional)" value={form.referral} onChange={e => setForm(f => ({ ...f, referral: e.target.value }))} />
                </div>
                <button type="submit" className="w-full bg-[#2946A9] text-white text-lg py-3 rounded-full font-semibold mt-4">Save</button>
                {success && (
                  <div className="text-green-600 text-center font-semibold mt-2">Profile updated!</div>
                )}
              </form>
            </div>
          </div>
        )}
        </div>
        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-4 text-white text-lg">
          <div>
            <div className="font-semibold">First Name</div>
            <div>{user.name.split(" ")[1] || user.name}</div>
          </div>
          <div>
            <div className="font-semibold">Password</div>
            <div>**********</div>
          </div>
          <div>
            <div className="font-semibold">Surname</div>
            <div>{user.name.split(" ")[0]}</div>
          </div>
          <div>
            <div className="font-semibold">Referral Code</div>
            <div>N/A</div>
          </div>
          <div>
            <div className="font-semibold">Email Address</div>
            <div>{user.email}</div>
          </div>
          <div>
            <div className="font-semibold">BVN</div>
            <div>{user.bvn}</div>
          </div>
          <div>
            <div className="font-semibold">Phone Number</div>
            <div>{user.phone}</div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Activity</h2>
        <div className="flex items-center mb-2">
          <select className="border rounded px-3 py-2 text-sm">
            <option>More Actions</option>
          </select>
        </div>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <table className="min-w-full text-lg">
            <thead>
              <tr className="bg-[#F8FAFC] text-gray-600">
                <th className="p-4 w-12"><input type="checkbox" /></th>
                <th className="p-4 text-left">Activity</th>
                <th className="p-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="p-4"><input type="checkbox" /></td>
                  <td className="p-4">{item.activity}</td>
                  <td className="p-4">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserActivity;
