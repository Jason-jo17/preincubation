import { EcosystemCategory } from './ecosystem-providers';

export const MAHARASHTRA_ECOSYSTEM: EcosystemCategory[] = [
    {
        id: 'product-startup',
        title: 'Product Startups',
        description: 'Hardware and software startups',
        icon_name: 'Rocket' as any,
        companies: [
            {
                id: 'product-startup-1',
                name: 'ideaForge',
                description: 'India\'s largest manufacturer of UAVs for defence, homeland security, and industrial applications',
                rating: 4.8,
                location: 'Navi Mumbai',
                contact: {
                    email: 'contact@ideaforge.co.in',
                    phone: '',
                    website: 'https://ideaforge.co.in'
                },
                services: ['Drone hardware', 'flight controllers', 'payloads'],
                match_score: 92
            },
            {
                id: 'product-startup-2',
                name: 'Atomberg Technologies',
                description: 'Energy-efficient BLDC fans and home appliances; India\'s #1 premium fan brand',
                rating: 4.8,
                location: 'Mumbai + Pune (R&D)',
                contact: {
                    email: 'support@atomberg.com',
                    phone: '',
                    website: 'https://atomberg.com'
                },
                services: ['BLDC motor technology', 'IoT-enabled appliances'],
                match_score: 92
            },
            {
                id: 'product-startup-3',
                name: 'DroneAcharya Aerial Innovations',
                description: 'Industrial drone solutions, drone pilot training, aerial survey and mapping services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@droneacharya.com',
                    phone: '',
                    website: 'https://droneacharya.com'
                },
                services: ['Custom drones', 'GIS mapping', 'LiDAR'],
                match_score: 92
            },
            {
                id: 'product-startup-4',
                name: 'Hiotron (FactoryMetrics)',
                description: 'Plug-and-play IIoT platform with hardware sensors and AI-powered analytics for smart manufacturing',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@hiotron.com',
                    phone: '',
                    website: 'https://hiotron.com'
                },
                services: ['IoT sensors', 'Edge computing', 'AI/ML analytics'],
                match_score: 92
            },
            {
                id: 'product-startup-5',
                name: 'Altizon Systems (Datonis)',
                description: 'Datonis IIoT platform for manufacturing intelligence - edge to cloud industrial analytics',
                rating: 4.8,
                location: 'Pune + Princeton NJ',
                contact: {
                    email: 'info@altizon.com',
                    phone: '',
                    website: 'https://altizon.com'
                },
                services: ['Edge computing', 'Cloud IoT', 'ML analytics'],
                match_score: 92
            },
            {
                id: 'product-startup-6',
                name: 'ThrustWorks Dynetics',
                description: 'Electric propulsion systems for drones and defence applications',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'LinkedIn',
                    phone: '',
                    website: 'https://thrustworksdynetics.com'
                },
                services: ['Electric motors', 'propulsion systems', 'power electronics'],
                match_score: 92
            },
            {
                id: 'product-startup-7',
                name: 'Aeron Systems',
                description: 'Inertial Navigation Systems, AHRS, sensors for defence and agriculture applications',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@aeronsystems.com',
                    phone: '',
                    website: 'https://aeronsystems.com'
                },
                services: ['INS', 'AHRS', 'GPS-denied navigation', 'sensors'],
                match_score: 92
            },
            {
                id: 'product-startup-8',
                name: 'Robo Bionics',
                description: 'Grippy - India\'s first 3D printed bionic hand with touch sensors and myoelectric control',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'contact@robobionics.in',
                    phone: '',
                    website: 'https://robobionics.in'
                },
                services: ['3D printing', 'embedded systems', 'myoelectric sensors'],
                match_score: 92
            },
            {
                id: 'product-startup-9',
                name: 'ImmunoACT',
                description: 'NexCAR19 - India\'s first indigenously developed CAR-T cell therapy for blood cancer',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@immunoact.com',
                    phone: '',
                    website: 'https://immunoact.com'
                },
                services: ['CAR-T cell therapy', 'immunotherapy'],
                match_score: 92
            },
            {
                id: 'product-startup-10',
                name: 'Apeiro Energy',
                description: 'iWind Hygrid small wind turbines combined with solar for off-grid microgrids',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@apeiroenergy.com',
                    phone: '',
                    website: 'https://apeiroenergy.com'
                },
                services: ['Small wind turbines', 'solar hybrid', 'microgrids'],
                match_score: 92
            },
            {
                id: 'product-startup-11',
                name: 'Genrich Membranes',
                description: 'Hollow fiber membranes for medical oxygen concentrators and therapy devices',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@genrichmembranes.com',
                    phone: '',
                    website: 'https://genrichmembranes.com'
                },
                services: ['Hollow fiber membrane technology'],
                match_score: 92
            },
            {
                id: 'product-startup-12',
                name: 'Infinite Uptime',
                description: 'Patented vibration and acoustic sensors with AI for predictive maintenance',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@infiniteuptime.com',
                    phone: '',
                    website: 'https://intiniteuptime.com'
                },
                services: ['Patented sensors', 'Edge AI', 'Cloud analytics'],
                match_score: 92
            },
            {
                id: 'product-startup-13',
                name: 'CarIQ Technologies',
                description: 'Vehicle health monitoring, connected car platform, telematics solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@cariq.in',
                    phone: '',
                    website: 'https://cariq.in'
                },
                services: ['OBD devices', 'telematics', 'predictive analytics'],
                match_score: 92
            },
            {
                id: 'product-startup-14',
                name: 'IoTracX',
                description: 'IoT solutions for logistics, cold chain monitoring, and asset tracking',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@iotracx.com',
                    phone: '',
                    website: 'https://iotracx.com'
                },
                services: ['GPS trackers', 'temperature sensors', 'cloud platform'],
                match_score: 92
            },
            {
                id: 'product-startup-15',
                name: 'NavStik Autonomous Systems',
                description: 'Platform for building autonomous drone applications - agriculture, surveying, delivery',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@navstik.com',
                    phone: '',
                    website: 'https://navstik.com'
                },
                services: ['Drone autopilot', 'computer vision', 'autonomous navigation'],
                match_score: 92
            },
            {
                id: 'product-startup-16',
                name: 'Shunya OS',
                description: 'Edge AI embedded firmware, industrial gateways, AI cameras for manufacturing',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@shunyaos.com',
                    phone: '',
                    website: 'https://shunyaos.com'
                },
                services: ['Embedded Linux', 'Edge AI', 'Computer Vision'],
                match_score: 92
            },
            {
                id: 'product-startup-17',
                name: 'PARC Robotics',
                description: 'Welding automation, robotic work cells, special purpose machines',
                rating: 4.8,
                location: 'Chakan, Pune',
                contact: {
                    email: 'info@parcrobotics.in',
                    phone: '',
                    website: 'https://parcrobotics.in'
                },
                services: ['Robot integration', 'welding automation', 'SPMs'],
                match_score: 92
            },
            {
                id: 'product-startup-18',
                name: 'SNS TechnoSys',
                description: 'Custom IIoT device manufacturing for smart cities, automation, healthcare',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@snstechnosys.com',
                    phone: '',
                    website: 'https://snstechnosys.com'
                },
                services: ['IoT hardware', 'embedded systems', 'gateways'],
                match_score: 92
            },
            {
                id: 'product-startup-19',
                name: 'Druva',
                description: 'Cloud-native SaaS platform for data protection, backup, and disaster recovery',
                rating: 4.8,
                location: 'Pune (R&D HQ)',
                contact: {
                    email: 'info@druva.com',
                    phone: '',
                    website: 'https://druva.com'
                },
                services: ['Cloud-native', 'AWS', 'Data management'],
                match_score: 92
            },
            {
                id: 'product-startup-20',
                name: 'Icertis',
                description: 'AI-powered Contract Lifecycle Management platform for enterprise',
                rating: 4.8,
                location: 'Pune (R&D)',
                contact: {
                    email: 'info@icertis.com',
                    phone: '',
                    website: 'https://icertis.com'
                },
                services: ['AI/ML', 'NLP', 'Cloud', 'Contract analytics'],
                match_score: 92
            },
            {
                id: 'product-startup-21',
                name: 'Scalefusion',
                description: 'Unified Endpoint Management platform for mobile device management',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@scalefusion.com',
                    phone: '',
                    website: 'https://scalefusion.com'
                },
                services: ['MDM', 'UEM', 'Kiosk management', 'Remote access'],
                match_score: 92
            },
            {
                id: 'product-startup-22',
                name: 'Qure.ai',
                description: 'AI-powered medical imaging - chest X-ray, CT, MRI interpretation for TB, cancer detection',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@qure.ai',
                    phone: '',
                    website: 'https://qure.ai'
                },
                services: ['Deep learning', 'Computer vision', 'Medical imaging AI'],
                match_score: 92
            },
            {
                id: 'product-startup-23',
                name: 'IDfy',
                description: 'Identity verification, KYC automation, fraud prevention APIs for enterprises',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@idfy.com',
                    phone: '',
                    website: 'https://idfy.com'
                },
                services: ['AI/ML', 'OCR', 'Face recognition', 'APIs'],
                match_score: 92
            },
            {
                id: 'product-startup-24',
                name: 'ElasticRun',
                description: 'Technology platform connecting brands to rural retail through distributed logistics',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@elasticrun.com',
                    phone: '',
                    website: 'https://elasticrun.com'
                },
                services: ['Logistics optimization', 'Route planning', 'Retail tech'],
                match_score: 92
            },
            {
                id: 'product-startup-25',
                name: 'AgroStar',
                description: 'Agri-inputs marketplace with AI-powered crop advisory for 5M+ farmers',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'support@agrostar.in',
                    phone: '',
                    website: 'https://agrostar.in'
                },
                services: ['E-commerce', 'AI crop advisory', 'Agri-fintech'],
                match_score: 92
            },
            {
                id: 'product-startup-26',
                name: 'PharmEasy',
                description: 'Online pharmacy and healthcare platform - medicines, diagnostics, teleconsult',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'support@pharmeasy.in',
                    phone: '',
                    website: 'https://pharmeasy.in'
                },
                services: ['E-commerce', 'Logistics', 'Telehealth'],
                match_score: 92
            },
            {
                id: 'product-startup-27',
                name: 'Gupshup',
                description: 'Conversational messaging platform - chatbots, WhatsApp Business, RCS',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@gupshup.io',
                    phone: '',
                    website: 'https://gupshup.io'
                },
                services: ['NLP', 'Chatbots', 'Messaging APIs'],
                match_score: 92
            },
            {
                id: 'product-startup-28',
                name: 'SAFE Security',
                description: 'AI-powered platform for cyber risk quantification and management',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@safe.security',
                    phone: '',
                    website: 'https://safe.security'
                },
                services: ['AI/ML', 'Risk scoring', 'Cyber insurance'],
                match_score: 92
            },
            {
                id: 'product-startup-29',
                name: 'Seclore',
                description: 'Data-centric security platform - Information Rights Management, DLP',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@seclore.com',
                    phone: '',
                    website: 'https://seclore.com'
                },
                services: ['IRM', 'DLP', 'Data protection'],
                match_score: 92
            },
            {
                id: 'product-startup-30',
                name: 'SuperGaming',
                description: 'Multiplayer game development studio - PAC-MAN Party Royale, Indus Battle Royale',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@supergaming.com',
                    phone: '',
                    website: 'https://supergaming.com'
                },
                services: ['Unity', 'Unreal', 'Multiplayer', 'Web3'],
                match_score: 92
            },
            {
                id: 'product-startup-31',
                name: 'Intangles',
                description: 'Physics-based predictive maintenance platform for commercial vehicle fleets',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@intangles.com',
                    phone: '',
                    website: 'https://intangles.com'
                },
                services: ['IoT', 'Physics-based AI', 'Predictive analytics'],
                match_score: 92
            },
            {
                id: 'product-startup-32',
                name: 'Phi Commerce',
                description: 'Digital payment solutions - UPI gateway, payment processing, merchant services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@phicommerce.com',
                    phone: '',
                    website: 'https://phicommerce.com'
                },
                services: ['UPI', 'Payment gateway', 'APIs'],
                match_score: 92
            },
            {
                id: 'product-startup-33',
                name: 'SustLabs',
                description: 'Smart energy management platform for buildings and industries',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@sustlabs.com',
                    phone: '',
                    website: 'https://sustlabs.com'
                },
                services: ['IoT', 'Energy analytics', 'AI optimization'],
                match_score: 92
            },
            {
                id: 'product-startup-34',
                name: 'Mosaic Wellness',
                description: 'Digital health brands - men\'s health (Man Matters), women\'s health (Be Bodywise), parenting',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'support@mosaicwellness.in',
                    phone: '',
                    website: 'https://mosaicwellness.in'
                },
                services: ['Telemedicine', 'E-commerce', 'Health tech'],
                match_score: 92
            },
            {
                id: 'product-startup-35',
                name: 'Vodex.ai',
                description: 'Generative AI-powered voice agents for outbound sales calls',
                rating: 4.8,
                location: 'Maharashtra',
                contact: {
                    email: 'info@vodex.ai',
                    phone: '',
                    website: 'https://vodex.ai'
                },
                services: ['Generative AI', 'Voice synthesis', 'NLP'],
                match_score: 92
            },
            {
                id: 'product-startup-36',
                name: 'Anyway.ai',
                description: 'AI platform for data availability and adequacy solutions',
                rating: 4.8,
                location: 'Maharashtra',
                contact: {
                    email: 'info@anyway.ai',
                    phone: '',
                    website: 'https://anyway.ai'
                },
                services: ['Data engineering', 'AI/ML'],
                match_score: 92
            },
            {
                id: 'product-startup-37',
                name: 'Openleaf',
                description: 'Logistics API solutions for e-commerce and supply chain',
                rating: 4.8,
                location: 'Maharashtra',
                contact: {
                    email: 'info@openleaf.io',
                    phone: '',
                    website: 'https://openleaf.io'
                },
                services: ['APIs', 'Logistics optimization'],
                match_score: 92
            },
        ]
    },
    {
        id: 'ai-ml',
        title: 'AI & ML Specialists',
        description: 'Core AI/ML providers',
        icon_name: 'Cpu' as any,
        companies: [
            {
                id: 'ai-ml-1',
                name: 'Fractal Analytics',
                description: 'Enterprise AI platforms - predictive analytics, computer vision, NLP at scale',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@fractal.ai',
                    phone: '',
                    website: 'https://fractal.ai'
                },
                services: ['AI/ML', 'Deep learning', 'NLP', 'Computer vision'],
                match_score: 92
            },
            {
                id: 'ai-ml-2',
                name: 'Haptik (Reliance Jio)',
                description: 'Enterprise conversational AI - chatbots, voice AI, WhatsApp commerce',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@haptik.ai',
                    phone: '',
                    website: 'https://haptik.ai'
                },
                services: ['NLP', 'Chatbots', 'Voice AI', '100+ languages'],
                match_score: 92
            },
            {
                id: 'ai-ml-3',
                name: 'Arya.ai',
                description: 'Deep learning PaaS for BFSI - KYC automation, fraud detection, underwriting',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@arya.ai',
                    phone: '',
                    website: 'https://arya.ai'
                },
                services: ['Deep learning', 'Computer vision', 'NLP'],
                match_score: 92
            },
            {
                id: 'ai-ml-4',
                name: 'Assert AI',
                description: 'Computer vision platform for workplace safety, compliance monitoring',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@assertai.com',
                    phone: '',
                    website: 'https://assertai.com'
                },
                services: ['Computer vision', 'Edge AI', 'Video analytics'],
                match_score: 92
            },
            {
                id: 'ai-ml-5',
                name: 'Softlabs Group',
                description: 'Custom AI/CV solutions, private LLM deployment, agentic AI, n8n workflow automation',
                rating: 4.8,
                location: 'Mumbai (Lower Parel)',
                contact: {
                    email: 'info@softlabsgroup.com',
                    phone: '',
                    website: 'https://softlabsgroup.com'
                },
                services: ['PyTorch', 'TensorFlow', 'LangChain', 'AutoGen', 'n8n', 'OpenCV'],
                match_score: 92
            },
            {
                id: 'ai-ml-6',
                name: 'BuzzyBrains Software',
                description: 'AI/ML development, generative AI, agentic AI, data engineering services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@buzzybrains.com',
                    phone: '',
                    website: 'https://buzzybrains.com'
                },
                services: ['Python', 'TensorFlow', 'PyTorch', 'MongoDB', 'AWS'],
                match_score: 92
            },
            {
                id: 'ai-ml-7',
                name: 'Predikly',
                description: 'AI/ML-powered data platforms, data monetization solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@predikly.com',
                    phone: '',
                    website: 'https://predikly.com'
                },
                services: ['ML', 'Predictive modeling', 'Advanced analytics'],
                match_score: 92
            },
            {
                id: 'ai-ml-8',
                name: 'AI India Innovation',
                description: 'Generative AI, computer vision, NLP, n8n workflow automation services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@aiindia.ai',
                    phone: '',
                    website: 'https://aiindia.ai'
                },
                services: ['Python', 'Deep learning', 'CV', 'n8n'],
                match_score: 92
            },
            {
                id: 'ai-ml-9',
                name: 'Digital AIML',
                description: 'AI-powered automation, chatbots, predictive analytics implementation',
                rating: 4.8,
                location: 'Warje, Pune',
                contact: {
                    email: 'info@digitalaiml.com',
                    phone: '',
                    website: 'https://digitalaiml.com'
                },
                services: ['AI/ML', 'Chatbot development', 'Process automation'],
                match_score: 92
            },
            {
                id: 'ai-ml-10',
                name: 'Kreeda Labs',
                description: 'Agentic AI, conversational AI, generative AI solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@kreedalabs.com',
                    phone: '',
                    website: 'https://kreedalabs.com'
                },
                services: ['AI/ML', 'GenAI', 'NLP', 'Python'],
                match_score: 92
            },
            {
                id: 'ai-ml-11',
                name: 'Saviant Consulting',
                description: 'Industrial IoT with AI-ML, predictive maintenance, digital twins',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@saviantconsulting.com',
                    phone: '',
                    website: 'https://saviantconsulting.com'
                },
                services: ['Azure IoT', 'AI/ML', 'Edge computing'],
                match_score: 92
            },
            {
                id: 'ai-ml-12',
                name: 'Ellicium Solutions',
                description: 'Big data, text analytics, ML-based data management solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@ellicium.com',
                    phone: '',
                    website: 'https://ellicium.com'
                },
                services: ['ML', 'NLP', 'Big data', 'RPA'],
                match_score: 92
            },
            {
                id: 'ai-ml-13',
                name: 'SG Analytics',
                description: 'AI-powered data analytics, investment research, GenAI services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@sganalytics.com',
                    phone: '',
                    website: 'https://sganalytics.com'
                },
                services: ['AI/ML', 'NLP', 'Data engineering', 'BI'],
                match_score: 92
            },
            {
                id: 'ai-ml-14',
                name: 'ScatterPie Analytics',
                description: 'Data analytics consulting, predictive modeling, geospatial analytics',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@scatterpie.io',
                    phone: '',
                    website: 'https://scatterpie.io'
                },
                services: ['Tableau', 'Python', 'QGIS', 'Power BI'],
                match_score: 92
            },
            {
                id: 'ai-ml-15',
                name: 'Synkrama Technologies',
                description: 'AI/ML consulting, NLP, IoT with ML, chatbot development',
                rating: 4.8,
                location: 'Gultekdi, Pune',
                contact: {
                    email: 'info@synkrama.com',
                    phone: '',
                    website: 'https://synkrama.com'
                },
                services: ['ML', 'NLP', 'Deep learning', 'Data mining'],
                match_score: 92
            },
            {
                id: 'ai-ml-16',
                name: 'Dsmatics',
                description: 'Computer vision, AI for Industry 4.0, predictive analytics for manufacturing',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@dsmatics.com',
                    phone: '',
                    website: 'https://dsmatics.com'
                },
                services: ['CV', 'Deep learning', 'Image processing'],
                match_score: 92
            },
        ]
    },
    {
        id: 'software-services',
        title: 'Software Services',
        description: 'Application development',
        icon_name: 'Code' as any,
        companies: [
            {
                id: 'software-services-1',
                name: 'Persistent Systems',
                description: 'Digital engineering, enterprise modernization, cloud transformation, product engineering',
                rating: 4.8,
                location: 'Pune (HQ)',
                contact: {
                    email: 'info@persistent.com',
                    phone: '',
                    website: 'https://persistent.com'
                },
                services: ['AI/ML', 'Cloud', 'Full-stack', 'Cybersecurity'],
                match_score: 92
            },
            {
                id: 'software-services-2',
                name: 'Cybage Software',
                description: 'Outsourced product engineering, RPA, cloud services for ISVs',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@cybage.com',
                    phone: '',
                    website: 'https://cybage.com'
                },
                services: ['AI/ML', 'Cloud', 'Data engineering', 'RPA'],
                match_score: 92
            },
            {
                id: 'software-services-3',
                name: 'Talentica Software',
                description: 'Software product development, offshore dev centers, generative AI for startups',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@talentica.com',
                    phone: '',
                    website: 'https://talentica.com'
                },
                services: ['AI/ML', 'Cloud', 'DevOps', 'IoT', 'AR/VR'],
                match_score: 92
            },
            {
                id: 'software-services-4',
                name: 'Josh Software',
                description: 'Custom web/mobile development, fintech solutions, no-code platforms',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@joshsoftware.com',
                    phone: '',
                    website: 'https://joshsoftware.com'
                },
                services: ['Ruby on Rails', 'Go', 'Flutter', 'Node.js', 'React'],
                match_score: 92
            },
            {
                id: 'software-services-5',
                name: 'Harbinger Group',
                description: 'AI-powered product engineering, eLearning platforms, HR tech solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@harbingergroup.com',
                    phone: '',
                    website: 'https://harbingergroup.com'
                },
                services: ['AI/ML', 'GenAI', 'LLM frameworks'],
                match_score: 92
            },
            {
                id: 'software-services-6',
                name: 'Mobisoft Infotech',
                description: 'Custom software, mobile apps, AI, IoT, DevOps services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@mobisoftinfotech.com',
                    phone: '',
                    website: 'https://mobisoftinfotech.com'
                },
                services: ['iOS', 'Android', 'React Native', 'Flutter', 'AI/ML'],
                match_score: 92
            },
            {
                id: 'software-services-7',
                name: 'Wednesday Solutions',
                description: 'Product engineering, cloud consulting, data engineering for unicorns',
                rating: 4.8,
                location: 'Wanowrie, Pune',
                contact: {
                    email: 'hello@wednesday.is',
                    phone: '',
                    website: 'https://wednesday.is'
                },
                services: ['React', 'Node.js', 'Golang', 'Python', 'Flutter', 'K8s'],
                match_score: 92
            },
            {
                id: 'software-services-8',
                name: 'iauro Systems',
                description: 'Cloud-native apps, microservices, DevOps, design thinking, AI/ML, IoT',
                rating: 4.8,
                location: 'Shivajinagar, Pune',
                contact: {
                    email: 'info@iauro.com',
                    phone: '',
                    website: 'https://iauro.com'
                },
                services: ['AWS', 'GCP', 'Azure', 'Docker', 'K8s', 'Serverless'],
                match_score: 92
            },
            {
                id: 'software-services-9',
                name: 'ProtoTech Solutions',
                description: '3D engineering software, Autodesk platform services, custom CAD plugins',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@prototechsolutions.com',
                    phone: '',
                    website: 'https://prototechsolutions.com'
                },
                services: ['Autodesk APIs (Fusion', 'AutoCAD', 'Revit', 'Inventor)'],
                match_score: 92
            },
            {
                id: 'software-services-10',
                name: 'Clarion Technologies',
                description: 'Custom AI development, intelligent software products for SMEs',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@clariontech.com',
                    phone: '',
                    website: 'https://clariontech.com'
                },
                services: ['AI/ML', 'Custom software', 'Cloud'],
                match_score: 92
            },
            {
                id: 'software-services-11',
                name: 'Sphinx Solutions',
                description: 'Custom software, mobile apps, AI/ML, RPA, IoT, blockchain',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@sphinx-solution.com',
                    phone: '',
                    website: 'https://sphinx-solution.com'
                },
                services: ['iOS', 'Android', 'Flutter', 'React Native', 'Blockchain'],
                match_score: 92
            },
            {
                id: 'software-services-12',
                name: 'Kalpak Solutions',
                description: 'Custom software, ERP, CRM, Flutter mobile applications',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@kalpaksolutions.com',
                    phone: '',
                    website: 'https://kalpaksolutions.com'
                },
                services: ['Flutter', 'Web technologies', 'Custom ERP'],
                match_score: 92
            },
            {
                id: 'software-services-13',
                name: 'Codevian Technologies',
                description: 'AI/ML, web/mobile development, cloud, Salesforce implementation',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@codevian.com',
                    phone: '',
                    website: 'https://codevian.com'
                },
                services: ['AI/ML', 'Cloud', 'Salesforce'],
                match_score: 92
            },
            {
                id: 'software-services-14',
                name: 'SimpliSage Technologies',
                description: 'Custom software, SaaS platforms, e-commerce development',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@simplisage.com',
                    phone: '',
                    website: 'https://simplisage.com'
                },
                services: ['React', 'Node.js', 'Cloud'],
                match_score: 92
            },
            {
                id: 'software-services-15',
                name: 'Hybrowlabs Technologies',
                description: 'Full product development, prototyping, design-to-code implementation',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@hybrowlabs.com',
                    phone: '',
                    website: 'https://hybrowlabs.com'
                },
                services: ['Full-stack development'],
                match_score: 92
            },
            {
                id: 'software-services-16',
                name: 'Mplussoft',
                description: 'Software development, mobile apps, ERP, eCommerce solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@mplussoft.com',
                    phone: '',
                    website: 'https://mplussoft.com'
                },
                services: ['Full-stack web', 'Mobile', 'ERP/CRM'],
                match_score: 92
            },
            {
                id: 'software-services-17',
                name: 'Unico Connect',
                description: 'Custom engineering combined with no-code builds, web/mobile apps',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@unicoconnect.com',
                    phone: '',
                    website: 'https://unicoconnect.com'
                },
                services: ['Custom code + Bubble', 'Webflow'],
                match_score: 92
            },
            {
                id: 'software-services-18',
                name: 'Associative',
                description: 'Custom software, IoT, AI, Web3/blockchain, wearable applications',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@associative.in',
                    phone: '',
                    website: 'https://associative.in'
                },
                services: ['Node.js', 'Java', 'Ethereum', 'Solidity', 'Spring Boot'],
                match_score: 92
            },
            {
                id: 'software-services-19',
                name: 'EncureIT Systems',
                description: 'Generative AI, MLOps, mobile apps, no-code automation',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@encureit.com',
                    phone: '',
                    website: 'https://encureit.com'
                },
                services: ['AI/ML', 'GenAI', 'MLOps', 'No-code'],
                match_score: 92
            },
            {
                id: 'software-services-20',
                name: 'Agnotic Technologies',
                description: 'Product development for regulated sectors - healthcare, fintech',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@agnotic.com',
                    phone: '',
                    website: 'https://agnotic.com'
                },
                services: ['Technology-agnostic approach'],
                match_score: 92
            },
            {
                id: 'software-services-21',
                name: 'Plexusbit Software',
                description: 'IoT product development, smart devices, fleet management systems',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@plexusbit.com',
                    phone: '',
                    website: 'https://plexusbit.com'
                },
                services: ['IoT', 'Embedded systems', 'Mobile', 'Web'],
                match_score: 92
            },
            {
                id: 'software-services-22',
                name: 'Sankey Solutions',
                description: 'Custom software, data engineering, AI/ML, product design, innovation lab',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@sankeysolutions.com',
                    phone: '',
                    website: 'https://sankeysolutions.com'
                },
                services: ['Full-stack', 'AI/ML', 'Data engineering'],
                match_score: 92
            },
            {
                id: 'software-services-23',
                name: 'Navsoft',
                description: 'Software development, AI/computer vision, eCommerce, CRM/ERP implementation',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@thenavsoft.com',
                    phone: '',
                    website: 'https://thenavsoft.com'
                },
                services: ['MS Dynamics NAV', 'Salesforce', 'AI/CV'],
                match_score: 92
            },
            {
                id: 'software-services-24',
                name: 'Cloudesign Technology',
                description: 'Product engineering, BI, AI, cloud, data warehousing solutions',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@cloudesign.com',
                    phone: '',
                    website: 'https://cloudesign.com'
                },
                services: ['AI', 'Cloud', 'Mobile', 'BI'],
                match_score: 92
            },
            {
                id: 'software-services-25',
                name: 'Rococo Consultant',
                description: 'Custom software, ERPs, CRMs, B2B/B2C platforms, eCommerce',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@rocococonsultant.com',
                    phone: '',
                    website: 'https://rocococonsultant.com'
                },
                services: ['Full-stack web', 'Mobile'],
                match_score: 92
            },
            {
                id: 'software-services-26',
                name: 'Iqonic Design',
                description: 'Cross-platform OTT applications, mobile apps, web development',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@iqonic.design',
                    phone: '',
                    website: 'https://iqonic.design'
                },
                services: ['Cross-platform development'],
                match_score: 92
            },
            {
                id: 'software-services-27',
                name: 'WovVTech',
                description: 'aPaaS platform development, AI/ML-powered products',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@wovvtech.com',
                    phone: '',
                    website: 'https://wovvtech.com'
                },
                services: ['AI', 'ML', 'Cloud', 'Patent-pending aPaaS'],
                match_score: 92
            },
            {
                id: 'software-services-28',
                name: 'Cymetrix Infotech',
                description: 'CRM consulting, custom software, marketing analytics',
                rating: 4.8,
                location: 'WeWork BKC, Mumbai',
                contact: {
                    email: 'info@cymetrix.com',
                    phone: '',
                    website: 'https://cymetrix.com'
                },
                services: ['Cloud-based CRM platforms'],
                match_score: 92
            },
        ]
    },
    {
        id: 'industry-40',
        title: 'Industry 4.0 & Automation',
        description: 'Robotics and smart manufacturing',
        icon_name: 'Factory' as any,
        companies: [
            {
                id: 'industry-40-1',
                name: 'Wipro PARI',
                description: 'Turnkey industrial automation, robot integration, digital factory solutions',
                rating: 4.8,
                location: 'Pune (HQ)',
                contact: {
                    email: 'info@wipropari.com',
                    phone: '',
                    website: 'https://wipropari.com'
                },
                services: ['Siemens Tecnomatix', 'ABB/FANUC/KUKA robots', 'PLC', 'RFID', 'Vision'],
                match_score: 92
            },
            {
                id: 'industry-40-2',
                name: 'Cybernetik Technologies',
                description: 'Process/packaging automation, CleanTech, defence, custom robotics, EV battery assembly',
                rating: 4.8,
                location: 'Urawade, Pune',
                contact: {
                    email: 'info@cybernetik.com',
                    phone: '',
                    website: 'https://cybernetik.com'
                },
                services: ['Custom machine design', 'Robotic palletizers'],
                match_score: 92
            },
            {
                id: 'industry-40-3',
                name: 'Automators Industrial Projects (AIP)',
                description: 'PLC/SCADA/HMI programming, MES, robotics integration, energy automation',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@aippal.com',
                    phone: '',
                    website: 'https://aippal.com'
                },
                services: ['Siemens PCS7', 'EPLAN', 'No-code PLC libraries'],
                match_score: 92
            },
            {
                id: 'industry-40-4',
                name: 'Messung Systems',
                description: 'India\'s first indigenous PLC manufacturer, factory/building automation',
                rating: 4.8,
                location: 'Viman Nagar, Pune',
                contact: {
                    email: 'info@messung.com',
                    phone: '',
                    website: 'https://messung.com'
                },
                services: ['XMPRO-10 PLC', 'VFDs', 'Servo drives', 'HMI', 'SCADA', 'KNX'],
                match_score: 92
            },
            {
                id: 'industry-40-5',
                name: 'Pinnacle Industrial Controls',
                description: 'System integration, PLC/HMI/SCADA, control panel manufacturing',
                rating: 4.8,
                location: 'Andheri, Mumbai',
                contact: {
                    email: 'info@pinnacle-controls.com',
                    phone: '',
                    website: 'https://pinnacle-controls.com'
                },
                services: ['Schneider Electric', 'Delta', 'Fuji', 'Panasonic', 'Machine vision', 'Cobots'],
                match_score: 92
            },
            {
                id: 'industry-40-6',
                name: 'iPAC Automation',
                description: 'DCS/PLC/SCADA engineering, field instrumentation, FEED studies',
                rating: 4.8,
                location: 'Chinchwad (Pune) + Vashi (Mumbai)',
                contact: {
                    email: 'info@ipacautomation.com',
                    phone: '',
                    website: 'https://ipacautomation.com'
                },
                services: ['Honeywell TPS', 'Siemens', 'Rockwell', 'Schneider', 'Mitsubishi'],
                match_score: 92
            },
            {
                id: 'industry-40-7',
                name: 'Teklogica Control Systems',
                description: 'PLC/DCS, drive engineering, HMI/SCADA, control panels',
                rating: 4.8,
                location: 'MIDC Ambad, Nashik',
                contact: {
                    email: 'info@teklogicagroup.com',
                    phone: '',
                    website: 'https://teklogicagroup.com'
                },
                services: ['PLC', 'VFD', 'HMI', 'SCADA', 'MCC/PCC panels'],
                match_score: 92
            },
            {
                id: 'industry-40-8',
                name: 'Stretto Automation',
                description: 'SCADA, HMI, PLC automation, Schneider distribution',
                rating: 4.8,
                location: 'Sinhagad Road, Pune',
                contact: {
                    email: 'info@strettoindia.com',
                    phone: '',
                    website: 'https://strettoindia.com'
                },
                services: ['Schneider PLCs', 'Intellution iFIX SCADA'],
                match_score: 92
            },
            {
                id: 'industry-40-9',
                name: 'M-Matic Automation',
                description: 'Siemens PLC/SCADA services, system integration',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@mmatic.in',
                    phone: '',
                    website: 'https://mmatic.in'
                },
                services: ['Siemens PLC', 'WinCC', 'HMI'],
                match_score: 92
            },
            {
                id: 'industry-40-10',
                name: 'Ecosys Efficiencies',
                description: 'Multi-brand SCADA/PLC manufacturing and integration',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@ecosysglobal.co.in',
                    phone: '',
                    website: 'https://ecosysglobal.co.in'
                },
                services: ['Allen Bradley', 'Siemens WinCC', 'Mitsubishi', 'Schneider'],
                match_score: 92
            },
            {
                id: 'industry-40-11',
                name: 'Trimasys Control Solutions',
                description: 'IIoT, smart SCADA, BMS, robotics, E&I projects',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@trimasyscontrol.com',
                    phone: '',
                    website: 'https://trimasyscontrol.com'
                },
                services: ['Siemens System House', 'Honeywell BMS Partner'],
                match_score: 92
            },
            {
                id: 'industry-40-12',
                name: 'Stride Automation',
                description: 'Industrial/power automation, SCADA, PLC, VFD, substation automation',
                rating: 4.8,
                location: 'Nagpur',
                contact: {
                    email: 'info@strideautomation.com',
                    phone: '',
                    website: 'https://strideautomation.com'
                },
                services: ['PLC/SCADA/DCS', 'Substation automation'],
                match_score: 92
            },
            {
                id: 'industry-40-13',
                name: 'Vedant Engineering',
                description: 'Machine vision, LabVIEW programming, IoT gateways, industrial automation',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@vedantengineering.in',
                    phone: '',
                    website: 'https://vedantengineering.in'
                },
                services: ['PLC/SCADA', 'NI LabVIEW', 'Embedded electronics'],
                match_score: 92
            },
            {
                id: 'industry-40-14',
                name: 'Phinix Automation',
                description: 'SPMs, process automation, material handling, conveyors',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@phinixautomation.com',
                    phone: '',
                    website: 'https://phinixautomation.com'
                },
                services: ['Mechanical + Electrical + Instrumentation + IT'],
                match_score: 92
            },
            {
                id: 'industry-40-15',
                name: 'ELEE Automation',
                description: 'PLC/DCS/SCADA/CNC programming, electrical engineering',
                rating: 4.8,
                location: 'MIDC Ambad, Nashik',
                contact: {
                    email: 'info@eleeautomation.com',
                    phone: '',
                    website: 'https://eleeautomation.com'
                },
                services: ['All major PLC brands', 'AutoCAD/E-plan'],
                match_score: 92
            },
            {
                id: 'industry-40-16',
                name: 'Geometrix Automation & Robotic',
                description: 'Turnkey robotic solutions, laser cutting, welding, machine tending',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@geometrixar.com',
                    phone: '',
                    website: 'https://geometrixar.com'
                },
                services: ['Robot integration', 'Laser systems'],
                match_score: 92
            },
            {
                id: 'industry-40-17',
                name: 'ERAA (Excellence Robotics)',
                description: 'Robotic work cells for spot/MIG welding, assembly, inspection',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@eraa.in',
                    phone: '',
                    website: 'https://industrialautomationindia.in'
                },
                services: ['Welding robots', 'Work cells'],
                match_score: 92
            },
            {
                id: 'industry-40-18',
                name: 'Robtech Automation',
                description: 'Parallel robotic solutions, turnkey automation systems',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@robtechautomation.in',
                    phone: '',
                    website: 'https://robtechautomation.in'
                },
                services: ['Parallel robots', 'Custom automation'],
                match_score: 92
            },
            {
                id: 'industry-40-19',
                name: 'Oro Robotics',
                description: 'AI & control systems for robotics, IoT integration',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@ororobotics.com',
                    phone: '',
                    website: 'https://ororobotics.com'
                },
                services: ['AI', 'Robotics', 'IoT'],
                match_score: 92
            },
            {
                id: 'industry-40-20',
                name: 'Unbox Robotics',
                description: 'AI-powered parcel sorting robots for e-commerce logistics',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@unboxrobotics.com',
                    phone: '',
                    website: 'https://unboxrobotics.com'
                },
                services: ['Mobile robots', 'AI', 'Computer vision'],
                match_score: 92
            },
            {
                id: 'industry-40-21',
                name: 'Robolab Technologies',
                description: 'Robotics & automation lab solutions for educational institutions',
                rating: 4.8,
                location: 'Pune (COEP incubated)',
                contact: {
                    email: 'info@robolab.in',
                    phone: '',
                    website: 'https://robolab.in'
                },
                services: ['Educational robotics', 'Lab equipment'],
                match_score: 92
            },
            {
                id: 'industry-40-22',
                name: 'Wolfox Services',
                description: 'Software development combined with robotics and IT managed services',
                rating: 4.8,
                location: 'Kolhapur',
                contact: {
                    email: 'info@wolfox.in',
                    phone: '',
                    website: 'https://wolfox.in'
                },
                services: ['Software', 'Robotics', 'IT services'],
                match_score: 92
            },
        ]
    },
    {
        id: 'electronics',
        title: 'Electronics & Hard-Tech',
        description: 'PCB and electronics',
        icon_name: 'Cpu' as any,
        companies: [
            {
                id: 'electronics-1',
                name: 'Inditronics',
                description: 'Custom IoT product development, electronics design, PCB, firmware, manufacturing',
                rating: 4.8,
                location: 'WTC Kharadi, Pune',
                contact: {
                    email: 'info@inditronics.com',
                    phone: '',
                    website: 'https://inditronics.com'
                },
                services: ['STM32', 'Renesas', 'TI', 'NXP MCUs; Embedded Linux', 'RTOS; GSM', 'BLE', 'LoRa', 'Wi-Fi'],
                match_score: 92
            },
            {
                id: 'electronics-2',
                name: 'MAPYN Technologies',
                description: 'Product engineering - electronics + embedded software development',
                rating: 4.8,
                location: 'Baner, Pune',
                contact: {
                    email: 'info@mapyn.com',
                    phone: '',
                    website: 'https://mapyn.com'
                },
                services: ['Analog/digital electronics', 'Embedded/host software'],
                match_score: 92
            },
            {
                id: 'electronics-3',
                name: 'SPJ Embedded Technology',
                description: 'Hardware design, firmware development, testing, volume production optimization',
                rating: 4.8,
                location: 'Kothrud, Pune',
                contact: {
                    email: 'info@spjsystems.com',
                    phone: '',
                    website: 'https://spjsystems.com'
                },
                services: ['Schematic to PCB', 'Embedded testing', 'Agri IoT'],
                match_score: 92
            },
            {
                id: 'electronics-4',
                name: 'Crystaline Infotek',
                description: 'End-to-end embedded product development - hardware + firmware',
                rating: 4.8,
                location: 'Baner, Pune',
                contact: {
                    email: 'info@crystalineinfotek.com',
                    phone: '',
                    website: 'https://crystalineinfotek.com'
                },
                services: ['100+ man-years development experience'],
                match_score: 92
            },
            {
                id: 'electronics-5',
                name: 'Shidore Microsys Electronics',
                description: 'Electronics design, battery chargers/testers, EV chargers, data loggers',
                rating: 4.8,
                location: 'Kothrud, Pune',
                contact: {
                    email: 'info@shidoremicrosys.in',
                    phone: '',
                    website: 'https://shidoremicrosys.in'
                },
                services: ['PCB design', 'Power electronics'],
                match_score: 92
            },
            {
                id: 'electronics-6',
                name: 'EmbedCrest Technology',
                description: 'Embedded systems, IoT, Edge AI, TinyML, firmware development',
                rating: 4.8,
                location: 'Kalyan (Mumbai metro)',
                contact: {
                    email: 'info@embedcrest.com',
                    phone: '',
                    website: 'https://embedcrest.com'
                },
                services: ['BLE', 'LoRaWAN', 'NB-IoT; AWS/Azure IoT; CAN', 'LIN', 'FlexRay'],
                match_score: 92
            },
            {
                id: 'electronics-7',
                name: 'Shogini Technoarts',
                description: 'PCB manufacturing - 32,000 sq m facility; 45+ years experience',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@shogini.com',
                    phone: '',
                    website: 'https://shogini.com'
                },
                services: ['PCB fabrication', 'Multi-layer PCBs'],
                match_score: 92
            },
            {
                id: 'electronics-8',
                name: 'MRK Electronics',
                description: 'PCB layout design, fabrication (single to multi-layer), assembly, SMT',
                rating: 4.8,
                location: 'Chakan/Bhosari, Pune',
                contact: {
                    email: 'info@mrkelectronics.com',
                    phone: '',
                    website: 'https://mrkelectronics.com'
                },
                services: ['PCB design', 'Fabrication', 'Assembly'],
                match_score: 92
            },
            {
                id: 'electronics-9',
                name: 'Hans Cag Electronics',
                description: 'PCB design (37+ years experience) and manufacturing',
                rating: 4.8,
                location: 'Dhayari, Pune',
                contact: {
                    email: 'info@hanscagelectronics.com',
                    phone: '',
                    website: 'https://hanscagelectronics.com'
                },
                services: ['PCB design', 'Manufacturing'],
                match_score: 92
            },
            {
                id: 'electronics-10',
                name: 'Simfisis Technologies',
                description: 'PCB manufacturing - single, double, MCPCB',
                rating: 4.8,
                location: 'Narhe, Pune',
                contact: {
                    email: 'info@simfisis.com',
                    phone: '',
                    website: 'https://simfisis.com'
                },
                services: ['PCB fabrication'],
                match_score: 92
            },
            {
                id: 'electronics-11',
                name: 'Alfa Electronics',
                description: 'PCB designing and testing/verification services',
                rating: 4.8,
                location: 'Sinhagad Road, Pune',
                contact: {
                    email: 'info@alfaelectronicsindia.com',
                    phone: '',
                    website: 'https://alfaelectronicsindia.com'
                },
                services: ['PCB design', 'Testing', 'Verification'],
                match_score: 92
            },
            {
                id: 'electronics-12',
                name: 'Vital Electronics',
                description: 'PCBA, SMT, electromechanical assembly, wire harnesses',
                rating: 4.8,
                location: 'Navi Mumbai',
                contact: {
                    email: 'info@vitalelectronics.co.in',
                    phone: '',
                    website: 'https://vitalelectronics.co.in'
                },
                services: ['PCB assembly', 'SMT', 'Wire harnesses'],
                match_score: 92
            },
            {
                id: 'electronics-13',
                name: 'Trend Electronics',
                description: 'Contract manufacturing - set-top boxes, flat panels, electronics',
                rating: 4.8,
                location: 'Aurangabad',
                contact: {
                    email: 'info@trendelectronics.in',
                    phone: '',
                    website: 'https://trendelectronics.in'
                },
                services: ['EMS', 'Large-scale production'],
                match_score: 92
            },
        ]
    },
    {
        id: 'manufacturing',
        title: 'Advanced Manufacturing',
        description: '3D printing and prototyping',
        icon_name: 'Layers' as any,
        companies: [
            {
                id: 'manufacturing-1',
                name: 'Imaginarium',
                description: 'India\'s largest 3D printing company - FDM, SLA, SLS, DMLS, CJP',
                rating: 4.8,
                location: 'Marol, Mumbai',
                contact: {
                    email: 'info@imaginarium.io',
                    phone: '',
                    website: 'https://imaginarium.io'
                },
                services: ['Multiple 3D printing technologies'],
                match_score: 92
            },
            {
                id: 'manufacturing-2',
                name: 'Kreate 3D',
                description: '3D printing services - FDM, SLA, SLS, MJF, DMLS',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@kreate3d.in',
                    phone: '',
                    website: 'https://kreate3d.in'
                },
                services: ['FDM', 'SLA', 'SLS', 'MJF', 'DMLS'],
                match_score: 92
            },
            {
                id: 'manufacturing-3',
                name: '3D Spectra Technologies',
                description: '3D printing, CNC machining, laser cutting, reverse engineering',
                rating: 4.8,
                location: 'Bhosari, Pune',
                contact: {
                    email: 'info@3dspectratech.com',
                    phone: '',
                    website: 'https://3dspectratech.com'
                },
                services: ['3D printing', 'CNC', 'Laser cutting', 'Reverse engineering'],
                match_score: 92
            },
            {
                id: 'manufacturing-4',
                name: '3Deometry',
                description: '3D printing, VMC machining, injection molding; also manufactures 3D printers',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@3deometry.com',
                    phone: '',
                    website: 'https://3deometry.com'
                },
                services: ['3D printing', 'CNC', 'Injection molding', 'Printer manufacturing'],
                match_score: 92
            },
            {
                id: 'manufacturing-5',
                name: 'Amuse3D',
                description: 'FDM, SLS, metal 3D printing (aluminum, titanium); 24hr urgent dispatch',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@amuse3d.in',
                    phone: '',
                    website: 'https://amuse3d.in'
                },
                services: ['FDM', 'SLS', 'Metal 3D printing'],
                match_score: 92
            },
        ]
    },
    {
        id: 'iot',
        title: 'IoT & Edge Computing',
        description: 'IoT platforms and solutions',
        icon_name: 'Wifi' as any,
        companies: [
            {
                id: 'iot-1',
                name: 'Ascent Intellimation',
                description: 'PlantConnect IIoT platform - SFactory, RAMS, EnviroConnect modules',
                rating: 4.8,
                location: 'Kothrud, Pune',
                contact: {
                    email: 'info@aiplindia.com',
                    phone: '',
                    website: 'https://aiplindia.com'
                },
                services: ['Edge to cloud', 'IoT analytics'],
                match_score: 92
            },
            {
                id: 'iot-2',
                name: 'Entrib / ShopWorx',
                description: 'Manufacturing shop-floor IoT analytics - gateways + cloud analytics',
                rating: 4.8,
                location: 'Baner, Pune',
                contact: {
                    email: 'info@shopworx.io',
                    phone: '',
                    website: 'https://shopworx.io'
                },
                services: ['IoT gateway', 'Cloud analytics'],
                match_score: 92
            },
            {
                id: 'iot-3',
                name: 'Maven Systems (MosChip)',
                description: 'End-to-end M2M/IoT - smart lighting, metering, fleet management',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@mavensystems.com',
                    phone: '',
                    website: 'https://mavensystems.com'
                },
                services: ['IoT hardware', 'Cloud platform'],
                match_score: 92
            },
            {
                id: 'iot-4',
                name: 'Resonating Mindz',
                description: 'Predictive maintenance, defence IoT - submarine systems, machine monitoring',
                rating: 4.8,
                location: 'Warje, Pune',
                contact: {
                    email: 'info@resonatingmindz.com',
                    phone: '',
                    website: 'https://resonatingmindz.com'
                },
                services: ['IoT sensors', 'Edge analytics', 'OEE'],
                match_score: 92
            },
            {
                id: 'iot-5',
                name: 'Vighnaharta Technologies',
                description: 'LoRa/IoT sensor & gateway manufacturer - BinConnect, fire/gas detection',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@vighnaharta.in',
                    phone: '',
                    website: 'https://vighnaharta.in'
                },
                services: ['LoRa sensors', 'Gateways', 'Fire detection'],
                match_score: 92
            },
            {
                id: 'iot-6',
                name: 'KLED IoT Sensing',
                description: 'LoRaWAN gateway manufacturing - KL56, KL63, KL65, KUG67 series',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@kledmeasurement.in',
                    phone: '',
                    website: 'https://kledmeasurement.in'
                },
                services: ['LoRaWAN gateways'],
                match_score: 92
            },
            {
                id: 'iot-7',
                name: 'Winjit Technologies',
                description: 'AI/ML + IoT platform development - IoTSense, PredictSense (auto ML)',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@winjit.com',
                    phone: '',
                    website: 'https://winjit.com'
                },
                services: ['IoT platform', 'AI/ML', 'Auto ML'],
                match_score: 92
            },
        ]
    },
    {
        id: 'dt',
        title: 'Digital Transformation',
        description: 'RPA and enterprise processes',
        icon_name: 'TrendingUp' as any,
        companies: [
            {
                id: 'dt-1',
                name: 'Digital Pilots',
                description: 'AI automation workflows, no-code automation implementation',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@digitalpilots.in',
                    phone: '',
                    website: 'https://digitalpilots.in'
                },
                services: ['AI workflows', 'No-code platforms'],
                match_score: 92
            },
            {
                id: 'dt-2',
                name: 'Accelirate',
                description: 'UiPath implementation with 200+ certified professionals',
                rating: 4.8,
                location: 'Ganeshkhind Road, Pune',
                contact: {
                    email: 'info@accelirate.com',
                    phone: '',
                    website: 'https://accelirate.com'
                },
                services: ['UiPath RPA'],
                match_score: 92
            },
            {
                id: 'dt-3',
                name: 'MicroGenesis (MGTechsoft)',
                description: 'UiPath, Automation Anywhere, Blue Prism, Power Automate implementation',
                rating: 4.8,
                location: 'Pune + Mumbai',
                contact: {
                    email: 'info@mgtechsoft.com',
                    phone: '',
                    website: 'https://mgtechsoft.com'
                },
                services: ['Multiple RPA platforms'],
                match_score: 92
            },
            {
                id: 'dt-4',
                name: 'Tangentia',
                description: 'Multiple RPA platforms for finance, HR, compliance automation',
                rating: 4.8,
                location: 'Mumbai + Pune',
                contact: {
                    email: 'info@tangentia.com',
                    phone: '',
                    website: 'https://tangentia.com'
                },
                services: ['RPA', 'Process automation'],
                match_score: 92
            },
            {
                id: 'dt-5',
                name: 'Valiance Solutions',
                description: 'AI & data engineering-driven digital transformation',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@valiance.com',
                    phone: '',
                    website: 'https://valiance.com'
                },
                services: ['AI', 'Data engineering'],
                match_score: 92
            },
            {
                id: 'dt-6',
                name: 'CyberMeru Technologies',
                description: 'Enterprise automation, Interview-as-a-Service platform',
                rating: 4.8,
                location: 'Kothrud, Pune',
                contact: {
                    email: 'info@cybermeru.com',
                    phone: '',
                    website: 'https://cybermeru.com'
                },
                services: ['Automation', 'HR tech'],
                match_score: 92
            },
            {
                id: 'dt-7',
                name: 'Zerovaega Technologies',
                description: 'Digital transformation, AI, IoT, product engineering',
                rating: 4.8,
                location: 'Kolhapur',
                contact: {
                    email: 'info@zerovaega.com',
                    phone: '',
                    website: 'https://zerovaega.com'
                },
                services: ['AI', 'IoT', 'Product engineering'],
                match_score: 92
            },
        ]
    },
    {
        id: 'erp',
        title: 'Enterprise Resource Planning',
        description: 'ERP implementation partners',
        icon_name: 'Database' as any,
        companies: [
            {
                id: 'erp-1',
                name: 'Oodu Implementers',
                description: 'Odoo Gold Partner (first in India since 2010), 100+ implementations',
                rating: 4.8,
                location: 'Mundhwa, Pune',
                contact: {
                    email: 'info@odooimplementers.com',
                    phone: '',
                    website: 'https://odooimplementers.com'
                },
                services: ['Odoo ERP'],
                match_score: 92
            },
            {
                id: 'erp-2',
                name: 'iProgrammer Solutions',
                description: 'Odoo Ready Partner with web/mobile development and IT staffing',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@iprogrammer.com',
                    phone: '',
                    website: 'https://iprogrammer.com'
                },
                services: ['Odoo ERP', 'Web/Mobile'],
                match_score: 92
            },
            {
                id: 'erp-3',
                name: 'Globalteckz',
                description: 'Odoo Silver Partner and ERPNext implementation',
                rating: 4.8,
                location: 'Mumbai Central + Mira Road',
                contact: {
                    email: 'info@globalteckz.com',
                    phone: '',
                    website: 'https://globalteckz.com'
                },
                services: ['Odoo', 'ERPNext'],
                match_score: 92
            },
            {
                id: 'erp-4',
                name: 'EDEL TECH',
                description: 'SAP Business One, ECC, S/4HANA implementation',
                rating: 4.8,
                location: 'Nanded City, Pune',
                contact: {
                    email: 'info@edel-tech.com',
                    phone: '',
                    website: 'https://edel-tech.com'
                },
                services: ['SAP ERP'],
                match_score: 92
            },
            {
                id: 'erp-5',
                name: 'Onama Consultants',
                description: 'SAP S/4HANA, SAP ERP implementation for enterprises',
                rating: 4.8,
                location: 'Pune (HQ)',
                contact: {
                    email: 'info@onamagroup.com',
                    phone: '',
                    website: 'https://onamagroup.com'
                },
                services: ['SAP S/4HANA', 'SAP ERP'],
                match_score: 92
            },
            {
                id: 'erp-6',
                name: 'PTS Systems & Solutions',
                description: 'SAP Business One for SME digital transformation',
                rating: 4.8,
                location: 'Mumbai + Nagpur + Nashik',
                contact: {
                    email: 'info@ptssystems.co.in',
                    phone: '',
                    website: 'https://ptssystems.co.in'
                },
                services: ['SAP Business One'],
                match_score: 92
            },
            {
                id: 'erp-7',
                name: 'UG Infotek',
                description: 'SAP Business One implementation across Maharashtra',
                rating: 4.8,
                location: 'Thane + Pune + Sambhajinagar',
                contact: {
                    email: 'info@uginfotek.com',
                    phone: '',
                    website: 'https://uginfotek.com'
                },
                services: ['SAP Business One'],
                match_score: 92
            },
            {
                id: 'erp-8',
                name: 'Urteqi Technologies',
                description: 'SAP S/4HANA, Business One, BTP with AI capabilities',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@urteqi.com',
                    phone: '',
                    website: 'https://urteqi.com'
                },
                services: ['SAP', 'AI-powered ERP'],
                match_score: 92
            },
            {
                id: 'erp-9',
                name: 'DBM InfoTech',
                description: 'SAP Business One for manufacturing sector',
                rating: 4.8,
                location: 'Magarpatta, Pune',
                contact: {
                    email: 'info@dbminfotech.co.in',
                    phone: '',
                    website: 'https://dbminfotech.co.in'
                },
                services: ['SAP Business One'],
                match_score: 92
            },
            {
                id: 'erp-10',
                name: 'Ensivo Solutions',
                description: 'Certified SAP Partner for SME sector',
                rating: 4.8,
                location: 'Nagpur + Mumbai',
                contact: {
                    email: 'info@ensivosolutions.com',
                    phone: '',
                    website: 'https://ensivosolutions.com'
                },
                services: ['SAP Business One'],
                match_score: 92
            },
            {
                id: 'erp-11',
                name: 'Link Ideas Technologies',
                description: 'SAP Business One for manufacturing, pharma, retail',
                rating: 4.8,
                location: 'Nagpur',
                contact: {
                    email: 'info@litpl.com',
                    phone: '',
                    website: 'https://litpl.com'
                },
                services: ['SAP Business One'],
                match_score: 92
            },
            {
                id: 'erp-12',
                name: 'Intech Systems',
                description: 'Microsoft Dynamics 365 (Finance, SCM, Business Central, Sales)',
                rating: 4.8,
                location: 'Erandwane, Pune',
                contact: {
                    email: 'info@intech-systems.com',
                    phone: '',
                    website: 'https://intech-systems.com'
                },
                services: ['Microsoft Dynamics 365'],
                match_score: 92
            },
            {
                id: 'erp-13',
                name: 'Sunbridge Software',
                description: 'Microsoft Dynamics 365, AX, NAV implementation',
                rating: 4.8,
                location: 'Bavdhan, Pune',
                contact: {
                    email: 'info@sunbridgeglobal.com',
                    phone: '',
                    website: 'https://sunbridgeglobal.com'
                },
                services: ['Microsoft Dynamics 365', 'AX', 'NAV'],
                match_score: 92
            },
            {
                id: 'erp-14',
                name: 'NGenious Solutions',
                description: 'Dynamics 365 Business Central for various industries',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@ngenioussolutions.com',
                    phone: '',
                    website: 'https://ngenioussolutions.com'
                },
                services: ['Dynamics 365 Business Central'],
                match_score: 92
            },
            {
                id: 'erp-15',
                name: 'Datascan Information Systems',
                description: 'Proprietary MRP/ERP (Datascan Clarity) for manufacturing',
                rating: 4.8,
                location: 'Sadashiv Peth, Pune',
                contact: {
                    email: 'info@datascan.co.in',
                    phone: '',
                    website: 'https://datascan.co.in'
                },
                services: ['Custom MRP/ERP'],
                match_score: 92
            },
            {
                id: 'erp-16',
                name: 'PMTrack ERP (Cloud9 Technologies)',
                description: 'Manufacturing ERP with MRP, quality control modules',
                rating: 4.8,
                location: 'Pimpri, Pune + Nashik + Ahmednagar',
                contact: {
                    email: 'info@pmtrackerp.in',
                    phone: '',
                    website: 'https://pmtrackerp.in'
                },
                services: ['Cloud ERP', 'MRP', 'QC'],
                match_score: 92
            },
            {
                id: 'erp-17',
                name: 'Ideate Systems',
                description: 'Custom ERP development for specific industry needs',
                rating: 4.8,
                location: 'Sinhagad Road, Pune',
                contact: {
                    email: 'info@ideatesystemsindia.com',
                    phone: '',
                    website: 'https://ideatesystemsindia.com'
                },
                services: ['Custom ERP'],
                match_score: 92
            },
            {
                id: 'erp-18',
                name: 'eresource ERP',
                description: 'No-code AI ERP for manufacturing, construction, logistics',
                rating: 4.8,
                location: 'Wagle Estate, Thane',
                contact: {
                    email: 'info@eresourceerp.com',
                    phone: '',
                    website: 'https://eresourceerp.com'
                },
                services: ['No-code', 'AI-powered ERP'],
                match_score: 92
            },
            {
                id: 'erp-19',
                name: 'Lighthouse Info Systems',
                description: 'Custom ERP for manufacturing (steel, plastics, textiles)',
                rating: 4.8,
                location: 'Nagpur',
                contact: {
                    email: 'info@lighthouseindia.com',
                    phone: '',
                    website: 'https://lighthouseindia.com'
                },
                services: ['Custom ERP'],
                match_score: 92
            },
            {
                id: 'erp-20',
                name: 'Antraweb',
                description: 'Tally implementation and customization - 5,500+ implementations',
                rating: 4.8,
                location: 'Andheri, Mumbai',
                contact: {
                    email: 'info@antraweb.com',
                    phone: '',
                    website: 'https://antraweb.com'
                },
                services: ['Tally ERP'],
                match_score: 92
            },
            {
                id: 'erp-21',
                name: 'Datasoft',
                description: 'MRP modules within Tally for MSME manufacturers',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@datasoft-erp.com',
                    phone: '',
                    website: 'https://datasoft-erp.com'
                },
                services: ['Tally', 'MRP modules'],
                match_score: 92
            },
            {
                id: 'erp-22',
                name: 'Prism IT India',
                description: 'MRP module on Tally ERP 9 for manufacturers',
                rating: 4.8,
                location: 'Pune + Mumbai',
                contact: {
                    email: 'info@prismitindia.com',
                    phone: '',
                    website: 'https://prismitindia.com'
                },
                services: ['Tally ERP 9', 'MRP'],
                match_score: 92
            },
        ]
    },
    {
        id: 'cloud',
        title: 'Cloud & Infrastructure',
        description: 'DevOps and cloud migration',
        icon_name: 'Cloud' as any,
        companies: [
            {
                id: 'cloud-1',
                name: 'InfraCloud Technologies',
                description: 'First Kubernetes service provider in India - 51 CKA certified engineers',
                rating: 4.8,
                location: 'Pune (HQ)',
                contact: {
                    email: 'info@infracloud.io',
                    phone: '',
                    website: 'https://infracloud.io'
                },
                services: ['Kubernetes', 'Multi-cloud', 'CNCF'],
                match_score: 92
            },
            {
                id: 'cloud-2',
                name: 'Flentas Technologies',
                description: 'AWS Advanced Tier partner - cloud migration, IoT, GenAI',
                rating: 4.8,
                location: 'Koregaon Park, Pune',
                contact: {
                    email: 'info@flentas.com',
                    phone: '',
                    website: 'https://flentas.com'
                },
                services: ['AWS', 'IoT', 'GenAI'],
                match_score: 92
            },
            {
                id: 'cloud-3',
                name: 'Motifworks',
                description: 'Azure cloud migration, Kubernetes, IaC, analytics',
                rating: 4.8,
                location: 'Balewadi, Pune',
                contact: {
                    email: 'info@motifworks.com',
                    phone: '',
                    website: 'https://motifworks.com'
                },
                services: ['Azure', 'Kubernetes', 'IaC'],
                match_score: 92
            },
            {
                id: 'cloud-4',
                name: 'Expert Cloud Consulting',
                description: 'Kubernetes cluster management, cost optimization, high-scale architecture',
                rating: 4.8,
                location: 'Hinjewadi Phase-II, Pune',
                contact: {
                    email: 'info@expertcloudconsulting.com',
                    phone: '',
                    website: 'https://expertcloudconsulting.com'
                },
                services: ['AWS', 'Kubernetes'],
                match_score: 92
            },
            {
                id: 'cloud-5',
                name: 'IAMOPS',
                description: 'DevOps-as-a-Service, FinOps, NOC services',
                rating: 4.8,
                location: 'Viman Nagar, Pune',
                contact: {
                    email: 'info@iamops.io',
                    phone: '',
                    website: 'https://iamops.io'
                },
                services: ['Multi-cloud', 'DevOps', 'FinOps'],
                match_score: 92
            },
            {
                id: 'cloud-6',
                name: 'Xoriant',
                description: 'Platform engineering, AI-driven operations, digital transformation',
                rating: 4.8,
                location: 'Pune + Thane',
                contact: {
                    email: 'info@xoriant.com',
                    phone: '',
                    website: 'https://xoriant.com'
                },
                services: ['Multi-cloud', 'AI', 'Platform engineering'],
                match_score: 92
            },
            {
                id: 'cloud-7',
                name: 'Oneture Technologies',
                description: 'AWS Advanced partner for BFSI, serverless solutions',
                rating: 4.8,
                location: 'Thane, Mumbai',
                contact: {
                    email: 'info@oneture.com',
                    phone: '',
                    website: 'https://oneture.com'
                },
                services: ['AWS', 'Serverless'],
                match_score: 92
            },
            {
                id: 'cloud-8',
                name: 'CloudIBN',
                description: 'Azure + AWS cloud security, VAPT services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@cloudibn.com',
                    phone: '',
                    website: 'https://cloudibn.com'
                },
                services: ['Azure', 'AWS', 'Security', 'VAPT'],
                match_score: 92
            },
            {
                id: 'cloud-9',
                name: 'Quadrect Infotech',
                description: 'Multi-cloud infrastructure automation, DevOps implementation',
                rating: 4.8,
                location: 'Wanowrie, Pune',
                contact: {
                    email: 'info@quadrect.com',
                    phone: '',
                    website: 'https://quadrect.com'
                },
                services: ['Multi-cloud', 'DevOps'],
                match_score: 92
            },
            {
                id: 'cloud-10',
                name: 'cloudmantra',
                description: 'Cloud-native application development on AWS',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@cloudmantra.net',
                    phone: '',
                    website: 'https://cloudmantra.net'
                },
                services: ['AWS', 'Cloud-native'],
                match_score: 92
            },
            {
                id: 'cloud-11',
                name: 'Rapyder Cloud Solutions',
                description: 'Multi-cloud migration, GenAI on AWS',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@rapyder.com',
                    phone: '',
                    website: 'https://rapyder.com'
                },
                services: ['AWS', 'Multi-cloud', 'GenAI'],
                match_score: 92
            },
            {
                id: 'cloud-12',
                name: 'Hexaware Technologies',
                description: 'Enterprise digital transformation at scale - Amaze (cloud), Tensai (automation)',
                rating: 4.8,
                location: 'Navi Mumbai',
                contact: {
                    email: 'info@hexaware.com',
                    phone: '',
                    website: 'https://hexaware.com'
                },
                services: ['Multi-cloud', 'Automation'],
                match_score: 92
            },
            {
                id: 'cloud-13',
                name: 'LDS Infotech',
                description: 'Distinguished AWS Partner for enterprise cloud services',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@ldsinfotech.com',
                    phone: '',
                    website: 'https://ldsinfotech.com'
                },
                services: ['AWS'],
                match_score: 92
            },
            {
                id: 'cloud-14',
                name: 'Synoptek',
                description: 'Managed IT + digital transformation services',
                rating: 4.8,
                location: 'Viman Nagar, Pune',
                contact: {
                    email: 'info@synoptek.com',
                    phone: '',
                    website: 'https://synoptek.com'
                },
                services: ['Multi-cloud', 'Managed IT'],
                match_score: 92
            },
            {
                id: 'cloud-15',
                name: 'ESDS Software Solution',
                description: 'Patented eNlight Cloud platform, data center services',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@esds.co.in',
                    phone: '',
                    website: 'https://esds.co.in'
                },
                services: ['Proprietary cloud', 'Data centers'],
                match_score: 92
            },
        ]
    },
    {
        id: 'incubators',
        title: 'Incubator Portfolios',
        description: 'Leading deep-tech incubators',
        icon_name: 'Lightbulb' as any,
        companies: [
            {
                id: 'incubators-1',
                name: 'Zeus Numerix',
                description: 'CAE/CFD simulation software, precision guidance kits, UAV weaponization',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@zeusnumerix.com',
                    phone: '',
                    website: 'https://zeusnumerix.com'
                },
                services: ['CFD', 'Simulation', 'Guidance systems'],
                match_score: 92
            },
            {
                id: 'incubators-2',
                name: 'Babblebots.ai',
                description: 'Voice AI platform for automated interviews and assessments',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@babblebots.ai',
                    phone: '',
                    website: 'https://babblebots.ai'
                },
                services: ['Voice AI', 'NLP', 'Assessments'],
                match_score: 92
            },
            {
                id: 'incubators-3',
                name: 'Haystack Analytics',
                description: 'Genomics platform for clinical decision support',
                rating: 4.8,
                location: 'Mumbai',
                contact: {
                    email: 'info@haystackanalytics.in',
                    phone: '',
                    website: 'https://haystackanalytics.in'
                },
                services: ['Genomics', 'AI', 'Clinical decision support'],
                match_score: 92
            },
            {
                id: 'incubators-4',
                name: 'BMek',
                description: 'End-to-end IoT, AI & Big Data solutions - systems architecture',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@bmek.co.in',
                    phone: '',
                    website: 'https://bmek.co.in'
                },
                services: ['IoT', 'AI', 'Big Data', 'Systems design'],
                match_score: 92
            },
            {
                id: 'incubators-5',
                name: 'Matisoft Cyber Security Labs',
                description: 'AI-based cyber antivirus with patent-pending technology',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@matisoft.in',
                    phone: '',
                    website: 'https://matisoft.in'
                },
                services: ['AI', 'Antivirus', 'Patent-pending'],
                match_score: 92
            },
            {
                id: 'incubators-6',
                name: 'OmniBRx Biotechnologies',
                description: 'Single-use bioreactors for bioprocessing and vaccine manufacturing',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@omnibrx.in',
                    phone: '',
                    website: 'https://omnibrx.in'
                },
                services: ['Bioreactors', 'Bioprocessing'],
                match_score: 92
            },
            {
                id: 'incubators-7',
                name: 'Arishti CyberTech',
                description: 'Quantum cryptography messaging platform for secure communications',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@arishticybertech.com',
                    phone: '',
                    website: 'https://arishticybertech.com'
                },
                services: ['Quantum cryptography', 'Secure messaging'],
                match_score: 92
            },
            {
                id: 'incubators-8',
                name: 'Artiligent',
                description: 'AR/VR teleporting and behavioral insights solutions',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@artiligent.com',
                    phone: '',
                    website: 'https://artiligent.com'
                },
                services: ['AR', 'VR', 'Behavioral analytics'],
                match_score: 92
            },
            {
                id: 'incubators-9',
                name: '3DxAR',
                description: 'AR products bridging physical and virtual worlds',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@3dxar.com',
                    phone: '',
                    website: 'https://3dxar.com'
                },
                services: ['AR', 'Mixed reality'],
                match_score: 92
            },
            {
                id: 'incubators-10',
                name: 'Dynateq Consulting',
                description: 'Production process engineering, IIoT-enabled equipment',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@dynateqconsulting.com',
                    phone: '',
                    website: 'https://dynateqconsulting.com'
                },
                services: ['Process engineering', 'IIoT'],
                match_score: 92
            },
            {
                id: 'incubators-11',
                name: 'ASETS-LUX Consulting',
                description: 'Structural design solutions for energy sector',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@asetslux.com',
                    phone: '',
                    website: 'https://asetslux.com'
                },
                services: ['Structural design', 'Engineering'],
                match_score: 92
            },
        ]
    },
    {
        id: 'tier-2',
        title: 'Regional Leaders',
        description: 'Regional tech companies',
        icon_name: 'MapPin' as any,
        companies: [
            {
                id: 'tier-2-1',
                name: 'Infocepts',
                description: 'Data analytics and AI/ML - highest Gartner Peer Insights rating 3 years running',
                rating: 4.8,
                location: 'Nagpur',
                contact: {
                    email: 'info@infocepts.com',
                    phone: '',
                    website: 'https://infocepts.ai'
                },
                services: ['Data analytics', 'AI/ML'],
                match_score: 92
            },
            {
                id: 'tier-2-2',
                name: 'Novatech Software',
                description: 'Product engineering - 100% export oriented',
                rating: 4.8,
                location: 'Nagpur',
                contact: {
                    email: 'info@novatechsoftware.com',
                    phone: '',
                    website: 'https://novatechsoftware.com'
                },
                services: ['Product engineering'],
                match_score: 92
            },
            {
                id: 'tier-2-3',
                name: 'Kizora Software',
                description: 'Custom software development partnered with BITS Pilani',
                rating: 4.8,
                location: 'Nagpur',
                contact: {
                    email: 'info@kizora.com',
                    phone: '',
                    website: 'https://kizora.com'
                },
                services: ['Custom development'],
                match_score: 92
            },
            {
                id: 'tier-2-4',
                name: 'Aress Software',
                description: 'Software development with international clients across NA/Europe/APAC',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@aress.com',
                    phone: '',
                    website: 'https://aress.com'
                },
                services: ['Custom development'],
                match_score: 92
            },
            {
                id: 'tier-2-5',
                name: 'Solace Infotech',
                description: 'Product engineering since 2010',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@solaceinfotech.com',
                    phone: '',
                    website: 'https://solaceinfotech.com'
                },
                services: ['Product engineering'],
                match_score: 92
            },
            {
                id: 'tier-2-6',
                name: 'eLuminous Technologies',
                description: 'Business intelligence and IoT solutions since 2002',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@eluminoustechnologies.com',
                    phone: '',
                    website: 'https://eluminoustechnologies.com'
                },
                services: ['BI', 'IoT'],
                match_score: 92
            },
            {
                id: 'tier-2-7',
                name: 'Netwin Infosolutions',
                description: 'ISO-certified software development with clients across 6 continents',
                rating: 4.8,
                location: 'Nashik',
                contact: {
                    email: 'info@netwininfosolutions.com',
                    phone: '',
                    website: 'https://netwininfosolutions.com'
                },
                services: ['Custom development'],
                match_score: 92
            },
            {
                id: 'tier-2-8',
                name: 'Infodart Technologies',
                description: 'IT infrastructure and Oracle Retail implementation with proprietary InfoPOS',
                rating: 4.8,
                location: 'Aurangabad',
                contact: {
                    email: 'info@infodart.com',
                    phone: '',
                    website: 'https://infodart.com'
                },
                services: ['IT infrastructure', 'Oracle Retail', 'InfoPOS'],
                match_score: 92
            },
            {
                id: 'tier-2-9',
                name: 'iDiligence',
                description: 'SAP/ERP implementation services',
                rating: 4.8,
                location: 'Aurangabad',
                contact: {
                    email: 'info@i-diligence.com',
                    phone: '',
                    website: 'https://i-diligence.com'
                },
                services: ['SAP', 'ERP'],
                match_score: 92
            },
            {
                id: 'tier-2-10',
                name: 'CloudXperte',
                description: 'Cloud enablement with React/Vue/Angular/.NET expertise',
                rating: 4.8,
                location: 'Aurangabad',
                contact: {
                    email: 'info@cloudxperte.com',
                    phone: '',
                    website: 'https://cloudxperte.com'
                },
                services: ['React', 'Vue', 'Angular', '.NET', 'Cloud'],
                match_score: 92
            },
            {
                id: 'tier-2-11',
                name: 'ComIT Technology',
                description: 'IT services with Microsoft/SAP/Tally/Google partnerships',
                rating: 4.8,
                location: 'Aurangabad',
                contact: {
                    email: 'info@comittechnology.com',
                    phone: '',
                    website: 'https://comittechnology.com'
                },
                services: ['Microsoft', 'SAP', 'Tally', 'Google'],
                match_score: 92
            },
            {
                id: 'tier-2-12',
                name: 'Redbytes Software',
                description: 'Mobile and IoT app development with EdTech focus',
                rating: 4.8,
                location: 'Aurangabad',
                contact: {
                    email: 'info@redbytes.in',
                    phone: '',
                    website: 'https://redbytes.in'
                },
                services: ['Mobile', 'IoT'],
                match_score: 92
            },
            {
                id: 'tier-2-13',
                name: 'Comtranse Technology',
                description: 'Custom software for financial, healthcare, education sectors',
                rating: 4.8,
                location: 'Kolhapur',
                contact: {
                    email: 'info@comtranse.com',
                    phone: '',
                    website: 'https://comtranse.com'
                },
                services: ['Custom development'],
                match_score: 92
            },
            {
                id: 'tier-2-14',
                name: 'ACESnWS Technologies',
                description: 'Custom software, AI/ML, RPA, IoT since 2013',
                rating: 4.8,
                location: 'Thane',
                contact: {
                    email: 'info@acesnws.com',
                    phone: '',
                    website: 'https://acesnws.com'
                },
                services: ['AI/ML', 'RPA', 'IoT'],
                match_score: 92
            },
            {
                id: 'tier-2-15',
                name: 'Celusion Technologies',
                description: '.NET enterprise solutions development',
                rating: 4.8,
                location: 'Thane',
                contact: {
                    email: 'info@celusion.com',
                    phone: '',
                    website: 'https://celusion.com'
                },
                services: ['.NET', 'Enterprise development'],
                match_score: 92
            },
            {
                id: 'tier-2-16',
                name: 'Trigun Infotech',
                description: 'Maritime ERP - Naviox Ship Management Software',
                rating: 4.8,
                location: 'Navi Mumbai',
                contact: {
                    email: 'info@triguninfotech.com',
                    phone: '',
                    website: 'https://triguninfotech.com'
                },
                services: ['Maritime ERP', 'Ship management'],
                match_score: 92
            },
            {
                id: 'tier-2-17',
                name: 'MindSpace Software Technologies',
                description: 'Custom software development services',
                rating: 4.8,
                location: 'Navi Mumbai',
                contact: {
                    email: 'info@mindspacesoftware.com',
                    phone: '',
                    website: 'https://mindspacesoftware.com'
                },
                services: ['Custom development'],
                match_score: 92
            },
            {
                id: 'tier-2-18',
                name: 'Neolite Infotech',
                description: 'Product development combined with staff augmentation',
                rating: 4.8,
                location: 'Navi Mumbai',
                contact: {
                    email: 'info@neoliteinfotech.com',
                    phone: '',
                    website: 'https://neoliteinfotech.com'
                },
                services: ['Product development', 'Staff augmentation'],
                match_score: 92
            },
        ]
    },
    {
        id: 'startups',
        title: 'Notable Startups',
        description: 'Fast-growing companies',
        icon_name: 'Star' as any,
        companies: [
            {
                id: 'startups-1',
                name: 'Verinite',
                description: 'Enterprise IT services - bootstrapped since 2011',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@verinite.com',
                    phone: '',
                    website: 'https://verinite.com'
                },
                services: ['Enterprise services'],
                match_score: 92
            },
            {
                id: 'startups-2',
                name: 'TechMainstay (TMBill)',
                description: 'Cloud-based restaurant management SaaS serving 9 countries',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@techmainstay.com',
                    phone: '',
                    website: 'https://techmainstay.com'
                },
                services: ['Restaurant management SaaS'],
                match_score: 92
            },
            {
                id: 'startups-3',
                name: 'Haber',
                description: 'Industrial water management software with real-time analytics',
                rating: 4.8,
                location: 'Pune',
                contact: {
                    email: 'info@haberwater.com',
                    phone: '',
                    website: 'https://haberwater.com'
                },
                services: ['Water management', 'IoT', 'Analytics'],
                match_score: 92
            },
            {
                id: 'startups-4',
                name: 'Techspian Services',
                description: 'Mobile strategy, product design, app development',
                rating: 4.8,
                location: 'Kalyani Nagar, Pune',
                contact: {
                    email: 'info@techspian.com',
                    phone: '',
                    website: 'https://techspian.com'
                },
                services: ['Mobile', 'Product design'],
                match_score: 92
            },
            {
                id: 'startups-5',
                name: 'Atgeir Solutions',
                description: 'Data engineering, AI/ML analytics, healthcare analytics',
                rating: 4.8,
                location: 'Viman Nagar, Pune',
                contact: {
                    email: 'info@atgeirsolutions.com',
                    phone: '',
                    website: 'https://atgeirsolutions.com'
                },
                services: ['Data engineering', 'AI/ML', 'Healthcare analytics'],
                match_score: 92
            },
        ]
    },
];
