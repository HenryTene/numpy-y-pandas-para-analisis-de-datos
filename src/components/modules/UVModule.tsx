import { useState } from 'react';
import { Terminal, Zap, Package, Rocket, Copy, Check, Apple, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface CodeBlockProps {
  code: string;
  title: string;
}

function CodeBlock({ code, title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-8 px-2"
        >
          {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function UVModule() {
  const [openSection, setOpenSection] = useState<string | null>('windows');

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "10-100x más rápido",
      description: "Reemplaza pip, pip-tools, pipx, poetry, pyenv, virtualenv y más"
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: "Gestión completa",
      description: "Instala y gestiona versiones de Python automáticamente"
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Sin dependencias",
      description: "Instalación con un solo comando, sin requisitos previos"
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      title: "Compatible con pip",
      description: "Funciona con requirements.txt, pyproject.toml y más"
    }
  ];

  const installCommands = {
    windows: {
      title: "Windows (PowerShell)",
      icon: <Monitor className="h-5 w-5" />,
      command: 'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"',
      note: "Ejecutar en PowerShell como administrador"
    },
    linux: {
      title: "Linux",
      icon: <Terminal className="h-5 w-5" />,
      command: 'curl -LsSf https://astral.sh/uv/install.sh | sh',
      note: "Ejecutar en terminal"
    },
    mac: {
      title: "macOS",
      icon: <Apple className="h-5 w-5" />,
      command: 'curl -LsSf https://astral.sh/uv/install.sh | sh',
      alternatives: [
        { name: "Homebrew", command: "brew install uv" }
      ],
      note: "Ejecutar en terminal"
    }
  };

  const basicCommands = [
    { command: "uv init mi-proyecto", description: "Crear un nuevo proyecto Python" },
    { command: "uv add pandas numpy", description: "Agregar dependencias al proyecto" },
    { command: "uv run python script.py", description: "Ejecutar un script Python" },
    { command: "uv sync", description: "Sincronizar dependencias del proyecto" },
    { command: "uv python install 3.12", description: "Instalar una versión específica de Python" },
    { command: "uv venv", description: "Crear un entorno virtual" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Package className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">UV - Gestor de Paquetes Python</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Un gestor de proyectos y paquetes Python <span className="text-primary font-semibold">extremadamente rápido</span>, escrito en Rust
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>

      {/* Installation Section */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          Instalación
        </h2>

        <div className="space-y-3">
          {Object.entries(installCommands).map(([key, data]) => (
            <Collapsible
              key={key}
              open={openSection === key}
              onOpenChange={() => setOpenSection(openSection === key ? null : key)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 bg-secondary/30 hover:bg-secondary/50"
                >
                  {data.icon}
                  <span className="font-medium">{data.title}</span>
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-3 space-y-3 pl-4">
                <CodeBlock code={data.command} title={data.note} />
                
                {'alternatives' in data && data.alternatives && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Alternativas:</p>
                    {data.alternatives.map((alt, idx) => (
                      <CodeBlock key={idx} code={alt.command} title={alt.name} />
                    ))}
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Verify installation */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">Verificar instalación:</h3>
          <CodeBlock code="uv --version" title="Terminal" />
        </div>
      </div>

      {/* Basic Commands */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-accent" />
          Comandos Básicos
        </h2>

        <div className="space-y-3">
          {basicCommands.map((cmd, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-border">
              <code className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                {cmd.command}
              </code>
              <span className="text-sm text-muted-foreground">→ {cmd.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Example */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-warning" />
          Ejemplo Rápido
        </h2>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Crea un proyecto de análisis de datos en segundos:
          </p>
          
          <CodeBlock 
            code={`# Crear nuevo proyecto
uv init mi-analisis
cd mi-analisis

# Agregar NumPy y Pandas
uv add numpy pandas

# Ejecutar tu script
uv run python main.py`}
            title="Terminal"
          />

          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <p className="text-sm text-success font-medium">
              💡 UV instalará Python automáticamente si no lo tienes instalado
            </p>
          </div>
        </div>
      </div>

      {/* Documentation Link */}
      <div className="text-center p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5">
        <p className="text-muted-foreground mb-3">
          Para más información, visita la documentación oficial:
        </p>
        <a 
          href="https://docs.astral.sh/uv/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
        >
          docs.astral.sh/uv
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
