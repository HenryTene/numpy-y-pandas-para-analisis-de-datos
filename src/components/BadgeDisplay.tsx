import { badges } from '@/data/exercises';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface BadgeDisplayProps {
  unlockedBadges: string[];
}

export function BadgeDisplay({ unlockedBadges }: BadgeDisplayProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold mb-4">🏆 Insignias</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {badges.map((badge) => {
          const isUnlocked = unlockedBadges.includes(badge.id);
          
          return (
            <div
              key={badge.id}
              className={cn(
                'relative rounded-xl p-4 text-center transition-all duration-300',
                isUnlocked 
                  ? 'bg-gradient-to-br from-xp-gold/20 to-warning/10 border border-xp-gold/30' 
                  : 'bg-secondary/30 border border-border opacity-60'
              )}
            >
              <div className={cn(
                'text-4xl mb-2',
                !isUnlocked && 'grayscale'
              )}>
                {badge.icon}
              </div>
              <p className={cn(
                'text-sm font-medium',
                isUnlocked ? 'text-foreground' : 'text-muted-foreground'
              )}>
                {badge.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {badge.description}
              </p>
              {!isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-xl">
                  <Lock className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
