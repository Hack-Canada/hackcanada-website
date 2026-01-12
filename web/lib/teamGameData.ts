// DUMMY DATA FOR TEAM MEMBERS
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    team: 'Tech' | 'Logistics' | 'Outreach' | 'Product Design' | 'Visual Design' | 'Finance';
    photo: string;
    funFact: string;
}

export const teamMembers: TeamMember[] = [
    // TECH TEAM
    {
        id: 'tech-1',
        name: 'Alex Chen',
        role: 'Lead Developer',
        team: 'Tech',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        funFact: 'Can debug code in their sleep'
    },
    {
        id: 'tech-2',
        name: 'Sarah Kim',
        role: 'Frontend Developer',
        team: 'Tech',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        funFact: 'React wizard, coffee addict'
    },
    {
        id: 'tech-3',
        name: 'Marcus Johnson',
        role: 'Backend Engineer',
        team: 'Tech',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
        funFact: 'Loves optimizing database queries'
    },
    {
        id: 'tech-4',
        name: 'Lisa Wang',
        role: 'Full Stack Developer',
        team: 'Tech',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
        funFact: 'Shipped 5 features this sprint'
    },

    // LOGISTICS TEAM
    {
        id: 'logistics-1',
        name: 'Tyler Brown',
        role: 'Operations Lead',
        team: 'Logistics',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tyler',
        funFact: 'Master of spreadsheets'
    },
    {
        id: 'logistics-2',
        name: 'Maya Patel',
        role: 'Event Coordinator',
        team: 'Logistics',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maya',
        funFact: 'Can plan events in their sleep'
    },
    {
        id: 'logistics-3',
        name: 'Connor O\'Brien',
        role: 'Venue Manager',
        team: 'Logistics',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=connor',
        funFact: 'Never misses a deadline'
    },

    // OUTREACH TEAM
    {
        id: 'outreach-1',
        name: 'Emily Rodriguez',
        role: 'Outreach Lead',
        team: 'Outreach',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
        funFact: 'Networked with 100+ sponsors'
    },
    {
        id: 'outreach-2',
        name: 'David Park',
        role: 'Social Media Manager',
        team: 'Outreach',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
        funFact: 'Meme lord and content creator'
    },
    {
        id: 'outreach-3',
        name: 'Jasmine Lee',
        role: 'Community Manager',
        team: 'Outreach',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jasmine',
        funFact: 'Responds to DMs in seconds'
    },
    {
        id: 'outreach-4',
        name: 'Ryan Mitchell',
        role: 'Partnership Coordinator',
        team: 'Outreach',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ryan',
        funFact: 'Made 50 cold emails warm'
    },

    // PRODUCT DESIGN TEAM
    {
        id: 'product-design-1',
        name: 'Priya Sharma',
        role: 'Product Designer',
        team: 'Product Design',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
        funFact: 'User research enthusiast'
    },
    {
        id: 'product-design-2',
        name: 'Jordan Lee',
        role: 'UX Designer',
        team: 'Product Design',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jordan',
        funFact: 'Figma shortcuts master'
    },
    {
        id: 'product-design-3',
        name: 'Sophia Martinez',
        role: 'UI Designer',
        team: 'Product Design',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophia',
        funFact: 'Pixel-perfect is the only way'
    },

    // VISUAL DESIGN TEAM
    {
        id: 'visual-design-1',
        name: 'Zoe Taylor',
        role: 'Graphic Designer',
        team: 'Visual Design',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zoe',
        funFact: 'Can design a poster in 10 minutes'
    },
    {
        id: 'visual-design-2',
        name: 'Ethan Kim',
        role: 'Brand Designer',
        team: 'Visual Design',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ethan',
        funFact: 'Color theory is their superpower'
    },
    {
        id: 'visual-design-3',
        name: 'Ava Chen',
        role: 'Illustrator',
        team: 'Visual Design',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ava',
        funFact: 'Drew the mascot in one sitting'
    },

    // FINANCE TEAM
    {
        id: 'finance-1',
        name: 'Noah Williams',
        role: 'Finance Lead',
        team: 'Finance',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=noah',
        funFact: 'Budgets are their love language'
    },
    {
        id: 'finance-2',
        name: 'Olivia Thompson',
        role: 'Treasurer',
        team: 'Finance',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olivia',
        funFact: 'Excel wizard, number cruncher'
    },
    {
        id: 'finance-3',
        name: 'Liam Anderson',
        role: 'Sponsorship Coordinator',
        team: 'Finance',
        photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liam',
        funFact: 'Secured $50K in funding'
    },
];