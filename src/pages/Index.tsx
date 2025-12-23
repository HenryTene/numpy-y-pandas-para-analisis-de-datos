import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { UVModule } from '@/components/modules/UVModule';
import { NumPyModule } from '@/components/modules/NumPyModule';
import { PandasModule } from '@/components/modules/PandasModule';
import { CleaningModule } from '@/components/modules/CleaningModule';
import { ProjectModule } from '@/components/modules/ProjectModule';
import { ClosingModule } from '@/components/modules/ClosingModule';
import { useProgress } from '@/hooks/useProgress';
import { toast } from 'sonner';

const Index = () => {
  const {
    progress,
    completeExercise,
    resetStreak,
    setCurrentModule,
    completeDiagnostic,
    unlockBadge,
    resetProgress,
    xpToNextLevel,
    levelProgress,
  } = useProgress();

  const handleExerciseComplete = (exerciseId: string, xp: number) => {
    completeExercise(exerciseId, xp);
    toast.success(`¡+${xp} XP! Ejercicio completado`, {
      description: `Racha actual: ${progress.streak + 1} 🔥`,
    });
  };

  const handleExerciseError = () => {
    resetStreak();
  };


  const handleCleaningComplete = () => {
    unlockBadge('data_cleaner');
    setCurrentModule('proyecto');
    toast.success('¡Módulo de limpieza completado!', {
      description: 'Desbloqueaste: Cleaner de Datos 🧹',
    });
  };

  const handleProjectComplete = () => {
    unlockBadge('project_complete');
    setCurrentModule('cierre');
    toast.success('¡Proyecto completado!', {
      description: 'Desbloqueaste: Proyecto Integrador 🏆',
    });
  };

  const handleResetProgress = () => {
    if (confirm('¿Estás seguro de reiniciar todo tu progreso?')) {
      resetProgress();
      toast.info('Progreso reiniciado');
    }
  };

  const renderModule = () => {
    switch (progress.currentModule) {
      case 'uv-intro':
        return <UVModule />;
      case 'numpy':
        return (
          <NumPyModule
            completedExercises={progress.completedExercises}
            onCompleteExercise={handleExerciseComplete}
            onError={handleExerciseError}
          />
        );
      case 'pandas':
        return (
          <PandasModule
            completedExercises={progress.completedExercises}
            onCompleteExercise={handleExerciseComplete}
            onError={handleExerciseError}
          />
        );
      case 'limpieza':
        return <CleaningModule onComplete={handleCleaningComplete} />;
      case 'proyecto':
        return <ProjectModule onComplete={handleProjectComplete} />;
      case 'cierre':
        return (
          <ClosingModule
            xp={progress.xp}
            level={progress.level}
            streak={progress.streak}
            completedExercises={progress.completedExercises}
            unlockedBadges={progress.unlockedBadges}
            onResetProgress={handleResetProgress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        xp={progress.xp}
        level={progress.level}
        streak={progress.streak}
        levelProgress={levelProgress}
      />
      
      <div className="flex">
        <Sidebar
          currentModule={progress.currentModule}
          completedExercises={progress.completedExercises}
          onModuleSelect={setCurrentModule}
        />
        
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
