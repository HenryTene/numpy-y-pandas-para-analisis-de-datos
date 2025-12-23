import { useState, useEffect } from 'react';

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  completedExercises: string[];
  unlockedBadges: string[];
  currentModule: string;
  quizScore: number;
  diagnosticCompleted: boolean;
}

const INITIAL_PROGRESS: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  completedExercises: [],
  unlockedBadges: [],
  currentModule: 'uv-intro',
  quizScore: 0,
  diagnosticCompleted: false,
};

const XP_PER_LEVEL = 100;

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('datalab_progress');
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem('datalab_progress', JSON.stringify(progress));
  }, [progress]);

  const addXP = (amount: number) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const completeExercise = (exerciseId: string, xpReward: number) => {
    setProgress(prev => {
      if (prev.completedExercises.includes(exerciseId)) {
        return prev;
      }
      const newCompleted = [...prev.completedExercises, exerciseId];
      const newStreak = prev.streak + 1;
      const newXP = prev.xp + xpReward;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      
      const newBadges = [...prev.unlockedBadges];
      
      // Check for badges
      if (newCompleted.length === 1 && !newBadges.includes('first_step')) {
        newBadges.push('first_step');
      }
      if (newStreak >= 5 && !newBadges.includes('streak_master')) {
        newBadges.push('streak_master');
      }
      
      // Check NumPy completion
      const numpyExercises = newCompleted.filter(id => id.startsWith('numpy_'));
      if (numpyExercises.length >= 5 && !newBadges.includes('vectorization_pro')) {
        newBadges.push('vectorization_pro');
      }
      
      // Check Pandas completion
      const pandasExercises = newCompleted.filter(id => id.startsWith('pandas_'));
      if (pandasExercises.length >= 8 && !newBadges.includes('dataframe_ninja')) {
        newBadges.push('dataframe_ninja');
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        completedExercises: newCompleted,
        unlockedBadges: newBadges,
      };
    });
  };

  const resetStreak = () => {
    setProgress(prev => ({ ...prev, streak: 0 }));
  };

  const setCurrentModule = (moduleId: string) => {
    setProgress(prev => ({ ...prev, currentModule: moduleId }));
  };

  const completeDiagnostic = (score: number) => {
    setProgress(prev => ({
      ...prev,
      diagnosticCompleted: true,
      quizScore: score,
    }));
  };

  const unlockBadge = (badgeId: string) => {
    setProgress(prev => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
    });
  };

  const resetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    localStorage.removeItem('datalab_progress');
  };

  const xpToNextLevel = XP_PER_LEVEL - (progress.xp % XP_PER_LEVEL);
  const levelProgress = ((progress.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  return {
    progress,
    addXP,
    completeExercise,
    resetStreak,
    setCurrentModule,
    completeDiagnostic,
    unlockBadge,
    resetProgress,
    xpToNextLevel,
    levelProgress,
  };
}
