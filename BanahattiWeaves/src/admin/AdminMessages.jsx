import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  CheckCircle, 
  Clock, 
  Send, 
  Star, 
  Trash2, 
  User, 
  Phone, 
  Calendar,
  X,
  MessageSquare
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
      replied: false,
      starred: true
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
      starred: false,
      replyText: 'Dear Rajesh, thank you! The blouse piece is attached unstitched at the end of the 6.3m saree roll.'
    },
    {
      id: 'MSG-403',
      senderName: 'Deepa Hegde',
      email: 'deepa.h@hotmail.com',
      phone: '+91 97400 88990',
      subject: 'Store Visit & Weaving Studio Location',
      message: 'Are customers allowed to visit your weaving loom unit in Banahatti, Bagalkot district to see live weaving? We are visiting North Karnataka next week.',
      date: '17 Sep 2026, 02:00 PM',
      unread: false,
      replied: false,
      starred: false
    }
  ]);

  const [filterTab, setFilterTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replySuccess, setReplySuccess] = useState('');

  const handleToggleStarred = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, starred: !m.starred } : m));
  };

  const handleOpenMessage = (msg) => {
    // Mark as read
    setMessages(messages.map(m => m.id === msg.id ? { ...m, unread: false } : m));
    setSelectedMessage({ ...msg, unread: false });
    setReplyText('');
    setReplySuccess('');
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setMessages(messages.map(m => m.id === selectedMessage.id ? {
      ...m,
      replied: true,
      replyText: replyText.trim()
    } : m));

    setSelectedMessage({
      ...selectedMessage,
      replied: true,
      replyText: replyText.trim()
    });

    setReplySuccess(`Reply email successfully dispatched to ${selectedMessage.email}`);
    setReplyText('');
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterTab === 'UNREAD') return matchesSearch && msg.unread;
    if (filterTab === 'REPLIED') return matchesSearch && msg.replied;
    if (filterTab === 'STARRED') return matchesSearch && msg.starred;
    return matchesSearch;
  });

  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="bg-white p-6 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#242424]">Customer Messages</h1>
          <p className="text-xs text-[#77716B] mt-0.5">Inquiries, custom order requests, and customer support communications</p>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Total Messages</span>
          <p className="text-2xl font-bold text-[#242424] font-serif mt-1">{messages.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Unread Messages</span>
          <p className="text-2xl font-bold text-[#9A6863] font-serif mt-1">{unreadCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-2xs">
          <span className="text-xs font-semibold text-[#77716B]">Replied Rate</span>
          <p className="text-2xl font-bold text-[#3D8065] font-serif mt-1">
            {Math.round((messages.filter(m => m.replied).length / messages.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-xl border border-[#E5E1DB] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-1.5">
          {['ALL', 'UNREAD', 'REPLIED', 'STARRED'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                filterTab === tab ? 'bg-[#1F2926] text-white' : 'bg-[#F7F6F3] text-[#77716B]'
              }`}
            >
              {tab === 'ALL' ? `All (${messages.length})` : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#77716B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-xs overflow-hidden divide-y divide-[#E5E1DB]">
        {filteredMessages.length === 0 ? (
          <div className="p-12 text-center text-[#77716B]">
            No messages found matching filter criteria.
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F6F3]/60 transition-colors ${
                msg.unread ? 'bg-[#9A6863]/5 font-semibold' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleStarred(msg.id);
                  }}
                  className={`p-1 ${msg.starred ? 'text-[#C58A3A]' : 'text-[#77716B] hover:text-[#242424]'}`}
                >
                  <Star className="w-4 h-4" fill={msg.starred ? 'currentColor' : 'none'} />
                </button>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#242424]">{msg.senderName}</span>
                    <span className="text-[10px] text-[#77716B]">&bull; {msg.email}</span>
                  </div>
                  <p className="text-xs text-[#242424] truncate mt-0.5">{msg.subject}</p>
                  <p className="text-[11px] text-[#77716B] truncate max-w-lg mt-0.5">{msg.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                {msg.replied ? (
                  <span className="text-[10px] font-bold bg-[#3D8065]/10 text-[#3D8065] px-2 py-0.5 rounded">
                    REPLIED
                  </span>
                ) : msg.unread ? (
                  <span className="text-[10px] font-bold bg-[#9A6863] text-white px-2 py-0.5 rounded">
                    NEW
                  </span>
                ) : null}
                <span className="text-[10px] text-[#77716B] whitespace-nowrap">{msg.date}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MESSAGE READER & REPLY MODAL */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-xl border border-[#E5E1DB] shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-[#E5E1DB] flex justify-between items-center bg-[#F7F6F3]">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#242424]">{selectedMessage.subject}</h2>
                <p className="text-xs text-[#77716B] mt-0.5">From {selectedMessage.senderName} ({selectedMessage.email})</p>
              </div>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="text-[#77716B] hover:text-[#242424] p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6 overflow-y-auto admin-scrollbar">
              
              {/* Message Box */}
              <div className="p-4 bg-[#F7F6F3] rounded-xl border border-[#E5E1DB] space-y-2">
                <div className="flex justify-between items-center text-[11px] text-[#77716B]">
                  <span>Phone: {selectedMessage.phone}</span>
                  <span>{selectedMessage.date}</span>
                </div>
                <p className="text-xs text-[#242424] leading-relaxed whitespace-pre-line">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Success alert */}
              {replySuccess && (
                <div className="p-3 bg-[#3D8065]/10 text-[#3D8065] rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>{replySuccess}</span>
                </div>
              )}

              {/* Previous Reply if any */}
              {selectedMessage.replyText && (
                <div className="p-4 bg-[#1F2926]/5 rounded-xl border border-[#1F2926]/20 space-y-1">
                  <span className="text-[10px] font-bold text-[#9A6863] uppercase">YOUR REPLIED ANSWER:</span>
                  <p className="text-xs text-[#242424] leading-relaxed">{selectedMessage.replyText}</p>
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-3">
                <label className="block text-xs font-semibold text-[#77716B]">
                  REPLY TO CUSTOMER
                </label>
                <textarea
                  rows="4"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={`Write reply to ${selectedMessage.senderName}...`}
                  className="w-full p-3 text-xs bg-[#F7F6F3] border border-[#E5E1DB] rounded-lg text-[#242424] focus:outline-none focus:border-[#1F2926]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1F2926] text-white rounded-lg text-xs font-semibold hover:bg-[#2A3733] shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND EMAIL REPLY</span>
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
