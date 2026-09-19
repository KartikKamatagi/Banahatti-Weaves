import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  X
} from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState([
    {
      id: 'MSG-401',
      senderName: 'Sunita Patil',
      email: 'sunita.patil@gmail.com',
      phone: '+91 98440 55667',
      subject: 'Custom Bulk Order Inquiry for Wedding Sangeet',
      message: 'Hello Banahatti Weaves team! I am looking to purchase 15 identical pure cotton Chikki Paras sarees in Maroon & Gold for our family dancers at a sangeet event next month. Do you offer bulk discounts or custom weaving timelines?',
      date: '19 Sep 2026, 11:30 AM',
      unread: true,
      replied: false
    },
    {
      id: 'MSG-402',
      senderName: 'Rajesh Sharma',
      email: 'r.sharma@weavingart.in',
      phone: '+91 99012 33445',
      subject: 'Blouse Piece Fabric Query - Order #BW1002',
      message: 'Received my Banahatti Purple Saree today. The weave quality is exquisite! Quick question: does the blouse piece come unstitched attached at the end of the saree, or is it separate?',
      date: '18 Sep 2026, 04:15 PM',
      unread: false,
      replied: true,
      replyText: 'Dear Rajesh, thank you! The blouse piece is attached unstitched at the end of the 6.3m saree roll.'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleOpenMessage = (msg) => {
    setMessages(messages.map(m => m.id === msg.id ? { ...m, unread: false } : m));
    setSelectedMessage({ ...msg, unread: false });
    setReplyText('');
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setMessages(messages.map(m => m.id === selectedMessage.id ? {
      ...m,
      replied: true,
      replyText: replyText.trim()
    } : m));

    setSelectedMessage(null);
  };

  const filteredMessages = messages.filter((msg) => 
    msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search messages..."
            className="input-admin w-full pl-9 h-[38px] text-[13px]"
          />
        </div>
        <span className="text-[13px] text-[#77716B]">
          Showing {filteredMessages.length} messages
        </span>
      </div>

      {/* MESSAGES LIST TABLE */}
      <div className="bg-white border border-[#E5E0D9] rounded-[6px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px] text-[#242424]">
            <thead className="bg-[#F7F5F1] text-[12px] font-semibold text-[#77716B] uppercase tracking-[0.05em] border-b border-[#E5E0D9]">
              <tr>
                <th className="py-3 px-4">Sender</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D9]">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-[#77716B]">
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-[#FAF8F5] transition-colors h-[64px]">
                    
                    {/* Sender */}
                    <td className="py-2 px-4">
                      <p className="font-medium text-[#242424]">{msg.senderName}</p>
                      <p className="text-[12px] text-[#77716B]">{msg.email}</p>
                    </td>

                    {/* Subject */}
                    <td className="py-2 px-4">
                      <p className="font-medium text-[#242424] truncate max-w-sm">{msg.subject}</p>
                    </td>

                    {/* Date */}
                    <td className="py-2 px-4 text-[#77716B]">
                      {msg.date}
                    </td>

                    {/* Status */}
                    <td className="py-2 px-4">
                      {msg.replied ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#E8F2ED] text-[#4F806B]">
                          Replied
                        </span>
                      ) : msg.unread ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#F5EFE6] text-[#B9823B]">
                          New
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded text-[12px] font-medium bg-[#F7F5F1] text-[#77716B]">
                          Read
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => handleOpenMessage(msg)}
                        className="text-[13px] font-medium text-[#9A6863] hover:underline"
                      >
                        Read
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MESSAGE READER MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[8px] border border-[#E5E0D9] shadow-lg w-full max-w-lg overflow-hidden text-sm">
            
            <div className="p-5 border-b border-[#E5E0D9] flex justify-between items-center bg-[#F7F5F1]">
              <div>
                <h3 className="font-semibold text-[16px] text-[#242424]">{selectedMessage.subject}</h3>
                <p className="text-[12px] text-[#77716B]">{selectedMessage.senderName} ({selectedMessage.email})</p>
              </div>
              <button onClick={() => setSelectedMessage(null)} className="text-[#77716B] hover:text-[#242424]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13px]">
              <div className="p-3 bg-[#FAF8F5] rounded border border-[#E5E0D9]">
                <p className="text-[#242424] leading-relaxed">{selectedMessage.message}</p>
              </div>

              {selectedMessage.replyText && (
                <div className="p-3 bg-[#E8F2ED]/50 rounded border border-[#4F806B]/20 space-y-1">
                  <span className="text-[11px] font-bold text-[#4F806B] uppercase">REPLIED:</span>
                  <p className="text-[#242424]">{selectedMessage.replyText}</p>
                </div>
              )}

              <form onSubmit={handleSendReply} className="space-y-3 pt-2">
                <label className="block text-[13px] font-semibold text-[#242424]">
                  Write Reply
                </label>
                <textarea
                  rows="3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type reply message..."
                  className="textarea-admin w-full"
                />
                <div className="flex justify-end">
                  <button type="submit" className="btn-admin-primary h-[38px] text-[13px]">
                    <Send className="w-3.5 h-3.5" /> Send Reply
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
