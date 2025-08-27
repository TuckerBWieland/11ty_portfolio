// Type definitions for the portfolio project - extending window object

interface ProjectMedia {
    type: 'image' | 'video';
    src: string;
    alt: string;
}

interface _Project {
    id: string;
    company: string;
    title: string;
    description: string;
    problem: string;
    solution: string;
    result: string;
    role: string;
    image: string;
    narrative: string;
    media: ProjectMedia[];
    element?: HTMLElement;
}

interface _CompanyLogo {
    src: string;
    alt: string;
    modalClasses: string;
}

interface _CompanyLogos {
    [key: string]: _CompanyLogo;
}

// Types are included inline in each component file to avoid module complications
