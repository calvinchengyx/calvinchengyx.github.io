import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; // Requires: npm install react-markdown
// import remarkGfm from 'remark-gfm';      // Uncomment locally for tables/strikethrough: npm install remark-gfm
import { 
  Github, 
  Linkedin, 
  Mail, 
  FileText, 
  BookOpen, 
  Award, 
  Users, 
  Menu, 
  X, 
  Video,
  Code,
  Download,
  Home,
  Briefcase,
  GraduationCap,
  Landmark,
  PenTool,   // Added for Blog
  ArrowLeft, // Added for Blog navigation
  Calendar   // Added for Blog date
} from 'lucide-react';

// --- Types & Interfaces ---

interface NewsItem {
  date: string;
  content: string;
}

interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  links: {
    paper?: string;
    code?: string;
    video?: string;
  };
  status?: string; 
}

interface TeachingItem {
  course: string;
  role: string;
  institution: string;
  period: string;
  description: string;
  links?: {
    materials?: string;
  };
}

interface AwardItem {
  title: string;
  organization: string;
  year: string;
}

// New Interface for Blog Posts
interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  filepath: string;
}

interface SidebarProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- Mock Data / Real Content ---

const NEWS_DATA: NewsItem[] = [
  { date: "Dec 10 2025", content: "Started new role as Research Lead at Misinformation Group FinAI" },
  { date: "Dec 4 2025", content: "Passed Viva!" },
  { date: "Nov 9 2025", content: "Presented my narrative detection work at CODI workshop EMNLP 2025 in Suzhou China" },
  { date: "Nov 9 2025", content: "Joined the ICA26 Hackathon organization team for the preconference in Cape Town in 2026!" },
  { date: "July 10 2025", content: "Presenting my thesis last empirical chapter at the 75th ICA in Denver (First student paper in Computational Methods Division)." },
  { date: "May 1 2025", content: "Started my new role as Research Assistant at OII tracking LLM influence." },
  { date: "Jan 2025", content: "Started my new role as Research Lead at the Oxford Computational Political Science Group." },
];

const PUBLICATIONS_DATA: Publication[] = [
  {
    title: "Beyond English: Evaluating Automated Measurement of Moral Framing in Non-English Discourse with a Chinese Case Study",
    authors: "Cheng, C., & Hale, S. A.",
    venue: "Proceedings of the International AAAI Conference on Web and Social Media (ICWSM)",
    year: "2026",
    status: "Forthcoming",
    links: { paper: "https://arxiv.org/abs/2502.02451" }
  },
  {
    title: "Lost in translation: using global fact-checks to measure multilingual misinformation prevalence, spread, and evolution",
    authors: "Quelle, D., Cheng, C. Y., Bovet, A., & Hale, S. A.",
    venue: "EPJ Data Science, 14(1), 22",
    year: "2025",
    links: { paper: "https://link.springer.com/article/10.1140/epjds/s13688-025-00520-6" }
  },
  {
    title: "Diasporic citizen journalism: Exploring the discussion on the 2022 blank paper protests in the Chinese Twitter community",
    authors: "Zeng, J., & Cheng, C. Y.",
    venue: "Journalism",
    year: "2024",
    links: { paper: "https://journals.sagepub.com/doi/10.1177/14648849241250191" }
  },
  {
    title: "C-MFD 2.0: Developing a Chinese Moral Foundation Dictionary",
    authors: "Cheng, C. Y., & Zhang, W.",
    venue: "Computational Communication Research, 5(2)",
    year: "2023",
    links: { paper: "https://journal.computationalcommunication.org/article/view/4776" }
  },
  {
    title: "Authority-led conspiracy theories in China during the COVID-19 pandemic",
    authors: "Cheng, C. Y., Zhang, W. J., & Zhang, Q.",
    venue: "Convergence, 28(4)",
    year: "2022",
    links: { paper: "https://journals.sagepub.com/doi/10.1177/13548565221102592" }
  },
];

const TEACHING_DATA: TeachingItem[] = [
  {
    course: "Computational Social Science in Political Communication with Python",
    role: "Graduate Lecturer",
    institution: "Brawijaya University",
    period: "2024",
    description: "Designed and taught a computational text analysis course featuring hands-on projects on sentiment analysis, word embeddings, and LLMs.",
    links: {materials: "https://docs.google.com/presentation/d/1npwXKyaNKQCWpme26fAXcmWOrRfqvjNN/edit?usp=sharing&ouid=114849464238842402590&rtpof=true&sd=true" }
  },
  {
    course: "Fundamental Social Data Science",
    role: "Graduate Teaching Assistant",
    institution: "Oxford Internet Institute",
    period: "2023 - 2024",
    description: "Assisted lecturers in guiding students through critical assessments of research methods and theories in computational social science.",
    links: { materials: "https://www.oii.ox.ac.uk/study/courses/data-and-society-1" }
  },
  {
    course: "Computational Propaganda; AI & Society; AI & Governance; AI Ethics",
    role: "Undergraduate Tutor",
    institution: "Colleges at University of Oxford",
    period: "2022 - Present",
    description: "Tutor for St Catherine's College and other programs. Designed syllabi incorporating theoretical foundations and research design methods."
  }
];

const AWARD_DATA: AwardItem[] = [
  { title: "Great Britain China Educational Trust Student Award", organization: "GB China Educational Trust", year: "2025" },
  { title: "Stanford House Tutor Research Grant", organization: "Stanford House Oxford", year: "2025" },
  { title: "St Cross College Travel & Research Grant", organization: "St Cross College", year: "2021-2024" },
  { title: "Alan Turing Institute & DSO National Laboratories Fund", organization: "Alan Turing Institute", year: "2023 - 2025" },
  { title: "Dieter Schwarz Foundation Fellowship on AI Government and Policy", organization: "Dieter Schwarz Foundation", year: "2022" },
  { title: "Simon Li Scholarship", organization: "China Oxford Scholarship Fund", year: "2021" },
  { title: "Postgraduate Scholarship", organization: "Chinese University of Hong Kong", year: "2019 - 2021" },
  { title: "Second Undergraduate Scholarship", organization: "University of International Business and Economics", year: "2011 - 2014" },
];

// --- Sub-Components ---

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'research', label: 'Research', icon: <BookOpen size={18} /> },
    { id: 'teaching', label: 'Teaching', icon: <Users size={18} /> },
    { id: 'service', label: 'Service', icon: <Briefcase size={18} /> },
    { id: 'award', label: 'Awards', icon: <Award size={18} /> },
    { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
    { id: 'blog', label: 'Blog', icon: <PenTool size={18} /> }, // Added Blog Item

  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center justify-between px-6">
        <span className="font-bold text-xl">Calvin Yixiang Cheng</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full bg-slate-50 border-r border-slate-200 z-40 transition-transform duration-300 ease-in-out
        w-64 pt-20 md:pt-0 md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Logo / Name Area (Desktop) */}
          <div className="hidden md:block mb-10 mt-4">
            <h1 className="text-2xl font-bold text-slate-900">Calvin Yixiang Cheng 程一祥</h1>
            <p className="text-sm text-slate-500">DPhil @ Oxford Internet Institute</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-200'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer Social Links */}
          <div className="mt-auto pt-6 border-t border-slate-200">
             <div className="flex justify-center space-x-4">
                <a href="https://scholar.google.com/citations?user=WRQAMdgAAAAJ&hl=en" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900" title="Google Scholar"><GraduationCap size={20}/></a>
                <a href="https://www.oii.ox.ac.uk/people/profiles/calvin-cheng/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900" title="OII Profile"><Landmark size={20}/></a>
                <a href="https://github.com/calvinchengyx" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900" title="GitHub"><Github size={20}/></a>
                <a href="https://www.linkedin.com/in/calvin-yixiang-cheng-1aab24a0/" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900" title="LinkedIn"><Linkedin size={20}/></a>
             </div>
             <p className="text-xs text-center text-slate-400 mt-4">© 2025 Calvin Cheng</p>
          </div>
        </div>
      </div>
    </>
  );
};

const HomeSection = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 animate-fade-in">
    {/* Left Column: Profile Card */}
    <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-48 h-48 bg-slate-200 rounded-full mb-6 overflow-hidden border-4 border-white shadow-lg">
           <img 
             src="calvin_linkedin.jpg" 
             alt="Calvin Cheng" 
             className="w-full h-full object-cover"
             onError={(e) => {
               (e.target as HTMLImageElement).src = "https://www.oii.ox.ac.uk/wp-content/uploads/2021/10/Calvin-Cheng-2021.jpg";
             }}
           />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Calvin Yixiang Cheng</h2>
        <p className="text-blue-600 font-medium mb-4">DPhil in Social Data Science</p>
        
        <div className="w-full space-y-3 mb-2">
            <div className="flex items-center justify-center space-x-2 text-slate-600 text-sm">
                <Mail size={16} />
                <span>calvin.cheng [at] oii.ox.ac.uk</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-600 text-sm">
                 <span className="font-semibold">Location:</span>
                 <span>Oxford, United Kingdom</span>
            </div>
        </div>
      </div>
    </div>

    {/* Right Column: Bio & News */}
    <div className="lg:col-span-8 space-y-8">
      {/* Bio Section */}
      <section>
        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-4">About Me</h3>
        <div className="prose prose-slate max-w-none text-slate-700">
          <p className="mb-4">
            Hello! Welcome to my personal website. My name's Calvin Yixiang Cheng, and I am a DPhil candidate in Social Data Science at the Oxford Internet Institute, University of Oxford. My expertise is in computational social science, where my academic passion is to achieve a more informed public by understanding how artifical intelligience and digital technologies shape people's belief through narratives. 
          </p>
          <p className="mb-4">
            My doctoral thesis, titled <em>"The Persistence of Online Conspiracy Theories: Sociopsychological Drivers, Language Mutations, and Cross-Platform Narratives,"</em> investigates 
            how misleading narratives persist, mutate and spread across media platforms and language barriers. I employ a wide range of computational methods including Natural Language Processing (NLP), Large Language Models (LLMs), machine learning, statistical modelling, and experiments.
          </p>
          <p>
             My research interests broadly lie at the intersection of AI, political communication, and narrative studies. I am currently working on three strands of projects: (1) Strategic narrative analysis and persuasion - how AI shape the classic strategic narrative theory and impact people's political beliefs and public policy; (2) AI-assisted text analysis - evaluate the methodological validity of using AI in deductive annotation tasks in social science research; (3) AI's impact on cognition - how AI shapes the cognitive capabilities of human in communication, particulalry on the cognitive offloading. 
          </p>
          <p>   
            <span className="text-orange-600 font-semibold"> I am currently on the job market and actively seeking academic research opportunities beginning in mid 2026. Please feel free to get in touch with any inquiries or collaboration ideas if there is mutual interest.</span>
          </p>       
        </div>
      </section>

      {/* News Section */}
      <section>
        <h3 className="text-xl font-bold text-slate-900 border-l-4 border-blue-600 pl-3 mb-4">News Updates</h3>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="max-h-80 overflow-y-auto custom-scrollbar">
            {NEWS_DATA.map((news, idx) => (
              <div key={idx} className="flex px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <span className="w-24 flex-shrink-0 text-sm font-bold text-blue-600 pt-1">{news.date}</span>
                <span className="text-slate-700 text-sm leading-relaxed">{news.content}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  </div>
);

// --- NEW COMPONENT: BLOG SECTION ---
const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch the Index of Posts
  useEffect(() => {
    fetch('/blog/index.json')
      .then(res => {
        if (!res.ok) throw new Error("Failed to load blog index");
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Could not load blog posts. Please ensure /public/blog/index.json exists.");
        setLoading(false);
      });
  }, []);

  // 2. Fetch specific article content
  const handleReadPost = (filepath: string) => {
    setLoading(true);
    fetch(`/blog/${filepath}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load post");
        return res.text();
      })
      .then(text => {
        setContent(text);
        setSelectedPost(filepath);
        setLoading(false);
        window.scrollTo(0, 0); // Scroll to top of page
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading && posts.length === 0) return <div className="p-10 text-center text-slate-500">Loading articles...</div>;

  // View 1: Single Post Reading Mode
  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <button 
          onClick={() => { setSelectedPost(null); setContent(''); }}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Articles
        </button>
        
        {loading ? (
           <div className="p-10 text-center text-slate-500">Loading post content...</div>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-sm">
             <article className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-a:text-blue-600 prose-code:text-blue-600 prose-pre:bg-slate-100 prose-pre:text-slate-800">
               {/* Use ReactMarkdown to render the content */}
               {/* Locally: you can add remarkPlugins={[remarkGfm]} to ReactMarkdown for tables support */}
               <ReactMarkdown>{content}</ReactMarkdown>
             </article>
          </div>
        )}
      </div>
    );
  }

  // View 2: List of Posts
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Blog & Insights</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => handleReadPost(post.filepath)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <span className="flex items-center text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
                <Calendar size={12} className="mr-1"/> {post.date}
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">{post.summary}</p>
            <div className="flex items-center text-blue-600 text-sm font-medium">
              Read Article <ArrowLeft size={14} className="ml-1 rotate-180" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResearchSection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Selected Publications</h2>
    <div className="space-y-8">
      {PUBLICATIONS_DATA.map((pub, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-4">
          
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{pub.title}</h3>
            <p className="text-slate-700 mb-1" dangerouslySetInnerHTML={{ 
              __html: pub.authors.replace("Cheng, C.", "<strong>Cheng, C.</strong>").replace("Cheng, C. Y.", "<strong>Cheng, C. Y.</strong>") 
            }} />
            <p className="text-slate-500 text-sm italic mb-3">
              {pub.venue}, {pub.year} {pub.status && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2 not-italic font-medium">{pub.status}</span>}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {pub.links.paper && (
                <a href={pub.links.paper} className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                  <FileText size={14} /> <span>Paper</span>
                </a>
              )}
              {pub.links.code && (
                <a href={pub.links.code} className="inline-flex items-center space-x-1 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors">
                  <Code size={14} /> <span>Code</span>
                </a>
              )}
              {pub.links.video && (
                <a href={pub.links.video} className="inline-flex items-center space-x-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors">
                  <Video size={14} /> <span>Video</span>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TeachingSection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Teaching Experience</h2>
    <div className="space-y-8">
      {TEACHING_DATA.map((item, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
            <div>
               <h3 className="text-lg font-bold text-slate-900">{item.course}</h3>
               <p className="text-blue-600 font-medium">{item.role}</p>
            </div>
            <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">{item.period}</span>
          </div>
          <p className="text-slate-500 text-sm mb-3 italic">{item.institution}</p>
          <p className="text-slate-700 leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const ServiceSection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Professional Service</h2>
    
    <div className="space-y-10">
      
      {/* Reviewer Section - Real Content */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Reviewing
        </h3>
        <ul className="list-disc list-outside ml-5 space-y-2 text-slate-700 leading-relaxed">
          <li>
            <strong className="text-slate-900">Conferences:</strong> ICWSM, ICA, IC²S², AEJMC, CVPR (2023, 2024), ICCV (2023), NeurIPS.
          </li>
          <li>
            <strong className="text-slate-900">Journals:</strong> Journal of Information Technology & Politics, Nature's Humanities and Social Science Communication, Convergence, Chinese Journal of Communication.
          </li>
        </ul>
      </section>

      {/* Organization Section */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Leadership & Organization
        </h3>
        <ul className="list-disc list-outside ml-5 space-y-2 text-slate-700 leading-relaxed">
           <li>
            <strong className="text-slate-900">Research Lead</strong>, Oxford Computational Political Science Group (2025 - Present)
            <br/><span className="text-slate-600 text-sm">Leading a five-member research team on moral contagion theory; supervising graduate students.</span>
          </li>
          <li>
            <strong className="text-slate-900">Project Manager</strong>, Journalism and Media Study Center, HKU (2016)
          </li>
        </ul>
      </section>
    </div>
  </div>
);

const AwardSection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Honors & Grants</h2>
    <ul className="space-y-4">
      {AWARD_DATA.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <div className="flex-shrink-0 mt-1">
             <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4"></div>
          </div>
          <div className="flex-1 border-b border-slate-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <span className="text-lg font-semibold text-slate-900">{item.title}</span>
              <span className="text-sm font-mono text-slate-500">{item.year}</span>
            </div>
            <span className="text-slate-600 block mt-1">{item.organization}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const ResumeSection = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-slate-200 gap-4">
        <h2 className="text-3xl font-bold text-slate-900">Resume / CV</h2>
        
        <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                <Download size={16} /> PDF
            </button>
        </div>
      </div>
      
      {/* Resume Preview Paper Effect */}
      <div className="bg-white p-8 md:p-12 shadow-md border border-slate-200 min-h-[800px] mx-auto max-w-[850px] animate-fade-in text-slate-900">
        
        {/* --- ACADEMIC CV CONTENT --- */}
        <div className="text-sm leading-relaxed">(
            <div className="text-sm leading-relaxed">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">Calvin Yixiang Cheng</h1>
                    <div className="text-slate-700">
                        calvin.cheng@oii.ox.ac.uk<br/>
                        Oxford, United Kingdom
                    </div>
                </div>

                {/* Education */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Education</h3>
                    
                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>University of Oxford</span>
                            <span>2021 - Present</span>
                        </div>
                        <div className="italic">DPhil in Social Data Science, Oxford Internet Institute</div>
                        <div className="ml-4 text-slate-700 text-xs mt-1 space-y-0.5">
                            <p>Thesis (expected viva in Dec 2025): The Persistence of Online Conspiracy Theories: Sociopsychological Drivers, Language Mutations, and Cross-Platform Narratives</p>
                            <p>Supervisor: Scott A. Hale; Viva Assessors: Ralph Schroeder, Chico Camargo</p>
                            <p>Training: Python for Data Science, Statistics, Natural Language Processing, Machine Learning</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>Chinese University of Hong Kong</span>
                            <span>2019 - 2021</span>
                        </div>
                        <div className="italic">MPhil in Communication, School of Journalism and Communication</div>
                        <div className="ml-4 text-slate-700 text-xs mt-1 space-y-0.5">
                            <p>Thesis: Exploring the Survival of Conspiracy Theories on Social Media in the Infodemic Age</p>
                            <p>Supervisor: Hai Liang; Committee: Francis Lee (Chair), Weiyu Zhang, Hsuan-ting Chen</p>
                            <p>Training: Qualitative Methods, Discourse Analysis, Applied/Advanced Statistics with R, Computational Text Analysis</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>University of Hong Kong</span>
                            <span>2015 - 2016</span>
                        </div>
                        <div className="italic">Master of Journalism, Journalism and Media Study Center</div>
                        <div className="ml-4 text-slate-700 text-xs mt-1">
                             <p>Training: R in Digital Analytics, Data Journalism, Media Law and Ethics, Research Methods</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between font-bold">
                            <span>University of International Business and Economics</span>
                            <span>2011 - 2015</span>
                        </div>
                        <div className="italic">Bachelor of Arts (School of International Studies) & Bachelor of Law (School of International Relations)</div>
                        <div className="ml-4 text-slate-700 text-xs mt-1">
                             <p>Training: Media Studies, Linguistics, Intl Political Economy, Micro/Macro Economy, Political Science</p>
                        </div>
                    </div>
                </div>

                {/* Research Experience */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Research Experience</h3>
                    
                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Research Assistant at the Oxford Internet Institute</span>
                            <span>May 2025 - Present</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Project: Tracking Influence of LLM-Generated Content on Digital Platforms. Working with Dr. Mohsen Mosleh on cross-platform social media data collection and narrative detection with LLMs.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Research Lead at the Oxford Computational Political Science Group</span>
                            <span>Jan 2025 - Present</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Project: Measuring the Moral Contagion Effect. Leading a five-member research team to address gaps in moral contagion theory related to measurement bias and causal inference. Supervising two doctoral and two master students.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Doctoral Researcher at the Oxford Internet Institute & Alan Turing Institute</span>
                            <span>Sep 2021 - Present</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Project: Effective discovery, tracking, and response to misinformation. Working with Dr. Scott Hale on multilingual misinformation diffusion and language mutations using LLMs-assisted approaches.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Researcher at the Oxford Internet Institute, AI, Government and Policy</span>
                            <span>Sep 2022 - Nov 2023</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Project: Contemporary conspiracy narratives on social media. Utilizing survival analysis and computational text analysis to investigate the persistence of online conspiracy narratives.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Research Assistant at the Civic Tech Lab, National University of Singapore</span>
                            <span>Sep 2021 - Mar 2023</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Project: Chinese Moral Foundation Dictionary. Co-led a five-member research team with Prof. Weiyu Zhang to develop a Chinese Moral Foundation Dictionary.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Research Assistant at Chinese University of Hong Kong</span>
                            <span>Sep 2019 - July 2021</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4 space-y-1">
                            <p>Project I: COVID-19 Misinformation and Political Asymmetry. Worked with Dr. Hai Liang on misinformation in US 2020 election.</p>
                            <p>Project II: Livestreaming Journalism in Social Movements. Worked with Dr. Kecheng Fang on livestreaming journalism in 2019 HK protests.</p>
                        </div>
                    </div>
                </div>

                {/* Teaching Experience */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Teaching Experience</h3>
                    
                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Graduate Lecturer at Brawijaya University</span>
                            <span>Sep - Dec 2024</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Course: Computational Social Science in Political Communication with Python. Designed and taught a course featuring hands-on projects on sentiment analysis, embeddings, and LLMs.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Graduate Teaching Assistant at Oxford Internet Institute</span>
                            <span>2023 - 2024</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Course: Fundamental Social Data Science. Assisted lecturers in guiding students through critical assessments of research methods.
                        </div>
                    </div>

                     <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Undergraduate Tutor at University of Oxford</span>
                            <span>2022 - Present</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Courses: Computational Propaganda (St Catherine's), Critical Media Studies, AI & Ethics, Mass Media & Governance, AI & Society. Designed syllabi incorporating theoretical foundations and research design.
                        </div>
                    </div>

                     <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Undergraduate Teaching Assistant at Chinese University of Hong Kong</span>
                            <span>2019 - 2020</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Courses: Mass Communication Theories, Computational Communication with R. Assisted with R programming (quanteda, tidyverse, sna).
                        </div>
                    </div>
                </div>

                {/* Professional Experience */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Professional Experience</h3>
                    
                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Deputy Editor-in-Chief, DT Caijing, China Business Network</span>
                            <span>Shanghai, 2016 - 2019</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                             Editor of "Data Scientists" column. Led a research team at CBNData for data-driven consulting and investigative journalism support.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Journalist, Deep Echo Media</span>
                            <span>Beijing, May 2018 - Apr 2019</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                            Covered feature stories on public tech companies (Alibaba, Tencent, ByteDance), focusing on data analysis of financial reports and strategy.
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Project Manager, Journalism and Media Study Center (HKU)</span>
                            <span>Hong Kong, Aug - Nov 2016</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                           Analyzed social media campaign strategies of politicians in the 2015 HK Legislative Council election.
                        </div>
                    </div>

                     <div className="mb-3">
                        <div className="flex justify-between font-bold">
                            <span>Data Journalist Intern, Initium Media</span>
                            <span>Hong Kong, May - Aug 2016</span>
                        </div>
                        <div className="text-xs text-slate-700 ml-4">
                           Crafted data-driven stories using sentiment/network analysis. Developed infographics with R Shiny and HTML.
                        </div>
                    </div>
                </div>

                {/* Peer-Reviewed Research */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Peer-Reviewed Research</h3>
                    <ul className="list-disc list-outside ml-4 text-xs space-y-2 text-slate-800">
                        <li><strong>Cheng, C.</strong>, & Hale, S. A., (2026) Proceedings of the International AAAI Conference on Web and Social Media [forthcoming] Beyond English: Evaluating Automated Measurement of Moral Framing in Non-English Discourse with a Chinese Case Study.</li>
                        <li>Quelle, D., <strong>Cheng, C. Y.</strong>, Bovet, A., & Hale, S. A. (2025). Lost in translation: using global fact-checks to measure multilingual misinformation prevalence, spread, and evolution. <em>EPJ Data Science</em>, 14(1), 22.</li>
                        <li>Liu, D., Yang, S., <strong>Cheng, C. Y.</strong>, Cai, L., & Su, J. (2024). Online Health Information Seeking, eHealth Literacy, and Health Behaviors Among Chinese Internet Users. <em>JMIR</em>, 26, e54135.</li>
                        <li>Zeng, J., & <strong>Cheng, C. Y.</strong> (2024). Diasporic citizen journalism: Exploring the discussion on the 2022 blank paper protests in the Chinese Twitter community. <em>Journalism</em> 0(0).</li>
                        <li><strong>Cheng, C. Y.</strong>, & Zhang, W. (2023). C-MFD 2.0: Developing a Chinese Moral Foundation Dictionary. <em>Computational Communication Research</em>, 5(2).</li>
                        <li>Fang, K., & <strong>Cheng C.</strong> (2022) Social media live streaming as affective news in the anti-ELAB movement in Hong Kong. <em>Chinese Journal of Communication</em>, 15:3, 401-414.</li>
                        <li><strong>Cheng, C. Y.</strong>, Zhang, W. J., & Zhang, Q. (2022). Authority-led conspiracy theories in China during the COVID-19 pandemic Exploring the thematic features and rhetoric strategies. <em>Convergence</em>, 28(4),1172-1197.</li>
                    </ul>
                </div>

                {/* Ongoing Research */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Ongoing Research</h3>
                    <ul className="list-disc list-outside ml-4 text-xs space-y-2 text-slate-800">
                        <li><strong>Cheng C.</strong>, Hale, S., Liang, H. & Li, L., (under review) The Longevity of Conspiracy Theories on Social Media: Political Ideology, Monological Belief and Moral Contagion.</li>
                        <li><strong>Cheng C.</strong>, Quelle, D., & Hale, S., (under review) Evolving Words, Enduring Beliefs: Language Mutations and the Persistence of Conspiracy Theories Online.</li>
                        <li><strong>Cheng C.</strong>, Mosleh, M., Hale, S., & Rand, D (Work in Progress) Convergent or Divergent? Mapping Conspiracy Narratives across Social Media Platforms.</li>
                        <li><strong>Cheng C.</strong>, Rice, J., Bozkurt., B., Vanderchmitt, L., & Ratnam, R., (Work in Progress) Moral Contagion on Social Media: Measurement Bias, Longitudinal Effect and Causal Inference.</li>
                    </ul>
                </div>

                {/* Conference Presentations */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Conference Presentations & Talks</h3>
                    <ul className="list-disc list-outside ml-4 text-xs space-y-2 text-slate-800">
                        <li><strong>6th CODI Workshop (2025):</strong> Developing an Automated Conspiracy Narrative Pipeline.</li>
                        <li><strong>75th ICA (2025):</strong> Evaluating Automated Measurement of Moral Foundations in Non-English Discourse; Research Escalator: Rumours and Morality.</li>
                        <li><strong>10th IC²S² (2024):</strong> The Persistence of Conspiracy Theories on Social Media; Mutations of Multilingual Misinformation on WhatsApp.</li>
                        <li><strong>CENS Workshop (2023):</strong> Conspiracy and Populism in the Digital Age (Invited Talk).</li>
                        <li><strong>Oxford LLMs Workshop (2023):</strong> LLMs-assisted human value measurements.</li>
                        <li><strong>9th IC²S² (2023):</strong> Investigating Multilingual Misinformation & Its Evolution.</li>
                        <li><strong>105th AEJMC (2022):</strong> Understanding the survival of conspiracy theories on social media.</li>
                        <li><strong>72nd ICA (2022):</strong> Are Moral Foundations Universal?</li>
                        <li><strong>4th SICSS (2021):</strong> Survival of Conspiracy Narratives Online.</li>
                        <li><strong>104th AEJMC (2021):</strong> Conspiracy about COVID-19 in China: Authority's Role on Weibo.</li>
                    </ul>
                </div>

                {/* Honours & Grants */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Honours & Research Grants</h3>
                    <ul className="list-disc list-outside ml-4 text-xs space-y-1 text-slate-800">
                        <li>Great Britain China Educational Trust Student Award, £2,000 (2024-2025)</li>
                        <li>Stanford House Tutor Research Grant, £225 (2024-2025)</li>
                        <li>Alan Turing Institute & DSO National Laboratories Fund (2022-2024)</li>
                        <li>St Cross College Research Grant, Oxford University, £1200 (2021-2024)</li>
                        <li>Dieter Schwarz Foundation Fellowship on AI Government and Policy (£22,000) (2021-2022)</li>
                        <li>Simon Li Scholarship, China Oxford Scholarship Fund, £5,000 (2021-2022)</li>
                        <li>Postgraduate Scholarship, Chinese University of Hong Kong (2019-2021)</li>
                    </ul>
                </div>

                {/* Service */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Academic Service</h3>
                    <div className="text-xs text-slate-700">
                        <p className="mb-2"><strong>Reviewer for Conferences:</strong> International Communication Association (ICA), International Conference on Computational Social Science (IC²S²), AEJMC, ICWSM.</p>
                        <p><strong>Reviewer for Journals:</strong> Journal of Information Technology & Politics, Nature's Humanities and Social Science Communication, Convergence, Chinese Journal of Communication.</p>
                    </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">Skills</h3>
                    <div className="text-xs text-slate-700 grid grid-cols-1 gap-1">
                        <div><strong>Languages:</strong> English & Mandarin</div>
                        <div><strong>Coding:</strong> Python, R, SPSS, Gephi, HTML, CSS, Markdown, LaTeX</div>
                        <div><strong>Key Libraries:</strong> SpaCy, NLTK, Pandas, Numpy, Quanteda, dplyr, tidyr</div>
                        <div><strong>Platforms:</strong> VSCode, RStudio, Huggingface, Git, Google Console, Linux Server</div>
                    </div>
                </div>

                 {/* References */}
                 <div className="mb-6">
                    <h3 className="font-bold border-b border-slate-400 mb-3 uppercase tracking-wide text-xs text-slate-500">References</h3>
                    <div className="text-xs text-slate-700">
                        <p><strong>Prof Scott A. Hale</strong>, Oxford Internet Institute: scott.hale@oii.ox.ac.uk</p>
                        <p><strong>Prof Mohsen Mosleh</strong>, Oxford Internet Institute: mohsen.mosleh@oii.ox.ac.uk</p>
                        <p><strong>Prof Ralph Schroeder</strong>, Oxford Internet Institute: ralph.schroeder@oii.ox.ac.uk</p>
                    </div>
                </div>
            </div>
      </div>
    </div>
  );
};

// --- Main Application Wrapper (This was the missing piece!) ---
const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeSection />;
      case 'research': return <ResearchSection />;
      case 'teaching': return <TeachingSection />;
      case 'service': return <ServiceSection />;
      case 'award': return <AwardSection />;
      case 'resume': return <ResumeSection />;
      case 'blog': return <BlogSection />; // Added Blog Section to switch
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className={`
        transition-all duration-300 ease-in-out
        md:ml-64 min-h-screen
        pt-20 md:pt-0
      `}>
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
          {renderContent()}
        </div>
      </main>

      <style>{`
        /* Minimal custom CSS for animations and scrollbar */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default App;