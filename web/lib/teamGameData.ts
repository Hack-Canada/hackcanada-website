export interface TeamMember {
    id: string;
    name: string;
    role: string;
    team: 'Admin' | 'Backend' | 'Finance' | 'Frontend' | 'Logistics' | 'Marketing/Graphic Design' | 'Outreach' | 'Product Design' | 'Visual Design';
    photo: string;
    oneLiner: string;
}

// Raw data - easier to manage
const rawTeamData = [
    // Admin
    { name: 'James Cao', role: 'Admin', team: 'Admin', oneLiner: 'what if instead of Hack Canada, we hack Canada' },

    // Backend Team
    { name: 'Eason Huang', role: 'Backend Engineer', team: 'Backend', oneLiner: 'i use arch btw 🤓' },
    { name: 'Rehatpreet Kaur', role: 'Backend Engineer', team: 'Backend', oneLiner: 'I like bugging bugs 🐛' },
    { name: 'Anish Paleja', role: 'Backend Engineer', team: 'Backend', oneLiner: '"It\'s not a bug, it\'s just a feature…☝️"' },
    { name: 'Hreem Pandya (Backend)', role: 'Backend Engineer', team: 'Backend', oneLiner: 'Hreem Pandya' },
    { name: 'Wahib Barqawi', role: 'Backend Engineer', team: 'Backend', oneLiner: 'Every bug is just a new lesson waiting' },
    { name: 'Sohel Shekh', role: 'Backend Engineer', team: 'Backend', oneLiner: 'Figuring out simple fixes for everyday stuff' },

    // Finance Team
    { name: 'Varnit Sahu', role: 'Finance', team: 'Finance', oneLiner: 'i make money go brrrr' },
    { name: 'Sardul Subedi', role: 'Finance', team: 'Finance', oneLiner: 'We misplaced all the prize money' },

    // Frontend Team
    { name: 'Adelynn Tran', role: 'Frontend Engineer', team: 'Frontend', oneLiner: 'i wish i could sleep 25 hours a day' },
    { name: 'Advitiya Sharma', role: 'Frontend Engineer', team: 'Frontend', oneLiner: 'Overthinking everything' },
    { name: 'Faiz Mustansar', role: 'Frontend Engineer', team: 'Frontend', oneLiner: 'jus a chill guy' },
    { name: 'Hreem Pandya (Frontend)', role: 'Frontend Engineer', team: 'Frontend', oneLiner: 'Hreem Pandya' },
    { name: 'Oliver Huang', role: 'Frontend Engineer', team: 'Frontend', oneLiner: 'to be loved is to be changed' },

    // Logistics Team
    { name: 'Jun Bin Cheng', role: 'Logistics', team: 'Logistics', oneLiner: 'meow' },
    { name: 'Vienna Zhao', role: 'Logistics', team: 'Logistics', oneLiner: 'A coffee a day keeps the doctor away' },
    { name: 'Jad Menkara', role: 'Logistics', team: 'Logistics', oneLiner: 'to thine own self be true' },
    { name: 'Yuvaansh Kapila', role: 'Logistics', team: 'Logistics', oneLiner: 'Hey, I\'m Yuvaansh, a Grade 11 student passionate about technology, a jack of all trades but master of none' },
    { name: 'Ritvik Goyal', role: 'Logistics', team: 'Logistics', oneLiner: 'True Dreamer = True Builder' },
    { name: 'Sarveshwar Senthil Kumar', role: 'Logistics', team: 'Logistics', oneLiner: 'Either playing chess or working on a personal project!' },
    { name: 'Yang Xue', role: 'Logistics', team: 'Logistics', oneLiner: 'i can bench 225' },

    // Marketing/Graphic Design Team
    { name: 'Ahana Virmani', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: '"d1 yapper 😭🔥💕"' },
    { name: 'Varneet Kaur', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: 'i procrastinate too much ;_;' },
    { name: 'Vedika Gopinaath', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: 'Just a curious human!' },
    { name: 'Sophia Xu', role: 'Marketing/Graphic Design', team: 'Marketing/Graphic Design', oneLiner: 'Why did the polar bear call tech support? His screen was frozen.' },

    // Outreach Team
    { name: 'Shaoming Wu', role: 'Outreach', team: 'Outreach', oneLiner: 'dependent on mcdonalds' },
    { name: 'Mehul Garang', role: 'Outreach', team: 'Outreach', oneLiner: 'Building connections and ideas that make an impact' },
    { name: 'Tishya Bhat', role: 'Outreach', team: 'Outreach', oneLiner: 'snacks before hacks' },
    { name: 'Edward Drobnis', role: 'Outreach', team: 'Outreach', oneLiner: 'I LOVE HACK CANADA 🤓🤓' },

    // Product Design Team
    { name: 'Muskan Madhwani', role: 'Product Design', team: 'Product Design', oneLiner: 'I collect ideas and turn them into something meaningful.' },
    { name: 'Naman Sonawane', role: 'Product Design', team: 'Product Design', oneLiner: 'doing hw between cursor prompts' },
    { name: 'Anushka Kshirsagar', role: 'Product Design', team: 'Product Design', oneLiner: 'is ai coming for our jobs? hmm' },

    // Visual Design Team
    { name: 'Claire L', role: 'Visual Design', team: 'Visual Design', oneLiner: 'be there or be square' },
    { name: 'Isabelle Dharma', role: 'Visual Design', team: 'Visual Design', oneLiner: 'naps are best taken when not needed' },
    { name: 'Jessica Zhang', role: 'Visual Design', team: 'Visual Design', oneLiner: 'One Must imagine Sisyphus Happy' },
] as const;

export const teamMembers: TeamMember[] = Object.freeze(
    rawTeamData.map((member, index) => ({
        id: `member-${index}-${member.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`,
        name: member.name,
        role: member.role,
        team: member.team,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name.toLowerCase().replace(/\s+/g, '')}`,
        oneLiner: member.oneLiner
    }))
) as TeamMember[];