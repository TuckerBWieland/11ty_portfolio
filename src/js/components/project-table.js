// Project Table Component - Handles the project list and table interactions
const ProjectTable = {
    // Setup event listeners for project table
    setupEventListeners() {
        // Add click handlers to project items
        document.addEventListener('click', (e) => {
            const projectItem = e.target.closest('.project-item');
            if (projectItem && window.ProjectModal) {
                // Extract project data from data attributes
                const project = {
                    id: projectItem.dataset.projectId,
                    company: projectItem.dataset.projectCompany,
                    title: projectItem.dataset.projectTitle,
                    description: projectItem.dataset.projectDescription,
                    problem: projectItem.dataset.projectProblem,
                    solution: projectItem.dataset.projectSolution,
                    result: projectItem.dataset.projectResult,
                    role: projectItem.dataset.projectRole,
                    image: projectItem.dataset.projectImage,
                    narrative: projectItem.dataset.projectNarrative,
                    media: JSON.parse(projectItem.dataset.projectMedia || '[]')
                };
                
                // Open modal with project data
                window.ProjectModal.openModal(project, projectItem);
            }
        });
    },

    // Initialize all projects array from DOM
    getAllProjects() {
        const projectElements = document.querySelectorAll('.project-item[data-project-id]');
        return Array.from(projectElements).map(element => ({
            id: element.dataset.projectId,
            company: element.dataset.projectCompany,
            title: element.dataset.projectTitle,
            description: element.dataset.projectDescription,
            problem: element.dataset.projectProblem,
            solution: element.dataset.projectSolution,
            result: element.dataset.projectResult,
            role: element.dataset.projectRole,
            image: element.dataset.projectImage,
            narrative: element.dataset.projectNarrative,
            media: JSON.parse(element.dataset.projectMedia || '[]'),
            element: element
        }));
    }
};

// Make ProjectTable globally available
window.ProjectTable = ProjectTable;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ProjectTable.setupEventListeners();
});
