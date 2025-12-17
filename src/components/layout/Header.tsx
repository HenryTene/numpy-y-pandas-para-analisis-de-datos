import { Flame, Trophy, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface HeaderProps {
  xp: number;
  level: number;
  streak: number;
  levelProgress: number;
}

export function Header({ xp, level, streak, levelProgress }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐍</span>
            <h1 className="text-xl font-bold">
              <span className="text-gradient">DataLab</span>
            </h1>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:inline-block">
            NumPy & Pandas
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Streak */}
          <div className="flex items-center gap-1.5" title="Racha actual">
            <Flame className={`h-5 w-5 ${streak > 0 ? 'text-warning' : 'text-muted-foreground'}`} />
            <span className={`font-semibold ${streak > 0 ? 'text-warning' : 'text-muted-foreground'}`}>
              {streak}
            </span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5" title="Puntos de experiencia">
            <Star className="h-5 w-5 text-xp-gold" />
            <span className="font-semibold text-xp-gold">{xp}</span>
          </div>

          {/* Level with progress */}
          <div className="flex items-center gap-2" title={`Nivel ${level}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-xs text-muted-foreground">Nivel {level}</span>
              <Progress value={levelProgress} className="h-1.5 w-16" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
