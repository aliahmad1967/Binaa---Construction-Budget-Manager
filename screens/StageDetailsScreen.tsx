
import React from 'react';
import { Screen, ConstructionStage, Transaction } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  stage: ConstructionStage;
  transactions: Transaction[];
}

const StageDetailsScreen: React.FC<Props> = ({ onNavigate, stage, transactions }) => {
  const remaining = stage.planned - stage.spent;
  const progressPercent = Math.min(100, (stage.spent / stage.planned) * 100);

  return (
    <div className="animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-12 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between border-b border-gray-50">
        <button onClick={() => onNavigate(Screen.HOME)} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-text-main">{stage.name}</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-6 pt-8 space-y-8">
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50 flex flex-col items-center">
          <div className="relative w-40 h-40 mb-6">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f3f4f6" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#33e67a" strokeWidth="8" strokeDasharray="282.6" strokeDashoffset={282.6 - (282.6 * progressPercent / 100)} strokeLinecap="round" className="transition-all duration-1000" />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-3xl font-extrabold text-text-main">{progressPercent.toFixed(0)}%</span>
               <span className="text-[10px] text-text-muted font-bold">مستهلك</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="p-4 rounded-2xl bg-background border border-gray-50 text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase mb-1">المخطط</p>
              <p className="text-sm font-black text-text-main">{stage.planned.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-gray-50 text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase mb-1">المصروف</p>
              <p className="text-sm font-black text-primary">{stage.spent.toLocaleString()}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-text-main px-1">سجل العمليات التفصيلي</h2>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined">{tx.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text-main">{tx.title}</h4>
                      <div className="flex flex-col gap-0.5 mt-1">
                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">calendar_today</span>
                          {tx.date}
                        </span>
                        {tx.recipient && (
                          <span className="text-[10px] text-primary-dark font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">person</span>
                            المستلم: {tx.recipient}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-red-500">-{tx.amount.toLocaleString()}</p>
                    <p className="text-[9px] text-text-muted font-bold uppercase">د.ع</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-text-muted">
                <span className="material-symbols-outlined text-4xl mb-2">history</span>
                <p className="text-sm">لا توجد عمليات مسجلة لهذه المرحلة</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default StageDetailsScreen;
