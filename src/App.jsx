
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import HomePage from '@/components/HomePage';
import CaseSubmission from '@/components/CaseSubmission';
import Dashboard from '@/components/Dashboard';
import CaseAnalysis from '@/components/CaseAnalysis';
import AuthPage from '@/components/AuthPage';
import ProfilePage from '@/components/ProfilePage';
import LegalDisclaimerModal from '@/components/LegalDisclaimerModal';
import Chatbot from '@/components/Chatbot';
import { toast } from '@/components/ui/use-toast';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentCase, setCurrentCase] = useState(null);
  const [cases, setCases] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const disclaimerAccepted = sessionStorage.getItem('morice_disclaimer_accepted');
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    }

    const savedUser = localStorage.getItem('morice_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    }

    const savedCases = localStorage.getItem('morice_cases');
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    sessionStorage.setItem('morice_disclaimer_accepted', 'true');
    setShowDisclaimer(false);
  };

  const saveCases = (updatedCases) => {
    setCases(updatedCases);
    localStorage.setItem('morice_cases', JSON.stringify(updatedCases));
  };

  const handleLogin = (userData) => {
    let newUser;
    if (userData.isLogin) {
      const existingUsers = JSON.parse(localStorage.getItem('morice_users') || '[]');
      const foundUser = existingUsers.find(u => u.email === userData.email);
      newUser = foundUser || { name: userData.email.split('@')[0], email: userData.email };
    } else {
      newUser = {
        name: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        city: userData.city,
        phone: userData.phone,
        profileType: userData.profileType,
        hasLawyer: userData.hasLawyer,
      };
      const existingUsers = JSON.parse(localStorage.getItem('morice_users') || '[]');
      localStorage.setItem('morice_users', JSON.stringify([...existingUsers, newUser]));
    }
    setUser(newUser);
    localStorage.setItem('morice_user', JSON.stringify(newUser));
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('morice_user');
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handleStartCase = () => {
    if (isAuthenticated) {
      setCurrentView('submission');
    } else {
      setCurrentView('auth');
    }
  };

  const handleCaseSubmitted = (caseData) => {
    const newCase = {
      id: Date.now().toString(),
      ...caseData,
      status: 'submitted',
      createdAt: new Date().toISOString(),
      timeline: [
        {
          step: 'Dossier soumis',
          status: 'completed',
          timestamp: new Date().toISOString(),
          description: 'Votre dossier a été reçu et enregistré'
        },
        {
          step: 'Analyse des documents',
          status: 'current',
          timestamp: null,
          description: 'Traitement automatique en cours'
        },
        {
          step: 'Questions de clarification',
          status: 'pending',
          timestamp: null,
          description: 'Questions personnalisées selon votre cas'
        },
        {
          step: 'Analyse finale',
          status: 'pending',
          timestamp: null,
          description: 'Génération de l\'analyse et recommandations'
        }
      ]
    };

    const updatedCases = [...cases, newCase];
    saveCases(updatedCases);
    setCurrentCase(newCase);
    setCurrentView('dashboard');

    toast({ title: "Dossier soumis avec succès", description: "Votre dossier est en cours de traitement." });
    toast({ title: "📧 Notification par e-mail (Simulation)", description: `Confirmation de soumission envoyée à ${user.email}.` });
    if (user.phone) {
      toast({ title: "📱 Notification WhatsApp (Simulation)", description: `Confirmation de soumission envoyée au ${user.phone}.` });
    }

    setTimeout(() => {
      const caseWithAnalysis = {
        ...newCase,
        status: 'analysis_ready',
        timeline: newCase.timeline.map((item, index) => {
          if (index === 1) {
            return { ...item, status: 'completed', timestamp: new Date().toISOString() };
          }
          if (index === 2) {
            return { ...item, status: 'current' };
          }
          return item;
        })
      };
      
      const updatedCasesWithAnalysis = cases.map(c => c.id === newCase.id ? caseWithAnalysis : c);
      const finalCases = [...updatedCasesWithAnalysis.filter(c => c.id !== newCase.id), caseWithAnalysis];
      saveCases(finalCases);
      setCurrentCase(caseWithAnalysis);

      toast({ title: "Analyse des documents terminée", description: "Des questions de clarification sont disponibles." });
      toast({ title: "📧 Notification par e-mail (Simulation)", description: `Analyse initiale terminée pour le dossier #${newCase.id.slice(-6)}.` });
      if (user.phone) {
        toast({ title: "📱 Notification WhatsApp (Simulation)", description: `Analyse initiale terminée pour le dossier #${newCase.id.slice(-6)}.` });
      }
    }, 3000);
  };

  const handleViewCase = (caseId) => {
    const selectedCase = cases.find(c => c.id === caseId);
    setCurrentCase(selectedCase);
    setCurrentView('analysis');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setCurrentCase(null);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleUpdateCase = (updatedCase) => {
    const allQuestionsAnswered = updatedCase.questions && updatedCase.questions.every(q => q.answer !== null);

    if (allQuestionsAnswered && updatedCase.status !== 'final_analysis' && updatedCase.status !== 'completed') {
      const caseReadyForFinalAnalysis = {
        ...updatedCase,
        status: 'final_analysis',
        timeline: updatedCase.timeline.map(item => {
          if (item.step === 'Questions de clarification') {
            return { ...item, status: 'completed', timestamp: new Date().toISOString() };
          }
          if (item.step === 'Analyse finale') {
            return { ...item, status: 'current' };
          }
          return item;
        })
      };
      
      const updatedCasesList = cases.map(c => c.id === updatedCase.id ? caseReadyForFinalAnalysis : c);
      saveCases(updatedCasesList);
      setCurrentCase(caseReadyForFinalAnalysis);

      setTimeout(() => {
        const completedCase = {
          ...caseReadyForFinalAnalysis,
          status: 'completed',
          timeline: caseReadyForFinalAnalysis.timeline.map(item => 
            item.step === 'Analyse finale' ? { ...item, status: 'completed', timestamp: new Date().toISOString() } : item
          )
        };
        const finalCasesList = cases.map(c => c.id === updatedCase.id ? completedCase : c);
        saveCases(finalCasesList);
        setCurrentCase(completedCase);

        toast({ title: "Analyse finale terminée !", description: "Votre rapport est prêt à être consulté." });
        toast({ title: "📧 Notification par e-mail (Simulation)", description: `Rapport final disponible pour le dossier #${completedCase.id.slice(-6)}.` });
        if (user.phone) {
          toast({ title: "📱 Notification WhatsApp (Simulation)", description: `Rapport final disponible pour le dossier #${completedCase.id.slice(-6)}.` });
        }
      }, 3000);

    } else {
      const updatedCases = cases.map(c => c.id === updatedCase.id ? updatedCase : c);
      saveCases(updatedCases);
      setCurrentCase(updatedCase);
    }
  };
  
  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('morice_user', JSON.stringify(updatedUser));
    const existingUsers = JSON.parse(localStorage.getItem('morice_users') || '[]');
    const updatedUsers = existingUsers.map(u => u.email === updatedUser.email ? updatedUser : u);
    localStorage.setItem('morice_users', JSON.stringify(updatedUsers));
  };

  const renderView = () => {
    if (!isAuthenticated) {
      switch (currentView) {
        case 'auth':
          return <AuthPage onLogin={handleLogin} />;
        default:
          return <HomePage onStartCase={handleStartCase} />;
      }
    }

    switch (currentView) {
      case 'submission':
        return <CaseSubmission onCaseSubmitted={handleCaseSubmitted} />;
      case 'analysis':
        return <CaseAnalysis case={currentCase} user={user} onBack={handleBackToDashboard} onUpdateCase={handleUpdateCase} />;
      case 'profile':
        return <ProfilePage user={user} onBack={handleBackToDashboard} onUpdateUser={handleUpdateUser} />;
      case 'dashboard':
        return <Dashboard cases={cases} currentCase={currentCase} onViewCase={handleViewCase} onStartNewCase={handleStartCase} />;
      default:
        return <HomePage onStartCase={handleStartCase} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>MORICE - Plateforme d'Arbitrage Virtuel par IA</title>
        <meta name="description" content="Résolvez vos conflits civils et commerciaux simples grâce à notre plateforme d'arbitrage virtuel alimentée par l'intelligence artificielle. Conforme au droit québécois." />
      </Helmet>

      <LegalDisclaimerModal isOpen={showDisclaimer} onAccept={handleAcceptDisclaimer} />

      <Header 
        currentView={currentView}
        isAuthenticated={isAuthenticated}
        user={user}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        onBackToHome={handleBackToHome}
        onBackToDashboard={handleBackToDashboard}
      />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Chatbot />
      <Toaster />
    </div>
  );
}

export default App;
