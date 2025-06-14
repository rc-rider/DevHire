import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import dev1 from './doc1.png'
import dev2 from './doc2.png'
import dev3 from './doc3.png'
import dev4 from './doc4.png'
import dev5 from './doc5.png'
import dev6 from './doc6.png'
import dev7 from './doc7.png'
import dev8 from './doc8.png'
import dev9 from './doc9.png'
import dev10 from './doc10.png'
import dev11 from './doc11.png'
import dev12 from './doc12.png'
import dev13 from './doc13.png'
import dev14 from './doc14.png'
import dev15 from './doc15.png'
import dev16 from '../assets/doc16.png';
import dev17 from '../assets/doc17.png';
import dev18 from '../assets/doc18.png';
import dev19 from '../assets/doc19.png';
import dev20 from '../assets/doc20.png';
import dev21 from '../assets/doc21.png';
import dev22 from '../assets/doc22.png';
import dev23 from '../assets/doc23.png';
import dev24 from '../assets/doc24.png';
import dev25 from '../assets/doc25.png';
import dev26 from '../assets/doc26.png';
import dev27 from '../assets/doc27.png';
import Frontend_Dev from '../assets/frontend.png';
import Backend_Dev from '../assets/backend.png';
import Fullstack_Dev from '../assets/fullstack.png';
import DevOps from '../assets/devops.png';
import AIML_Dev from '../assets/aiml.png';
import Cybersecurity from '../assets/cybersecurity.png';
import Mobile_Dev from '../assets/mobile.png';
import SEO_Expert from '../assets/seo.png';
import UIUX_Designer from '../assets/uiux.png';
import QA_Tester from '../assets/qa.png';


export const assets = {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo
}

export const specialityData = [
  {
    speciality: 'Frontend Developer',
    image: Frontend_Dev
  },
  {
    speciality: 'Backend Developer',
    image: Backend_Dev
  },
  {
    speciality: 'Full Stack Developer',
    image: Fullstack_Dev
  },
  {
    speciality: 'DevOps Engineer',
    image: DevOps
  },
  {
    speciality: 'AI / ML Engineer',
    image: AIML_Dev
  },
  {
    speciality: 'Cybersecurity Expert',
    image: Cybersecurity
  },
  {
    speciality: 'Mobile App Developer',
    image: Mobile_Dev
  },
  {
    speciality: 'SEO Specialist',
    image: SEO_Expert
  },
  {
    speciality: 'UI/UX Designer',
    image: UIUX_Designer
  },
  {
    speciality: 'QA / Tester',
    image: QA_Tester
  }
];


export const developers = [
  {
    _id: 'dev1',
    name: 'Rahul Thakur',
    image: dev1,
    degree: 'MCA',
    speciality: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    experience: '4 Years',
    about: 'Rahul is a passionate full stack developer who builds scalable web applications with modern JavaScript frameworks and REST APIs. He has delivered multiple production-grade solutions for startups and enterprises. With a strong command over both frontend and backend technologies, Rahul ensures seamless integration and performance optimization across the stack. He is proficient in agile development practices and thrives in collaborative environments. Rahul is also experienced in CI/CD pipelines, cloud deployments, and version control using Git, making him a reliable asset for end-to-end software development projects.',
    hourlyRate: 25,
    address: {
      line1: 'Sector 67, Mohali',
      line2: 'Punjab, India'
    }
  },
  {
    _id: 'dev2',
    name: 'Emily Watson',
    image: dev2,
    degree: 'MCA',
    speciality: 'UI/UX Designer',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    experience: '3 Years',
    about: 'Emily specializes in crafting intuitive interfaces and user experiences for web and mobile apps. Her design sense focuses on user empathy and accessibility.',
    hourlyRate: 20,
    address: {
      line1: 'Downtown, Toronto',
      line2: 'Ontario, Canada'
    }
  },
  {
    _id: 'dev3',
    name: 'Aman Kaur',
    image: dev3,
    degree: 'MCA',
    speciality: 'Backend Developer',
    skills: ['Django', 'PostgreSQL', 'Docker'],
    experience: '2 Years',
    about: 'Aman is a backend engineer experienced in building robust APIs and managing relational databases. He ensures security, performance, and clean architecture.',
    hourlyRate: 22,
    address: {
      line1: 'Indira Nagar',
      line2: 'Bangalore, India'
    }
  },
  {
    _id: 'dev4',
    name: 'Chloe Smith',
    image: dev4,
    degree: 'MCA',
    speciality: 'Frontend Developer',
    skills: ['Vue.js', 'Tailwind CSS', 'JavaScript'],
    experience: '1.5 Years',
    about: 'Chloe is a frontend dev passionate about creating clean, responsive, and visually engaging user interfaces with modern frameworks.',
    hourlyRate: 18,
    address: {
      line1: 'Brooklyn',
      line2: 'New York, USA'
    }
  },
  {
    _id: 'dev5',
    name: 'Priya Sharma',
    image: dev5,
    degree: 'MCA',
    speciality: 'Mobile App Developer',
    skills: ['Flutter', 'Firebase', 'Dart'],
    experience: '3 Years',
    about: 'Priya Sharma develops high-performance cross-platform mobile apps with Flutter, focusing on smooth UI, offline support, and scalable architecture.',
    hourlyRate: 24,
    address: {
      line1: 'Model Town',
      line2: 'Delhi, India'
    }
  },
  {
    _id: 'dev6',
    name: 'Zara Lee',
    image: dev6,
    degree: 'MCA',
    speciality: 'DevOps Engineer',
    skills: ['AWS', 'Kubernetes', 'CI/CD'],
    experience: '5 Years',
    about: 'Zara automates infrastructure and deployment pipelines to ensure smooth DevOps workflows. She’s certified in AWS and focuses on scalability and monitoring.',
    hourlyRate: 30,
    address: {
      line1: 'Seoul',
      line2: 'South Korea'
    }
  },
  {
    _id: 'dev7',
    name: 'Lucas Fernandez',
    image: dev7,
    degree: 'MCA',
    speciality: 'AI/ML Engineer',
    skills: ['TensorFlow', 'Python', 'Scikit-Learn'],
    experience: '4 Years',
    about: 'Lucas builds intelligent systems using machine learning and deep learning. He has worked on recommendation systems, NLP, and image processing.',
    hourlyRate: 35,
    address: {
      line1: 'Madrid',
      line2: 'Spain'
    }
  },
  {
    _id: 'dev8',
    name: 'Priya Mehta',
    image: dev8,
    degree: 'MCA',
    speciality: 'Cybersecurity Analyst',
    skills: ['Ethical Hacking', 'Pen Testing', 'SIEM'],
    experience: '3 Years',
    about: 'Priya secures infrastructure and performs vulnerability assessments. She’s known for her expertise in ethical hacking and compliance audits.',
    hourlyRate: 28,
    address: {
      line1: 'Kothrud',
      line2: 'Pune, India'
    }
  },
  {
    _id: 'dev9',
    name: 'Tom Williams',
    image: dev9,
    degree: 'MCA',
    speciality: 'Cloud Architect',
    skills: ['Azure', 'GCP', 'Infrastructure as Code'],
    experience: '6 Years',
    about: 'Tom designs and implements scalable cloud architectures. His solutions ensure cost-efficiency, uptime, and fault-tolerance across services.',
    hourlyRate: 38,
    address: {
      line1: 'Manchester',
      line2: 'UK'
    }
  },
  {
    _id: 'dev10',
    name: 'Sneha Arora',
    image: dev10,
    degree: 'MCA',
    speciality: 'QA Automation Engineer',
    skills: ['Selenium', 'Cypress', 'Jenkins'],
    experience: '2 Years',
    about: 'Sneha develops automation test suites for web and mobile apps, ensuring quality and performance before product launch.',
    hourlyRate: 19,
    address: {
      line1: 'Hinjewadi',
      line2: 'Pune, India'
    }
  },
  {
    _id: 'dev11',
    name: 'Harshita Singh',
    image: dev11,
    degree: 'MCA',
    speciality: 'Data Scientist',
    skills: ['Python', 'Pandas', 'Power BI', 'SQL'],
    experience: '3 Years',
    about: 'Harshita works with complex datasets to extract insights and build predictive models. She blends statistical thinking with real-world problem solving.',
    hourlyRate: 27,
    address: {
      line1: 'Salt Lake City',
      line2: 'Kolkata, India'
    }
  },
  {
    _id: 'dev12',
    name: 'David Kim',
    image: dev12,
    degree: 'MCA',
    speciality: 'Game Developer',
    skills: ['Unity', 'C#', '3D Modeling'],
    experience: '4 Years',
    about: 'David designs and develops engaging 2D/3D games with Unity, focusing on performance, storytelling, and cross-platform publishing.',
    hourlyRate: 26,
    address: {
      line1: 'Busan',
      line2: 'South Korea'
    }
  },
  {
    _id: 'dev13',
    name: 'Fatima Al-Zahra',
    image: dev13,
    degree: 'MCA',
    speciality: 'Blockchain Developer',
    skills: ['Solidity', 'Ethereum', 'Smart Contracts'],
    experience: '2.5 Years',
    about: 'Fatima builds decentralized applications and smart contracts, focusing on Web3 innovation and secure blockchain protocols.',
    hourlyRate: 32,
    address: {
      line1: 'Dubai Internet City',
      line2: 'UAE'
    }
  },
  {
    _id: 'dev14',
    name: 'Aditya Deshmukh',
    image: dev14,
    degree: 'MCA',
    speciality: 'Python Developer',
    skills: ['Flask', 'FastAPI', 'SQLAlchemy'],
    experience: '3.5 Years',
    about: 'Aditya crafts efficient backend solutions using Python frameworks. He emphasizes clean code, testing, and documentation.',
    hourlyRate: 23,
    address: {
      line1: 'Andheri West',
      line2: 'Mumbai, India'
    }
  },
  {
    _id: 'dev15',
    name: 'Green Mark',
    image: dev15,
    degree: 'MCA',
    speciality: 'Technical Writer & API Doc Expert',
    skills: ['Markdown', 'Swagger', 'Postman'],
    experience: '5 Years',
    about: 'Green Mark creates developer-friendly documentation for APIs, SDKs, and software tools. Her writing is clear, concise, and well-structured.',
    hourlyRate: 21,
    address: {
      line1: 'Portland',
      line2: 'Oregon, USA'
    }
  }, {
    _id: 'dev16',
    name: 'Ritika Sharma',
    image: dev16,  
    degree: 'MCA',
    speciality: 'Cybersecurity Expert',
    skills: ['Network Security', 'Penetration Testing', 'Firewalls', 'Kali Linux'],
    experience: '3 Years',
    about: 'Ritika is a cybersecurity specialist who excels in ethical hacking, vulnerability analysis, and building secure systems. She has helped multiple startups harden their digital infrastructure.',
    hourlyRate: 30,
    address: {
      line1: 'Sector 21',
      line2: 'Noida, India'
    }
  },
  {
    _id: 'dev17',
    name: 'Kunal Verma',
    image: dev17, 
    degree: 'MCA',
    speciality: 'SEO Specialist',
    skills: ['Google Analytics', 'Keyword Research', 'On-page SEO', 'Backlink Strategy'],
    experience: '4 Years',
    about: 'Kunal is an SEO strategist with a knack for improving organic traffic and boosting search engine rankings. He brings measurable growth using white-hat SEO techniques.',
    hourlyRate: 18,
    address: {
      line1: 'Satellite',
      line2: 'Ahmedabad, India'
    }
  },
  {
    _id: 'dev18',
    name: 'Sanya Deshmukh',
    image: dev18,  
    degree: 'MCA',
    speciality: 'QA / Tester',
    skills: ['Selenium', 'JIRA', 'Manual Testing', 'TestRail'],
    experience: '2.5 Years',
    about: 'Sanya is a QA analyst who ensures software quality with a blend of manual and automated testing. She’s thorough, detail-oriented, and passionate about bug-free user experiences.',
    hourlyRate: 20,
    address: {
      line1: 'Viman Nagar',
      line2: 'Pune, India'
    }
  },
  {
    _id: 'dev19',
    name: 'Anchal Sharma',
    image: dev19,
    degree: 'MCA',
    speciality: 'Frontend Developer',
    skills: ['React', 'Redux', 'CSS', 'HTML5', 'TypeScript'],
    experience: '3 Years',
    about: 'Anchal is a passionate frontend developer who builds beautiful and responsive user interfaces with modern frameworks.',
    hourlyRate: 25,
    address: {
      line1: 'Sector 15',
      line2: 'Chandigarh, India'
    }
  },
  {
    _id: 'dev20',
    name: 'Rahul Verma',
    image: dev20,
    degree: 'MCA',
    speciality: 'Backend Developer',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    experience: '4 Years',
    about: 'Rahul specializes in backend architecture and API development ensuring scalable and secure services.',
    hourlyRate: 28,
    address: {
      line1: 'MG Road',
      line2: 'Bangalore, India'
    }
  },
  {
    _id: 'dev21',
    name: 'Anjali Mehta',
    image: dev21,
    degree: 'MCA',
    speciality: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    experience: '5 Years',
    about: 'Anjali is a versatile full stack developer with expertise in building robust web applications end-to-end.',
    hourlyRate: 32,
    address: {
      line1: 'Connaught Place',
      line2: 'New Delhi, India'
    }
  },
  {
    _id: 'dev22',
    name: 'Vikram Singh',
    image: dev22,
    degree: 'MCA',
    speciality: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    experience: '6 Years',
    about: 'Vikram ensures smooth deployment pipelines and reliable cloud infrastructure management.',
    hourlyRate: 35,
    address: {
      line1: 'Salt Lake',
      line2: 'Kolkata, India'
    }
  },
  {
    _id: 'dev23',
    name: 'Nishu Gupta',
    image: dev23,
    degree: 'MCA',
    speciality: 'Frontend Developer',
    skills: ['Vue.js', 'Sass', 'JavaScript', 'Webpack'],
    experience: '2 Years',
    about: 'Nishu creates pixel-perfect frontend experiences with a strong eye for design and usability.',
    hourlyRate: 24,
    address: {
      line1: 'Andheri East',
      line2: 'Mumbai, India'
    }
  },
  {
    _id: 'dev24',
    name: 'Suresh Kumar Singh',
    image: dev24,
    degree: 'MCA',
    speciality: 'Backend Developer',
    skills: ['Python', 'Django', 'MySQL', 'Celery'],
    experience: '5 Years',
    about: 'Suresh builds robust backend systems focusing on performance and security.',
    hourlyRate: 30,
    address: {
      line1: 'Baner',
      line2: 'Pune, India'
    }
  },
  {
    _id: 'dev25',
    name: 'Neha Ansari',
    image: dev25,
    degree: 'MCA',
    speciality: 'Full Stack Developer',
    skills: ['Angular', 'Node.js', 'MongoDB', 'AWS'],
    experience: '4 Years',
    about: 'Neha excels in crafting scalable full stack applications with cloud integration.',
    hourlyRate: 33,
    address: {
      line1: 'Banjara Hills',
      line2: 'Hyderabad, India'
    }
  },
  {
    _id: 'dev26',
    name: 'Karan Patel',
    image: dev26,
    degree: 'MCA',
    speciality: 'DevOps Engineer',
    skills: ['Jenkins', 'Terraform', 'Azure', 'Monitoring'],
    experience: '3 Years',
    about: 'Karan automates infrastructure management and monitors system health proactively.',
    hourlyRate: 29,
    address: {
      line1: 'Whitefield',
      line2: 'Bangalore, India'
    }
  },
  {
    _id: 'dev27',
    name: 'Ashwinder Singh Rana',
    image: dev27,
    degree: 'MCA',
    speciality: 'Full Stack Developer',
    skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    experience: '3 Years',
    about: 'Ashwinder builds full-stack web applications with responsive frontends and robust backends. He specializes in creating scalable and maintainable solutions using the MERN stack. With a deep understanding of RESTful APIs, database design, and UI/UX principles, he ensures seamless integration between client and server. Ashwinder is passionate about clean code, performance optimization, and delivering high-quality applications that meet business goals.',
    hourlyRate: 29,
    address: {
      line1: 'Dharampur',
      line2: 'Mandi, India'
    }
  },
];
