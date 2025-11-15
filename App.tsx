import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Calculator, Repeat, Layers, AlertCircle, Menu, X, MousePointer, Zap, Moon, Sun, Search, HelpCircle, Terminal, ChevronDown, ChevronUp, ArrowRight, Play, RotateCcw, Edit3, Eye, School, Phone, MessageCircle, Mail, Github, Facebook, Instagram, Send } from 'lucide-react';
import { reviewData, predictionTable, essayQuestions } from './data';
import CodeBlock from './components/CodeBlock';

// --- Sub-Components for Interactivity ---

// Helper to highlight `code` and **bold** inside normal text
const parseInlineStyles = (text: string) => {
    // Split by `code` or **bold**
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={i} className="font-mono text-[0.9em] text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-1.5 py-0.5 rounded mx-1 border border-pink-100 dark:border-pink-800/30">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-slate-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const FormattedAnswer: React.FC<{ text: string }> = ({ text }) => {
  // Regex to split text into segments: Code blocks (heuristic), Headers, Lists, or paragraphs
  const lines = text.split('\n');

  return (
    <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={index} className="h-2" />;

        // 1. Detect Headers (lines starting/containing **...**)
        if (trimmed.startsWith('**') || (trimmed.includes('**') && !trimmed.includes('`'))) {
           const content = trimmed.replace(/\*\*/g, '');
           return (
             <h4 key={index} className="text-purple-700 dark:text-purple-400 font-bold text-lg mt-4 mb-2 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
               {content}
             </h4>
           );
        }

        // 2. Detect Lists (lines starting with -)
        if (trimmed.startsWith('- ')) {
            return (
                <div key={index} className="flex items-start gap-3 mr-2 mb-1">
                    <ArrowRight size={16} className="text-blue-500 mt-1.5 flex-shrink-0 rotate-180" />
                    <span className="flex-1">{parseInlineStyles(trimmed.replace('- ', ''))}</span>
                </div>
            );
        }

        // 3. Detect Code Blocks (Heuristic: contains C++ syntax or English code-like text)
        // Check for lines that look like code (semicolons, comments, keywords) but aren't just explanations
        const isCode = /^(int|cout|cin|return|if|else|for|while|do|#include|\/\/)/.test(trimmed) || (trimmed.includes(';') && !trimmed.includes('**'));
        
        if (isCode) {
             return (
                 <div key={index} dir="ltr" className="font-mono text-sm bg-[#1e293b] text-blue-300 p-3 rounded-lg border-l-4 border-blue-500 my-2 shadow-sm overflow-x-auto whitespace-pre">
                     {trimmed}
                 </div>
             )
        }

        // 4. Regular Paragraph
        return <p key={index} className="mb-1">{parseInlineStyles(trimmed)}</p>;
      })}
    </div>
  );
};

const EssayCard: React.FC<{ question: string; answer: string; index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`
      bg-white dark:bg-slate-800 rounded-xl border shadow-sm overflow-hidden transition-all duration-300 
      ${isOpen ? 'border-purple-400 ring-1 ring-purple-400/30 dark:border-purple-500/50' : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-slate-600'}
    `}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right p-5 flex items-start gap-4 focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg transition-all duration-500 
          ${isOpen 
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 rotate-3' 
            : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`
        }>
          {index + 1}
        </div>
        <div className="flex-1 pt-1">
          <h3 className={`text-lg font-bold leading-snug transition-colors ${isOpen ? 'text-purple-700 dark:text-purple-400' : 'text-slate-800 dark:text-slate-200'}`}>
            {question}
          </h3>
        </div>
        <div className={`mt-2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${isOpen ? 'bg-purple-100 text-purple-600 rotate-180' : 'text-slate-400'}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <div 
        className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-0 pr-20 pl-6 border-t border-slate-100 dark:border-slate-700/50">
          <div className="pt-6">
            <FormattedAnswer text={answer} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PointerPlayground: React.FC = () => {
  const [tab, setTab] = useState<'basic' | 'arithmetic' | 'modify'>('basic');

  // Basic State
  const [varValue, setVarValue] = useState(10);
  
  // Arithmetic State
  const [arrValues, setArrValues] = useState([10, 20, 30, 40]);
  const [ptrIndex, setPtrIndex] = useState(0);

  // Modify State
  const [modValue, setModValue] = useState(50);
  const [targetValue, setTargetValue] = useState(50);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-10">
      <div className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 p-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
          <MousePointer size={20} className="text-blue-500" />
          مختبر المؤشرات التفاعلي (Interactive Pointers)
        </h3>
        <div className="flex gap-2 mt-4">
          {[
            { id: 'basic', label: 'تعريف المؤشر (Declaration)' },
            { id: 'arithmetic', label: 'حسابات المؤشر (Arithmetic)' },
            { id: 'modify', label: 'تعديل القيمة (Dereference)' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                tab === t.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-slate-100 dark:bg-[#0f172a] min-h-[300px] flex flex-col items-center justify-center">
        
        {/* --- BASIC TAB --- */}
        {tab === 'basic' && (
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-6 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                أدخل قيمة للمتغير <code className="text-pink-500">var</code> وشاهد كيف يخزن المؤشر <code className="text-blue-500">ptr</code> عنوانه ويشير إليه.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-slate-500">int var = </span>
                <input 
                  type="number" 
                  value={varValue} 
                  onChange={(e) => setVarValue(Number(e.target.value))}
                  className="w-24 px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="font-mono text-slate-500">;</span>
              </div>
            </div>

            <div className="flex justify-between items-start gap-8">
              {/* Variable Box */}
              <div className="flex-1 flex flex-col items-center">
                <span className="text-sm font-bold text-slate-500 mb-1">Variable (var)</span>
                <div className="w-full bg-white dark:bg-slate-800 border-2 border-pink-500 rounded-lg p-4 text-center relative shadow-lg">
                  <div className="text-xs text-slate-400 absolute top-1 right-2">0x7ff...04</div>
                  <div className="text-2xl font-bold font-mono text-pink-600 dark:text-pink-400">{varValue}</div>
                </div>
                <div className="text-xs font-mono mt-2 text-slate-400">&var</div>
              </div>

              {/* Pointer Box */}
              <div className="flex-1 flex flex-col items-center relative">
                <span className="text-sm font-bold text-slate-500 mb-1">Pointer (ptr)</span>
                 <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-blue-500">
                    <ArrowRight size={32} strokeWidth={2} />
                 </div>
                <div className="w-full bg-white dark:bg-slate-800 border-2 border-blue-500 rounded-lg p-4 text-center relative shadow-lg">
                   <div className="text-xs text-slate-400 absolute top-1 right-2">0x7ff...08</div>
                   <div className="text-sm font-bold font-mono text-slate-600 dark:text-slate-300 mt-1">0x7ff...04</div>
                </div>
                <div className="text-xs font-mono mt-2 text-slate-400">*ptr</div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-slate-200 dark:bg-slate-800/50 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-sm text-center" dir="ltr">
              cout &lt;&lt; *ptr; // Outputs: <span className="text-green-600 font-bold">{varValue}</span>
            </div>
          </div>
        )}

        {/* --- ARITHMETIC TAB --- */}
        {tab === 'arithmetic' && (
          <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4">
             <div className="mb-6 text-center">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                تحكم في المؤشر باستخدام <code className="text-blue-500">++</code> و <code className="text-blue-500">--</code> للتنقل عبر المصفوفة.
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {arrValues.map((v, i) => (
                  <input 
                    key={i}
                    type="number"
                    value={v}
                    onChange={(e) => {
                      const newArr = [...arrValues];
                      newArr[i] = Number(e.target.value);
                      setArrValues(newArr);
                    }}
                    className="w-16 px-2 py-1 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-mono focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 relative pb-12">
              {arrValues.map((val, idx) => (
                <div key={idx} className={`
                  w-20 h-20 border-2 flex flex-col items-center justify-center rounded-lg transition-all duration-300
                  ${idx === ptrIndex 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-110 z-10 shadow-xl' 
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 opacity-70'}
                `}>
                   <span className="text-xs text-slate-400 absolute top-1 left-1 font-mono">[{idx}]</span>
                   <span className="font-bold font-mono text-xl">{val}</span>
                   <span className="text-[10px] text-slate-400 absolute bottom-1 font-mono">0x..{idx*4}</span>
                </div>
              ))}

              {/* Pointer Visual */}
              <div 
                className="absolute -bottom-2 transition-all duration-300 flex flex-col items-center"
                style={{ left: `calc(50% - ${(arrValues.length * 88) / 2}px + ${ptrIndex * 88}px + 32px)` }}
              >
                 <div className="text-blue-500"><ChevronUp size={30} strokeWidth={3} /></div>
                 <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow">ptr</div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-4">
               <button 
                 onClick={() => setPtrIndex(Math.max(0, ptrIndex - 1))}
                 disabled={ptrIndex === 0}
                 className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors font-mono"
               >
                 ptr--
               </button>
               <button 
                 onClick={() => setPtrIndex(Math.min(arrValues.length - 1, ptrIndex + 1))}
                 disabled={ptrIndex === arrValues.length - 1}
                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors font-mono"
               >
                 ptr++
               </button>
            </div>
             <div className="mt-6 p-3 bg-slate-200 dark:bg-slate-800/50 rounded-lg border border-slate-300 dark:border-slate-700 font-mono text-sm text-center" dir="ltr">
              cout &lt;&lt; *ptr; // Outputs: <span className="text-green-600 font-bold">{arrValues[ptrIndex]}</span>
            </div>
          </div>
        )}

        {/* --- MODIFY TAB --- */}
        {tab === 'modify' && (
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              قم بتغيير القيمة باستخدام المؤشر <code className="text-blue-500">*ptr</code> ولاحظ تغير المتغير الأصلي <code className="text-pink-500">x</code>.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="font-mono text-lg">
                 <span className="text-blue-500">*ptr</span> = 
               </div>
               <div className="flex gap-2">
                 <input 
                    type="number" 
                    value={modValue}
                    onChange={(e) => setModValue(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-mono outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 <button 
                    onClick={() => setTargetValue(modValue)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                    title="Execute Assignment"
                 >
                    <Play size={20} fill="currentColor" />
                 </button>
               </div>
            </div>

            <div className="relative inline-block">
               <div className="text-sm font-bold text-slate-500 mb-2">Variable (x) Memory</div>
               <div className={`
                 w-40 h-40 border-4 rounded-2xl flex items-center justify-center text-4xl font-mono font-bold bg-white dark:bg-slate-800 shadow-2xl transition-all duration-500
                 ${targetValue === modValue ? 'border-pink-500 text-pink-600 dark:text-pink-400' : 'border-slate-300 text-slate-400'}
               `}>
                 {targetValue}
               </div>
               <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                  <span className="text-xs text-slate-400 font-mono mb-1">Pointer Access</span>
                  <div className="h-1 w-20 bg-blue-500"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded-full -mt-2 -ml-20"></div>
               </div>
            </div>
            
            <div className="mt-8">
               <button 
                 onClick={() => { setModValue(0); setTargetValue(0); }}
                 className="text-sm text-slate-400 hover:text-slate-600 flex items-center gap-1 mx-auto"
               >
                 <RotateCcw size={14} /> Reset
               </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('basics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setIsDark(!isDark);

  const getIcon = (id: string) => {
    switch (id) {
      case 'basics': return <Calculator size={20} />;
      case 'operators_advanced': return <Zap size={20} />;
      case 'conditions': return <Repeat size={20} />;
      case 'arrays': return <Layers size={20} />;
      case 'pointers': return <MousePointer size={20} />;
      case 'predict': return <AlertCircle size={20} />;
      case 'essay': return <HelpCircle size={20} />;
      case 'compiler': return <Terminal size={20} />;
      case 'college_content': return <School size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  const socialLinks = [
      { icon: Phone, href: "tel:+201141345223", label: "Phone" },
      { icon: MessageCircle, href: "https://wa.me/201141345223", label: "WhatsApp" },
      { icon: Mail, href: "mailto:ayrn194@gmail.com", label: "Email" },
      { icon: Github, href: "https://github.com/kl0l69", label: "GitHub" },
      { icon: Facebook, href: "https://facebook.com/nq703", label: "Facebook" },
      { icon: Instagram, href: "https://instagram.com/kl0l69", label: "Instagram" },
      { icon: Send, href: "https://t.me/nq703", label: "Telegram" },
  ];

  // Filter logic for Search
  const filteredNavItems = useMemo(() => {
    const fixedItems = [
        { id: 'compiler', title: 'مترجم الكود (Compiler)', icon: getIcon('compiler') },
        { id: 'essay', title: 'أسئلة مقالية هامة', icon: getIcon('essay') },
    ];

    let topics = reviewData.map(item => ({ ...item, icon: getIcon(item.id) }));

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      
      // Check if "essay" matches query
      const essayMatch = essayQuestions.some(q => 
          q.question.toLowerCase().includes(lowerQuery) || 
          q.answer.toLowerCase().includes(lowerQuery)
      ) || "أسئلة مقالية".includes(lowerQuery);

      // Filter topics
      const filteredTopics = reviewData.filter(topic => {
        const titleMatch = topic.title.toLowerCase().includes(lowerQuery);
        const snippetMatch = topic.snippets.some(s => 
          s.title.toLowerCase().includes(lowerQuery) || 
          s.code.toLowerCase().includes(lowerQuery)
        );
        return titleMatch || snippetMatch;
      }).map(item => ({ ...item, icon: getIcon(item.id) }));

      // Reconstruct list based on matches
      let result = [];
      
      if ('compiler'.includes(lowerQuery) || 'مترجم'.includes(lowerQuery)) {
           result.push(fixedItems[0]);
      }
      if (essayMatch) {
           result.push(fixedItems[1]);
      }
      
      return [...result, ...filteredTopics];
    }

    return [...fixedItems, ...topics];
  }, [searchQuery]);

  // Automatically switch if active section is hidden by search, but allow keeping it if it exists
  useEffect(() => {
      if (searchQuery && filteredNavItems.length > 0) {
          const exists = filteredNavItems.find(t => t.id === activeSection);
          if (!exists) {
              setActiveSection(filteredNavItems[0].id);
          }
      }
  }, [searchQuery, filteredNavItems, activeSection]);


  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center sticky top-0 z-20 transition-colors duration-300">
          <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">مراجعة C++</h1>
          <div className="flex gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
               {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <aside className={`
          fixed inset-y-0 right-0 z-30 w-72 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out flex flex-col
          md:sticky md:top-0 md:h-screen md:translate-x-0 shadow-xl md:shadow-none
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 hidden md:block shrink-0">
            <div className="flex items-center justify-between gap-3 text-blue-700 dark:text-blue-400 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">مراجعة C++</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">للامتحان النهائي</p>
                </div>
              </div>
              <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative group">
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Search size={18} />
                </div>
                <input 
                    type="text" 
                    placeholder="بحث في المواضيع والأكواد..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all dark:text-slate-200 placeholder:text-slate-400"
                />
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsSidebarOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-right
                  ${activeSection === item.id 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none' 
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400'
                  }
                `}
              >
                {item.icon}
                <span>{item.title}</span>
              </button>
            ))}
            
            {filteredNavItems.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                    لا توجد نتائج للبحث
                </div>
            )}
          </nav>
          
          <div className="p-5 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 shrink-0 transition-colors">
            <div className="text-center text-xs text-slate-400 dark:text-slate-500 font-mono tracking-[0.2em] uppercase mb-4">
                a r s i n e k
            </div>
            <div className="flex justify-center items-center gap-4 flex-wrap px-2">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                        aria-label={link.label}
                    >
                        <link.icon size={18} strokeWidth={2} />
                    </a>
                ))}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/50 z-20 md:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full overflow-x-hidden flex flex-col">
          
          {/* Special View: Compiler */}
          {activeSection === 'compiler' && (
              <div className="h-[80vh] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-colors animate-in fade-in zoom-in duration-300">
                  <iframe 
                    src="https://www.programiz.com/cpp-programming/online-compiler/" 
                    className="w-full h-full border-0"
                    title="C++ Compiler"
                  />
              </div>
          )}

          {/* Special View: Essay Questions */}
          {activeSection === 'essay' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-8 border-b-2 border-purple-100 dark:border-purple-900/50 pb-4">
                      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                          <HelpCircle className="text-purple-600" />
                          أسئلة مقالية ونظرية
                      </h2>
                      <p className="text-slate-500 dark:text-slate-400">اضغط على السؤال لإظهار الإجابة</p>
                  </div>

                  <div className="flex flex-col gap-4">
                      {essayQuestions
                        .filter(q => !searchQuery || q.question.includes(searchQuery) || q.answer.includes(searchQuery))
                        .map((q, idx) => (
                          <EssayCard key={q.id} question={q.question} answer={q.answer} index={idx} />
                      ))}
                  </div>
              </div>
          )}

          {/* Standard Review Topics */}
          {reviewData.map((section) => (
            <div 
              key={section.id} 
              className={`transition-opacity duration-300 ease-in-out ${activeSection === section.id ? 'block opacity-100' : 'hidden opacity-0 h-0 overflow-hidden'}`}
            >
              <div className="mb-8 border-b-2 border-blue-100 dark:border-blue-900/50 pb-4">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{section.title}</h2>
                 <p className="text-slate-500 dark:text-slate-400">مجموعة من الأمثلة البرمجية المشروحة</p>
              </div>

              {/* Interactive Pointer Playground (Only in Pointers section) */}
              {section.id === 'pointers' && <PointerPlayground />}

              {/* Special layout for the 'predict' section extra table */}
              {section.id === 'predict' && (
                <div className="mb-10 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm transition-colors">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 border-b border-yellow-100 dark:border-yellow-800/30 flex items-center gap-2 text-yellow-800 dark:text-yellow-500">
                      <AlertCircle size={20} />
                      <h3 className="font-bold">جدول التوقعات السريع (Snippets)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 text-sm uppercase">
                        <tr>
                          <th className="py-3 px-4 border-b dark:border-slate-700 font-bold">الموضوع</th>
                          <th className="py-3 px-4 border-b dark:border-slate-700 font-bold">الكود (مقتطف)</th>
                          <th className="py-3 px-4 border-b dark:border-slate-700 font-bold">الناتج المتوقع</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {predictionTable.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{row.topic}</td>
                            <td className="py-3 px-4 font-mono text-sm text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-900 rounded m-1 inline-block dir-ltr" dir="ltr">{row.code}</td>
                            <td className="py-3 px-4 text-green-700 dark:text-green-400 font-semibold">{row.result}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {section.snippets.map((snippet) => {
                    const isVisible = !searchQuery || 
                        snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        snippet.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        section.title.toLowerCase().includes(searchQuery.toLowerCase());

                    if (!isVisible) return null;

                    return (
                        <CodeBlock 
                        key={snippet.id}
                        code={snippet.code}
                        title={snippet.title}
                        output={snippet.output}
                        />
                    );
                })}
              </div>
            </div>
          ))}

          {/* Footer */}
          <footer className="mt-auto pt-12 pb-6 text-center border-t border-slate-200 dark:border-slate-800 transition-colors">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Designed with <span className="text-red-500 animate-pulse inline-block">❤️</span> for the students of <br className="sm:hidden" />
              <span className="text-blue-600 dark:text-blue-400 font-bold"> Borg El Arab Technological University</span>.
            </p>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default App;