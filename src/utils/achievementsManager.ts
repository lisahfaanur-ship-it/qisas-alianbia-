import { ChildBadge, UserAchievementsState } from '../types';

export const INITIAL_BADGES: ChildBadge[] = [
  {
    id: 'first_story',
    title: 'قارئ البدايات المباركة',
    description: 'أتممت قراءة أول قصة من قصص الأنبياء عليهم السلام',
    category: 'story',
    iconEmoji: '🌱',
    criteriaDescription: 'إتمام قراءة قصة واحدة',
    points: 20,
    level: 'bronze',
    targetCount: 1
  },
  {
    id: 'stories_trio',
    title: 'باحث في أنوار النبوة',
    description: 'أتممت قراءة ۳ قصص من قصص الأنبياء وتدبرت في دروسها',
    category: 'story',
    iconEmoji: '📜',
    criteriaDescription: 'إتمام قراءة ٣ قصص',
    points: 50,
    level: 'silver',
    targetCount: 3
  },
  {
    id: 'stories_master',
    title: 'حافظ السير الشريفة',
    description: 'قرأت ٦ قصص أو أكثر من قصص الأنبياء الموثقة',
    category: 'story',
    iconEmoji: '🌟',
    criteriaDescription: 'إتمام قراءة ٦ قصص',
    points: 100,
    level: 'gold',
    targetCount: 6
  },
  {
    id: 'all_prophets_read',
    title: 'حكيم سفراء الوحي',
    description: 'أتممت قراءة جميع قصص الأنبياء في المكتبة المباركة',
    category: 'story',
    iconEmoji: '👑',
    criteriaDescription: 'إتمام قراءة ٨ قصص كاملة',
    points: 200,
    level: 'diamond',
    targetCount: 8
  },
  {
    id: 'first_quiz_pass',
    title: 'متدبر متفطن',
    description: 'أجبت عن أول اختبار معرفي بنجاح وتفوق',
    category: 'quiz',
    iconEmoji: '🎯',
    criteriaDescription: 'إكمال اختبار قصة واحدة بنجاح',
    points: 25,
    level: 'bronze',
    targetCount: 1
  },
  {
    id: 'perfect_quiz',
    title: 'العالم الصغير الذكي',
    description: 'حققت العلامة الكاملة ۱۰۰٪ في اختبار قصة نبي',
    category: 'quiz',
    iconEmoji: '🏆',
    criteriaDescription: 'تحقيق العلامة الكاملة في أي اختبار',
    points: 60,
    level: 'gold',
    targetCount: 1
  },
  {
    id: 'quiz_master_three',
    title: 'فارس الاختبارات القرآنية',
    description: 'أتممت ۳ اختبارات بنجاح وثبتت معلوماتك المستمدة من الوحي',
    category: 'quiz',
    iconEmoji: '🏅',
    criteriaDescription: 'إكمال ٣ اختبارات معرفية',
    points: 80,
    level: 'silver',
    targetCount: 3
  },
  {
    id: 'quiz_grandmaster',
    title: 'بطل المعرفة والتوثيق',
    description: 'أتممت ٦ اختبارات لقصص الأنبياء بتفوق مستمر',
    category: 'quiz',
    iconEmoji: '💎',
    criteriaDescription: 'إكمال ٦ اختبارات معرفية',
    points: 150,
    level: 'diamond',
    targetCount: 6
  },
  {
    id: 'deep_explorer',
    title: 'باحث التوثيق والأسانيد',
    description: 'قمت بفحص الأدلة القرآنية والشواهد التوثيقية للقصة',
    category: 'explorer',
    iconEmoji: '🔎',
    criteriaDescription: 'الاطلاع على الشواهد والمصادر التوثيقية',
    points: 30,
    level: 'bronze',
    targetCount: 1
  },
  {
    id: 'three_days_streak',
    title: 'ملازم الذكر والهدى',
    description: 'تابعت القراءة لعدة أيام متواصلة بنشاط وعزيمة',
    category: 'streak',
    iconEmoji: '🔥',
    criteriaDescription: 'المواظبة على القراءة لـ ٣ أيام متتالية',
    points: 40,
    level: 'silver',
    targetCount: 3
  },
  {
    id: 'seven_days_streak',
    title: 'بطل الأسبوع القرآني',
    description: 'حافظت على شعلة الحماس والمواظبة لمدة ٧ أيام متتالية دون انقطاع',
    category: 'streak',
    iconEmoji: '⚡',
    criteriaDescription: 'المواظبة على القراءة لـ ٧ أيام متتالية',
    points: 70,
    level: 'gold',
    targetCount: 7
  },
  {
    id: 'first_coloring',
    title: 'فنان النور الصغير',
    description: 'أتممت تلوين أول لوحة رمزية من قصص الأنبياء',
    category: 'explorer',
    iconEmoji: '🎨',
    criteriaDescription: 'تلوين لوحة واحدة وحفظها',
    points: 30,
    level: 'bronze',
    targetCount: 1
  }
];

const STORAGE_KEY = 'prophet_stories_child_achievements_v1';

export function loadAchievementsState(): UserAchievementsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        completedStoryIds: Array.isArray(parsed.completedStoryIds) ? parsed.completedStoryIds : [],
        completedQuizScores: parsed.completedQuizScores || {},
        unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : [],
        badgeUnlockDates: parsed.badgeUnlockDates || {},
        savedColoringWorks: Array.isArray(parsed.savedColoringWorks) ? parsed.savedColoringWorks : [],
        totalStars: typeof parsed.totalStars === 'number' ? parsed.totalStars : 0,
        readingStreakDays: typeof parsed.readingStreakDays === 'number' ? parsed.readingStreakDays : 1,
        lastActiveDate: parsed.lastActiveDate || new Date().toISOString().split('T')[0],
        completedChallengeDates: Array.isArray(parsed.completedChallengeDates) ? parsed.completedChallengeDates : [],
        lastDailyChallengeCompletedAt: parsed.lastDailyChallengeCompletedAt || ''
      };
    }
  } catch (e) {
    console.warn('Failed to load child achievements state', e);
  }

  return {
    completedStoryIds: [],
    completedQuizScores: {},
    unlockedBadgeIds: [],
    badgeUnlockDates: {},
    savedColoringWorks: [],
    totalStars: 0,
    readingStreakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    completedChallengeDates: [],
    lastDailyChallengeCompletedAt: ''
  };
}

export function saveAchievementsState(state: UserAchievementsState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist child achievements', e);
  }
}

export interface AchievementEvaluationResult {
  newState: UserAchievementsState;
  newlyUnlockedBadges: ChildBadge[];
}

/**
 * Evaluates current user progress and unlocks badges if criteria are satisfied
 */
export function evaluateAchievements(
  currentState: UserAchievementsState,
  options?: {
    justCompletedStoryId?: string;
    justCompletedQuiz?: { prophetId: string; score: number; total: number };
    openedSourceVerification?: boolean;
    completedColoringWorkId?: string;
  }
): AchievementEvaluationResult {
  const updatedState: UserAchievementsState = {
    ...currentState,
    completedStoryIds: [...currentState.completedStoryIds],
    completedQuizScores: { ...currentState.completedQuizScores },
    unlockedBadgeIds: [...currentState.unlockedBadgeIds],
    badgeUnlockDates: { ...currentState.badgeUnlockDates },
    savedColoringWorks: [...currentState.savedColoringWorks]
  };

  // 1. Process Story Completion
  if (options?.justCompletedStoryId && !updatedState.completedStoryIds.includes(options.justCompletedStoryId)) {
    updatedState.completedStoryIds.push(options.justCompletedStoryId);
  }

  // 2. Process Quiz Completion
  if (options?.justCompletedQuiz) {
    const { prophetId, score, total } = options.justCompletedQuiz;
    const existing = updatedState.completedQuizScores[prophetId];
    if (!existing || score > existing.score) {
      updatedState.completedQuizScores[prophetId] = {
        score,
        total,
        completedAt: new Date().toISOString()
      };
    }
  }

  // 3. Evaluate Badges
  const newlyUnlocked: ChildBadge[] = [];
  const nowStr = new Date().toISOString();

  const unlockBadge = (badgeId: string) => {
    if (!updatedState.unlockedBadgeIds.includes(badgeId)) {
      updatedState.unlockedBadgeIds.push(badgeId);
      updatedState.badgeUnlockDates[badgeId] = nowStr;
      const b = INITIAL_BADGES.find(x => x.id === badgeId);
      if (b) {
        newlyUnlocked.push({ ...b, unlockedAt: nowStr });
        updatedState.totalStars += b.points;
      }
    }
  };

  const storiesCount = updatedState.completedStoryIds.length;
  const quizzesCount = Object.keys(updatedState.completedQuizScores).length;
  const hasPerfectQuiz = Object.values(updatedState.completedQuizScores).some(q => q.score === q.total && q.total > 0);

  // Story badges
  if (storiesCount >= 1) unlockBadge('first_story');
  if (storiesCount >= 3) unlockBadge('stories_trio');
  if (storiesCount >= 6) unlockBadge('stories_master');
  if (storiesCount >= 8) unlockBadge('all_prophets_read');

  // Quiz badges
  if (quizzesCount >= 1) unlockBadge('first_quiz_pass');
  if (hasPerfectQuiz) unlockBadge('perfect_quiz');
  if (quizzesCount >= 3) unlockBadge('quiz_master_three');
  if (quizzesCount >= 6) unlockBadge('quiz_grandmaster');

  // Explorer badge
  if (options?.openedSourceVerification) {
    unlockBadge('deep_explorer');
  }

  // Coloring badge
  if (updatedState.savedColoringWorks.length >= 1) {
    unlockBadge('first_coloring');
  }

  // Streak badges
  if (updatedState.readingStreakDays >= 3) {
    unlockBadge('three_days_streak');
  }
  if (updatedState.readingStreakDays >= 7) {
    unlockBadge('seven_days_streak');
  }

  // Recalculate total stars from scratch if needed to ensure consistency
  let calculatedStars = 0;
  INITIAL_BADGES.forEach(b => {
    if (updatedState.unlockedBadgeIds.includes(b.id)) {
      calculatedStars += b.points;
    }
  });
  // Add base points: +15 for each completed story, +10 for each quiz, +30 for each daily challenge
  calculatedStars += storiesCount * 15;
  calculatedStars += Object.values(updatedState.completedQuizScores).reduce((acc, q) => acc + q.score * 5, 0);
  const challengeCount = (updatedState.completedChallengeDates || []).length;
  calculatedStars += challengeCount * 30;
  updatedState.totalStars = calculatedStars;

  saveAchievementsState(updatedState);

  return {
    newState: updatedState,
    newlyUnlockedBadges: newlyUnlocked
  };
}

/**
 * Marks today's daily challenge as completed, increments or maintains streak,
 * awards bonus stars and unlocks any eligible streak badges.
 */
export function recordDailyChallengeCompletion(
  currentState: UserAchievementsState,
  bonusStars: number = 30
): {
  newState: UserAchievementsState;
  newlyUnlockedBadges: ChildBadge[];
  earnedStars: number;
  isAlreadyCompletedToday: boolean;
} {
  const todayStr = new Date().toISOString().split('T')[0];
  const completedDates = currentState.completedChallengeDates || [];
  const isAlreadyCompletedToday = completedDates.includes(todayStr);

  let streak = currentState.readingStreakDays || 0;
  const lastActive = currentState.lastActiveDate || todayStr;

  if (!isAlreadyCompletedToday) {
    const todayMs = new Date(todayStr + 'T00:00:00').getTime();
    const lastMs = new Date(lastActive + 'T00:00:00').getTime();
    const diffDays = Math.round((todayMs - lastMs) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays === 0) {
      streak = Math.max(1, streak);
    } else {
      streak = 1;
    }
  }

  const updatedDates = isAlreadyCompletedToday ? completedDates : [...completedDates, todayStr];
  const starsEarned = isAlreadyCompletedToday ? 0 : bonusStars;

  const intermediateState: UserAchievementsState = {
    ...currentState,
    readingStreakDays: Math.max(1, streak),
    lastActiveDate: todayStr,
    completedChallengeDates: updatedDates,
    lastDailyChallengeCompletedAt: new Date().toISOString()
  };

  const { newState, newlyUnlockedBadges } = evaluateAchievements(intermediateState);

  return {
    newState,
    newlyUnlockedBadges,
    earnedStars: starsEarned,
    isAlreadyCompletedToday
  };
}
