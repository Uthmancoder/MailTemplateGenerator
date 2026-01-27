import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface CodeDisplayProps {
  code: string;
}

export default function CodeDisplay({ code }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card className="p-6">
      <div className="bg-slate-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <span className="text-xs font-mono text-slate-400">HTML</span>
          <button
            onClick={copyCode}
            className="px-3 py-1 text-xs font-medium text-slate-300 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
        <pre className="overflow-auto max-h-96 p-4">
          <code className="text-xs font-mono text-slate-300 whitespace-pre-wrap break-words">
            {code}
          </code>
        </pre>
      </div>
      <p className="text-xs text-slate-500 mt-4">
        This is your complete HTML email template. Copy it and paste into your email service provider.
      </p>
    </Card>
  );
}
