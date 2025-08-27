// Project Table Component - Handles the project list and table interactions

interface ProjectMedia {
    type: 'image' | 'video';
    src: string;
    alt: string;
}

// Interface used internally by this component
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

const ProjectTable = {
    // Setup event listeners for project table
    setupEventListeners(): void {
        // Add click handlers to project items
        document.addEventListener('click', (e: Event): void => {
            const target = e.target as HTMLElement;
            const projectItem = target.closest('.project-item') as HTMLElement | null;
            if (projectItem && (window as any).ProjectModal) {
                // Extract project data from data attributes
                const project: any = {
                    id: projectItem.dataset.projectId || '',
                    company: projectItem.dataset.projectCompany || '',
                    title: projectItem.dataset.projectTitle || '',
                    description: projectItem.dataset.projectDescription || '',
                    problem: projectItem.dataset.projectProblem || '',
                    solution: projectItem.dataset.projectSolution || '',
                    result: projectItem.dataset.projectResult || '',
                    role: projectItem.dataset.projectRole || '',
                    image: projectItem.dataset.projectImage || '',
                    narrative: projectItem.dataset.projectNarrative || '',
                    media: JSON.parse(projectItem.dataset.projectMedia || '[]')
                };

                // Open modal with project data
                (window as any).ProjectModal.openModal(project, projectItem);
            }
        });
    },

    // Initialize all projects array from DOM
    getAllProjects(): any[] {
        const projectElements = document.querySelectorAll('.project-item[data-project-id]') as NodeListOf<HTMLElement>;
        return Array.from(projectElements).map((element: HTMLElement): any => ({
            id: element.dataset.projectId || '',
            company: element.dataset.projectCompany || '',
            title: element.dataset.projectTitle || '',
            description: element.dataset.projectDescription || '',
            problem: element.dataset.projectProblem || '',
            solution: element.dataset.projectSolution || '',
            result: element.dataset.projectResult || '',
            role: element.dataset.projectRole || '',
            image: element.dataset.projectImage || '',
            narrative: element.dataset.projectNarrative || '',
            media: JSON.parse(element.dataset.projectMedia || '[]'),
            element: element
        }));
    }
};

// Make ProjectTable globally available
(window as any).ProjectTable = ProjectTable;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', (): void => {
    ProjectTable.setupEventListeners();
});

// ProjectTable is made globally available above
