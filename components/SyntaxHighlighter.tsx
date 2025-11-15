import React from 'react';

interface SyntaxHighlighterProps {
  code: string;
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ code }) => {
  const tokens = [
    { regex: /\/\/.*/g, className: 'text-gray-400 italic' }, // Comments (Lighter grey for better visibility on dark bg)
    { regex: /#include\s+<.*?>/g, className: 'text-purple-400' }, // Includes
    { regex: /\b(using|namespace|int|string|char|void|bool|double|float|long|return|if|else|for|while|do|switch|case|break|continue)\b/g, className: 'text-pink-400 font-bold' }, // Keywords
    { regex: /\b(cout|cin|endl)\b/g, className: 'text-blue-400 font-bold' }, // I/O
    { regex: /".*?"/g, className: 'text-green-400' }, // Strings
    { regex: /'.*?'/g, className: 'text-green-400' }, // Chars
    { regex: /\b\d+\b/g, className: 'text-orange-400' }, // Numbers
  ];

  const splitCode = (text: string): React.ReactNode[] => {
    let parts: { text: string; className?: string }[] = [{ text }];

    tokens.forEach(({ regex, className }) => {
      const newParts: typeof parts = [];
      parts.forEach((part) => {
        if (part.className) {
          newParts.push(part);
          return;
        }

        const matches = Array.from(part.text.matchAll(regex));
        let lastIndex = 0;

        matches.forEach((match) => {
          const matchIndex = match.index!;
          const matchText = match[0];

          if (matchIndex > lastIndex) {
            newParts.push({ text: part.text.slice(lastIndex, matchIndex) });
          }
          newParts.push({ text: matchText, className });
          lastIndex = matchIndex + matchText.length;
        });

        if (lastIndex < part.text.length) {
          newParts.push({ text: part.text.slice(lastIndex) });
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) =>
      part.className ? (
        <span key={index} className={part.className}>
          {part.text}
        </span>
      ) : (
        <span key={index}>{part.text}</span>
      )
    );
  };

  return <>{splitCode(code)}</>;
};

export default SyntaxHighlighter;