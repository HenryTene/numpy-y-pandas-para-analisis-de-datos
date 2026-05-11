import { useState } from 'react';
import { Copy, CheckCheck, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface LineNote {
  /** 1-indexed line number that this note refers to */
  line: number;
  note: string;
}

interface PythonCodeProps {
  code: string;
  title?: string;
  lineNotes?: LineNote[];
  /** When true, the line-by-line explanation is open by default */
  explanationDefaultOpen?: boolean;
}

const PY_KEYWORDS = new Set([
  'import', 'from', 'as', 'def', 'return', 'if', 'elif', 'else',
  'for', 'while', 'in', 'not', 'and', 'or', 'is', 'True', 'False',
  'None', 'class', 'with', 'lambda', 'try', 'except', 'finally',
  'pass', 'break', 'continue', 'yield', 'raise', 'global', 'nonlocal',
  'print',
]);

/** Tokenize a single line of Python (no comments) for lightweight highlighting */
function renderTokens(src: string, baseKey: string) {
  const out: JSX.Element[] = [];
  // Split keeping delimiters: strings, numbers, identifiers, punctuation/whitespace
  const re = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b|\s+|.)/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(src)) !== null) {
    const tok = m[0];
    const key = `${baseKey}-${i++}`;
    if (/^["']/.test(tok)) {
      out.push(<span key={key} className="text-code-string">{tok}</span>);
    } else if (/^\d/.test(tok)) {
      out.push(<span key={key} className="text-code-number">{tok}</span>);
    } else if (PY_KEYWORDS.has(tok)) {
      out.push(<span key={key} className="text-code-keyword font-medium">{tok}</span>);
    } else if (/^[A-Za-z_]\w*$/.test(tok)) {
      // Followed by '(' => function-like
      const next = src[re.lastIndex];
      if (next === '(') {
        out.push(<span key={key} className="text-code-function">{tok}</span>);
      } else {
        out.push(<span key={key} className="text-foreground">{tok}</span>);
      }
    } else {
      out.push(<span key={key} className="text-foreground/80">{tok}</span>);
    }
  }
  return out;
}

/** Find the index of '#' that starts a comment (i.e. not inside a string) */
function commentStart(line: string): number {
  let inStr: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inStr) {
      if (ch === '\\') { i++; continue; }
      if (ch === inStr) inStr = null;
    } else {
      if (ch === '"' || ch === "'") inStr = ch;
      else if (ch === '#') return i;
    }
  }
  return -1;
}

export function PythonCode({
  code,
  title = 'Python',
  lineNotes,
  explanationDefaultOpen = false,
}: PythonCodeProps) {
  const [copied, setCopied] = useState(false);
  const [showNotes, setShowNotes] = useState(explanationDefaultOpen);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');
  const notesByLine = new Map<number, string>();
  lineNotes?.forEach(n => notesByLine.set(n.line, n.note));

  return (
    <div className="rounded-lg bg-code-bg overflow-hidden border border-border/40">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/30">
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          type="button"
        >
          {copied ? <CheckCheck className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const cIdx = commentStart(line);
            const codePart = cIdx >= 0 ? line.slice(0, cIdx) : line;
            const commentPart = cIdx >= 0 ? line.slice(cIdx) : '';
            const hasNote = notesByLine.has(lineNum);

            return (
              <div
                key={idx}
                className={cn(
                  'flex items-start group',
                  hasNote && 'bg-primary/5 -mx-4 px-4 border-l-2 border-primary/40'
                )}
              >
                <span
                  className="select-none pr-4 text-right text-code-line-number text-xs pt-[2px]"
                  style={{ minWidth: '2.5em' }}
                >
                  {lineNum}
                </span>
                <span className="flex-1 whitespace-pre">
                  {codePart && renderTokens(codePart, `l${idx}`)}
                  {commentPart && (
                    <span className="italic font-medium text-code-comment">
                      {commentPart}
                    </span>
                  )}
                  {!codePart && !commentPart && '\u200B'}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      {/* Line-by-line explanation */}
      {lineNotes && lineNotes.length > 0 && (
        <div className="border-t border-border/50">
          <button
            onClick={() => setShowNotes(s => !s)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
            type="button"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5" />
              Explicación línea a línea ({lineNotes.length})
            </span>
            {showNotes ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showNotes && (
            <div className="px-4 py-3 bg-primary/5 border-t border-border/30 space-y-2 animate-fade-in">
              {lineNotes.map((n, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-0.5 rounded h-fit shrink-0 mt-0.5">
                    L{n.line}
                  </span>
                  <span className="text-foreground/90">{n.note}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
