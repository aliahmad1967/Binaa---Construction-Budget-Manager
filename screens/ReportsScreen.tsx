
import React from 'react';
import { Screen } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const ReportsScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="px-6 pt-12 animate-in slide-in-from-left duration-300">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate(Screen.HOME)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-text-main"
          >
            <span className="material-symbols-outlined transform rotate-180">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold text-text-main">التقارير والإحصائيات</h1>
        </div>
        <button className="text-text-muted">
          <span className="material-symbols-outlined">download</span>
        </button>
      </header>

      <div className="space-y-6">
        {/* Summary Mini Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
            <div className="p-2 bg-primary/10 rounded-full w-fit mb-3">
              <span className="material-symbols-outlined text-primary text-xl">payments</span>
            </div>
            <p className="text-xs text-text-muted font-medium">إجمالي الميزانية</p>
            <p className="text-lg font-bold text-text-main mt-1">50.0M <span className="text-[10px] font-normal text-text-muted">د.ع</span></p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
            <div className="p-2 bg-orange-500/10 rounded-full w-fit mb-3">
              <span className="material-symbols-outlined text-orange-500 text-xl">trending_up</span>
            </div>
            <p className="text-xs text-text-muted font-medium">المصروف الفعلي</p>
            <p className="text-lg font-bold text-text-main mt-1">23.5M <span className="text-[10px] font-normal text-text-muted">د.ع</span></p>
          </div>
        </div>

        {/* Expenses Distribution Donut */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold text-text-main">توزيع المصروفات</h2>
            <button className="text-primary text-sm font-semibold">التفاصيل</button>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-8">
              {/* SVG Donut Chart Placeholder */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                {/* Green Segment (60%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#33e67a" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="100.48" strokeLinecap="round" />
                {/* Blue Segment (25%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="188.4" style={{ transform: 'rotate(216deg)', transformOrigin: 'center' }} />
                {/* Orange Segment (15%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="213.52" style={{ transform: 'rotate(306deg)', transformOrigin: 'center' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-text-muted text-[10px] font-bold uppercase tracking-wider">الإجمالي</span>
                <span className="text-2xl font-bold text-text-main">47%</span>
              </div>
            </div>

            <div className="w-full space-y-3">
              {[
                { label: 'مواد بناء', color: 'bg-primary', amount: '15,000,000' },
                { label: 'أجور عمال', color: 'bg-blue-500', amount: '8,000,000' },
                { label: 'نقل ولوجستيات', color: 'bg-orange-500', amount: '500,000' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-background border border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-bold text-text-main">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-text-main">{item.amount} د.ع</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consumption by Stage Bars */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-text-main">استهلاك الميزانية حسب المرحلة</h2>
            <p className="text-[10px] text-text-muted mt-0.5 font-medium">مقارنة المصروف بالميزانية المخططة</p>
          </div>

          <div className="space-y-6">
            {[
              { name: 'الأساسات', percentage: 80, spent: '8.0M', planned: '10.0M', color: 'bg-primary' },
              { name: 'الهيكل', percentage: 40, spent: '12.0M', planned: '30.0M', color: 'bg-orange-500' },
              { name: 'التشطيبات', percentage: 10, spent: '1.0M', planned: '10.0M', color: 'bg-blue-500' }
            ].map((stage, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-text-main">{stage.name}</span>
                  <span className={`text-[10px] font-bold ${stage.percentage > 70 ? 'text-primary' : 'text-orange-500'}`}>{stage.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ${stage.color}`} style={{ width: `${stage.percentage}%` }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-text-muted font-bold">
                  <span>صُرف: {stage.spent}</span>
                  <span>المخطط: {stage.planned}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Expenses List */}
        <section>
          <h3 className="text-lg font-bold text-text-main mb-4">أعلى المصروفات</h3>
          <div className="space-y-3">
            {[
              { title: 'طابوق جمهوري', date: '12 أبريل 2023', category: 'مواد بناء', amount: '- 2,500,000', icon: '🧱' },
              { title: 'دفعة مقاول الهيكل', date: '10 أبريل 2023', category: 'أجور عمال', amount: '- 4,000,000', icon: '👷' }
            ].map((exp, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-xl shrink-0">
                  {exp.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-text-main truncate">{exp.title}</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">{exp.date} • {exp.category}</p>
                </div>
                <span className="text-sm font-bold text-red-500 whitespace-nowrap">{exp.amount}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReportsScreen;
