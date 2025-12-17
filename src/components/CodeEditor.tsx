import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Lightbulb, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeEditorProps {
  initialCode: string;
  solution: string;
  expectedOutput: string;
  hint: string;
  onSuccess: () => void;
  onError: () => void;
}

export function CodeEditor({
  initialCode,
  solution,
  expectedOutput,
  hint,
  onSuccess,
  onError,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hintLevel, setHintLevel] = useState(0);

  const hints = [
    hint,
    `Revisa la solución parcial: ${solution.split('\n').slice(0, 3).join('\n')}...`,
    'Mira la solución completa abajo ⬇️',
  ];

  const handleRun = () => {
    // Simulate code execution
    // In a real app, this would send to a backend or use Pyodide
    
    // Simple check: if the code contains key parts of the solution
    const normalizedCode = code.replace(/\s+/g, ' ').toLowerCase();
    const normalizedSolution = solution.replace(/\s+/g, ' ').toLowerCase();
    
    // Check for key patterns
    const keyParts = solution
      .split('\n')
      .filter(line => line.includes('=') && !line.includes('#'))
      .map(line => {
        const match = line.match(/=\s*(.+)/);
        return match ? match[1].trim().toLowerCase() : '';
      })
      .filter(Boolean);

    const hasCorrectLogic = keyParts.some(part => 
      normalizedCode.includes(part.slice(0, 20))
    );

    if (hasCorrectLogic || normalizedCode.includes(normalizedSolution.slice(50, 100))) {
      setOutput(expectedOutput);
      setStatus('success');
      onSuccess();
    } else {
      setOutput('❌ El resultado no es el esperado. Revisa tu código e intenta de nuevo.');
      setStatus('error');
      onError();
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput(null);
    setStatus('idle');
    setShowHint(false);
    setHintLevel(0);
  };

  const handleShowHint = () => {
    setShowHint(true);
    if (hintLevel < hints.length - 1) {
      setHintLevel(prev => prev + 1);
    }
  };

  const highlightCode = (code: string) => {
    // Simple syntax highlighting
    return code
      .replace(/(import|from|as|def|return|if|else|for|in|while|True|False|None)/g, '<span class="text-code-keyword">$1</span>')
      .replace(/(np|pd|numpy|pandas)/g, '<span class="text-code-function">$1</span>')
      .replace(/(['"`].*?['"`])/g, '<span class="text-code-string">$1</span>')
      .replace(/(\d+\.?\d*)/g, '<span class="text-code-number">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-code-comment">$1</span>');
  };

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Editor header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-warning/60" />
            <div className="h-3 w-3 rounded-full bg-success/60" />
          </div>
          <span className="ml-2 text-sm text-muted-foreground font-mono">ejercicio.py</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShowHint}
            className="text-muted-foreground hover:text-warning"
          >
            <Lightbulb className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Pista</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-muted-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Code area */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[200px] bg-code-bg p-4 font-mono text-sm text-foreground resize-none focus:outline-none"
          spellCheck={false}
        />
        {/* Line numbers overlay */}
        <div className="absolute left-0 top-0 p-4 select-none pointer-events-none">
          {code.split('\n').map((_, i) => (
            <div key={i} className="text-muted-foreground text-sm font-mono h-[1.5em] opacity-0">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Hint box */}
      {showHint && (
        <div className="border-t border-border bg-warning/10 p-4 animate-slide-up">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Pista {hintLevel}/{hints.length}</p>
              <p className="text-sm text-foreground mt-1">{hints[hintLevel - 1] || hints[0]}</p>
              {hintLevel < hints.length && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShowHint}
                  className="mt-2 text-warning hover:text-warning/80"
                >
                  Siguiente pista
                </Button>
              )}
            </div>
          </div>
          {hintLevel === hints.length && (
            <pre className="mt-3 p-3 bg-code-bg rounded-lg text-sm font-mono overflow-x-auto">
              {solution}
            </pre>
          )}
        </div>
      )}

      {/* Run button */}
      <div className="border-t border-border bg-secondary/30 p-4">
        <Button
          onClick={handleRun}
          variant={status === 'success' ? 'success' : 'hero'}
          className="w-full"
          disabled={status === 'success'}
        >
          {status === 'success' ? (
            <>
              <Check className="h-5 w-5" />
              ¡Correcto!
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Ejecutar código
            </>
          )}
        </Button>
      </div>

      {/* Output */}
      {output && (
        <div className={cn(
          'border-t p-4 font-mono text-sm animate-slide-up',
          status === 'success' && 'bg-success/10 border-success/30',
          status === 'error' && 'bg-destructive/10 border-destructive/30'
        )}>
          <div className="flex items-center gap-2 mb-2">
            {status === 'success' ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <X className="h-4 w-4 text-destructive" />
            )}
            <span className={cn(
              'text-xs font-medium',
              status === 'success' ? 'text-success' : 'text-destructive'
            )}>
              {status === 'success' ? 'Output' : 'Error'}
            </span>
          </div>
          <pre className="whitespace-pre-wrap text-foreground">{output}</pre>
        </div>
      )}
    </div>
  );
}
