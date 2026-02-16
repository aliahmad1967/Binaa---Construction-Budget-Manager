
import React, { useState } from 'react';
import { Screen } from './types';
import HomeScreen from './screens/HomeScreen';
import ReportsScreen from './screens/ReportsScreen';
import ContractorsScreen from './screens/ContractorsScreen';
import StageDetailsScreen from './screens/StageDetailsScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME);
  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  const navigateTo = (screen: Screen, params?: any) => {
    if (screen === Screen.STAGE_DETAILS && params?.id) {
      setSelectedStageId(params.id);
    }
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <HomeScreen onNavigate={navigateTo} />;
      case Screen.REPORTS:
        return <ReportsScreen onNavigate={navigateTo} />;
      case Screen.CONTRACTORS:
        return <ContractorsScreen onNavigate={navigateTo} />;
      case Screen.STAGE_DETAILS:
        return <StageDetailsScreen onNavigate={navigateTo} stageId={selectedStageId || 'structure'} />;
      case Screen.ADD_EXPENSE:
        return <AddExpenseScreen onNavigate={navigateTo} />;
      default:
        return <HomeScreen onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden flex flex-col shadow-2xl">
      <main className="flex-1 pb-24">
        {renderScreen()}
      </main>
      
      {currentScreen !== Screen.ADD_EXPENSE && (
        <BottomNav currentScreen={currentScreen} onNavigate={navigateTo} />
      )}

      {/* Floating Action Button (FAB) for some screens */}
      {(currentScreen === Screen.HOME || currentScreen === Screen.CONTRACTORS) && (
        <button 
          onClick={() => navigateTo(Screen.ADD_EXPENSE)}
          className="fixed bottom-28 left-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-50"
        >
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      )}
    </div>
  );
};

export default App;
