
import React, { useState } from 'react';
import { Screen, Contractor, Payment } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const CONTRACTORS_DATA: Contractor[] = [
  { 
    id: '1', 
    name: 'علي حسن', 
    specialty: 'أعمال الحدادة', 
    agreedAmount: 10000000, 
    paidAmount: 4000000, 
    initials: 'ع', 
    status: 'active',
    payments: [
      { id: 'p1', title: 'شراء أبواب ونوافذ', date: '15 أكتوبر 2023', amount: 2000000, icon: 'payments', color: 'green' },
      { id: 'p2', title: 'دفعة أولى (مقدمة)', date: '01 أكتوبر 2023', amount: 2000000, icon: 'handshake', color: 'blue' }
    ]
  },
  { 
    id: '2', 
    name: 'محمد الكهربائي', 
    specialty: 'تأسيسات كهربائية', 
    agreedAmount: 5000000, 
    paidAmount: 3500000, 
    initials: 'م', 
    status: 'active',
    payments: [
      { id: 'p3', title: 'تأسيس الطابق الأول', date: '10 سبتمبر 2023', amount: 2000000, icon: 'bolt', color: 'orange' },
      { id: 'p4', title: 'مواد كهربائية أولية', date: '05 سبتمبر 2023', amount: 1500000, icon: 'inventory_2', color: 'blue' }
    ]
  },
  { 
    id: '3', 
    name: 'أبو أحمد', 
    specialty: 'لبخ وسيراميك', 
    agreedAmount: 8000000, 
    paidAmount: 8000000, 
    initials: 'أ', 
    status: 'completed',
    payments: [
      { id: 'p5', title: 'الدفعة النهائية', date: '20 أغسطس 2023', amount: 3000000, icon: 'check_circle', color: 'green' },
      { id: 'p6', title: 'دفعة السيراميك', date: '10 أغسطس 2023', amount: 3000000, icon: 'grid_view', color: 'purple' },
      { id: 'p7', title: 'دفعة اللبخ', date: '01 أغسطس 2023', amount: 2000000, icon: 'format_paint', color: 'blue' }
    ]
  },
];

const ContractorsScreen: React.FC<Props> = ({ onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(CONTRACTORS_DATA[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="animate-in fade-in duration-300">
      <header className="px-6 pt-12 pb-6 bg-white border-b border-gray-50 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-text-main">دفعات المقاولين</h1>
          <p className="text-sm text-text-muted font-medium">مشروع منزل العمر</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white rounded-full p-2.5 shadow-lg shadow-primary/20 transition-all active:scale-95">
          <span className="material-symbols-outlined">person_add</span>
        </button>
      </header>

      <main className="px-6 pt-6 space-y-8">
        {/* Horizontal Stats Scroll */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
          <div className="shrink-0 w-44 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <p className="text-[10px] text-text-muted font-bold uppercase mb-1">المصروف الكلي</p>
            <p className="text-xl font-black text-text-main leading-none">45.2M <span className="text-xs font-medium text-text-muted">د.ع</span></p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div className="shrink-0 w-44 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <p className="text-[10px] text-text-muted font-bold uppercase mb-1">المتبقي للمقاولين</p>
            <p className="text-xl font-black text-text-main leading-none">12.5M <span className="text-xs font-medium text-text-muted">د.ع</span></p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-orange-500 h-full rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </div>

        {/* Contractors List */}
        <section className="pb-8">
          <h2 className="text-lg font-bold text-text-main mb-4 px-1">قائمة المقاولين</h2>
          <div className="space-y-4">
            {CONTRACTORS_DATA.map((contractor) => {
              const isExpanded = expandedId === contractor.id;
              const percentage = (contractor.paidAmount / contractor.agreedAmount) * 100;
              const remaining = contractor.agreedAmount - contractor.paidAmount;

              return (
                <div 
                  key={contractor.id} 
                  className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'border-primary shadow-xl shadow-gray-200/50' : 'border-gray-50'
                  }`}
                >
                  {/* Header - Always Visible */}
                  <div 
                    className="p-5 cursor-pointer flex items-center justify-between transition-colors hover:bg-gray-50/50"
                    onClick={() => toggleExpand(contractor.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shrink-0 ${
                        isExpanded ? 'bg-primary/15 text-primary-dark' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {contractor.initials}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-text-main">{contractor.name}</h4>
                        <p className="text-[10px] text-text-muted font-medium">{contractor.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-left hidden xs:block">
                        <p className="text-[9px] text-text-muted font-bold uppercase">المدفوع</p>
                        <p className={`text-sm font-black ${contractor.status === 'completed' ? 'text-green-500' : 'text-text-main'}`}>
                          {(contractor.paidAmount / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <span className={`material-symbols-outlined transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : 'text-gray-300'}`}>
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Expandable Section */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5">
                      {/* Financial Breakdown */}
                      <div className="pt-2 grid grid-cols-3 gap-2 text-center border-y border-gray-50 py-4 mb-4">
                        <div>
                          <p className="text-[9px] text-text-muted font-bold uppercase mb-1">المتفق عليه</p>
                          <p className="font-black text-xs text-text-main">{(contractor.agreedAmount / 1000000).toFixed(1)}M</p>
                        </div>
                        <div className="border-x border-gray-100 px-2">
                          <p className="text-[9px] text-text-muted font-bold uppercase mb-1">المدفوع</p>
                          <p className="font-black text-xs text-primary">{(contractor.paidAmount / 1000000).toFixed(1)}M</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-text-muted font-bold uppercase mb-1">المتبقي</p>
                          <p className={`font-black text-xs ${remaining > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {(remaining / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-[9px] font-black text-text-muted uppercase mb-1.5">
                          <span>نسبة الإنجاز المالي</span>
                          <span>{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(51,230,122,0.4)] ${
                              percentage === 100 ? 'bg-green-500' : 'bg-primary'
                            }`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Payment History List */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest px-1">سجل الدفعات</h4>
                        {contractor.payments.map((pay) => (
                          <div key={pay.id} className="bg-background/50 p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                                pay.color === 'green' ? 'bg-green-50 text-green-500' : 
                                pay.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                                pay.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-purple-50 text-purple-500'
                              }`}>
                                <span className="material-symbols-outlined text-xl">{pay.icon}</span>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-text-main">{pay.title}</p>
                                <p className="text-[9px] text-text-muted font-medium">{pay.date}</p>
                              </div>
                            </div>
                            <p className="text-xs font-black text-text-main">
                              {pay.amount.toLocaleString()} <span className="text-[9px] font-bold text-text-muted">د.ع</span>
                            </p>
                          </div>
                        ))}
                        <button className="w-full mt-2 py-3 bg-white border border-dashed border-gray-300 text-text-muted rounded-xl hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2 text-[10px] font-bold active:scale-95">
                          <span className="material-symbols-outlined text-base">add_circle</span>
                          تسجيل دفعة جديدة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContractorsScreen;
