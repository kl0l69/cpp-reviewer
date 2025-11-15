import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import SyntaxHighlighter from './SyntaxHighlighter';

interface CodeBlockProps {
  code: string;
  title: string;
  output?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, title, output }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
        <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg">{title}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title="نسخ الكود"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="bg-[#1e293b] p-4 overflow-x-auto text-left" dir="ltr">
        <pre className="text-sm md:text-base leading-relaxed text-slate-100 font-mono">
          <code>
            <SyntaxHighlighter code={code} />
          </code>
        </pre>
      </div>

      {/* Output Area (if exists) */}
      {output && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-800/30 p-4 transition-colors">
          <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-semibold mb-2">
            <Terminal size={18} />
            <span>المُخرجات المتوقعة (Output):</span>
          </div>
          <div className="text-slate-700 dark:text-slate-300 font-mono text-sm bg-white/50 dark:bg-slate-900/50 p-2 rounded border border-blue-200/50 dark:border-blue-700/30">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;