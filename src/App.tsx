import React, { useState, useEffect } from 'react';
import { ProphetStory, AgeGroup, UserAchievementsState, ChildBadge } from './types';
import { INITIAL_PROPHETS_DATA } from './data/prophetsData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { StoriesLibraryView } from './components/StoriesLibraryView';
import { StoryDetailView } from './components/StoryDetailView';
import { AudioHubView } from './components/AudioHubView';
import { QuizHubView } from './components/QuizHubView';
import { SourcesPageView } from './components/SourcesPageView';
import { ParentGuideView } from './components/ParentGuideView';
import { TimelineView } from './components/TimelineView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { SearchModal } from './components/SearchModal';
import { ColoringBookView } from './components/ColoringBookView';
import { AchievementsDashboardView } from './components/AchievementsDashboardView';
import { BadgeCelebrationModal } from './components/BadgeCelebrationModal';
import {
  loadAchievementsState,
  evaluateAchievements,
  saveAchievementsState,
  recordDailyChallengeCompletion
} from './utils/achievementsManager';
import { SavedColoringWork, AdminUser, AppUser } from './types';
import { AdminLoginView } from './components/AdminLoginView';
import { useFirebase } from './components/FirebaseProvider';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function App() {
  const { user, adminUser, loading: authLoading, initialized } = useFirebase();
  
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  const [prophets, setProphets] = useState<ProphetStory[]>(() => {
    const saved = localStorage.getItem('prophets_stories_data_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse local stored stories', e);
      }
    }
    return INITIAL_PROPHETS_DATA;
  });

  // Parse Deep Links from URL on initialization
  const getInitialRouteState = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const storyParam = params.get('story');
      const ageParam = params.get('age') as AgeGroup | null;
      const tabParam = params.get('tab');

      const initialTab = storyParam ? 'story-detail' : (tabParam || 'home');
      const initialStory = storyParam || 'adam';
      const initialAge: AgeGroup = (ageParam === '5-7' || ageParam === '8-10' || ageParam === '11-13') ? ageParam : '8-10';

      return { initialTab, initialStory, initialAge };
    } catch {
      return { initialTab: 'home', initialStory: 'adam', initialAge: '8-10' as AgeGroup };
    }
  };

  const initialRoute = getInitialRouteState();

  const [currentTab, setCurrentTab] = useState<string>(initialRoute.initialTab);
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(initialRoute.initialAge);
  const [activeProphetId, setActiveProphetId] = useState<string>(initialRoute.initialStory);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [achievementsState, setAchievementsState] = useState<UserAchievementsState>(loadAchievementsState);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<ChildBadge[]>([]);

  // Child-friendly Eye Care / Night Mode state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('prophets_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('prophets_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Keep URL query string in sync with deep links for seamless sharing and browser navigation
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (currentTab === 'story-detail' && activeProphetId) {
        url.searchParams.set('story', activeProphetId);
        url.searchParams.set('age', selectedAge);
        url.searchParams.delete('tab');
      } else {
        url.searchParams.delete('story');
        url.searchParams.delete('age');
        if (currentTab !== 'home') {
          url.searchParams.set('tab', currentTab);
        } else {
          url.searchParams.delete('tab');
        }
      }
      window.history.replaceState({}, '', url.toString());
    } catch (e) {
      console.warn('Could not sync history state', e);
    }
  }, [currentTab, activeProphetId, selectedAge]);

  // Listen to popstate for back/forward browser button support
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const storyParam = params.get('story');
      const ageParam = params.get('age') as AgeGroup | null;
      const tabParam = params.get('tab');

      if (storyParam) {
        setActiveProphetId(storyParam);
        setCurrentTab('story-detail');
        if (ageParam && (ageParam === '5-7' || ageParam === '8-10' || ageParam === '11-13')) {
          setSelectedAge(ageParam);
        }
      } else if (tabParam) {
        setCurrentTab(tabParam);
      } else {
        setCurrentTab('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync back to local storage when stories update (e.g. from Admin review)
  useEffect(() => {
    localStorage.setItem('prophets_stories_data_v1', JSON.stringify(prophets));
  }, [prophets]);

  // Scroll to top on tab or prophet switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, activeProphetId]);

  const handleSelectStory = (prophetId: string) => {
    setActiveProphetId(prophetId);
    setCurrentTab('story-detail');
  };

  const handleUpdateProphet = (updatedProphet: ProphetStory) => {
    setProphets(prev => prev.map(p => (p.id === updatedProphet.id ? updatedProphet : p)));
  };

  const handleAddProphet = (newProphet: ProphetStory) => {
    setProphets(prev => [...prev, newProphet]);
  };

  const handleSaveColoringWork = (work: SavedColoringWork) => {
    const updatedState = {
      ...achievementsState,
      savedColoringWorks: [...achievementsState.savedColoringWorks, work]
    };
    const { newState, newlyUnlockedBadges: newBadges } = evaluateAchievements(updatedState);
    setAchievementsState(newState);
    saveAchievementsState(newState);
    if (newBadges.length > 0) {
      setNewlyUnlockedBadges(prev => [...prev, ...newBadges]);
    }
  };

  const handleCompleteDailyChallenge = (bonusStars: number = 30) => {
    const { newState, newlyUnlockedBadges: newBadges } = recordDailyChallengeCompletion(
      achievementsState,
      bonusStars
    );
    setAchievementsState(newState);
    if (newBadges.length > 0) {
      setNewlyUnlockedBadges(prev => [...prev, ...newBadges]);
    }
  };

  const handleAdminLogin = async () => {
    setAdminAuthLoading(true);
    setAdminAuthError(null);
    
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // Seed Logic: If it's the primary user email from metadata, ensure they are an admin
      const allowedEmails = ['lisahfaanur@gmail.com'];
      
      const adminRef = doc(db, 'admins', firebaseUser.uid);
      const adminDoc = await getDoc(adminRef);

      if (!adminDoc.exists() && allowedEmails.includes(firebaseUser.email || '')) {
        // Auto-promote first owner
        const newAdmin: AdminUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || 'المدير الرئيسي',
          role: 'super_admin',
          isActive: true,
          createdAt: new Date().toISOString()
        };
        await setDoc(adminRef, newAdmin);
        // Page will refresh or state will update via FirebaseProvider
      } else if (!adminDoc.exists()) {
        await signOut(auth);
        setAdminAuthError('عذراً، هذا الحساب ليس لديه صلاحيات وصول للوحة التحكم. يرجى التواصل مع المدير الرئيسي.');
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setAdminAuthError('فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setAdminAuthLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    await signOut(auth);
    setCurrentTab('home'); 
  };

  const selectedProphet = prophets.find(p => p.id === activeProphetId) || prophets[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#0b1329] text-slate-800 dark:text-slate-100 font-['Cairo',sans-serif] flex flex-col selection:bg-amber-200 selection:text-amber-950 dark:selection:bg-amber-600 dark:selection:text-white transition-colors duration-300" dir="rtl">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedAge={selectedAge}
        setSelectedAge={setSelectedAge}
        onOpenSearch={() => setIsSearchOpen(true)}
        totalStars={achievementsState.totalStars}
        streakDays={achievementsState.readingStreakDays}
        isAdmin={!!adminUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content View Port */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HomeView
            prophets={prophets}
            selectedAge={selectedAge}
            achievementsState={achievementsState}
            onSelectStory={handleSelectStory}
            onNavigateTab={setCurrentTab}
            onCompleteChallenge={handleCompleteDailyChallenge}
          />
        )}

        {currentTab === 'stories' && (
          <StoriesLibraryView
            prophets={prophets}
            selectedAge={selectedAge}
            onSelectStory={handleSelectStory}
          />
        )}

        {currentTab === 'story-detail' && selectedProphet && (
          <StoryDetailView
            prophet={selectedProphet}
            selectedAge={selectedAge}
            onBack={() => setCurrentTab('stories')}
            onOpenSourcesList={() => setCurrentTab('sources')}
            isGlobalDarkMode={isDarkMode}
            onToggleGlobalDarkMode={toggleDarkMode}
          />
        )}

        {currentTab === 'audio' && (
          <AudioHubView
            prophets={prophets}
            selectedAge={selectedAge}
            onSelectStory={handleSelectStory}
          />
        )}

        {currentTab === 'quiz-hub' && (
          <QuizHubView
            prophets={prophets}
            selectedAge={selectedAge}
            onSelectStory={handleSelectStory}
          />
        )}

        {currentTab === 'timeline' && (
          <TimelineView
            prophets={prophets}
            selectedAge={selectedAge}
            onSelectStory={handleSelectStory}
            onBack={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'coloring' && (
          <ColoringBookView
            prophets={prophets}
            onSaveWork={handleSaveColoringWork}
            onBack={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'achievements' && (
          <AchievementsDashboardView
            achievementsState={achievementsState}
            prophets={prophets}
            onSelectStory={handleSelectStory}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === 'sources' && (
          <SourcesPageView
            prophets={prophets}
            onSelectStory={handleSelectStory}
          />
        )}

        {currentTab === 'parents' && <ParentGuideView />}
        
        {currentTab === 'admin' && (
          !adminUser ? (
            <AdminLoginView 
              onLogin={handleAdminLogin} 
              isLoading={adminAuthLoading} 
              error={adminAuthError} 
            />
          ) : (
            <AdminDashboardView
              prophets={prophets}
              onUpdateProphet={handleUpdateProphet}
              onAddProphet={handleAddProphet}
              currentUser={adminUser}
              onLogout={handleAdminLogout}
            />
          )
        )}
      </main>

      {/* Search Drawer Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        prophets={prophets}
        onSelectProphet={handleSelectStory}
        selectedAge={selectedAge}
      />

      {/* Global Footer */}
      <Footer onNavigateTab={setCurrentTab} />

      {/* Badge Celebration Modal */}
      {newlyUnlockedBadges.length > 0 && (
        <BadgeCelebrationModal
          badge={newlyUnlockedBadges[0]}
          onClose={() => setNewlyUnlockedBadges(prev => prev.slice(1))}
        />
      )}
    </div>
  );
}
