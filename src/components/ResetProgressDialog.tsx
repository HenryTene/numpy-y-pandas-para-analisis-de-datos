import { useState } from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ResetProgressDialogProps {
  onConfirm: () => void;
  triggerClassName?: string;
}

export function ResetProgressDialog({ onConfirm, triggerClassName }: ResetProgressDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={triggerClassName}
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar avances
        </Button>
      </AlertDialogTrigger>
      
      <AlertDialogContent className="border-destructive/20 bg-card/95 backdrop-blur-sm sm:max-w-md">
        <AlertDialogHeader className="gap-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <AlertDialogTitle className="text-xl font-bold text-foreground">
              ¿Reiniciar tu progreso?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground leading-relaxed">
              Esta acción no se puede deshacer. Perderás:
            </AlertDialogDescription>
          </div>

          <ul className="rounded-lg bg-secondary/50 p-3 text-sm text-foreground space-y-2">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              Todos los puntos XP acumulados
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              Tu nivel y racha actual
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
              Ejercicios completados y badges desbloqueados
            </li>
          </ul>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-2 gap-2 sm:gap-2">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <X className="h-4 w-4" />
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button 
              variant="destructive" 
              onClick={handleConfirm}
              className="w-full sm:w-auto gap-2 bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <RotateCcw className="h-4 w-4" />
              Sí, reiniciar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
