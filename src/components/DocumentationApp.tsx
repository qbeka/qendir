'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { content, DocItem, QuizQuestion } from '@/lib/content';
import { Search, Copy, Check, Terminal, Book, Code, Hash, Menu, X, Lightbulb, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Quiz Component ---
function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const correct = selectedOption === questions[currentQ].correctAnswer;
    if (correct) setScore(s => s + 1);
    setShowResult(true);

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(c => c + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  if (quizCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 shadow-xl border border-neutral-200 text-center"
      >
        <h3 className="text-2xl font-bold text-neutral-900 mb-2">Quiz Completed!</h3>
        <p className="text-neutral-600 mb-6">You scored {score} out of {questions.length}</p>
        <div className="w-full bg-neutral-100 rounded-full h-4 overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-1000 ease-out" 
            style={{ width: `${(score / questions.length) * 100}%` }} 
          />
        </div>
        <button 
          onClick={() => {
            setQuizCompleted(false);
            setCurrentQ(0);
            setScore(0);
            setSelectedOption(null);
            setShowResult(false);
          }}
          className="mt-8 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Retake Quiz
        </button>
      </motion.div>
    );
  }

  const question = questions[currentQ];

  return (
    <div className="mt-16 pt-16 border-t border-neutral-200">
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <span className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg"><Code size={20} /></span>
        Knowledge Check
      </h2>
      
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-neutral-200 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            Question {currentQ + 1} of {questions.length}
          </span>
          <span className="text-xs font-mono text-neutral-400">Score: {score}</span>
        </div>

        <h3 className="text-lg font-medium text-neutral-900 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((opt, idx) => {
            let btnClass = "border-neutral-200 hover:border-indigo-300 hover:bg-indigo-50";
            if (showResult) {
              if (idx === question.correctAnswer) btnClass = "border-green-500 bg-green-50 text-green-700";
              else if (idx === selectedOption) btnClass = "border-red-500 bg-red-50 text-red-700";
              else btnClass = "border-neutral-200 opacity-50";
            } else if (selectedOption === idx) {
              btnClass = "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center group",
                  btnClass
                )}
              >
                <span>{opt}</span>
                {showResult && idx === question.correctAnswer && <Check size={18} className="text-green-600" />}
                {showResult && idx === selectedOption && idx !== question.correctAnswer && <X size={18} className="text-red-600" />}
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null || showResult}
            className={cn(
              "px-6 py-2 rounded-lg font-medium transition-all",
              selectedOption === null || showResult
                ? "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
            )}
          >
            {showResult ? "Wait..." : "Submit Answer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DocumentationApp() {
  const [selectedId, setSelectedId] = useState<string>(content[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top when selection changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedId]);

  const filteredContent = useMemo(() => {
    if (!searchQuery) return content;
    const lowerQ = searchQuery.toLowerCase();
    return content.filter(item => 
      item.title.toLowerCase().includes(lowerQ) || 
      item.category.toLowerCase().includes(lowerQ) ||
      item.description.toLowerCase().includes(lowerQ)
    );
  }, [searchQuery]);

  const categories = useMemo(() => {
    const cats = new Set(filteredContent.map(item => item.category));
    return Array.from(cats);
  }, [filteredContent]);

  const selectedItem = content.find(item => item.id === selectedId) || content[0];
  const currentIndex = filteredContent.findIndex(item => item.id === selectedId);
  const prevItem = currentIndex > 0 ? filteredContent[currentIndex - 1] : null;
  const nextItem = currentIndex < filteredContent.length - 1 ? filteredContent[currentIndex + 1] : null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CategoryIcon = ({ cat }: { cat: string }) => {
    if (cat.includes('Syntax')) return <Terminal className="w-4 h-4" />;
    if (cat.includes('Pattern')) return <Book className="w-4 h-4" />;
    if (cat.includes('Solved')) return <Code className="w-4 h-4" />;
    return <Hash className="w-4 h-4" />;
  };

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900 font-sans overflow-hidden selection:bg-indigo-500/20 selection:text-indigo-900">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white shadow-lg rounded-full border border-neutral-200"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.div 
        initial={false}
        animate={{ x: isMobileMenuOpen ? 0 : '0%' }}
        className={cn(
          "fixed md:static inset-y-0 left-0 z-40 w-80 bg-white border-r border-neutral-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-bold text-lg tracking-tight text-neutral-900">Qendrim's Directory</h1>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3 pl-3">
                {category}
              </h3>
              <div className="space-y-1">
                {filteredContent
                  .filter(item => item.category === category)
                  .map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedId(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group relative overflow-hidden",
                        selectedId === item.id 
                          ? "bg-neutral-900 text-white font-medium shadow-lg shadow-neutral-900/20" 
                          : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                      )}
                    >
                      <CategoryIcon cat={category} />
                      <span className="truncate relative z-10">{item.title}</span>
                      {selectedId === item.id && (
                        <motion.div 
                          layoutId="active-pill"
                          className="absolute inset-0 bg-neutral-900 z-0 rounded-lg"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 h-full overflow-y-auto bg-neutral-50/50">
        <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Breadcrumb */}
              <div className="mb-8 flex items-center gap-2 text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full w-fit">
                 <span className="opacity-70">{selectedItem.category}</span>
                 <ChevronRight size={12} />
                 <span>{selectedItem.title}</span>
              </div>

              {/* Header */}
              <div className="mb-12 border-b border-neutral-200 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-6">
                  {selectedItem.title}
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-3xl font-light">
                  {selectedItem.description}
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-16">
                {selectedItem.sections.map((section, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: idx * 0.1 }}
                    className="group"
                  >
                    {section.title && (
                      <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
                        {section.title}
                      </h2>
                    )}
                    
                    <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 mb-6 leading-relaxed">
                      <p className="whitespace-pre-wrap">{section.content}</p>
                    </div>

                    {section.code && (
                      <div className="my-8 rounded-2xl overflow-hidden border border-neutral-200 shadow-xl shadow-neutral-200/50 bg-[#1e1e1e]">
                        <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#333]">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-neutral-500 font-mono">{section.codeTitle || 'python'}</span>
                            <button 
                              onClick={() => handleCopy(section.code!)}
                              className="text-neutral-400 hover:text-white transition-colors p-1"
                            >
                              {copiedCode === section.code ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                        <div className="p-6 overflow-x-auto">
                          <pre className="font-mono text-sm leading-relaxed text-neutral-300">
                            <code>{section.code}</code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {section.tip && (
                      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-xl flex gap-4 items-start">
                        <div className="mt-1 bg-indigo-100 p-2 rounded-full text-indigo-600">
                          <Lightbulb size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-indigo-900 mb-1">Pro Tip</h4>
                          <p className="text-indigo-800 text-sm leading-relaxed">
                            {section.tip}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Quiz */}
              {selectedItem.quiz && <Quiz questions={selectedItem.quiz} />}

              {/* Prev/Next Buttons */}
              <div className="mt-20 pt-10 border-t border-neutral-200 grid grid-cols-2 gap-6">
                {prevItem ? (
                  <button 
                    onClick={() => setSelectedId(prevItem.id)}
                    className="group flex flex-col items-start p-6 rounded-xl border border-neutral-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <span className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-hover:text-indigo-600">
                      <ArrowLeft size={14} /> Previous
                    </span>
                    <span className="text-lg font-bold text-neutral-900 group-hover:text-indigo-900">
                      {prevItem.title}
                    </span>
                  </button>
                ) : <div />}

                {nextItem ? (
                  <button 
                    onClick={() => setSelectedId(nextItem.id)}
                    className="group flex flex-col items-end text-right p-6 rounded-xl border border-neutral-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all"
                  >
                    <span className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 group-hover:text-indigo-600">
                      Next <ArrowRight size={14} />
                    </span>
                    <span className="text-lg font-bold text-neutral-900 group-hover:text-indigo-900">
                      {nextItem.title}
                    </span>
                  </button>
                ) : <div />}
              </div>

            </motion.div>
          </AnimatePresence>
          
          <div className="h-32" />
        </div>
      </main>
    </div>
  );
}
