
import React, { useState } from 'react';
import { Screen, Contractor, ConstructionStage } from '../types';

interface Props {
  onNavigate: (screen: Screen) => void;
  onSave: (data: any) => void;
  contractors: Contractor[];
  stages: ConstructionStage[];
}

const AddExpenseScreen: React.FC<Props> = ({ onNavigate, onSave, contractors, stages }) => {
  const [type, setType] = useState<'expense' | 'contractor'>('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [material, setMaterial] = useState('');
  const [recipient, setRecipient] = useState('');
  const [stageId, setStageId] = useState('');
  const [contractorId, setContractorId] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onSave({
      type,
      amount,
      date,
      material,
      recipient: type === 'contractor' ? contractors.find(c => c.id === contractorId)?.name : recipient,
      stageId,
      contractorId,
      notes
    });
  };

  const commonInputStyles = "w-full bg-white border-none rounded-2xl py-4 px-6 shadow-sm focus:ring-2 focus:ring-primary text-text-main font-medium transition-all";

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col animate-in slide-in-from-bottom duration-500 z-50 overflow-y-auto no-scrollbar pb-12">
      <header className="flex items-center justify-between mb-8 pt-4">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(Screen.HOME)} className="p-2 rounded-full hover:bg-black/5 transition-colors">
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <h1 className="text-2xl font-bold text-text-main">إضافة سجل جديد</h1>
        </div>
      </header>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* المبلغ */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">المبلغ المدفوع</label>
          <div className="relative">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              required
              className="w-full bg-white border-2 border-transparent focus:border-primary text-4xl font-black py-7 px-8 rounded-3xl shadow-sm focus:ring-0 transition-all text-left dir-ltr"
            />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-300 pointer-events-none uppercase">د.ع</div>
          </div>
        </div>

        {/* نوع العملية */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-50 flex relative">
          <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-primary rounded-xl transition-all duration-300 z-0 ${
            type === 'expense' ? 'right-1.5' : 'translate-x-[calc(-100%-6px)] left-1.5'
          }`}></div>
          <button type="button" onClick={() => setType('expense')} className={`flex-1 h-12 relative z-10 text-sm font-black transition-colors ${type === 'expense' ? 'text-text-main' : 'text-text-muted'}`}>شراء مواد / عام</button>
          <button type="button" onClick={() => setType('contractor')} className={`flex-1 h-12 relative z-10 text-sm font-black transition-colors ${type === 'contractor' ? 'text-text-main' : 'text-text-muted'}`}>دفعة مقاول</button>
        </div>

        {/* التاريخ */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">التاريخ</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={commonInputStyles + " dir-ltr text-right"}
          />
        </div>

        {type === 'expense' ? (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">المادة (مثال: طابوق، سمنت)</label>
              <input 
                type="text" 
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="ادخل اسم المادة..."
                className={commonInputStyles}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">المستلم (اختياري)</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="اسم الشخص الذي استلم المبلغ..."
                className={commonInputStyles}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">المرحلة المرتبطة</label>
              <select 
                value={stageId}
                onChange={(e) => setStageId(e.target.value)}
                required
                className={commonInputStyles + " appearance-none"}
              >
                <option value="" disabled>اختر المرحلة...</option>
                {stages.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">اختر المقاول (المستلم)</label>
              <select 
                value={contractorId}
                onChange={(e) => setContractorId(e.target.value)}
                required
                className={commonInputStyles + " appearance-none"}
              >
                <option value="" disabled>اختر المقاول...</option>
                {contractors.map(c => <option key={c.id} value={c.id}>{c.name} - {c.specialty}</option>)}
              </select>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-muted uppercase tracking-widest mr-1">ملاحظات إضافية</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="أضف أي تفاصيل أخرى هنا..."
            className={commonInputStyles + " resize-none"}
          ></textarea>
        </div>

        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-text-main font-black text-lg py-5 rounded-full shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3 active:scale-95">
          <span className="material-symbols-outlined font-black">save</span>
          <span>حفظ البيانات</span>
        </button>
      </form>
    </div>
  );
};

export default AddExpenseScreen;
