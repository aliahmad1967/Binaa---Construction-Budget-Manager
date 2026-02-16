
import React from 'react';
import { Screen, ConstructionStage } from '../types';

interface Props {
  onNavigate: (screen: Screen, params?: any) => void;
  stages: ConstructionStage[];
}

const HomeScreen: React.FC<Props> = ({ onNavigate, stages }) => {
  const totalSpent = stages.reduce((acc, s) => acc + s.spent, 0);
  const totalPlanned = stages.reduce((acc, s) => acc + s.planned, 0);
  const progressPercent = Math.round((totalSpent / totalPlanned) * 100);

  return (
    <div className="px-6 pt-12 animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <span className="text-text-muted text-sm font-medium mb-1">مرحباً بك 👋</span>
          <h1 className="text-2xl font-bold text-text-main">مشروع منزلي</h1>
        </div>
        <button className="relative p-2 rounded-full bg-white shadow-sm border border-gray-100">
          <span className="material-symbols-outlined text-text-main">notifications</span>
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
      </header>

      {/* Main Stats Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 mb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="relative z-10">
          <p className="text-text-muted text-sm font-medium mb-1">الميزانية الكلية للمشروع</p>
          <h2 className="text-3xl font-bold text-text-main mb-6">
            {totalPlanned.toLocaleString()} <span className="text-lg font-medium text-text-muted">د.ع</span>
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-text-main">نسبة الإنجاز المالي</span>
                <span className="text-primary font-bold">{progressPercent}%</span>
              </div>
              <div className="h-3.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-xl border border-gray-50">
                <div className="flex items-center gap-2 mb-2 text-orange-500">
                  <span className="material-symbols-outlined text-base">arrow_outward</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">المصروف</span>
                </div>
                <p className="text-lg font-bold text-text-main leading-none">{totalSpent.toLocaleString()}</p>
                <p className="text-[10px] text-text-muted mt-1">دينار عراقي</p>
              </div>
              <div className="bg-background p-4 rounded-xl border border-gray-50">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <span className="material-symbols-outlined text-base">account_balance_wallet</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">المتبقي</span>
                </div>
                <p className="text-lg font-bold text-text-main leading-none">{(totalPlanned - totalSpent).toLocaleString()}</p>
                <p className="text-[10px] text-text-muted mt-1">دينار عراقي</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-text-main">مراحل البناء</h3>
          <button className="text-sm font-semibold text-primary">عرض الكل</button>
        </div>
        
        <div className="space-y-4">
          {stages.map((stage) => (
            <div 
              key={stage.id} 
              onClick={() => onNavigate(Screen.STAGE_DETAILS, { id: stage.id })}
              className={`bg-white rounded-2xl p-5 shadow-sm border border-transparent hover:border-primary/20 transition-all cursor-pointer active:scale-98 ${stage.status === 'not-started' ? 'opacity-70' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                  stage.color === 'blue' ? 'bg-blue-50 text-blue-500' : 
                  stage.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-purple-50 text-purple-500'
                }`}>
                  <span className="material-symbols-outlined">{stage.icon}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="text-base font-bold text-text-main">{stage.name}</h4>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold mt-1 uppercase ${
                        stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                        stage.status === 'in-progress' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {stage.status === 'completed' ? 'مكتمل' : stage.status === 'in-progress' ? 'جاري العمل' : 'لم يبدأ'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-text-muted text-[10px] mb-0.5 font-medium">المصروف</p>
                      <p className="text-xs font-bold text-text-main">{(stage.spent).toLocaleString()} د.ع</p>
                    </div>
                    <div className="text-left">
                      <p className="text-text-muted text-[10px] mb-0.5 font-medium">المتبقي</p>
                      <p className="text-xs font-bold text-primary">{(stage.planned - stage.spent).toLocaleString()} د.ع</p>
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        stage.color === 'blue' ? 'bg-blue-500' : 
                        stage.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'
                      }`} 
                      style={{ width: `${(stage.spent / stage.planned) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
