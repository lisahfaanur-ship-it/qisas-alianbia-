export type AgeGroup = '5-7' | '8-10' | '11-13';

export type StoryStatus = 'verified' | 'under_review' | 'draft' | 'needs_correction';

export type EvidenceLevel = 'Primary' | 'Secondary' | 'Commentary' | 'Tradition' | 'Historical';
export type VerificationStatus = 'Verified' | 'Reviewed' | 'Pending' | 'Needs_Source' | 'Disputed';

export interface SourceReference {
  id: string;
  title: string;
  type: 'quran' | 'hadith' | 'tafsir' | 'scholarly_reference' | 'historical_record';
  referenceDetails: string;
  textSnippet?: string;
  authenticityDegree?: string;
  evidenceLevel?: EvidenceLevel;
  verificationStatus?: VerificationStatus;
}

export interface QuranicVerse {
  surah: string;
  ayahNumber: string;
  text: string;
  explanation?: string;
  audioUrl?: string;
}

export interface AgeTadabburExplanation {
  summary: string;
  actionPoint: string;
  discussionQuestion: string;
  deeperTafsir?: string;
}

export interface TadabburVerse {
  id: string;
  surah: string;
  ayahNumber: string;
  text: string;
  theme?: string;
  chapterTitle?: string;
  audioUrl?: string;
  ageExplanations: Record<AgeGroup, AgeTadabburExplanation>;
  tafsirSource: string;
}

export interface StoryChapter {
  id: number;
  title: string;
  subtitle: string;
  text: string;
  audioUrl?: string;
  symbolicIllustration: {
    theme: 'garden' | 'ark' | 'mountain' | 'stars' | 'desert' | 'water' | 'nature';
    caption: string;
    symbolicNotice: string;
  };
  associatedAyah?: QuranicVerse;
  associatedHadith?: {
    text: string;
    source: string;
    grade?: string;
    reference: string;
  };
  detailedExplanation?: string;
  chapterSources?: SourceReference[];
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DidYouKnowFact {
  id: string;
  fact: string;
  source: string;
  verified: boolean;
}

export interface CautionItem {
  id: string;
  topic: string;
  whatIsAuthentic: string;
  whatIsDifferedOrUnproven: string;
  guidance: string;
}

export interface QuizQuestion {
  id: string;
  ageGroup: 'all' | '5-7' | '8-10' | '11-13';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceReference: string;
}

export interface ParentDiscussionGuide {
  suitableAgeAdvice: string;
  educationalGoals: string[];
  discussionPrompts: string[];
  familyActivity: string;
}

export interface AccuracyVerification {
  allInfoSourced: boolean;
  noFabricatedDetails: boolean;
  noWeakHadithAsFact: boolean;
  separatedQuranFromTafsir: boolean;
  noSymbolicDepictionOfProphetsBody: boolean;
  ageAppropriateLanguage: boolean;
  verifierName: string;
  verificationDate: string;
  notes?: string;
}

export interface ReviewChecklist {
  quranicVersesChecked: boolean;
  hadithReferencedAndAuthentic: boolean;
  noProphetDepiction: boolean;
  israiliyatExcluded: boolean;
  ageAppropriateLanguage: boolean;
  quizQuestionsReviewed: boolean;
  sourcesExplicitlyStated: boolean;
  coreValuesClarified: boolean;
  audioScriptMatchesText: boolean;
}

export interface DifficultWord {
  id: string;
  word: string;
  meaning: string;
  pronunciationHint?: string; // e.g. phonetic or specific text for TTS if needed
}

export interface ColoringPage {
  id: string;
  title: string;
  description: string;
  svgPaths: {
    id: string;
    d: string;
    defaultColor?: string;
    label?: string; // for screen readers or help
  }[];
}

export interface SavedColoringWork {
  id: string;
  pageId: string;
  storyId: string;
  title: string;
  svgData: Record<string, string>; // pathId -> color
  previewUrl: string; // base64 preview
  savedAt: string;
}

export interface ProphetStory {
  id: string;
  name: string;
  title: string;
  epithet: string; // e.g. "أبو البشر" or "شيخ المرسلين" or "كليم الله"
  shortSummary: string;
  symbolicTheme: 'garden' | 'ark' | 'mountain' | 'stars' | 'desert' | 'water' | 'nature';
  quranicMentionsCount: number;
  historicalPeriod: string;
  status: StoryStatus;
  reviewChecklist: ReviewChecklist;
  
  // Variations for each age tier
  ageVariants: Record<AgeGroup, {
    summary: string;
    chapters: StoryChapter[];
  }>;

  coreValues: CoreValue[];
  didYouKnow: DidYouKnowFact[];
  vocabulary?: DifficultWord[];
  coloringPages?: ColoringPage[];
  cautionsAndDiscrepancies: CautionItem[];
  sources: SourceReference[];
  quiz: QuizQuestion[];
  audioScript: {
    fullText: string;
    estimatedMinutes: number;
  };
  parentGuide: ParentDiscussionGuide;
  accuracyCheck: AccuracyVerification;
  reflectionQuestion?: string; // التفكير في مغزى القصة
}

export type AchievementCategory = 'story' | 'quiz' | 'explorer' | 'reflection' | 'streak';

export interface ChildBadge {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  iconEmoji: string;
  iconName?: string;
  criteriaDescription: string;
  unlockedAt?: string; // ISO date string if unlocked
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'diamond';
  targetCount: number;
  currentCount?: number;
}

export interface UserAchievementsState {
  completedStoryIds: string[]; // List of prophet IDs where reading is completed
  completedQuizScores: Record<string, { score: number; total: number; completedAt: string }>; // prophetId -> score
  unlockedBadgeIds: string[]; // list of unlocked badge IDs
  badgeUnlockDates: Record<string, string>; // badgeId -> timestamp
  savedColoringWorks: SavedColoringWork[];
  totalStars: number; // accumulated stars / points
  readingStreakDays: number;
  lastActiveDate: string;
  completedChallengeDates?: string[]; // list of dates YYYY-MM-DD when daily challenge was completed
  lastDailyChallengeCompletedAt?: string;
}

// --- Admin & Security Types ---

export type AdminRole = 'super_admin' | 'content_manager' | 'security_admin' | 'moderator' | 'viewer';

export type Permission = 
  | 'users.view' | 'users.edit' | 'users.delete' | 'users.manage_roles'
  | 'admins.view' | 'admins.create' | 'admins.edit' | 'admins.delete'
  | 'content.view' | 'content.create' | 'content.edit' | 'content.delete' | 'content.publish'
  | 'settings.view' | 'settings.edit'
  | 'security.view_logs' | 'security.manage_sessions'
  | 'all';

export interface RoleConfig {
  id: AdminRole;
  label: string;
  permissions: Permission[];
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: AdminRole;
  customPermissions?: Permission[]; // Overrides or additions to role permissions
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
  photoURL?: string;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  achievements: UserAchievementsState;
  createdAt: string;
  lastActiveAt: string;
  isSuspended: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  userName: string;
  action: string; // e.g. "USER_DELETE", "STORY_PUBLISH"
  category: 'auth' | 'content' | 'user_management' | 'security' | 'settings';
  targetId?: string; // ID of the entity affected
  targetType?: string; // e.g. "story", "user"
  metadata?: Record<string, any>;
  ipAddress?: string;
  status: 'success' | 'failure';
}
