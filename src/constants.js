export const COLORS = {
  bg: "#0A0F1E",
  surface: "#111827",
  card: "#161D2F",
  border: "#1E2D45",
  accent: "#3B82F6",
  accentDark: "#1D4ED8",
  accentGlow: "rgba(59,130,246,0.18)",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  textPrimary: "#F0F4FF",
  textSecondary: "#8B9CC8",
  textMuted: "#4A5578",
  recruiterAccent: "#8B5CF6",
  recruiterGlow: "rgba(139,92,246,0.18)",
  seekerAccent: "#3B82F6",
  tagBg: "#1A2540",
};

export const FONTS = {
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
  heading: "Manrope_700Bold",
  headingBold: "Manrope_800ExtraBold",
};

export const INITIAL_JOBS = [
  { id: 1, title: "Senior React Developer", company: "TechNova Inc.", recruiterId: "r1", location: "Remote", type: "Full-time", salary: "$120k – $150k", skills: ["React", "TypeScript", "Node.js"], description: "We are looking for a seasoned React developer to lead our front-end team. You will architect scalable UI solutions and mentor junior engineers.", posted: "2 days ago", applicants: 14, status: "active", category: "Engineering" },
  { id: 2, title: "Product Designer", company: "Designify", recruiterId: "r2", location: "New York, NY", type: "Full-time", salary: "$95k – $120k", skills: ["Figma", "UX Research", "Prototyping"], description: "Join our growing design team to craft world-class product experiences.", posted: "1 day ago", applicants: 8, status: "active", category: "Design" },
  { id: 3, title: "Data Scientist", company: "InsightAI", recruiterId: "r1", location: "San Francisco, CA", type: "Full-time", salary: "$130k – $160k", skills: ["Python", "ML", "SQL", "TensorFlow"], description: "Drive data-driven decision making across the company. Build and deploy machine learning models at scale.", posted: "3 days ago", applicants: 22, status: "active", category: "Data" },
  { id: 4, title: "DevOps Engineer", company: "CloudBase", recruiterId: "r2", location: "Remote", type: "Contract", salary: "$80/hr", skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"], description: "Maintain and scale our cloud infrastructure. Own deployment pipelines and ensure 99.99% uptime.", posted: "5 days ago", applicants: 6, status: "active", category: "Engineering" },
];

export const INITIAL_RECRUITERS = {
  r1: { id: "r1", name: "Sarah Mitchell", email: "sarah@technova.com", password: "pass123", company: "TechNova Inc.", industry: "Software", companySize: "200–500", website: "technova.com", location: "San Francisco, CA", bio: "Talent Acquisition Lead with 8 years of experience in tech hiring.", avatar: "SM", verified: true, jobsPosted: 2, hiresMade: 17 },
  r2: { id: "r2", name: "James Okafor", email: "james@designify.com", password: "pass123", company: "Designify", industry: "Design", companySize: "50–200", website: "designify.io", location: "New York, NY", bio: "HR Director passionate about building diverse, creative teams.", avatar: "JO", verified: true, jobsPosted: 2, hiresMade: 9 },
};

export const INITIAL_SEEKERS = {
  s1: { id: "s1", name: "Alex Chen", email: "alex@email.com", password: "pass123", title: "Full Stack Developer", location: "Austin, TX", skills: ["React", "Node.js", "Python", "AWS"], experience: "5 years", education: "B.Sc. Computer Science, UT Austin", bio: "Passionate builder who loves turning complex problems into elegant solutions.", avatar: "AC", appliedJobs: [], savedJobs: [], availability: "Immediately", expectedSalary: "$120k+" },
};

export const store = {
  jobs: [...INITIAL_JOBS],
  recruiters: { ...INITIAL_RECRUITERS },
  seekers: { ...INITIAL_SEEKERS },
  applications: [],
};
