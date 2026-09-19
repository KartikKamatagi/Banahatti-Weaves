import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Award, 
  X,
  UserCheck,
  Calendar
} from 'lucide-react';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST-101',
      name: 'Ananya Sharma',
      email: 'ananya.s@gmail.com',
      phone: '+91 98450 12345',
      city: 'Bengaluru, KA',
      totalOrders: 5,
      totalSpent: 18495,
      lastOrderDate: '10 Sep 2026',
      status: 'Active',
      tier: 'Gold Collector',
      joinedDate: '15 Jan 2026',
      address: '45/2 10th Main, Indiranagar, Bengaluru, KA - 560038'
    },
    {
      id: 'CUST-102',
      name: 'Priya Deshmukh',
      email: 'priya.deshmukh@yahoo.com',
      phone: '+91 97312 98765',
      city: 'Pune, MH',
      totalOrders: 3,
      totalSpent: 11200,
      lastOrderDate: '02 Sep 2026',
      status: 'Active',
      tier: 'Silver Patron',
      joinedDate: '28 Mar 2026',
      address: 'Flat 301, Sunshine Heights, Baner, Pune, MH - 411045'
    },
    {
      id: 'CUST-103',
      name: 'Kavita Reddy',
      email: 'kavita.reddy@outlook.com',
      phone: '+91 99001 44332',
      city: 'Hyderabad, TS',
      totalOrders: 8,
      totalSpent: 34500,
      lastOrderDate: '14 Sep 2026',
      status: 'Active',
      tier: 'VIP Sovereign',
      joinedDate: '05 Nov 2025',
      address: 'Plot 12, Jubilee Hills, Hyderabad, TS - 500033'
    },
    {
      id: 'CUST-104',
      name: 'Meera Iyer',
      email: 'meera.iyer@gmail.com',
      phone: '+91 94480 67890',
      city: 'Chennai, TN',
      totalOrders: 2,
      totalSpent: 6800,
      lastOrderDate: '20 Aug 2026',
      status: 'Inactive',
      tier: 'Silver Patron',
      joinedDate: '12 Feb 2026',
      address: '22 Luz Church Road, Mylapore, Chennai, TN - 600004'
    },
    {
      id: 'CUST-105',
      name: 'Rohan Kulkarni',
      email: 'rohan.k@techcorp.io',
      phone: '+91 98220 11223',
      city: 'Mumbai, MH',
      totalOrders: 4,
      totalSpent: 15900,
      lastOrderDate: '18 Sep 2026',
      status: 'Active',
      tier: 'Gold Collector',
      joinedDate: '01 Jun 2026',
      address: '702 Sea View Towers, Worli, Mumbai, MH - 400018'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((cust) => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.phone.includes(searchQuery) ||
    cust.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#242424]">Customer Directory</h1>
          <p className="text-xs text-[#77716B] mt-0.5">Manage customer profiles, order histories, loyalty tiers, and contact preferences</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Total Registered</span>
            <Users className="w-4 h-4 text-[#9A6863]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">{customers.length}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Active Buyers</span>
            <UserCheck className="w-4 h-4 text-[#3D8065]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">
            {customers.filter(c => c.status === 'Active').length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#1F2926]" />
          </div>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-2">
            {customers.reduce((acc, c) => acc + c.totalOrders, 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#77716B]">Avg. Lifetime Value</span>
            <Award className="w-4 h-4 text-[#C58A3A]" />
          </div>
          <p className="text-2xl font-bold text-[#3D8065] font-serif mt-2">
            ₹{Math.round(totalSpentAll / customers.length).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, email, phone or city..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] placeholder-[#77716B] focus:outline-none focus:border-[#1F2926]"
          />
        </div>
        <span className="text-xs font-medium text-[#77716B]">
          Showing {filteredCustomers.length} customers
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#242424]">
            <thead className="bg-[#F7F6F3] border-b border-[#E5E1DB] text-[10px] font-bold text-[#77716B] uppercase tracking-wider">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Location</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Loyalty Tier</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1DB]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#77716B]">
                    No customers found matching search query.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                    
                    {/* Customer */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#1F2926] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#242424]">{cust.name}</p>
                          <span className="text-[10px] font-mono text-[#9A6863]">{cust.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="p-4">
                      <p className="text-xs text-[#242424]">{cust.email}</p>
                      <p className="text-[11px] text-[#77716B]">{cust.phone}</p>
                    </td>

                    {/* Location */}
                    <td className="p-4 text-[#77716B]">
                      {cust.city}
                    </td>

                    {/* Orders */}
                    <td className="p-4 font-semibold text-[#242424]">
                      {cust.totalOrders} Orders
                    </td>

                    {/* Total Spent */}
                    <td className="p-4 font-serif font-bold text-[#3D8065]">
                      ₹{cust.totalSpent.toLocaleString('en-IN')}
                    </td>

                    {/* Tier */}
                    <td className="p-4">
                      <span className="text-[10px] font-bold bg-[#9A6863]/10 text-[#9A6863] px-2.5 py-1 rounded-full">
                        {cust.tier}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="px-3 py-1.5 bg-white border border-[#E5E1DB] rounded-lg text-xs font-semibold text-[#1F2926] hover:bg-[#F7F6F3] inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Profile</span>
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER DETAILS MODAL */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-2xl w-full max-w-xl overflow-hidden">
            
            {/* Header */}
            <div className="p-5 border-b border-[#E5E1DB] flex justify-between items-center bg-[#F7F6F3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1F2926] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#242424]">{selectedCustomer.name}</h2>
                  <p className="text-xs text-[#77716B]">{selectedCustomer.tier} • Member since {selectedCustomer.joinedDate}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-[#77716B] hover:text-[#242424] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E1DB]">
                <div>
                  <span className="text-[10px] text-[#77716B] font-semibold uppercase">TOTAL PURCHASE VALUE</span>
                  <p className="font-serif text-xl font-bold text-[#3D8065] mt-0.5">
                    ₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-[#77716B] font-semibold uppercase">COMPLETED ORDERS</span>
                  <p className="font-serif text-xl font-bold text-[#242424] mt-0.5">
                    {selectedCustomer.totalOrders} Orders
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-[#77716B] uppercase tracking-wider block">
                  CONTACT & ADDRESS
                </span>
                <div className="p-4 rounded-xl border border-[#E5E1DB] space-y-2 bg-white">
                  <p className="flex items-center gap-2 text-[#242424]">
                    <Mail className="w-4 h-4 text-[#9A6863]" /> {selectedCustomer.email}
                  </p>
                  <p className="flex items-center gap-2 text-[#242424]">
                    <Phone className="w-4 h-4 text-[#9A6863]" /> {selectedCustomer.phone}
                  </p>
                  <p className="flex items-start gap-2 text-[#242424] leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#9A6863] flex-shrink-0 mt-0.5" /> {selectedCustomer.address}
                  </p>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#E5E1DB] bg-[#F7F6F3] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733]"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
