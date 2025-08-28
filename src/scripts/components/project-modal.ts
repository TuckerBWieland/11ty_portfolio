// Company logo mapping for modal display

interface ProjectMedia {
    type: 'image' | 'video';
    src: string;
    alt: string;
}

// Interfaces used internally by this component
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

const companyLogos: _CompanyLogos = {
    JUSTWORKS: {
        src: '/assets/images/company-logos/Justworks Logo.svg',
        alt: 'Justworks Logo',
        modalClasses: 'h-10 w-auto object-contain max-w-48'
    },
    SHOPIFY: {
        src: '/assets/images/company-logos/Shopify Logo.svg',
        alt: 'Shopify Logo',
        modalClasses: 'h-10 w-auto object-contain max-w-48'
    },
    'GENERAL ASSEMBLY': {
        src: '/assets/images/company-logos/GA logo.svg',
        alt: 'General Assembly Logo',
        modalClasses: 'h-10 w-auto object-contain max-w-48'
    },
    'BILLION OYSTER PROJECT': {
        src: '/assets/images/company-logos/BOP Logo.svg',
        alt: 'Billion Oyster Project Logo',
        modalClasses: 'h-16 w-auto object-contain max-w-48'
    }
};

// Project Modal Component - Handles the modal popup and all its interactions
const ProjectModal = {
    // Store current project data
    currentProject: null as _Project | null,
    currentProjectIndex: -1,
    allProjects: [] as _Project[],

    // Open project modal
    openModal(project: _Project): void {
        // Initialize all projects array if not done yet
        if (this.allProjects.length === 0) {
            this.initializeProjects();
        }

        // Find current project index
        this.currentProjectIndex = this.allProjects.findIndex(p => p.id === project.id);

        // Store current project for navigation
        this.currentProject = project;

        const modal = document.getElementById('project-modal') as HTMLElement;
        const modalContent = modal.querySelector('.bg-background-primary') as HTMLElement;

        modalContent.innerHTML = this.renderModalContent(project);

        // Show modal with animation
        modal.classList.remove('opacity-0', 'invisible');
        modalContent.classList.remove('scale-95');
        document.body.style.overflow = 'hidden';
    },

    // Render modal content
    renderModalContent(project: _Project): string {
        return `
            <!-- Close button -->
            <button data-action="close-modal" class="absolute top-4 right-4 text-white hover:text-gray-300 z-10 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>

            <div class="px-2 py-10 md:p-16 flex-1">
                <!-- Header -->
                <div class="flex items-center justify-between mb-4 md:mb-16">
                    <h2 class="text-[16px] sm:text-[20px] md:text-[24px] font-bold font-helvetica uppercase leading-tight pr-8">${project.title}</h2>
                    <div class="flex items-center justify-center pl-8 py-4">
                        ${this.renderCompanyLogo(project.company)}
                    </div>
                </div>

                <!-- Content sections for desktop/tablet -->
                <div class="hidden md:block">
                    <div class="grid grid-cols-1 gap-8">
                        <!-- Left column -->
                        <div class="space-y-6">
                            ${this.renderContentSection('PROBLEM', project.problem)}
                            ${this.renderContentSection('SOLUTION', project.solution)}
                            ${this.renderContentSection('RESULT', project.result)}
                            ${this.renderContentSection('MY ROLE', project.role)}
                        </div>

                        <!-- Right column -->
                        <div class="flex flex-col md:flex-row items-start justify-center gap-6">
                            ${this.renderMediaGallery(project.media)}
                            <div class="text-sm leading-relaxed flex-1">
                                <p>${project.narrative}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile layout -->
                <div class="block md:hidden">
                    <div class="space-y-6">
                        ${this.renderContentSection('PROBLEM', project.problem, true)}
                        ${this.renderContentSection('SOLUTION', project.solution, true)}
                        ${this.renderContentSection('RESULT', project.result, true)}
                        ${this.renderContentSection('MY ROLE', project.role, true)}

                        ${this.renderMediaGallery(project.media, true)}
                        
                        <div class="text-sm leading-relaxed">
                            <p>${project.narrative}</p>
                        </div>
                    </div>
                </div>

                <!-- Close button -->
                <div class="mt-8 flex justify-center">
                    <button data-action="close-modal" class="bg-[#629FDE] text-white px-6 py-2 font-mono text-sm uppercase hover:bg-blue-600 transition-colors rounded">
                        CLOSE
                    </button>
                </div>
            </div>
            
            <!-- Sticky Footer Navigation -->
            ${
                this.allProjects.length > 1
                    ? `
                <div class="sticky bottom-0 bg-background-primary border-t border-gray-700 px-4 py-3 mt-auto">
                    <div class="flex items-center justify-between">
                        <button data-action="navigate-previous" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                            </svg>
                            <span class="font-mono text-sm uppercase">Previous</span>
                        </button>
                        
                        <div class="text-center">
                            <div class="text-xs text-gray-400 font-mono">
                                ${this.currentProjectIndex + 1} of ${this.allProjects.length}
                            </div>
                        </div>
                        
                        <button data-action="navigate-next" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg">
                            <span class="font-mono text-sm uppercase">Next</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `
                    : ''
            }
        `;
    },

    // Generate unified navigation footer HTML
    generateNavigationFooter(type: 'project' | 'lightbox' | 'video'): string {
        let totalItems = 0;
        let currentIndex = 0;

        if (type === 'project') {
            if (this.allProjects.length <= 1) return '';
            totalItems = this.allProjects.length;
            currentIndex = this.currentProjectIndex;
        } else if (type === 'lightbox') {
            const lightbox = document.getElementById('lightbox') as HTMLElement | null;
            if (!lightbox) return '';
            const imagesData: ProjectMedia[] = JSON.parse(lightbox.dataset.imagesData || '[]');
            if (imagesData.length <= 1) return '';
            totalItems = imagesData.length;
            currentIndex = parseInt(lightbox.dataset.currentIndex || '0');
        } else if (type === 'video') {
            const videoPlayer = document.getElementById('video-player') as HTMLElement | null;
            if (!videoPlayer) return '';
            const videosData: ProjectMedia[] = JSON.parse(videoPlayer.dataset.videosData || '[]');
            if (videosData.length <= 1) return '';
            totalItems = videosData.length;
            currentIndex = parseInt(videoPlayer.dataset.currentIndex || '0');
        }

        return `<div class="w-full max-w-4xl bg-background-primary border-t border-gray-700 px-4 py-3"><div class="flex items-center justify-between"><button data-action="${type}-navigate-previous" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg><span class="font-mono text-sm uppercase">Previous</span></button><div class="text-center"><div class="text-xs text-gray-400 font-mono">${currentIndex + 1} of ${totalItems}</div></div><button data-action="${type}-navigate-next" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"><span class="font-mono text-sm uppercase">Next</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button></div></div>`;
    },

    // Render company logo or fallback to company name
    renderCompanyLogo(companyName: string): string {
        const logoConfig = companyLogos[companyName];
        if (logoConfig) {
            return `<img src="${logoConfig.src}" alt="${logoConfig.alt}" class="${logoConfig.modalClasses}">`;
        } else {
            return `<div class="text-sm font-mono">${companyName}</div>`;
        }
    },

    // Render content section
    renderContentSection(title: string, content: string, isMobile = false): string {
        if (isMobile) {
            return `
                <div class="border-b border-gray-700 pb-4">
                    <h3 class="text-lg font-bold mb-2 font-helvetica uppercase">${title}</h3>
                    <p class="text-sm leading-relaxed">${content}</p>
                </div>
            `;
        }

        return `
            <div class="grid grid-cols-3 border-b border-gray-700 pb-4">
                <h3 class="col-span-1 text-lg font-bold mb-2 font-helvetica uppercase">${title}</h3>
                <p class="col-span-2 text-sm leading-relaxed">${content}</p>
            </div>
        `;
    },

    // Render media gallery
    renderMediaGallery(mediaArray: ProjectMedia[], isMobile = false): string {
        if (!mediaArray || mediaArray.length === 0) {
            return '';
        }

        const gridClass = isMobile ? 'grid-cols-1' : 'grid-cols-2';
        const mediaItems = mediaArray
            .map((media: ProjectMedia): string => {
                if (media.type === 'video') {
                    return `
                    <div class="relative rounded-lg overflow-hidden cursor-pointer group" data-action="open-video" data-video-src="${media.src}">
                        <video class="w-full h-48 object-cover" preload="metadata" muted>
                            <source src="${media.src}" type="video/mp4">
                        </video>
                        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-60 transition-all">
                            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                `;
                } else {
                    return `
                    <img src="${media.src}" alt="${media.alt}" 
                         class="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                         data-action="open-lightbox" data-image-src="${media.src}" data-image-alt="${media.alt}">
                `;
                }
            })
            .join('');

        return `
            <div class="flex-1">
                <div class="grid ${gridClass} gap-4 mb-6">
                    ${mediaItems}
                </div>
            </div>
        `;
    },

    // Initialize projects array from DOM
    initializeProjects(): void {
        if ((window as typeof window & { ProjectTable?: { getAllProjects(): _Project[] } }).ProjectTable) {
            this.allProjects = (
                window as typeof window & { ProjectTable: { getAllProjects(): _Project[] } }
            ).ProjectTable.getAllProjects();
        }
    },

    // Navigate to previous project
    navigateToPreviousProject(): void {
        if (this.allProjects.length <= 1) return;

        let newIndex = this.currentProjectIndex - 1;
        if (newIndex < 0) {
            newIndex = this.allProjects.length - 1;
        }

        this.switchToProject(newIndex);
    },

    // Navigate to next project
    navigateToNextProject(): void {
        if (this.allProjects.length <= 1) return;

        let newIndex = this.currentProjectIndex + 1;
        if (newIndex >= this.allProjects.length) {
            newIndex = 0;
        }

        this.switchToProject(newIndex);
    },

    // Switch to project by index
    switchToProject(newIndex: number): void {
        if (newIndex < 0 || newIndex >= this.allProjects.length) return;

        const newProject = this.allProjects[newIndex];
        this.currentProject = newProject;
        this.currentProjectIndex = newIndex;

        // Close any open lightbox or video player first
        this.closeLightbox();
        this.closeVideoPlayer();

        // Update modal content
        const modal = document.getElementById('project-modal') as HTMLElement;
        const modalContent = modal.querySelector('.bg-background-primary') as HTMLElement;
        modalContent.innerHTML = this.renderModalContent(newProject);

        // Scroll modal content to top with smooth animation
        modalContent.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // Close project modal
    closeModal(): void {
        const modal = document.getElementById('project-modal') as HTMLElement;
        const modalContent = modal.querySelector('.bg-background-primary') as HTMLElement;

        modal.classList.add('opacity-0', 'invisible');
        modalContent.classList.add('scale-95');
        document.body.style.overflow = 'auto';

        // Clear current project data
        this.currentProject = null;
        this.currentProjectIndex = -1;
    },

    // Open lightbox for images
    openLightbox(src: string, alt: string): void {
        const lightbox = (document.getElementById('lightbox') as HTMLElement) || this.createLightbox();
        const img = lightbox.querySelector('img') as HTMLImageElement;

        // Clear any previous lightbox data first
        lightbox.dataset.currentIndex = '';
        lightbox.dataset.imagesData = '';

        // Remove any existing navigation footer
        const existingFooter = lightbox.querySelector('.w-full.max-w-4xl.bg-background-primary');
        if (existingFooter) {
            existingFooter.remove();
        }

        // Set the image immediately to avoid showing old image
        img.src = src;
        img.alt = alt;

        // Use current project's media data
        if (this.currentProject && this.currentProject.media) {
            const images = this.currentProject.media.filter((media: ProjectMedia) => media.type === 'image');
            const currentIndex = images.findIndex((image: ProjectMedia) => image.src === src);

            // Only set data if we found the image in the current project
            if (currentIndex !== -1) {
                lightbox.dataset.currentIndex = currentIndex.toString();
                lightbox.dataset.imagesData = JSON.stringify(images);

                // Add image navigation footer if there are multiple images
                if (images.length > 1) {
                    lightbox.innerHTML += this.generateNavigationFooter('lightbox');
                }
            }
        }

        lightbox.classList.remove('opacity-0', 'invisible');
        document.body.style.overflow = 'hidden';
    },

    // Open video player
    openVideoPlayer(src: string): void {
        const videoPlayer = (document.getElementById('video-player') as HTMLElement) || this.createVideoPlayer();

        // Clear any previous video data first
        videoPlayer.dataset.currentIndex = '';
        videoPlayer.dataset.videosData = '';

        // Remove any existing navigation footer
        const existingFooter = videoPlayer.querySelector('.w-full.max-w-4xl.bg-background-primary');
        if (existingFooter) {
            existingFooter.remove();
        }

        // Use current project's media data to set up video navigation
        if (this.currentProject && this.currentProject.media) {
            const videos = this.currentProject.media.filter((media: ProjectMedia) => media.type === 'video');
            const currentIndex = videos.findIndex((video: ProjectMedia) => video.src === src);

            // Only set data if we found the video in the current project
            if (currentIndex !== -1) {
                videoPlayer.dataset.currentIndex = currentIndex.toString();
                videoPlayer.dataset.videosData = JSON.stringify(videos);

                // Add video navigation footer if there are multiple videos
                if (videos.length > 1) {
                    videoPlayer.innerHTML += this.generateNavigationFooter('video');
                }
            } else {
                // If there's only one video or not found in project, show project navigation
                if (this.allProjects.length > 1) {
                    videoPlayer.innerHTML += this.generateNavigationFooter('project');
                }
            }
        } else {
            // Fallback to project navigation if no media data
            if (this.allProjects.length > 1) {
                videoPlayer.innerHTML += this.generateNavigationFooter('project');
            }
        }

        // Check if it's a YouTube video
        if (src.includes('youtube.com/embed/')) {
            const iframe = videoPlayer.querySelector('iframe') as HTMLIFrameElement | null;
            const video = videoPlayer.querySelector('video') as HTMLVideoElement | null;

            // Hide video element and show iframe
            if (video) video.style.display = 'none';
            if (iframe) {
                iframe.style.display = 'block';
                iframe.src = src + '?autoplay=1';
            }
        } else {
            const video = videoPlayer.querySelector('video') as HTMLVideoElement | null;
            const iframe = videoPlayer.querySelector('iframe') as HTMLIFrameElement | null;

            // Hide iframe and show video
            if (iframe) iframe.style.display = 'none';
            if (video) {
                video.style.display = 'block';
                video.src = src;
                video.load();
                video.play().catch(() => {
                    // Auto-play prevented by browser - this is expected behavior
                });
            }
        }

        videoPlayer.classList.remove('opacity-0', 'invisible');
        document.body.style.overflow = 'hidden';
    },

    // Create lightbox
    createLightbox(): HTMLElement {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className =
            'fixed inset-0 bg-background-primary bg-opacity-90 flex flex-col items-center justify-center p-4 opacity-0 invisible transition-all duration-300 z-50';
        lightbox.innerHTML = `
            <div class="relative max-w-4xl max-h-full flex-1 flex items-center justify-center">
                <img class="max-w-full max-h-full object-contain" />
                
                <!-- Close button -->
                <button data-action="close-lightbox" class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;

        // Navigation footer will be added dynamically when lightbox opens with image data

        lightbox.addEventListener('click', (e: Event): void => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });

        document.body.appendChild(lightbox);
        return lightbox;
    },

    // Create video player
    createVideoPlayer(): HTMLElement {
        const videoPlayer = document.createElement('div');
        videoPlayer.id = 'video-player';
        videoPlayer.className =
            'fixed inset-0 bg-background-primary bg-opacity-90 flex flex-col items-center justify-center p-4 opacity-0 invisible transition-all duration-300 z-50';
        videoPlayer.innerHTML = `
            <div class="relative max-w-4xl max-h-full flex-1 flex items-center justify-center">
                <video class="max-w-full max-h-full" controls autoplay>
                    <source type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <iframe class="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]" style="display: none; aspect-ratio: 16/9;" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                <button data-action="close-video-player" class="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `;

        // Navigation footer will be added dynamically when video opens with data

        videoPlayer.addEventListener('click', (e: Event): void => {
            if (e.target === videoPlayer) {
                this.closeVideoPlayer();
            }
        });

        document.body.appendChild(videoPlayer);
        return videoPlayer;
    },

    // Navigate lightbox (previous/next images)
    navigateLightbox(direction: number): void {
        const lightbox = document.getElementById('lightbox') as HTMLElement;
        if (!lightbox) return;

        const currentIndex = parseInt(lightbox.dataset.currentIndex || '0');
        const imagesData: ProjectMedia[] = JSON.parse(lightbox.dataset.imagesData || '[]');

        if (imagesData.length <= 1) return;

        let newIndex = currentIndex + direction;

        // Loop around if at beginning/end
        if (newIndex < 0) {
            newIndex = imagesData.length - 1;
        } else if (newIndex >= imagesData.length) {
            newIndex = 0;
        }

        // Update image
        const img = lightbox.querySelector('img') as HTMLImageElement;
        const newImage = imagesData[newIndex];

        img.src = newImage.src;
        img.alt = newImage.alt;

        // Update current index
        lightbox.dataset.currentIndex = newIndex.toString();

        // Update navigation footer with new index
        const existingFooter = lightbox.querySelector('.w-full.max-w-4xl.bg-background-primary');
        if (existingFooter) {
            existingFooter.remove();
            lightbox.innerHTML += this.generateNavigationFooter('lightbox');
        }
    },

    // Navigate video (previous/next videos)
    navigateVideo(direction: number): void {
        const videoPlayer = document.getElementById('video-player') as HTMLElement;
        if (!videoPlayer) return;

        const currentIndex = parseInt(videoPlayer.dataset.currentIndex || '0');
        const videosData: ProjectMedia[] = JSON.parse(videoPlayer.dataset.videosData || '[]');

        if (videosData.length <= 1) return;

        let newIndex = currentIndex + direction;

        // Loop around if at beginning/end
        if (newIndex < 0) {
            newIndex = videosData.length - 1;
        } else if (newIndex >= videosData.length) {
            newIndex = 0;
        }

        // Get new video data
        const newVideo = videosData[newIndex];

        // Stop current video
        const video = videoPlayer.querySelector('video') as HTMLVideoElement | null;
        const iframe = videoPlayer.querySelector('iframe') as HTMLIFrameElement | null;

        if (video && video.style.display !== 'none') {
            video.pause();
            video.currentTime = 0;
        }

        if (iframe && iframe.style.display !== 'none') {
            iframe.src = '';
        }

        // Load new video
        if (newVideo.src.includes('youtube.com/embed/')) {
            // Hide video element and show iframe
            if (video) video.style.display = 'none';
            if (iframe) {
                iframe.style.display = 'block';
                iframe.src = newVideo.src + '?autoplay=1';
            }
        } else {
            // Hide iframe and show video
            if (iframe) iframe.style.display = 'none';
            if (video) {
                video.style.display = 'block';
                video.src = newVideo.src;
                video.load();
                video.play().catch(() => {
                    // Auto-play prevented by browser - this is expected behavior
                });
            }
        }

        // Update current index
        videoPlayer.dataset.currentIndex = newIndex.toString();

        // Update navigation footer with new index
        const existingFooter = videoPlayer.querySelector('.w-full.max-w-4xl.bg-background-primary');
        if (existingFooter) {
            existingFooter.remove();
            videoPlayer.innerHTML += this.generateNavigationFooter('video');
        }
    },

    // Close lightbox
    closeLightbox(): void {
        const lightbox = document.getElementById('lightbox') as HTMLElement | null;
        if (lightbox) {
            // Clear lightbox data
            lightbox.dataset.currentIndex = '';
            lightbox.dataset.imagesData = '';

            // Clear the image src to prevent showing old images
            const img = lightbox.querySelector('img') as HTMLImageElement | null;
            if (img) {
                img.src = '';
                img.alt = '';
            }

            // Remove navigation footer
            const existingFooter = lightbox.querySelector('.w-full.max-w-4xl.bg-background-primary');
            if (existingFooter) {
                existingFooter.remove();
            }

            lightbox.classList.add('opacity-0', 'invisible');
            document.body.style.overflow = 'auto';
        }
    },

    // Close video player
    closeVideoPlayer(): void {
        const videoPlayer = document.getElementById('video-player') as HTMLElement | null;
        if (videoPlayer) {
            // Clear video data
            videoPlayer.dataset.currentIndex = '';
            videoPlayer.dataset.videosData = '';

            const video = videoPlayer.querySelector('video') as HTMLVideoElement | null;
            const iframe = videoPlayer.querySelector('iframe') as HTMLIFrameElement | null;

            // Stop video playback
            if (video && video.style.display !== 'none') {
                video.pause();
                video.currentTime = 0;
                video.src = '';
            }

            // Stop iframe playback by clearing src
            if (iframe && iframe.style.display !== 'none') {
                iframe.src = '';
            }

            // Remove navigation footer
            const existingFooter = videoPlayer.querySelector('.w-full.max-w-4xl.bg-background-primary');
            if (existingFooter) {
                existingFooter.remove();
            }

            videoPlayer.classList.add('opacity-0', 'invisible');
            document.body.style.overflow = 'auto';
        }
    },

    // Handle action events from data-action attributes
    handleAction(element: HTMLElement): void {
        const action = element.getAttribute('data-action');

        switch (action) {
            case 'close-modal':
                this.closeModal();
                break;
            case 'navigate-previous':
                this.navigateToPreviousProject();
                break;
            case 'navigate-next':
                this.navigateToNextProject();
                break;
            case 'open-video':
                const videoSrc = element.getAttribute('data-video-src');
                if (videoSrc) this.openVideoPlayer(videoSrc);
                break;
            case 'open-lightbox':
                const imageSrc = element.getAttribute('data-image-src');
                const imageAlt = element.getAttribute('data-image-alt');
                if (imageSrc && imageAlt) this.openLightbox(imageSrc, imageAlt);
                break;
            case 'close-lightbox':
                this.closeLightbox();
                break;
            case 'close-video-player':
                this.closeVideoPlayer();
                break;
            case 'lightbox-navigate-previous':
                this.navigateLightbox(-1);
                break;
            case 'lightbox-navigate-next':
                this.navigateLightbox(1);
                break;
            case 'video-navigate-previous':
                this.navigateVideo(-1);
                break;
            case 'video-navigate-next':
                this.navigateVideo(1);
                break;
            default:
            // Unknown action: ${action}
        }
    },

    // Setup event listeners
    setupEventListeners(): void {
        // Close modal when clicking outside
        const modal = document.getElementById('project-modal') as HTMLElement | null;
        if (modal) {
            modal.addEventListener('click', (e: Event): void => {
                if (e.target === e.currentTarget) {
                    this.closeModal();
                }
            });
        }

        // Event delegation for all modal actions
        document.addEventListener('click', (e: Event): void => {
            const target = e.target as HTMLElement;
            const actionElement = target.closest('[data-action]') as HTMLElement | null;

            if (actionElement) {
                e.preventDefault();
                this.handleAction(actionElement);
            }
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e: KeyboardEvent): void => {
            const lightbox = document.getElementById('lightbox') as HTMLElement | null;
            const videoPlayer = document.getElementById('video-player') as HTMLElement | null;
            const projectModal = document.getElementById('project-modal') as HTMLElement | null;

            if (e.key === 'Escape') {
                // Check what's currently open and close it
                if (lightbox && !lightbox.classList.contains('invisible')) {
                    this.closeLightbox();
                } else if (videoPlayer && !videoPlayer.classList.contains('invisible')) {
                    this.closeVideoPlayer();
                } else if (projectModal && !projectModal.classList.contains('invisible')) {
                    this.closeModal();
                }
            } else if (lightbox && !lightbox.classList.contains('invisible')) {
                // Navigate lightbox with arrow keys
                if (e.key === 'ArrowLeft') {
                    this.navigateLightbox(-1);
                } else if (e.key === 'ArrowRight') {
                    this.navigateLightbox(1);
                }
            } else if (
                projectModal &&
                !projectModal.classList.contains('invisible') &&
                (!videoPlayer || videoPlayer.classList.contains('invisible'))
            ) {
                // Navigate between projects with arrow keys when modal is open but lightbox/video is not
                if (e.key === 'ArrowLeft') {
                    this.navigateToPreviousProject();
                } else if (e.key === 'ArrowRight') {
                    this.navigateToNextProject();
                }
            }
        });
    }
};

// Make ProjectModal globally available
(window as typeof window & { ProjectModal: typeof ProjectModal }).ProjectModal = ProjectModal;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', (): void => {
    ProjectModal.setupEventListeners();
});

// ProjectModal is made globally available above
