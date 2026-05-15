
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Zap, Shield, Cpu, Github, Twitter, Menu, X, MessageSquare, Settings, Plus, LayoutDashboard, ChevronRight, Send, Check } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard, Button, Eyebrow, Heading, RevealText } from '@/components/ui';

// --- Placeholder Mocks for required lib imports ---
// In a real Megsy environment, these are pre-injected. 
// We simulate them here so the app works standalone.
const useAuth = () => ({ user: { id: 'mock-user-123' }, signIn: () => {}, signOut: () => {} });
const supabase = {
  from: (table: string) => ({
    select: () => ({ order: () => Promise.resolve({ data: [] }) }),
    insert: (data: any) => ({ select: () => ({ single: () => Promise.resolve({ data: { ...data[0], id: 'new-id' } }) }) }),
    eq: () => ({ order: () => Promise.resolve({ data: [] }) }),
  })
};
const chatComplete = async (messages: any[]) => {
  await new Promise(r => setTimeout(r, 1000));
  return { content: `I'm Nova, a simulated AI response to: "${messages[messages.length-1]?.content}". In production, this connects to the real LLM via @/lib/ai.` };
};
const useSEO = (title: string) => { useEffect(() => { document.title = title; }, [title]) };
// ------------------------------------------------

// --- Layouts ---

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/app')) return null;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-4 inset-x-0 mx-auto w-[calc(100%-2rem)] max-w-4xl z-50 transition-all duration-500",
        scrolled ? "py-2 px-3" : "py-4 px-6"
      )}
    >
      <div className="rounded-full bg-chrome-surface backdrop-blur-2xl backdrop-saturate-150 ring-1 ring-chrome-ring shadow-glass flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Nova</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-chrome-muted">
          {[
            ['Features', '/features'],
            ['Intelligence', '/intelligence'],
            ['Pricing', '/pricing'],
          ].map(([label, path]) => (
            <Link key={path} to={path} className={cn("hover:text-white transition-colors", location.pathname === path && "text-white")}>
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/app">
            <Button className="h-9 px-4 text-sm" withArrow>Launch Interface</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

const Footer = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/app')) return null;

  return (
    <footer className="border-t border-white/[0.06] pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <span className="font-display font-semibold text-xl tracking-tight">Nova</span>
            </Link>
            <p className="text-chrome-muted max-w-sm text-balance">
              Building the operating system for artificial thought. Designed with intention, engineered for absolute precision.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-medium mb-6 text-white/50">Platform</h4>
            <ul className="space-y-4 text-sm text-chrome-muted">
              <li><Link to="/features" className="hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link to="/intelligence" className="hover:text-white transition-colors">Neural Architecture</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Tiers</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Developer API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-medium mb-6 text-white/50">Company</h4>
            <ul className="space-y-4 text-sm text-chrome-muted">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
            </ul>
          </div>
        </div>
        
        <div className="text-[clamp(60px,18vw,280px)] font-display font-semibold tracking-[-0.05em] leading-none text-white/[0.03] select-none text-center">
          NOVA
        </div>
        
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-chrome-muted border-t border-white/[0.06] pt-8">
          <p>© 2024 Nova Intelligence Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const MarketingLayout = () => {
  return (
    <div className="min-h-screen relative selection:bg-white/20">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-white opacity-30 blur-[120px] mix-blend-screen"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-[#737373] opacity-20 blur-[140px] mix-blend-screen"
        />
      </div>

      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// --- Pages: Marketing ---

const Home = () => {
  useSEO("Nova | The Operating System for Intelligence");
  
  return (
    <div className="pt-32 pb-16">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center relative px-6">
        <RevealText>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] ring-1 ring-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Nova 4.0 is now live</span>
          </div>
        </RevealText>
        
        <RevealText delay={0.1}>
          <h1 className="text-[clamp(44px,8vw,112px)] leading-[0.95] tracking-[-0.04em] font-display font-medium text-center max-w-5xl mx-auto mb-8">
            Intelligence,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40 italic pr-4">beautifully</span> aligned.
          </h1>
        </RevealText>

        <RevealText delay={0.2}>
          <p className="text-lg md:text-xl text-chrome-muted text-center max-w-2xl mx-auto mb-12 text-balance leading-relaxed">
            Experience reasoning at the speed of thought. A conversational interface engineered from the ground up for clarity, speed, and boundless capability.
          </p>
        </RevealText>

        <RevealText delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Link to="/app">
              <Button className="group h-14 px-8 text-base shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]" withArrow>
                Start interacting
              </Button>
            </Link>
            <Button variant="secondary" className="h-14 px-8 text-base">
              Read the research
            </Button>
          </div>
        </RevealText>

        {/* Hero Mockup */}
        <RevealText delay={0.5}>
          <div className="mt-24 w-full max-w-5xl mx-auto relative group perspective-[2000px]">
            <motion.div 
              className="relative w-full aspect-[16/10] rounded-[32px] bg-black ring-1 ring-white/[0.15] shadow-2xl overflow-hidden"
              whileHover={{ rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              {/* Fake App Chrome */}
              <div className="absolute top-0 inset-x-0 h-12 bg-white/[0.02] border-b border-white/[0.05] flex items-center px-6 gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="absolute inset-0 pt-12 p-8 flex flex-col justify-end bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent">
                <div className="flex items-start gap-4 mb-8">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                   <div className="w-full max-w-md h-24 rounded-2xl bg-white/[0.03] animate-pulse" />
                </div>
                <div className="flex items-start gap-4 flex-row-reverse mb-8">
                   <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                     <Sparkles className="w-4 h-4 text-black" />
                   </div>
                   <div className="w-full max-w-lg h-32 rounded-2xl bg-white/[0.08] backdrop-blur-md ring-1 ring-white/10" />
                </div>
                <div className="h-16 w-full max-w-3xl mx-auto rounded-full bg-white/[0.02] ring-1 ring-white/10 mb-4" />
              </div>

              {/* Specular Sweep */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent z-10 pointer-events-none"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </RevealText>
      </section>

      {/* Value Props */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/[0.06] mt-24">
        <Eyebrow className="mb-6">01. Core Architecture</Eyebrow>
        <Heading className="mb-20">Built to process complexity<br/>with absolute simplicity.</Heading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Zero Latency Synthesis", desc: "Responses stream in real-time with sub-50ms Time To First Token. It feels less like computing and more like thinking." },
            { icon: Brain, title: "Infinite Context Window", desc: "Drop entirely codebases, books, or datasets. Nova remembers references with perfect recall across millions of tokens." },
            { icon: Shield, title: "Enterprise Grade Privacy", desc: "Your data never trains our models. Period. Every conversation is walled garden secure and end-to-end encrypted." }
          ].map((feature, i) => (
            <RevealText key={i} delay={i * 0.1}>
              <GlassCard className="p-8 h-full flex flex-col">
                <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-6 ring-1 ring-white/10">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{feature.title}</h3>
                <p className="text-chrome-muted text-sm leading-relaxed flex-grow">{feature.desc}</p>
              </GlassCard>
            </RevealText>
          ))}
        </div>
      </section>

      {/* Deep Feature Breakdown Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <Eyebrow className="mb-6">02. Capabilities</Eyebrow>
        <Heading className="mb-20">A multi-modal engine<br/>for modern workflows.</Heading>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
          {/* Bento Box 1 - Wide */}
          <GlassCard className="md:col-span-8 p-10 overflow-hidden relative flex flex-col justify-between group">
            <div className="relative z-10 w-full max-w-md">
              <h3 className="text-2xl font-display font-medium mb-3">Fluid reasoning.</h3>
              <p className="text-chrome-muted text-sm">Nova adapts its tone, depth, and structural output on the fly based on subtle cues in your prompt.</p>
            </div>
            {/* Visual Hook */}
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.1),transparent_70%)]" />
            <motion.div 
              className="absolute -right-20 -bottom-20 w-80 h-80 border-[1px] border-white/20 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-60 h-60 border-[1px] border-white/10 rounded-full" />
            </motion.div>
          </GlassCard>

          {/* Bento Box 2 - Tall */}
          <GlassCard className="md:col-span-4 md:row-span-2 p-10 flex flex-col group overflow-hidden relative">
            <h3 className="text-2xl font-display font-medium mb-3">Code synthesis.</h3>
            <p className="text-chrome-muted text-sm">Writes, refactors, and explains complex algorithms across 40+ programming languages instantly.</p>
            
            <div className="mt-8 flex-grow rounded-xl bg-black ring-1 ring-white/10 p-4 font-mono text-[10px] text-white/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black to-transparent z-10" />
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: -100 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="space-y-2 opacity-70"
              >
                <p><span className="text-blue-400">const</span> <span className="text-yellow-200">synthesize</span> = <span className="text-blue-400">async</span> (data: Input) =&#62; &#123;</p>
                <p className="pl-4"><span className="text-blue-400">const</span> context = <span className="text-blue-400">await</span> memory.fetch(data.id);</p>
                <p className="pl-4"><span className="text-purple-400">return</span> transformer.process(&#123;</p>
                <p className="pl-8">weights: context.bias,</p>
                <p className="pl-8">stream: <span className="text-orange-400">true</span></p>
                <p className="pl-4">&#125;);</p>
                <p>&#125;;</p>
                 <p className="mt-4"><span className="text-green-400">// Automatic refactoring complete</span></p>
                 <p><span className="text-blue-400">export default</span> synthesize;</p>
              </motion.div>
            </div>
          </GlassCard>

          {/* Bento Box 3 - Square */}
          <GlassCard className="md:col-span-4 p-10 flex flex-col justify-end relative overflow-hidden group">
            <Cpu className="absolute top-10 right-10 w-8 h-8 text-white/20 group-hover:text-white transition-colors duration-500" />
            <h3 className="text-2xl font-display font-medium mb-3">Custom Instructions.</h3>
            <p className="text-chrome-muted text-sm">Mold the AI's persona uniquely to your preferences.</p>
          </GlassCard>

          {/* Bento Box 4 - Square */}
          <GlassCard className="md:col-span-4 p-10 flex flex-col justify-end bg-white/[0.02]">
            <h3 className="text-2xl font-display font-medium mb-3">Seamless integration.</h3>
            <p className="text-chrome-muted text-sm">Connects to your calendar, notes, and codebase securely.</p>
          </GlassCard>
        </div>
      </section>

      {/* Metric/Social Proof */}
      <section className="py-32 px-6 border-y border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {[
             { label: "Queries Processed", val: "2.4B+" },
             { label: "Avg Response Time", val: "48ms" },
             { label: "Parameters", val: "1.2T" },
             { label: "Uptime", val: "99.99%" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-[clamp(40px,5vw,64px)] font-display font-medium leading-none mb-2">{stat.val}</div>
              <div className="text-sm font-medium tracking-wide text-chrome-muted uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};


const Features = () => {
  useSEO("Features | Nova Intelligence");
  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <RevealText>
        <Heading className="mb-6">Everything you need.<br/>Nothing you don't.</Heading>
        <p className="text-xl text-chrome-muted max-w-2xl mb-24">A meticulous deep dive into the engineering decisions that make Nova the most powerful conversational interface ever built.</p>
      </RevealText>

      <div className="space-y-32">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-6 ring-1 ring-white/10">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl font-display font-medium mb-4">Semantic Memory Graph.</h3>
            <p className="text-chrome-muted text-base leading-relaxed mb-6">
              Unlike traditional models that forget what was said yesterday, Nova builds a personal, encrypted vector database of your interactions. It connects concepts across weeks of conversation, recalling exact code snippets or project details organically.
            </p>
            <ul className="space-y-4">
              {['Auto-summarization of long threads', 'Context injection pre-prompting', 'Cross-conversation referencing'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-white/80">
                  <Check className="w-4 h-4 text-white/40" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <GlassCard className="aspect-square flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]">
            {/* Abstract visual */}
            <div className="relative w-full h-full flex items-center justify-center">
               <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute w-64 h-64 border border-dashed border-white/20 rounded-full" />
               <motion.div animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 border border-white/10 rounded-full" />
               <div className="w-32 h-32 bg-white/5 rounded-full backdrop-blur-xl ring-1 ring-white/20 shadow-[0_0_60px_rgba(255,255,255,0.1)] flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,1)] animate-pulse" />
               </div>
            </div>
          </GlassCard>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
           <GlassCard className="aspect-square p-8 overflow-hidden relative order-2 md:order-1">
             <div className="absolute inset-0 bg-black/50 z-10 hidden" />
             <div className="h-full flex flex-col gap-4">
                <div className="self-end max-w-[80%] p-4 rounded-2xl rounded-tr-sm bg-white/10 text-xs text-white/80 line-clamp-2">Can you convert this python script into a highly optimized Rust CLI?</div>
                <div className="self-start max-w-[80%] p-4 rounded-2xl rounded-tl-sm bg-white/5 text-xs text-chrome-muted w-full">
                  <div className="h-2 w-20 bg-white/20 rounded mb-2"></div>
                  <div className="h-2 w-full bg-white/10 rounded mb-1"></div>
                  <div className="h-2 w-full bg-white/10 rounded mb-1"></div>
                  <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                  <div className="mt-4 h-24 bg-black/50 rounded ring-1 ring-white/10 w-full overflow-hidden">
                    <motion.div className="w-[10%] h-full bg-white/5" animate={{ width: '100%' }} transition={{ duration: 2, repeat: Infinity }} />
                  </div>
                </div>
             </div>
          </GlassCard>

          <div className="order-1 md:order-2">
            <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center mb-6 ring-1 ring-white/10">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl font-display font-medium mb-4">Native Execution Environment.</h3>
            <p className="text-chrome-muted text-base leading-relaxed mb-6">
              Nova doesn't just write code; it tests it. By utilizing isolated WebAssembly sandboxes, it runs Python, JavaScript, and Rust snippets directly within the chat interface, verifying output before responding.
            </p>
             <Link to="/app">
              <Button variant="secondary" className="mt-4" withArrow>Try it live</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Pricing = () => {
  useSEO("Pricing | Nova Intelligence");
  return (
    <div className="pt-40 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <Heading className="mb-6">Transparent access.<br/>Uncapped potential.</Heading>
        <p className="text-xl text-chrome-muted">Start for free. Upgrade when you need higher rate limits and enterprise features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Tier 1 */}
        <GlassCard className="p-8 flex flex-col hover:shadow-none" hover={false}>
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-2">Base</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-medium">$0</span>
              <span className="text-sm text-chrome-muted">/mo</span>
            </div>
          </div>
          <p className="text-sm text-chrome-muted mb-8 h-10">Essential intelligence for everyday tasks and exploration.</p>
          <Button variant="secondary" className="w-full mb-8">Start Free</Button>
          <ul className="space-y-4 text-sm text-white/80 flex-grow">
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> Nova-Flash model</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> standard response speed</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> 100 queries / day</li>
          </ul>
        </GlassCard>

        {/* Tier 2 */}
        <GlassCard className="p-8 flex flex-col relative ring-white/30 bg-white/[0.06] scale-[1.02]" hover={false}>
          <div className="absolute -top-4 inset-x-0 flex justify-center">
            <span className="bg-white text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Recommended</span>
          </div>
          <div className="mb-8">
             <h4 className="text-lg font-medium mb-2 flex items-center gap-2">Pro <Sparkles className="w-3 h-3 text-white/60" /></h4>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-medium">$20</span>
              <span className="text-sm text-chrome-muted">/mo</span>
            </div>
          </div>
          <p className="text-sm text-chrome-muted mb-8 h-10">Advanced capabilities for professionals demanding top performance.</p>
          <Button variant="primary" className="w-full mb-8">Upgrade to Pro</Button>
          <ul className="space-y-4 text-sm text-white/80 flex-grow">
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white" /> Nova-Omni model (Priority)</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white" /> 5x response speed</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white" /> Infinite context window</li>
             <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white" /> Native code execution</li>
          </ul>
        </GlassCard>

        {/* Tier 3 */}
        <GlassCard className="p-8 flex flex-col hover:shadow-none" hover={false}>
          <div className="mb-8">
            <h4 className="text-lg font-medium mb-2">Team</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-display font-medium">$45</span>
              <span className="text-sm text-chrome-muted">/user/mo</span>
            </div>
          </div>
          <p className="text-sm text-chrome-muted mb-8 h-10">Custom deployment and strict privacy guarantees for organizations.</p>
          <Button variant="secondary" className="w-full mb-8">Contact Sales</Button>
          <ul className="space-y-4 text-sm text-white/80 flex-grow">
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> Everything in Pro</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> SOC2 Compliance</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> Zero Data Retention</li>
            <li className="flex items-center gap-3"><Check className="w-4 h-4 text-white/40" /> Single Sign-On (SSO)</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
};


// --- Pages: Application ---

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
};

type Conversation = {
  id: string;
  title: string;
  updated_at: string;
};

const ChatAppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock fetching conversations
  useEffect(() => {
    setConversations([
      { id: '1', title: 'React Performance Tips', updated_at: new Date().toISOString() },
      { id: '2', title: 'Rust Sandbox Explainer', updated_at: new Date(Date.now() - 86400000).toISOString() },
    ]);
  }, []);

  const handleNewChat = () => {
    navigate('/app');
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden selection:bg-white/20 font-sans">
      
      {/* Sidebar Desktop */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-shrink-0 border-r border-white/[0.06] bg-black relative flex flex-col z-20"
          >
            <div className="p-4 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 px-2">
                <Sparkles className="w-4 h-4" />
                <span className="font-display font-medium text-sm">Nova</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors">
                <LayoutDashboard className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 mb-4 mt-2">
               <button 
                  onClick={handleNewChat}
                  className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/15 transition-colors px-3 py-2.5 rounded-xl text-sm font-medium"
                >
                  <Plus className="w-4 h-4" /> New Chat
                </button>
            </div>

            <div className="flex-grow overflow-y-auto px-3 space-y-1 mt-4">
              <div className="text-xs uppercase tracking-wider text-white/30 font-medium px-3 mb-2">Recent</div>
              {conversations.map(conv => (
                 <Link 
                  key={conv.id} 
                  to={`/app/c/${conv.id}`}
                  className="block px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors line-clamp-1 truncate"
                >
                  {conv.title}
                </Link>
              ))}
            </div>

            <div className="p-4 border-t border-white/[0.06] mt-auto">
             <Link to="/app/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">
                <Settings className="w-4 h-4" /> Settings
              </Link>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
         {!sidebarOpen && (
          <div className="absolute top-4 left-4 z-50">
            <button onClick={() => setSidebarOpen(true)} className="p-2 bg-white/5 backdrop-blur-md rounded-lg text-white/50 hover:text-white ring-1 ring-white/10 shadow-lg">
              <LayoutDashboard className="w-4 h-4" />
            </button>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Model Selector State
  const [model, setModel] = useState('nova-omni');
  const [showModelMenu, setShowModelMenu] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Fake delay/call equivalent to standard LLM flow
      const response = await chatComplete([...messages, userMessage]);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        created_at: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      // fallback mock
      const failMessage: Message = {
        id: 'fail', role: 'assistant', content: 'Connection to inference node degraded.', created_at: new Date().toISOString()
      };
       setMessages(prev => [...prev, failMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-black relative">
      {/* Top Bar - Model Picker */}
      <header className="h-14 flex items-center justify-center border-b border-transparent w-full z-10 sticky top-0 bg-gradient-to-b from-black to-transparent">
        <div className="relative">
          <button 
            onClick={() => setShowModelMenu(!showModelMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium text-white/80"
          >
            {model === 'nova-omni' ? 'Nova Omni' : 'Nova Flash'} 
            <ChevronRight className={cn("w-3 h-3 text-white/40 transition-transform", showModelMenu && "rotate-90")} />
          </button>
          
          {showModelMenu && (
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-48 bg-[#111111] border border-white/10 shadow-2xl rounded-xl p-1 z-50">
              <button onClick={() => { setModel('nova-omni'); setShowModelMenu(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg flex items-center justify-between">
                <span>Nova Omni <span className="text-[10px] text-white/40 ml-1">Pro</span></span>
                {model === 'nova-omni' && <Check className="w-3 h-3 text-white" />}
              </button>
              <button onClick={() => { setModel('nova-flash'); setShowModelMenu(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded-lg flex items-center justify-between">
                <span>Nova Flash</span>
                {model === 'nova-flash' && <Check className="w-3 h-3 text-white" />}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 w-full">
        <div className="max-w-3xl mx-auto py-8 flex flex-col min-h-full">
          {messages.length === 0 ? (
            <div className="my-auto flex flex-col items-center justify-center text-center pb-20">
               <div className="w-16 h-16 rounded-3xl bg-white/[0.02] ring-1 ring-white/10 shadow-glass flex items-center justify-center mb-6">
                 <Sparkles className="w-6 h-6 text-white" />
               </div>
               <h2 className="text-2xl font-display font-medium mb-2">How can I help you today?</h2>
               <p className="text-sm text-chrome-muted max-w-sm mb-8">Nova Omni is ready to code, analyze, or generate anything you need.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
                 {['Write a script to migrate my database', 'Explain quantum computing simply', 'Help me debug this React component', 'Draft an email to my team'].map(prompt => (
                   <button 
                    key={prompt}
                    onClick={() => { setInput(prompt); }}
                    className="p-3 text-left text-xs text-chrome-muted hover:text-white bg-white/[0.02] hover:bg-white/[0.05] ring-1 ring-white/5 hover:ring-white/15 rounded-xl transition-all"
                   >
                     {prompt}
                   </button>
                 ))}
               </div>
            </div>
          ) : (
             <div className="space-y-8 pb-32">
                {messages.map((m) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={cn("flex gap-4 w-full group", m.role === 'user' ? 'flex-row-reverse' : '')}
                  >
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1", 
                      m.role === 'user' ? "bg-white/10 text-xs font-medium" : "bg-white text-black"
                    )}>
                      {m.role === 'user' ? 'U' : <Sparkles className="w-4 h-4" />}
                    </div>
                    
                    <div className={cn("flex flex-col gap-1 max-w-[85%]", m.role === 'user' ? 'items-end' : 'items-start')}>
                      <div className="text-xs text-white/30 font-medium px-1">
                        {m.role === 'user' ? 'You' : 'Nova'}
                      </div>
                      <div className={cn(
                        "text-[15px] leading-relaxed px-5 py-3.5",
                        m.role === 'user' 
                          ? "bg-white/10 rounded-2xl rounded-tr-sm text-white" 
                          : "text-white/80 prose prose-invert prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:ring-1 prose-pre:ring-white/10 prose-pre:rounded-xl"
                      )}>
                        {m.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {loading && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 w-full">
                     <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-4 h-4" />
                     </div>
                     <div className="flex flex-col gap-1">
                       <div className="text-xs text-white/30 font-medium px-1">Nova is thinking</div>
                       <div className="px-5 py-3.5 flex items-center gap-1.5 h-12">
                         <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                         <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                         <motion.div className="w-1.5 h-1.5 bg-white/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                       </div>
                     </div>
                   </motion.div>
                )}
                <div ref={messagesEndRef} />
             </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 w-full max-w-3xl mx-auto absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-t from-black via-black to-transparent pt-10">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end w-full rounded-[24px] bg-white/[0.05] ring-1 ring-white/15 focus-within:ring-white/30 backdrop-blur-xl transition-all shadow-glass"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Nova..."
            className="w-full max-h-[200px] bg-transparent border-0 resize-none px-6 py-4 text-[15px] focus:ring-0 focus:outline-none placeholder:text-white/30 text-white min-h-[56px]"
            rows={1}
            style={{
               height: 'auto',
               // extremely basic auto-resize simulator
               minHeight: input.length > 50 ? '80px' : '56px'
            }}
          />
          <button 
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 bottom-2 p-2 rounded-xl bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:hover:bg-white transition-opacity h-10 w-10 flex items-center justify-center"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>
        <div className="text-center mt-2 text-[10px] text-white/30">
          Nova can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
};


const AppSettings = () => {
  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-medium mb-8">Settings</h1>
        
        <div className="space-y-12">
          {/* Profile */}
          <section>
            <h3 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">Account</h3>
            <GlassCard className="p-6 divide-y divide-white/5">
              <div className="pb-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Email</div>
                  <div className="text-sm text-white/50">user@example.com</div>
                </div>
                <Button variant="secondary" className="h-8 px-4 text-xs">Edit</Button>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Subscription</div>
                  <div className="text-sm text-white/50">Nova Pro (Active)</div>
                </div>
                <Button variant="secondary" className="h-8 px-4 text-xs">Manage</Button>
              </div>
            </GlassCard>
          </section>

          {/* Preferences */}
          <section>
             <h3 className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wider">App Preferences</h3>
             <GlassCard className="p-6 divide-y divide-white/5">
              <div className="pb-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Theme</div>
                  <div className="text-sm text-white/50">Chrome Dark</div>
                </div>
                <select className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white outline-none">
                  <option>System Default</option>
                  <option>Chrome Dark</option>
                  <option>Light Glass</option>
                </select>
              </div>
              <div className="pt-4 flex justify-between items-center">
                <div>
                  <div className="font-medium text-white">Custom Instructions</div>
                  <div className="text-sm text-white/50">Modify how Nova responds to you.</div>
                </div>
                 <Button variant="secondary" className="h-8 px-4 text-xs">Configure</Button>
              </div>
            </GlassCard>
          </section>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Site */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/intelligence" element={<Features />} /> {/* Redirecting to features for simplicity in demo */}
          <Route path="/pricing" element={<Pricing />} />
        </Route>

        {/* Application Interface */}
        <Route path="/app" element={<ChatAppLayout />}>
          <Route index element={<ChatInterface />} />
          <Route path="c/:id" element={<ChatInterface />} />
          <Route path="settings" element={<AppSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
