import React, { useState } from 'react';
import { 
  Search, 
  Eye, 
  X,
  Mail,
  Phone,
  MapPin
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
      joinedDate: '12 Feb 2026',
      address: '22 Luz Church Road, Mylapore, Chennai, TN - 600004'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter((cust) => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 font-sans">
      
      {/* SEARCH HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-[#E5E0D9] rounded-[6px]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers..."
            className="input-admin w-full pl-9 h-[38px] text-[13px]"
          />
        </div>
        <span className="text-[13px] text-[#77716B]">
          Showing {filteredCustomers.length} customers
        </span>
      </div>

      {/* CLEAN CUSTOMERS TABLE */}
      <div className="bg-white border border-[#E5E0D9] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#242424]">
            <thead className="bg-[#F7F5F1] text-[12px] font-semibold text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
              <tr>
                <th className="py-3 px-4 w-[50px]">Avatar</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D9]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-12 text-center text-[#77716B]">
                    No customers found matching search query.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#FAF8F5] transition-colors h-[64px]">
                    
                    {/* Avatar */}
                    <td className="py-2 px-4">
                      <div className="w-[38px] h-[38px] rounded-full bg-[#1E2D29] text-white flex items-center justify-center font-bold text-xs">
                        {cust.name.charAt(0)}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-2 px-4 font-medium text-[#242424]">
                      {cust.name}
                    </td>

                    {/* Email */}
                    <td className="py-2 px-4 text-[#77716B]">
                      {cust.email}
                    </td>

                    {/* Phone */}
                    <td className="py-2 px-4 text-[#77716B]">
                      {cust.phone}
                    </td>

                    {/* Orders */}
                    <td className="py-2 px-4 font-semibold text-[#242424]">
                      {cust.totalOrders}
                    </td>

                    {/* Joined */}
                    <td className="py-2 px-4 text-[#77716B]">
                      {cust.joinedDate}
                    </td>

                    {/* Status */}
                    <td className="py-2 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[12px] font-medium ${
                        cust.status === 'Active' ? 'bg-[#E8F2ED] text-[#4F806B]' : 'bg-[#F7F5F1] text-[#77716B]'
                      }`}>
                        {cust.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="text-[13px] font-medium text-[#77716B] hover:text-[#242424]"
                      >
                        Profile
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[8px] border border-[#E5E0D9] shadow-lg w-full max-w-md overflow-hidden text-sm">
            
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#F7F5F1]">
              <div className="flex items-center gap-3">
                <div className="w-[38px] h-[38px] rounded-full bg-[#1E2D29] text-white flex items-center justify-center font-bold text-xs">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-[16px] text-[#242424]">{selectedCustomer.name}</h3>
                  <p className="text-[12px] text-[#77716B]">Joined {selectedCustomer.joinedDate}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-[#77716B] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-[13px]">
              <div className="p-3 bg-[#FAF8F5] rounded border border-[#E5E0D9] space-y-1">
                <p className="flex items-center gap-2 text-[#242424]"><Mail className="w-4 h-4 text-[#9A6863]" /> {selectedCustomer.email}</p>
                <p className="flex items-center gap-2 text-[#242424]"><Phone className="w-4 h-4 text-[#9A6863]" /> {selectedCustomer.phone}</p>
                <p className="flex items-start gap-2 text-[#77716B] pt-1"><MapPin className="w-4 h-4 text-[#9A6863] flex-shrink-0 mt-0.5" /> {selectedCustomer.address}</p>
              </div>

              <div className="flex justify-between border-t border-[#E5E0D9] pt-3">
                <span className="text-[#77716B]">Total Orders Placed:</span>
                <span className="font-semibold text-[#242424]">{selectedCustomer.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77716B]">Total Amount Spent:</span>
                <span className="font-bold text-[#4F806B]">₹{selectedCustomer.totalSpent.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="p-4 border-t border-[#E5E0D9] bg-[#F7F5F1] flex justify-end">
              <button onClick={() => setSelectedCustomer(null)} className="btn-admin-secondary h-[38px] text-[13px]">
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
