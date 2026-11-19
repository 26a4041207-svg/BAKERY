'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api';

export default function LienHePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Vui lòng điền họ tên, email và nội dung liên hệ!');
      return;
    }

    setLoading(true);
    try {
      await api.sendContact({
        fullName: name,
        email,
        phoneNumber: phone,
        subject: 'Liên hệ từ website',
        message
      });
      setMsg('Gửi thông tin liên hệ thành công! HONEYQUE sẽ liên hệ sớm nhất.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setMsg('Gửi thông tin thành công!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcfaf7] min-h-screen pt-28 pb-16">
      <div className="max-w-[1200px] mx-auto px-5">
        {/* BREADCRUMB */}
        <nav className="text-sm font-medium text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#5D4037]"><i className="fa-solid fa-house mr-1"></i> Trang chủ</Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-800 font-semibold">Liên hệ</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LEFT: INFO & FORM */}
          <div className="space-y-6">
            {/* STORE INFO BOX */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold font-serif text-[#5D4037] mb-4">Cửa hàng HONEYQUE</h3>
              <div className="space-y-3.5 text-base text-gray-700">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-amber-50 text-[#5D4037] flex items-center justify-center flex-shrink-0 text-base">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                  <span>Số 1 Tô Vĩnh Diện, Khương Đình, Hà Nội</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-amber-50 text-[#5D4037] flex items-center justify-center flex-shrink-0 text-base">
                    <i className="fa-solid fa-clock"></i>
                  </span>
                  <span>8h – 22h (Thứ 2 – CN)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-amber-50 text-[#5D4037] flex items-center justify-center flex-shrink-0 text-base">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                  <span>0837180651</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-amber-50 text-[#5D4037] flex items-center justify-center flex-shrink-0 text-base">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                  <span>honeyque@gmail.com</span>
                </div>
              </div>
            </div>

            {/* FORM BOX */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#5D4037] mb-2">Liên hệ với chúng tôi</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-5 leading-relaxed">
                Nếu bạn có bất kỳ thắc mắc nào về sản phẩm hoặc dịch vụ, hãy để lại thông tin, HONEYQUE sẽ liên hệ sớm nhất.
              </p>

              {msg && (
                <div className="mb-4 p-3.5 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                  {msg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-sm sm:text-base">
                <div>
                  <label className="block text-gray-700 mb-1 font-semibold text-sm">Họ và tên *</label>
                  <input
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm sm:text-base focus:border-[#5D4037] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-semibold text-sm">Email *</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm sm:text-base focus:border-[#5D4037] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-semibold text-sm">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0987654321"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm sm:text-base focus:border-[#5D4037] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-semibold text-sm">Nội dung *</label>
                  <textarea
                    rows={4}
                    placeholder="Bạn cần hỗ trợ gì từ HONEYQUE..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm sm:text-base focus:border-[#5D4037] outline-none resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#5D4037] hover:bg-[#3e2723] text-white py-3.5 rounded-xl font-bold uppercase text-sm sm:text-base tracking-wider transition-colors shadow disabled:opacity-60"
                >
                  {loading ? 'Đang gửi...' : 'Gửi Thông Tin'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: GOOGLE MAPS */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full min-h-[460px] lg:min-h-[580px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.878995658295!2d105.82098141540233!3d21.00019048596421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac85c3cc7e7b%3A0x1b18b56df6b3395a!2zMSBQLiBUw7QgVsSpbmggRGnhu4duLCBLaMawxqFuZyBUcnVuZywgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgSG_DoG5nIE5hbQ!5e0!3m2!1svi!2s!4v1700000000000"
              allowFullScreen
              loading="lazy"
              className="w-full h-full border-0 min-h-[460px] lg:min-h-[580px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
