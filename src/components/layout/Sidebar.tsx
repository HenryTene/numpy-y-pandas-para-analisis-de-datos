import { cn } from '@/lib/utils';
import { modules } from '@/data/exercises';
import { Check, Lock, Play } from 'lucide-react';

interface SidebarProps {
  currentModule: string;
  completedExercises: string[];
  onModuleSelect: (moduleId: string) => void;
}

export function Sidebar({ currentModule, completedExercises, onModuleSelect }: SidebarProps) {
  const getModuleStatus = (moduleId: string, index: number) => {
    // UV intro is always available
    if (moduleId === 'uv-intro') return 'available';
    
    // Check if previous modules are completed (simplified logic)
    const prevModuleIndex = index - 1;
    if (prevModuleIndex < 0) return 'available';
    
    return 'available'; // For demo, all modules available
  };

  const getModuleProgress = (moduleId: string) => {
    const moduleExercises = completedExercises.filter(id => id.startsWith(moduleId.split('_')[0]));
    
    if (moduleId === 'numpy') {
      return { completed: moduleExercises.filter(id => id.startsWith('numpy')).length, total: 5 };
    }
    if (moduleId === 'pandas') {
      return { completed: moduleExercises.filter(id => id.startsWith('pandas')).length, total: 8 };
    }
    return { completed: 0, total: 0 };
  };

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 flex-shrink-0 border-r border-border bg-card/50 lg:block">
      <div className="flex h-full flex-col p-4">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Módulos
        </h2>
        
        <nav className="flex-1 space-y-2">
          {modules.map((module, index) => {
            const status = getModuleStatus(module.id, index);
            const progress = getModuleProgress(module.id);
            const isActive = currentModule === module.id;
            const isCompleted = progress.total > 0 && progress.completed === progress.total;

            return (
              <button
                key={module.id}
                onClick={() => status !== 'locked' && onModuleSelect(module.id)}
                disabled={status === 'locked'}
                className={cn(
                  'group flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all duration-200',
                  isActive && 'bg-primary/10 border border-primary/30',
                  !isActive && status !== 'locked' && 'hover:bg-secondary/50',
                  status === 'locked' && 'cursor-not-allowed opacity-50'
                )}
              >
                {/* Status icon */}
                <div className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg text-lg transition-colors',
                  isCompleted && 'bg-success/20 text-success',
                  isActive && !isCompleted && 'bg-primary/20 text-primary',
                  !isActive && !isCompleted && 'bg-secondary text-muted-foreground group-hover:bg-secondary/80'
                )}>
                  {status === 'locked' ? (
                    <Lock className="h-4 w-4" />
                  ) : isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : isActive ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <span>{module.icon}</span>
                  )}
                </div>

                {/* Module info */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'font-medium truncate',
                    isActive && 'text-primary',
                    !isActive && 'text-foreground'
                  )}>
                    {module.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {module.description}
                  </p>
                  
                  {/* Progress bar for modules with exercises */}
                  {progress.total > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {progress.completed}/{progress.total}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Author info */}
        <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Material educativo elaborado por <span className="font-semibold text-foreground">Ing. Henry Tene Torres</span>
          </p>
        </div>
      </div>
    </aside>
  );
}
