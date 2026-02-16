
import React, { useState } from 'react';
import { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const AddExpenseScreen: React.FC<Props> = ({ onNavigate }) => {
  const [type, setType] = useState<'expense' | 'contractor'>('expense');

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col animate-in slide-in-from-bottom duration-500 z-50 overflow-y-auto no-scrollbar">
      <header className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(Screen.HOME)}
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <h1 className="text-2xl font-bold text-text-main">إضافة مصروف جديد</h1>
        </div>
        <button 
          onClick={() => onNavigate(Screen.HOME)}
          className="text-sm font-black text-primary-dark hover:opacity-70 transition-opacity uppercase tracking-wider"
        >
          إلغاء
        </button>
      </header>

      <form className="flex-1 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">المبلغ المدفوع</label>
          <div className="relative group">
            <input 
              type="text" 
              inputMode="numeric"
              placeholder="0"
              className="w-full bg-white border-2 border-transparent focus:border-primary text-4xl font-black py-7 px-8 rounded-3xl shadow-sm focus:ring-0 transition-all text-left dir-ltr placeholder-gray-200"
              style={{ direction: 'ltr', textAlign: 'left' }}
            />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-300 pointer-events-none uppercase">
              د.ع
            </div>
          </div>
        </div>

        {/* Type Toggle */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-50 flex relative">
          <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 z-0 ${
            type === 'expense' ? 'right-1.5' : 'translate-x-[calc(-100%-6px)] left-1.5'
          }`}></div>
          <button 
            type="button"
            onClick={() => setType('expense')}
            className={`flex-1 h-12 relative z-10 text-sm font-black transition-colors ${type === 'expense' ? 'text-text-main' : 'text-text-muted'}`}
          >
            مصروف عادي
          </button>
          <button 
            type="button"
            onClick={() => setType('contractor')}
            className={`flex-1 h-12 relative z-10 text-sm font-black transition-colors ${type === 'contractor' ? 'text-text-main' : 'text-text-muted'}`}
          >
            دفعة مقاول
          </button>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">التصنيف</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-none py-5 px-6 pr-14 rounded-2xl text-lg font-bold shadow-sm focus:ring-2 focus:ring-primary cursor-pointer transition-colors text-text-main">
                <option disabled selected value="">اختر التصنيف...</option>
                <option value="materials">مواد بناء</option>
                <option value="labor">أجور عمال</option>
                <option value="transport">نقل وتوصيل</option>
                <option value="other">أخرى</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                <span className="material-symbols-outlined text-2xl">expand_more</span>
              </div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                <span className="material-symbols-outlined text-2xl font-bold">category</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">المرحلة</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border-none py-5 px-6 pr-14 rounded-2xl text-lg font-bold shadow-sm focus:ring-2 focus:ring-primary cursor-pointer transition-colors text-text-main">
                <option disabled selected value="">اختر المرحلة...</option>
                <option value="foundation">الأساسات</option>
                <option value="structure">الهيكل</option>
                <option value="finishing">الإنهاءات</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">
                <span className="material-symbols-outlined text-2xl">expand_more</span>
              </div>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                <span className="material-symbols-outlined text-2xl font-bold">layers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">ملاحظات إضافية</label>
          <textarea 
            rows={2}
            placeholder="اكتب تفاصيل إضافية هنا..."
            className="w-full bg-white border-none rounded-2xl p-5 shadow-sm focus:ring-2 focus:ring-primary resize-none placeholder-gray-300 text-text-main font-medium"
          ></textarea>
        </div>

        {/* Date Row */}
        <div className="flex items-center justify-between px-2 mt-2">
          <span className="text-xs font-black text-text-muted uppercase tracking-widest">تاريخ العملية</span>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-100">
            <span className="material-symbols-outlined text-primary text-base font-bold">calendar_today</span>
            <span className="text-xs font-black text-text-main dir-ltr">24 Oct, 2023</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 mb-12">
          <button 
            onClick={() => onNavigate(Screen.HOME)}
            className="w-full bg-primary hover:bg-primary-dark text-text-main font-black text-lg py-5 rounded-full shadow-xl shadow-primary/20 active:scale-98 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined font-black">save</span>
            <span>حفظ المصروف</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseScreen;
