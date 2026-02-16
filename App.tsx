
import React, { useState } from 'react';
import { Screen, ConstructionStage, Contractor, Payment, Transaction } from './types';
import HomeScreen from './screens/HomeScreen';
import ReportsScreen from './screens/ReportsScreen';
import ContractorsScreen from './screens/ContractorsScreen';
import StageDetailsScreen from './screens/StageDetailsScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BottomNav from './components/BottomNav';

const INITIAL_STAGES: ConstructionStage[] = [
  { id: 'foundation', name: 'مرحلة الأساس', status: 'completed', spent: 15000000, planned: 15000000, icon: 'foundation', color: 'blue' },
  { id: 'structure', name: 'مرحلة الهيكل', status: 'in-progress', spent: 30000000, planned: 40000000, icon: 'weekend', color: 'orange' },
  { id: 'finishing', name: 'مرحلة الإنهاءات', status: 'not-started', spent: 0, planned: 45000000, icon: 'palette', color: 'purple' },
];

const INITIAL_CONTRACTORS: Contractor[] = [
  { 
    id: '1', name: 'علي حسن', specialty: 'أعمال الحدادة', agreedAmount: 10000000, paidAmount: 4000000, initials: 'ع', status: 'active',
    payments: [
      { id: 'p1', title: 'شراء أبواب ونوافذ', date: '2023-10-15', amount: 2000000, icon: 'payments', color: 'green' },
      { id: 'p2', title: 'دفعة أولى (مقدمة)', date: '2023-10-01', amount: 2000000, icon: 'handshake', color: 'blue' }
    ]
  },
  { 
    id: '2', name: 'محمد الكهربائي', specialty: 'تأسيسات كهربائية', agreedAmount: 5000000, paidAmount: 3500000, initials: 'م', status: 'active',
    payments: [
      { id: 'p3', title: 'تأسيس الطابق الأول', date: '2023-09-10', amount: 2000000, icon: 'bolt', color: 'orange' },
      { id: 'p4', title: 'مواد كهربائية أولية', date: '2023-09-05', amount: 1500000, icon: 'inventory_2', color: 'blue' }
    ]
  }
];

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);
  const [stages, setStages] = useState<ConstructionStage[]>(INITIAL_STAGES);
  const [contractors, setContractors] = useState<Contractor[]>(INITIAL_CONTRACTORS);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const navigateTo = (screen: Screen, params?: any) => {
    if (screen === Screen.STAGE_DETAILS && params?.id) {
      setSelectedStageId(params.id);
    }
    setCurrentScreen(screen);
  };

  const handleAddData = (data: any) => {
    const amount = parseFloat(data.amount);
    if (isNaN(amount)) return;

    const formattedDate = data.date || new Date().toISOString().split('T')[0];

    if (data.type === 'expense') {
      setStages(prev => prev.map(s => 
        s.id === data.stageId ? { ...s, spent: s.spent + amount, status: s.spent + amount >= s.planned ? 'completed' : 'in-progress' } : s
      ));
      
      const newTx: Transaction = {
        id: Date.now().toString(),
        title: data.material || data.notes || 'مصروف عام',
        amount: amount,
        date: formattedDate,
        category: 'مواد بناء',
        material: data.material,
        recipient: data.recipient,
        stageId: data.stageId,
        icon: 'inventory_2'
      };
      setTransactions(prev => [newTx, ...prev]);

    } else {
      setContractors(prev => prev.map(c => {
        if (c.id === data.contractorId) {
          const newPayment: Payment = {
            id: Date.now().toString(),
            title: data.notes || 'دفعة تعاقدية',
            date: formattedDate,
            amount: amount,
            recipient: c.name,
            icon: 'payments',
            color: 'green'
          };
          return {
            ...c,
            paidAmount: c.paidAmount + amount,
            payments: [newPayment, ...c.payments]
          };
        }
        return c;
      }));
    }
    navigateTo(Screen.HOME);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen onNavigate={navigateTo} stages={stages} />;
      case Screen.CONTRACTORS:
        return <ContractorsScreen onNavigate={navigateTo} contractors={contractors} />;
      case Screen.STAGE_DETAILS:
        const stage = stages.find(s => s.id === (selectedStageId || 'structure'))!;
        const stageTx = transactions.filter(t => t.stageId === stage.id);
        return <StageDetailsScreen onNavigate={navigateTo} stage={stage} transactions={stageTx} />;
      case Screen.ADD_EXPENSE:
        return <AddExpenseScreen onNavigate={navigateTo} onSave={handleAddData} contractors={contractors} stages={stages} />;
      default:
        return <HomeScreen onNavigate={navigateTo} stages={stages} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden flex flex-col shadow-2xl">
      <main className="flex-1 pb-24">{renderScreen()}</main>
      {currentScreen !== Screen.ADD_EXPENSE && <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} />}
      {(currentScreen === Screen.HOME || currentScreen === Screen.CONTRACTORS) && (
        <button onClick={() => navigateTo(Screen.ADD_EXPENSE)} className="fixed bottom-28 left-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50">
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      )}
    </div>
  );
};

export default App;
