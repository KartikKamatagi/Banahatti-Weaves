import React from 'react';
import { X, Ruler, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function SizeChartModal() {
  const { isSizeChartOpen, setIsSizeChartOpen } = useShop();

  if (!isSizeChartOpen) return null;

  const sizeChartData = [
    { size: '32 (XS)', bustIn: '32"', bustCm: '81 cm', waistIn: '26"', waistCm: '66 cm', armhole: '14"' },
    { size: '34 (S)',  bustIn: '34"', bustCm: '86 cm', waistIn: '28"', waistCm: '71 cm', armhole: '15"' },
    { size: '36 (M)',  bustIn: '36"', bustCm: '91 cm', waistIn: '30"', waistCm: '76 cm', armhole: '16"' },
    { size: '38 (L)',  bustIn: '38"', bustCm: '96 cm', waistIn: '32"', waistCm: '81 cm', armhole: '17"' },
    { size: '40 (XL)', bustIn: '40"', bustCm: '101 cm', waistIn: '34"', waistCm: '86 cm', armhole: '18"' },
    { size: '42 (2XL)', bustIn: '42"', bustCm: '106 cm', waistIn: '36"', waistCm: '91 cm', armhole: '19"' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-[#FDFBF7] w-full max-w-2xl rounded-2xl shadow-2xl border border-gold-zari/30 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gold-zari/20 flex justify-between items-center bg-cream/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gold-zari/10 text-gold-zari">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-deep-charcoal">
                Blouse & Saree Sizing Guide
              </h3>
              <p className="text-xs text-gray-500">
                Precision Handcrafted Tailoring for Banahatti Weaves
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsSizeChartOpen(false)}
            className="p-2 rounded-full bg-cream text-crimson hover:bg-gold-zari hover:text-white transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Saree Standard Specs */}
          <div className="bg-amber-50/60 border border-gold-zari/30 rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-crimson">
                Standard Saree Dimensions
              </span>
              <p className="text-sm font-medium text-deep-charcoal mt-1">
                Length: <strong className="text-gold-zari font-serif">5.5 Meters</strong> (6 yards) • Width: <strong className="text-gold-zari font-serif">45 Inches</strong>
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Includes matching unstitched blouse fabric of <strong>0.80 Meters</strong>.
              </p>
            </div>
            <div className="px-3 py-1 bg-white border border-gold-zari/30 rounded-full text-xs font-semibold text-deep-charcoal whitespace-nowrap shadow-sm">
              ✨ Fits all heights 4'10" - 6'0"
            </div>
          </div>

          {/* Size Chart Table */}
          <div>
            <h4 className="font-serif text-base font-bold text-deep-charcoal mb-3 flex items-center gap-2">
              <span>Tailored Blouse Measurement Chart</span>
            </h4>

            <div className="overflow-x-auto rounded-xl border border-gold-zari/20 shadow-sm bg-white">
              <table className="w-full text-left text-xs text-deep-charcoal">
                <thead className="bg-cream border-b border-gold-zari/20 text-gold-zari uppercase font-bold tracking-wider">
                  <tr>
                    <th className="p-3">Standard Size</th>
                    <th className="p-3">Bust (Inches)</th>
                    <th className="p-3">Bust (CM)</th>
                    <th className="p-3">Underbust / Waist</th>
                    <th className="p-3">Armhole</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sizeChartData.map((row, idx) => (
                    <tr key={row.size} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FDFBF7]'}>
                      <td className="p-3 font-bold text-crimson">{row.size}</td>
                      <td className="p-3 font-semibold">{row.bustIn}</td>
                      <td className="p-3 text-gray-600">{row.bustCm}</td>
                      <td className="p-3 text-gray-600">{row.waistIn} ({row.waistCm})</td>
                      <td className="p-3 text-gray-600">{row.armhole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to measure tips */}
          <div className="bg-cream/40 rounded-xl p-4 border border-gold-zari/20">
            <h5 className="font-bold text-xs uppercase tracking-wider text-deep-charcoal mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> How to Measure for Perfect Fit
            </h5>
            <ul className="text-xs text-gray-600 space-y-1.5 pl-5 list-disc">
              <li><strong>Bust:</strong> Measure around the fullest part of your bust holding the tape comfortably loose.</li>
              <li><strong>Blouse Length:</strong> Standard stitched blouse length ranges from 14 to 15.5 inches depending on size.</li>
              <li><strong>Margin:</strong> All custom stitched blouses include 2 inches of inner margin for easy alteration.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gold-zari/20 bg-cream/50 flex justify-end">
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="px-6 py-2.5 bg-gold-zari hover:bg-gold-zari/90 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
