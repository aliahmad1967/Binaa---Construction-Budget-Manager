
import React from 'react';
import { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  stageId: string;
}

const StageDetailsScreen: React.FC<Props> = ({ onNavigate, stageId }) => {
  return (
    <div className="animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-12 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between border-b border-gray-50">
        <button 
          onClick={() => onNavigate(Screen.HOME)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-text-main">مرحلة الهيكل</h1>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main className="px-6 pt-8 space-y-8">
        {/* Large Progress Circle */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 relative overflow-hidden flex flex-col items-center">
           <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
           
           <div className="relative w-48 h-48 mb-8">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f3f4f6" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#33e67a" strokeWidth="8" strokeDasharray="282.6" strokeDashoffset="70.65" strokeLinecap="round" className="transition-all duration-1000" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-4xl font-extrabold text-text-main">75%</span>
               <span className="text-xs text-text-muted font-bold mt-1 uppercase tracking-wider">مستهلك</span>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4 w-full">
             <div className="p-4 rounded-2xl bg-background border border-gray-50">
               <div className="flex items-center gap-1.5 text-primary mb-1">
                 <div className="w-2 h-2 rounded-full bg-primary"></div>
                 <span className="text-[10px] font-bold uppercase">الميزانية</span>
               </div>
               <p className="text-base font-bold text-text-main">15,000,000</p>
               <p className="text-[10px] text-text-muted font-bold">د.ع</p>
             </div>
             <div className="p-4 rounded-2xl bg-background border border-gray-50">
               <div className="flex items-center gap-1.5 text-red-400 mb-1">
                 <div className="w-2 h-2 rounded-full bg-red-400"></div>
                 <span className="text-[10px] font-bold uppercase">المصروف</span>
               </div>
               <p className="text-base font-bold text-text-main">11,250,000</p>
               <p className="text-[10px] text-text-muted font-bold">د.ع</p>
             </div>
           </div>

           <div className="mt-6 p-5 rounded-2xl bg-primary/10 border border-primary/20 w-full flex justify-between items-center">
             <div>
               <p className="text-[10px] font-bold text-primary-dark mb-1 uppercase">المتبقي المتوفر</p>
               <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-black text-text-main">3,750,000</span>
                 <span className="text-xs font-bold text-text-muted">د.ع</span>
               </div>
             </div>
             <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
               <span className="material-symbols-outlined text-2xl font-bold">savings</span>
             </div>
           </div>
        </section>

        {/* Quick Filters */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
          {['الكل', 'مواد بناء', 'أجور عمال', 'نقل وتوصيل'].map((filter, idx) => (
            <button key={idx} className={`shrink-0 px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              idx === 0 ? 'bg-text-main text-white shadow-lg shadow-gray-200' : 'bg-white text-text-muted border border-gray-100 hover:bg-gray-50'
            }`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <section className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-bold text-text-main">العمليات الأخيرة</h2>
            <button className="text-sm font-bold text-primary">عرض الكل</button>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 px-1">اليوم</p>
              <div className="space-y-3">
                {[
                  { title: 'شراء طابوق اسود', sub: 'مواد بناء • 4000 قطعة', amount: '- 750,000', icon: 'construction', color: 'orange' },
                  { title: 'يومية عمال (3)', sub: 'أجور عمال • الخلف أحمد', amount: '- 150,000', icon: 'engineering', color: 'blue' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-50 shadow-sm active:scale-98 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                        item.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-main">{item.title}</h4>
                        <p className="text-[10px] text-text-muted mt-0.5 font-medium">{item.sub}</p>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="text-sm font-black text-text-main">{item.amount}</p>
                      <p className="text-[10px] text-text-muted font-bold">د.ع</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-3 px-1">الأمس</p>
              <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-gray-50 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-main">نقل رمل مغسول</h4>
                    <p className="text-[10px] text-text-muted mt-0.5 font-medium">نقل • سيارة لوري</p>
                  </div>
                </div>
                <div className="text-left shrink-0">
                  <p className="text-sm font-black text-text-main">- 120,000</p>
                  <p className="text-[10px] text-text-muted font-bold">د.ع</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-28 left-6 z-30">
        <button 
          onClick={() => onNavigate(Screen.ADD_EXPENSE)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      </div>
    </div>
  );
};

export default StageDetailsScreen;
