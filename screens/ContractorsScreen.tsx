
import React, { useState } from 'react';
import { Screen, Contractor, Payment } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  contractors: Contractor[];
}

const ContractorsScreen: React.FC<Props> = ({ onNavigate, contractors }) => {
  const [expandedId, setExpandedId] = useState<string | null>(contractors.length > 0 ? contractors[0].id : null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const totalPaid = contractors.reduce((acc, c) => acc + c.paidAmount, 0);
  const totalAgreed = contractors.reduce((acc, c) => acc + c.agreedAmount, 0);

  return (
    <div className="animate-in fade-in duration-300">
      <header className="px-6 pt-12 pb-6 bg-white border-b border-gray-50 flex items-center justify-between sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-text-main">دفعات المقاولين</h1>
          <p className="text-sm text-text-muted font-medium">إدارة المستحقات والسجلات</p>
        </div>
        <button className="bg-primary hover:bg-primary-dark text-white rounded-full p-2.5 shadow-lg shadow-primary/20 transition-all active:scale-95">
          <span className="material-symbols-outlined">person_add</span>
        </button>
      </header>

      <main className="px-6 pt-6 space-y-8">
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
          <div className="shrink-0 w-44 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <p className="text-[10px] text-text-muted font-bold uppercase mb-1">إجمالي المدفوع</p>
            <p className="text-xl font-black text-text-main leading-none">{(totalPaid/1000000).toFixed(1)}M <span className="text-xs font-medium text-text-muted">د.ع</span></p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${totalAgreed > 0 ? (totalPaid/totalAgreed)*100 : 0}%` }}></div>
            </div>
          </div>
          <div className="shrink-0 w-44 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <p className="text-[10px] text-text-muted font-bold uppercase mb-1">المتبقي للمقاولين</p>
            <p className="text-xl font-black text-text-main leading-none">{((totalAgreed-totalPaid)/1000000).toFixed(1)}M <span className="text-xs font-medium text-text-muted">د.ع</span></p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-4 overflow-hidden">
              <div className="bg-orange-500 h-full rounded-full" style={{ width: `${totalAgreed > 0 ? ((totalAgreed-totalPaid)/totalAgreed)*100 : 0}%` }}></div>
            </div>
          </div>
        </div>

        <section className="pb-8">
          <h2 className="text-lg font-bold text-text-main mb-4 px-1">قائمة المقاولين</h2>
          <div className="space-y-4">
            {contractors.map((contractor) => {
              const isExpanded = expandedId === contractor.id;
              const percentage = contractor.agreedAmount > 0 ? Math.min(100, (contractor.paidAmount / contractor.agreedAmount) * 100) : 0;
              const remaining = contractor.agreedAmount - contractor.paidAmount;

              return (
                <div 
                  key={contractor.id} 
                  className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'border-primary shadow-xl shadow-gray-200/50' : 'border-gray-50'
                  }`}
                >
                  <div 
                    className="p-5 cursor-pointer flex items-center justify-between"
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
                    <span className={`material-symbols-outlined transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : 'text-gray-300'}`}>
                      expand_more
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="pt-2 grid grid-cols-3 gap-2 text-center border-y border-gray-50 py-4 mb-4">
                        <div>
                          <p className="text-[9px] text-text-muted font-bold uppercase mb-1">المتفق</p>
                          <p className="font-black text-xs text-text-main">{(contractor.agreedAmount/1000).toLocaleString()}k</p>
                        </div>
                        <div className="border-x border-gray-100 px-2">
                          <p className="text-[9px] text-text-muted font-bold uppercase mb-1">المدفوع</p>
                          <p className="font-black text-xs text-primary">{(contractor.paidAmount/1000).toLocaleString()}k</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-text-muted font-bold uppercase mb-1">المتبقي</p>
                          <p className={`font-black text-xs ${remaining > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {(remaining/1000).toLocaleString()}k
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between text-[9px] font-black text-text-muted uppercase mb-1.5">
                          <span>نسبة الدفع</span>
                          <span>{percentage.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full bg-primary`} style={{ width: `${percentage}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-[10px] font-black text-text-muted uppercase tracking-widest">سجل الدفعات</h4>
                        {contractor.payments.map((pay) => (
                          <div key={pay.id} className="bg-background/50 p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-sm">{pay.icon}</span>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-text-main">{pay.title}</p>
                                <p className="text-[9px] text-text-muted">{pay.date}</p>
                              </div>
                            </div>
                            <p className="text-xs font-black text-text-main">{pay.amount.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
