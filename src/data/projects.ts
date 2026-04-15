import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research System",
    subtitle: "AI-Powered Deep Research Platform",
    description:
      "Built a multi-agent research platform using LangGraph, orchestrating 5 specialized agents with a conditional feedback loop for iterative refinement. Integrated semantic search and Pinecone vector memory with similarity-based caching.",
    caseStudy:
      "This platform addresses the challenge of conducting deep, reliable research at scale. The system uses a supervisor agent that delegates tasks to 5 specialized sub-agents: a web researcher, a fact-checker, a synthesizer, a critic, and a formatter. Each agent operates within a LangGraph state machine with conditional edges that enable iterative refinement based on quality scores. The Pinecone integration enables semantic caching — if a similar query was previously researched, the system retrieves cached results and only fills in gaps. Safety was a top priority: LlamaGuard screens prompts for injection attempts, and a PII filter strips personal data before processing. The FastAPI backend uses Server-Sent Events (SSE) to stream real-time progress updates to the frontend, giving users visibility into which agent is active and what it's working on.",
    technologies: [
      "LangGraph",
      "LangChain",
      "Pinecone",
      "FastAPI",
      "Python",
      "LlamaGuard",
      "LangSmith",
      "SSE",
    ],
    categories: ["AI", "Python", "Backend"],
    githubUrl: "https://github.com/pssgowtham",
  },
  {
    id: "omniquery",
    title: "OmniQuery",
    subtitle: "Agentic SQL-RAG for Business Data",
    description:
      "Built a full-stack GenAI agentic system using LlamaIndex and Gemini that autonomously routes user queries to either a SQL database for structured business metrics or a vector store for semantic search over unstructured documents.",
    caseStudy:
      "OmniQuery solves a common enterprise problem: business users need to query both structured data (revenue, KPIs, metrics stored in SQL) and unstructured data (policy documents, reports, meeting notes stored as text). The system uses an intelligent router built on LlamaIndex that classifies incoming queries and dispatches them to the appropriate data source. For SQL queries, it generates safe, parameterized SQL using Gemini and executes against the database. For document queries, it performs semantic search over a vector store with re-ranking. The system supports multi-hop queries that combine both sources — for example, 'What was Q3 revenue and what does the quarterly report say about the growth drivers?' The frontend provides a chat interface with inline data visualizations for numerical results.",
    technologies: [
      "LlamaIndex",
      "Gemini",
      "Python",
      "SQL",
      "Vector Store",
      "React",
    ],
    categories: ["AI", "Full-Stack", "Python"],
    githubUrl: "https://github.com/pssgowtham",
  },
  {
    id: "email-ai-platform",
    title: "AI Email Processing Platform",
    subtitle: "Enterprise Multi-Agent Email Automation",
    description:
      "Architected a production-grade multi-agent email processing system at Geico, handling 1K+ daily customer service emails with 92% accuracy using LangGraph orchestration.",
    caseStudy:
      "This platform was built to replace a largely manual email triage and response workflow. The system parses incoming .eml files, classifies intent (claims, billing, coverage, general inquiry), routes to specialized response generators, and applies PII/PCI masking before any LLM processing. A human-in-the-loop dashboard allows agents to review and approve responses for edge cases. The RAG pipeline retrieves relevant knowledge base articles to ground responses in accurate, up-to-date information. LangSmith provides full observability: we track tool call success rates, response quality scores, and latency percentiles. The PostgreSQL conversation state management enables context-aware responses across email threads, dramatically improving customer experience.",
    technologies: [
      "LangGraph",
      "LangSmith",
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Python",
    ],
    categories: ["AI", "Full-Stack", "Cloud"],
    githubUrl: "https://github.com/pssgowtham",
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Responsive Shopping Experience",
    description:
      "Led the development of a responsive e-commerce platform using React, Redux, and TypeScript, increasing customer engagement by 35% with cross-browser compatibility and optimized performance.",
    technologies: [
      "React",
      "Redux",
      "TypeScript",
      "Node.js",
      "AWS",
      "Docker",
      "Jest",
    ],
    categories: ["Full-Stack", "Frontend", "Cloud"],
    githubUrl: "https://github.com/pssgowtham",
  },
  {
    id: "rbac",
    title: "Role Based Access Control System",
    subtitle:"A web application for managing roles and permissions",
    description:
      "A web application for managing roles and permissions for users in an organization.",
    caseStudy:
      "This platform addresses the challenge of managing roles and permissions for users in an organization.",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "shadcn/ui",
      "Vercel",
    ],
    categories: ["Full-Stack", "Backend", "Cloud"],
    githubUrl: "https://github.com/pssgowtham/rbac",
  },
  {
    id: "airport-management-system",
    title: "Airport Management System",
    subtitle: "Airport Management System",
    description: "A web application for managing airport operations.",
    caseStudy:"This project is a web application for managing airport operations. It is a full-stack application that uses React, Node.js, Express, and MongoDB.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS",
      "Docker",
      "Jest",
    ],
    categories:[
      "Full-Stack",
      "Backend",
      "Cloud",
    ],
    githubUrl:"https://github.com/pssgowtham/airport-management-system",
    
  },
  
  {
    id:"Climate-Data-Analysis-Using-Bigdata-and-Python",
    title:"Climate Data Analysis Using Bigdata and Python",
    subtitle:"Climate Analysis and Data Exploration",
    description:"A web application for analyzing climate data using bigdata and python.",
    caseStudy:"This project is a web application for analyzing climate data using bigdata and python. It is a full-stack application that uses React, Node.js, Express, and MongoDB.",
    technologies: [
      "Python",
      "Pandas",
      "Matplotlib",
      "SQLAlchemy",
      "Flask",
    ],
    categories:[
      "Python",
      "Backend"
    ],
    githubUrl:"https://github.com/pssgowtham/Climate-Data-Analysis-Using-Bigdata-and-Python",
    
  },

  {
    id:"A-Survey-on-the-Accuracy-and-Performance-of-Video-Anomaly-Detection-Models",
    title:"A Survey on the Accuracy and Performance of Video Anomaly Detection Models",
    subtitle:"A Research Project comparing four different VAD Models",
    description:"A survey on the accuracy and performance of video anomaly detection models using python, cuda, shell and c++.",
    caseStudy:"This survey evaluates the effectiveness of various anomaly detection models. Leveraging publicly available datasets of different sizes, we assess the performance of multiple machine learning algorithms in detecting anomalies in video streams. We compare a range of algorithms, each with distinct methodologies for anomaly detection. Our analysis focuses on a) the accuracy of these algorithms in identifying anomalous events and b) computational efficiency, measured in time required for both training and testing phases. Detailed analyses of results are presented, particularly concerning the reduction of data and frame size to enhance the performance of selected VAD models. Through rigorous experimentation and evaluation, this study provides insights into the strengths and limitations of different anomaly detection approaches across various video surveillance scenarios.",
    technologies: [
      "Python",
      "Cuda",
      "C++",
      "Shell Script"
    ],
    categories:[
      "Python",
      "Backend"
    ],
    githubUrl:"https://github.com/pssgowtham/A-Survey-on-the-Accuracy-and-Performance-of-Video-Anomaly-Detection-Models",
    
  }

];

export const projectCategories = [
  "All",
  "AI",
  "Full-Stack",
  "Frontend",
  "Backend",
  "Python",
  "Cloud",
];
