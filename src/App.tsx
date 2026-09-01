import React, { useState } from 'react';
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
  Landmark
} from 'lucide-react';

// --- Types & Interfaces ---

interface NewsItem {
  date: string;
  content: string;
}

interface Publication {
  id: string;
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

interface SidebarProps {
    activeTab: string;
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- Mock Data / Real Content ---

const NEWS_DATA: NewsItem[] = [
  { date: "Sep 1 2026", content: "Started my postdoctoral position at UZH and relocated to Zurich, Switzerland — new chapter!" },
  { date: "Aug 1 2026", content: "Left my beloved Oxford after five years." },
  { date: "Jul 29 2026", content: "New publication! \"Language mutations and the persistence of COVID-19 conspiracy theories on social media\" published in Computers in Human Behavior." },
  { date: "Jun 15 2026", content: "Attended the 2nd Disinformation Summer Institute at University of Washington, Seattle, USA." },
  { date: "Jun 3 2026", content: "Presented and organized a pre-conference at ICA, Cape Town, South Africa." },
  { date: "May 20 2026", content: "Visited and presented my work at the London Social Media Observatory (LSMO)." },
  { date: "May 5 2026", content: "Presented an NLP session for the Oxford China Policy Lab on how to apply NLP methodologies to policy research." },
  { date: "Mar 30 2026", content: "New publication! \"Beyond English: Evaluating Automated Measurement of Moral Foundations in Non-English Discourse with a Chinese Case Study\" published in the Proceedings of ICWSM." },
  { date: "Dec 10 2025", content: "Started new role as Research Lead at Misinformation Group FinAI" },
  { date: "Nov 9 2025" , content: "Presented my narrative detection work at CODI workshop EMNLP 2025 in Suzhou China" },
  { date: "Nov 9 2025", content: "Joined the ICA26 Hackathon organization team for the preconference in Cape Town in 2026!" },
  { date: "July 10 2025", content: "Presenting my thesis last empirical chapter at the 75th ICA in Denver (First student paper in Computational Methods Division)." },
  { date: "May 1 2025", content: "Started my new role as Research Assistant at OII tracking LLM influence." },
  { date: "Jan 2025", content: "Started my new role as Research Lead at the Oxford Computational Political Science Group." },
];

// Sorted by publication date, most recent first.
const PUBLICATIONS_DATA: Publication[] = [
  {
    id: "pub-covid-language-mutations",
    title: "Language mutations and the persistence of COVID-19 conspiracy theories on social media",
    authors: "Cheng, C. Y., Quelle, D., & Hale, S. A.",
    venue: "Computers in Human Behavior, 109137",
    year: "2026",
    links: { paper: "https://www.sciencedirect.com/science/article/pii/S0747563226002347", code: "https://osf.io/usqxn" }
  },
  {
    id: "pub-beyond-english",
    title: "Beyond English: Evaluating Automated Measurement of Moral Foundations in Non-English Discourse with a Chinese Case Study",
    authors: "Cheng, C. Y., & Hale, S. A.",
    venue: "Proceedings of the International AAAI Conference on Web and Social Media (ICWSM), 20(1), 487–503",
    year: "2026",
    links: { paper: "https://arxiv.org/abs/2502.02451", code: "https://github.com/calvinchengyx/cross-lan-mft-measure" }
  },
  {
    id: "pub-lost-in-translation",
    title: "Lost in translation: using global fact-checks to measure multilingual misinformation prevalence, spread & evolution",
    authors: "Quelle, D., Cheng, C. Y., Bovet, A., & Hale, S. A.",
    venue: "EPJ Data Science, 14(1), 22",
    year: "2025",
    links: { paper: "https://link.springer.com/article/10.1140/epjds/s13688-025-00520-6", code: "https://github.com/dorianquelle/Lost-In-Translation" }
  },
  {
    id: "pub-health-info-seeking",
    title: "Online Health Information Seeking, eHealth Literacy, and Health Behaviors Among Chinese Internet Users: Cross-Sectional Survey Study",
    authors: "Liu, D., Yang, S., Cheng, C. Y., Cai, L., & Su, J.",
    venue: "Journal of Medical Internet Research, 26, e54135",
    year: "2024",
    links: { paper: "https://www.jmir.org/2024/1/e54135/" }
  },
  {
    id: "pub-diasporic-citizen-journalism",
    title: "Diasporic citizen journalism: Exploring the discussion on the 2022 blank paper protests in the Chinese Twitter community",
    authors: "Zeng, J., & Cheng, C. Y.",
    venue: "Journalism",
    year: "2024",
    links: { paper: "https://journals.sagepub.com/doi/10.1177/14648849241250191" }
  },
  {
    id: "pub-cmfd",
    title: "C-MFD 2.0: Developing a Chinese Moral Foundation Dictionary",
    authors: "Cheng, C. Y., & Zhang, W.",
    venue: "Computational Communication Research, 5(2)",
    year: "2023",
    links: { paper: "https://journal.computationalcommunication.org/article/view/4776", code: "https://github.com/CivicTechLab/CMFD" }
  },
  {
    id: "pub-social-media-livestream",
    title: "Social media live streaming as affective news in the anti-ELAB movement in Hong Kong",
    authors: "Fang, K., & Cheng, C.",
    venue: "Chinese Journal of Communication, 15(3), 401–414",
    year: "2022",
    links: { paper: "https://www.tandfonline.com/doi/abs/10.1080/17544750.2022.2083202" }
  },
  {
    id: "pub-authority-led-conspiracy",
    title: "Authority-led conspiracy theories in China during the COVID-19 pandemic: Exploring the thematic features and rhetoric strategies",
    authors: "Cheng, C. Y., Zhang, W. J., & Zhang, Q.",
    venue: "Convergence, 28(4), 1172–1197",
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

// To update the resume: replace this with a new Google Drive "Anyone with the link" share
// URL for the PDF. No other code changes are needed.
const RESUME_DRIVE_URL = "https://drive.google.com/file/d/1-io4yiF030QlUh1hl5B5KxnJm7N0KtiU/view?usp=sharing";

const getGoogleDriveEmbedUrl = (shareUrl: string) => {
  const fileId = shareUrl.match(/\/d\/([^/]+)/)?.[1] ?? '';
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

// --- Sub-Components ---

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'research', label: 'Research', icon: <BookOpen size={18} /> },
    { id: 'teaching', label: 'Teaching', icon: <Users size={18} /> },
    { id: 'industry', label: 'Industry', icon: <Briefcase size={18} /> },
    { id: 'service', label: 'Service', icon: <Award size={18} /> },
    { id: 'award', label: 'Awards', icon: <Award size={18} /> },
    { id: 'resume', label: 'Resume', icon: <FileText size={18} /> },
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
        <p className="text-blue-600 font-medium">Postdoctoral Research Fellow in Science Communication</p>
        <p className="text-slate-500 text-sm mb-4">IKMZ, University of Zurich</p>

        <div className="w-full space-y-3 mb-2">
            <div className="flex items-center justify-center space-x-2 text-slate-600 text-sm">
                <Mail size={16} />
                <span>yixiang.cheng [at] uzh.ch</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-600 text-sm">
                 <span className="font-semibold">Location:</span>
                 <span>Zurich, Switzerland</span>
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
            Hey, my name's Calvin Yixiang Cheng — welcome to my personal website. I am a Postdoctoral Research Fellow in Science Communication at IKMZ, University of Zurich. My expertise is in computational social science, where my research vision is to achieve a more informed public by understanding how artificial intelligence (AI) and digital technologies shape people's beliefs through online narratives.
          </p>
          <p className="mb-4">
             My research interests broadly lie at the intersection of AI, science communication, and narrative persuasion. Specifically, I am currently working on the following topics in the domain of misinformation research: (1) conspiracy persistence - I investigate how misleading narratives persist, mutate, and spread across media platforms and languages. My latest publication, <em>"Language Mutations and the Persistence of COVID-19 Conspiracy Theories on Social Media"</em> (Computers in Human Behavior, 2026), traces how conspiratorial narratives about COVID-19 evolved linguistically as they spread. (2) strategic narrative persuasion - I examine how we can apply persuasion strategies to correct misbeliefs in science; (3) AI-assisted science communication - I explore how AI can be used to enhance the effectiveness of science communication and public engagement.
          </p>
          <p>
              I completed my DPhil in Social Data Science at the Oxford Internet Institute, University of Oxford. Before that, I finished my MPhil in Computational Communication from the Chinese University of Hong Kong, and my BA in International Communication, University of International Business and Economic Relations. 
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

const ResearchSection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Selected Publications</h2>

    {/* Vertical timeline: a dot + year on the left marks each publication, full details run down the right */}
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200" aria-hidden="true" />

      <div className="space-y-10">
        {PUBLICATIONS_DATA.map((pub) => (
          <div key={pub.id} id={pub.id} className="relative pl-10 scroll-mt-24">
            <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-white bg-blue-600 shadow ring-1 ring-slate-200" />

            <div className="text-xs font-mono font-semibold text-blue-600 mb-1">{pub.year}</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{pub.title}</h3>
            <p className="text-slate-700 mb-1" dangerouslySetInnerHTML={{
              __html: pub.authors.replace(/Cheng, C\.(?: Y\.)?/, (match) => `<strong>${match}</strong>`)
            }} />
            <p className="text-slate-500 text-sm italic mb-3">
              {pub.venue} {pub.status && <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs ml-2 not-italic font-medium">{pub.status}</span>}
            </p>

            <div className="flex flex-wrap gap-3">
              {pub.links.paper && (
                <a href={pub.links.paper} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
                  <FileText size={14} /> <span>Paper</span>
                </a>
              )}
              {pub.links.code && (
                <a href={pub.links.code} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors">
                  <Code size={14} /> <span>Code</span>
                </a>
              )}
              {pub.links.video && (
                <a href={pub.links.video} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-colors">
                  <Video size={14} /> <span>Video</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
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

const IndustrySection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Industry Experience</h2>
    
    <div className="space-y-10">
      
      {/* Senior Roles Section */}
      <section>
        <div className="mb-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">China Business Network Co., Ltd</h3>
                <p className="text-blue-600 font-medium">Senior Product Manager</p>
              </div>
              <div className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                <span>Shanghai, China • 2016 - 2019</span>
              </div>
            </div>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-700 leading-relaxed mt-4">
              <li>Created and scaled "Data Hero" content product from concept to 30+ feature stories profiling leading data scientists at Alibaba, Tencent, Baidu, and ByteDance, reaching 100K+ monthly readers focused on applied data science in business.</li>
              <li>Led 3-person team developing "One KM from Tube Station" site-selection consulting product, delivering data-driven location analysis for 5+ retail clients in Beijing, Shanghai, and Shenzhen.</li>
              <li>Co-designed and organized 30+ bi-weekly workshops and one "Top 50 Data Scientists" summit (500+ attendees). Built a data science for business solution community from scratch to 2,500+ active members over two years.</li>
              <li>Co-developed an education product "Python for Data Science" course and recruited 500+ students.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Deep Echo Media Co., Ltd</h3>
                <p className="text-blue-600 font-medium">Content Manager</p>
              </div>
              <div className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                <span>Beijing, China • May 2018 - April 2019</span>
              </div>
            </div>
            <ul className="list-disc list-outside ml-5 space-y-2 text-slate-700 leading-relaxed mt-4">
              <li>Delivered 10+ analytical reports on publicly listed tech companies (e.g., Alibaba, Tencent, ByteDance), providing C-suite executives with data-driven insights on corporate strategy. Reports received 100K+ reviews on WeChat.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
          Early Career & Internships
        </h3>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">Project Manager</h4>
                <p className="text-slate-600 text-sm">Journalism and Media Study Center, University of Hong Kong</p>
              </div>
              <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Hong Kong • Aug - Nov 2016</span>
            </div>
            <p className="text-slate-700 leading-relaxed mt-2">Analyzed the social media campaign strategies of politicians in the 2015 Hong Kong Legislative Council election using visual analysis.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">Data Journalist Intern</h4>
                <p className="text-slate-600 text-sm">Initium Media</p>
              </div>
              <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Hong Kong • May - Aug 2016</span>
            </div>
            <p className="text-slate-700 leading-relaxed mt-2">Scraped and analyzed data to deliver insights and support for investigative journalism. Crafted data-driven stories using computational techniques such as sentiment and social network analysis. Developed infographics and interactive visualizations using R Shiny and HTML.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">Data Analyst Intern</h4>
                <p className="text-slate-600 text-sm">Journalism and Media Study Center, University of Hong Kong</p>
              </div>
              <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Hong Kong • Dec 2015 - Mar 2016</span>
            </div>
            <p className="text-slate-700 leading-relaxed mt-2">Managed and maintained the Weiboscope database at HKU. Led a Weibo censorship study on human rights lawyers in China. The article was published on Radio Television Hong Kong.</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
              <div>
                <h4 className="text-base font-bold text-slate-900">Tech Journalist Intern</h4>
                <p className="text-slate-600 text-sm">Online Media Group, Tencent</p>
              </div>
              <span className="text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">Beijing • Jan - Jun 2015</span>
            </div>
            <p className="text-slate-700 leading-relaxed mt-2">Assisted journalists with coverage of Chinese technology companies by providing data analysis on financial statements.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);

const ServiceSection = () => (
  <div className="max-w-4xl mx-auto animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">Academic Service</h2>
    
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
            <strong className="text-slate-900">ICA 2026 Pre-Conference Hackathon Organization Committee</strong>, International Communication Association (2025 - 2026)
          </li>
          <li>
            <strong className="text-slate-900">ICWSM Misinformation Workshop Organization Committee</strong>, The 20th International AAAI Conference on Web and Social Media (2026)
          </li>
          <li>
            <strong className="text-slate-900">Research Lead</strong>, Oxford Computational Political Science Group (2025 - Present)
            <br/><span className="text-slate-600 text-sm">Leading a five-member research team on moral contagion theory; supervising graduate students.</span>
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
  const embedUrl = getGoogleDriveEmbedUrl(RESUME_DRIVE_URL);

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-slate-200 gap-4">
        <h2 className="text-3xl font-bold text-slate-900">Resume / CV</h2>

        <a
          href={RESUME_DRIVE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <Download size={16} /> Open in Google Drive
        </a>
      </div>

      {/* Embedded PDF Viewer (Google Drive) */}
      <div className="bg-white shadow-md border border-slate-200 rounded-xl overflow-hidden mx-auto max-w-[850px]">
        <iframe
          src={embedUrl}
          title="Calvin Yixiang Cheng - Resume / CV"
          className="w-full h-[85vh] min-h-[800px]"
          allow="autoplay"
        />
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
      case 'industry': return <IndustrySection />;
      case 'home': return <HomeSection />;
      case 'research': return <ResearchSection />;
      case 'teaching': return <TeachingSection />;
      case 'service': return <ServiceSection />;
      case 'award': return <AwardSection />;
      case 'resume': return <ResumeSection />;
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