

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    team: 'Admin' | 'Backend' | 'Finance' | 'Frontend' | 'Logistics' | 'Marketing/Graphic Design' | 'Outreach' | 'Product Design' | 'Visual Design';
    photo: string;
    obstaclePhoto: string;
    oneLiner: string;
    socials?: {
        linkedin?: string;
        instagram?: string;
    };
}

// Raw data - easier to manage
const rawTeamData: Array<Omit<TeamMember, 'id' | 'photo' | 'obstaclePhoto'>> = [
    // Admin
    { name: 'James Cao', role: 'Admin', team: 'Admin', oneLiner: '"what if instead of Hack Canada, we hack Canada"', socials: { linkedin: 'https://www.linkedin.com/in/james-cao-890702265/' } },

    // Backend Team
    { name: 'Eason Huang', role: 'Backend Engineer', team: 'Backend', oneLiner: '"i use arch btw 🤓"', socials: { linkedin: 'https://www.linkedin.com/in/eason-huang-647391295/' } },
    { name: 'Reehatpreet Kaur', role: 'Backend Engineer', team: 'Backend', oneLiner: '"I like bugging bugs 🐛"' },
    { name: 'Anish Paleja', role: 'Backend Engineer', team: 'Backend', oneLiner: '"It\'s not a bug, it\'s just a feature…☝️"', socials: { linkedin: 'https://linkedin.com/in/anish-paleja' } },
    { name: 'Wahib Barqawi', role: 'Backend Engineer', team: 'Backend', oneLiner: '"Every bug is just a new lesson waiting"', socials: { linkedin: 'https://linkedin.com/in/wahib-barqawi' } },
    { name: 'Sohel Shekh', role: 'Backend Engineer', team: 'Backend', oneLiner: '"Figuring out simple fixes for everyday stuff"', socials: { linkedin: 'https://www.linkedin.com/in/sohelshekh' } },

    // Finance Team
    { name: 'Varnit Sahu', role: 'Finance', team: 'Finance', oneLiner: '"i make money go brrrr"', socials: { linkedin: 'https://www.linkedin.com/in/varnitsahu/' } },
    { name: 'Sardul Subedi', role: 'Finance', team: 'Finance', oneLiner: '"We misplaced all the prize money"', socials: { linkedin: 'https://www.linkedin.com/in/sardulsubedi/' } },

    // Frontend Team
    { name: 'Adelynn Tran', role: 'Frontend Engineer', team: 'Frontend', oneLiner: '"i wish i could sleep 25 hours a day"', socials: { linkedin: 'https://linkedin.com/in/adelynntran810 ' } },
    { name: 'Advitiya Sharma', role: 'Frontend Engineer', team: 'Frontend', oneLiner: '"overthinking everything"', socials: { instagram: 'https://www.instagram.com/advi.tiya_', linkedin: 'https://www.linkedin.com/in/advitiya-sharma-25346b277/' } },
    { name: 'Faiz Mustansar', role: 'Frontend Engineer', team: 'Frontend', oneLiner: '"why we hack canada if canada hacks us?"', socials: { instagram: 'https://www.instagram.com/faizm.30', linkedin: 'https://www.linkedin.com/in/faizmustansar/' } },
    { name: 'Hreem Pandya', role: 'Frontend Engineer', team: 'Frontend', oneLiner: '"Hreem Pandya"', socials: { linkedin: 'https://www.linkedin.com/in/hreem-pandya-7b74a0275/' } },
    { name: 'Oliver Huang', role: 'Frontend Engineer', team: 'Frontend', oneLiner: '"to be loved is to be changed"', socials: { linkedin: 'https://www.linkedin.com/in/oliver-huang-931947232/' } },

    // Logistics Team
    { name: 'Jun Bin Cheng', role: 'Logistics', team: 'Logistics', oneLiner: '"meow"', socials: { linkedin: 'https://www.linkedin.com/in/jb-cheng' } },
    { name: 'Vienna Zhao', role: 'Logistics', team: 'Logistics', oneLiner: '"A coffee a day keeps the doctor away"', socials: { linkedin: 'https://www.linkedin.com/in/vienna-zhao-207b402b5/' } },
    { name: 'Yuvaansh Kapila', role: 'Logistics', team: 'Logistics', oneLiner: '"Hey, I\'m Yuvaansh, a Grade 11 student passionate about technology, a jack of all trades but master of none"', socials: { linkedin: 'https://www.linkedin.com/in/yuvaansh-kapila-3b4bab364/' } },
    { name: 'Ritvik Goyal', role: 'Logistics', team: 'Logistics', oneLiner: '"True Dreamer = True Builder"', socials: { linkedin: 'https://www.linkedin.com/in/ritvikgoyal1/' } },
    { name: 'Sarveshvar Kumar', role: 'Logistics', team: 'Logistics', oneLiner: '"Either playing chess or working on a personal project!"', socials: { linkedin: 'https://www.linkedin.com/in/sarveshwarsenthilkumar' } },
    { name: 'Yang Xue', role: 'Logistics', team: 'Logistics', oneLiner: '"i can bench 225"', socials: { linkedin: 'https://www.linkedin.com/in/yangxuejfss/' } },

    // Marketing/Graphic Design Team
    { name: 'Ahana Virmani', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: '"d1 yapper 😛🦋💕"', socials: { instagram: 'https://www.instagram.com/ahanaaa_22', linkedin: 'www.linkedin.com/in/ahana-virmani' } },
    { name: 'Varneet Kaur', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: '"i procrastinate too much ._."', socials: { linkedin: 'https://www.linkedin.com/in/varneet/' } },
    { name: 'Vedika Gopinaath', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: '"Just a curious human!"', socials: { linkedin: 'https://www.linkedin.com/in/vedika-gopinaath-615103322/' } },
    { name: 'Sophia Xu', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: 'Why did the polar bear call tech support? His screen was frozen.' },

    // Outreach Team
    { name: 'Shaoming Wu', role: 'Outreach', team: 'Outreach', oneLiner: '"dependent on mcdonalds"', socials: { linkedin: 'https://www.linkedin.com/in/shaoming-wu-700812259/' } },
    { name: 'Mehul Garang', role: 'Outreach', team: 'Outreach', oneLiner: '"Building connections and ideas that make an impact"', socials: { linkedin: 'https://www.linkedin.com/in/mehul-garang-000b0b332/' } },
    { name: 'Tishya Bhat', role: 'Outreach', team: 'Outreach', oneLiner: '"snacks before hacks"', socials: { linkedin: 'https://www.linkedin.com/in/tishya-bhat/' } },
    { name: 'Edward Drobnis', role: 'Outreach', team: 'Outreach', oneLiner: '"I LOVE HACK CANADA 🦫🦫"', socials: { linkedin: 'https://linkedin.com/in/edward-drobnis' } },

    // Product Design Team
    { name: 'Muskaan Madhwani', role: 'Product Design', team: 'Product Design', oneLiner: '"I collect ideas and turn them into something meaningful."', socials: { linkedin: 'https://www.linkedin.com/in/muskan-madhwani-8a168830b/' } },
    { name: 'Naman Sonawane', role: 'Product Design', team: 'Product Design', oneLiner: '"doing hw between cursor prompts"', socials: { linkedin: 'https://www.linkedin.com/in/naman-sonawane/' } },
    { name: 'Anushka Kshirsagar', role: 'Product Design', team: 'Product Design', oneLiner: '"is ai coming for our jobs? hmm"' },

    // Visual Design Team
    { name: 'Claire L', role: 'Visual Design', team: 'Visual Design', oneLiner: '"animation!"' },
    { name: 'Isabelle Dharma', role: 'Visual Design', team: 'Visual Design', oneLiner: '"naps are best taken when not needed"' },
    { name: 'Jessica Zhang', role: 'Visual Design', team: 'Visual Design', oneLiner: '"One Must Imagine Sisyphus Happy"', socials: { instagram: 'https://www.instagram.com/x.yuan.__', linkedin: 'https://www.linkedin.com/in/xinyuan-zhang-2228ba26a/?trk=public-profile-join-page' } },
];

// Helper to convert name to filename formats
const nameToProfileFilename = (name: string) => {
    // Converts "Adelynn Tran" → "adelynn-tran.png"
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '') + '.png';
};

const nameToObstacleFilename = (name: string) => {
    // Converts "Adelynn Tran" → "adelynn-tran-r.png"
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '') + '-r.png';
};

const nameToId = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
};

// Auto-generate team members with real photos
export const teamMembers: TeamMember[] = Object.freeze(
    rawTeamData.map((member, index) => ({
        id: `member-${index}-${nameToId(member.name)}`,
        name: member.name,
        role: member.role,
        team: member.team,
        photo: `/teamGame-assets/teamGame-photos/profiles/${nameToProfileFilename(member.name)}`,
        obstaclePhoto: `/teamGame-assets/teamGame-photos/obstacles/${nameToObstacleFilename(member.name)}`,
        oneLiner: member.oneLiner,
        socials: member.socials  // ← Pass through socials
    }))
) as TeamMember[];