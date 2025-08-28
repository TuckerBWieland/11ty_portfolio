// Company Tooltip Component for Worked With Section
interface CompanyDescriptions {
    [key: string]: string;
}

interface TooltipElements {
    tooltip: HTMLElement | null;
    tooltipName: HTMLElement | null;
    tooltipDescription: HTMLElement | null;
    companyItems: NodeListOf<HTMLElement>;
}

class CompanyTooltip {
    private elements: TooltipElements;
    private tooltipTimeout: number | null = null;
    private isClickOpen = false;
    private currentClickedItem: HTMLElement | null = null;

    private readonly companyDescriptions: CompanyDescriptions = {
        shopify:
            'Lead marketer and operations focused on building trust and engagement with global developer audiences.',
        justworks:
            'Directed marketing strategy and operations, with emphasis on corporate and go-to-market operations.',
        loreal: 'Crafted marketing assessments and training to identify skill gaps and implement initiatives across a large organization.',
        ups: 'Completed 170 go-to-market assessments for small- and medium-sized businesses nationwide.',
        'general-assembly':
            'Product Manager for enterprise learning products sold to Fortune 500 companies to reskill employee workforces.',
        'billion-oyster':
            'Volunteer as a community scientist—collecting water samples and building data visualizations to make environmental data more accessible.'
    };

    constructor() {
        this.elements = {
            tooltip: document.getElementById('company-tooltip'),
            tooltipName: document.getElementById('tooltip-company-name'),
            tooltipDescription: document.getElementById('tooltip-company-description'),
            companyItems: document.querySelectorAll('.company-item')
        };

        this.init();
    }

    private init(): void {
        const { tooltip, tooltipName, tooltipDescription, companyItems } = this.elements;

        // Early exit if essential elements are missing
        if (!tooltip || !tooltipName || !tooltipDescription || companyItems.length === 0) {
            // Essential tooltip elements not found, aborting script
            return;
        }

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const { companyItems } = this.elements;

        // Setup company item interactions
        companyItems.forEach(item => {
            this.setupCompanyItemListeners(item);
        });

        // Tooltip hover listeners
        this.setupTooltipListeners();

        // Global event listeners
        this.setupGlobalListeners();
    }

    private setupCompanyItemListeners(item: HTMLElement): void {
        // Click functionality
        item.addEventListener('click', (e: Event) => this.handleItemClick(e, item));

        // Hover functionality (only if not click-opened)
        item.addEventListener('mouseenter', () => this.handleItemMouseEnter(item));
        item.addEventListener('mouseleave', () => this.handleItemMouseLeave());
    }

    private setupTooltipListeners(): void {
        const { tooltip } = this.elements;
        if (!tooltip) return;

        // Hide tooltip when mouse leaves tooltip area (only for hover-opened tooltips)
        tooltip.addEventListener('mouseenter', () => {
            if (!this.isClickOpen) {
                this.clearTooltipTimeout();
            }
        });

        tooltip.addEventListener('mouseleave', () => {
            if (!this.isClickOpen) {
                this.hideTooltip();
            }
        });
    }

    private setupGlobalListeners(): void {
        // Click outside to dismiss (only for click-opened tooltips)
        document.addEventListener('click', (e: Event): void => this.handleDocumentClick(e));

        // Hide tooltip on scroll and resize
        window.addEventListener('scroll', (): void => this.hideTooltip());
        window.addEventListener('resize', (): void => this.hideTooltip());

        // Hide tooltip with Escape key
        document.addEventListener('keydown', (e: KeyboardEvent): void => this.handleKeyDown(e));
    }

    private handleItemClick(e: Event, item: HTMLElement): void {
        e.preventDefault();
        this.clearTooltipTimeout();

        // If clicking the same item that's already open, close it
        if (this.isClickOpen && this.currentClickedItem === item) {
            this.hideTooltip();
            return;
        }

        // Remove force-hover from any previous item
        if (this.currentClickedItem) {
            this.currentClickedItem.classList.remove('force-hover');
        }

        // Show tooltip and mark as click-opened
        this.isClickOpen = true;
        this.currentClickedItem = item;
        item.classList.add('force-hover');
        this.showTooltip(item);
    }

    private handleItemMouseEnter(item: HTMLElement): void {
        if (!this.isClickOpen) {
            this.clearTooltipTimeout();
            this.showTooltip(item);
        }
    }

    private handleItemMouseLeave(): void {
        if (!this.isClickOpen) {
            this.tooltipTimeout = window.setTimeout(() => {
                this.hideTooltip();
            }, 150); // Small delay to prevent flickering
        }
    }

    private handleDocumentClick(e: Event): void {
        const { tooltip } = this.elements;
        const target = e.target as HTMLElement;

        if (this.isClickOpen && tooltip && !tooltip.contains(target) && !target.closest('.company-item')) {
            this.hideTooltip();
        }
    }

    private handleKeyDown(e: KeyboardEvent): void {
        if (e.key === 'Escape' && this.isClickOpen) {
            this.hideTooltip();
        }
    }

    private positionTooltip(element: HTMLElement): void {
        const { tooltip } = this.elements;
        if (!tooltip) return;

        const rect = element.getBoundingClientRect();

        // Calculate position relative to the viewport
        let left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2;
        let top = rect.bottom + 12; // 12px gap below the logo

        // Ensure tooltip doesn't go off-screen horizontally
        const padding = 16;
        if (left < padding) {
            left = padding;
        } else if (left + tooltip.offsetWidth > window.innerWidth - padding) {
            left = window.innerWidth - tooltip.offsetWidth - padding;
        }

        // Ensure tooltip doesn't go off-screen vertically
        if (top + tooltip.offsetHeight > window.innerHeight - padding) {
            top = rect.top - tooltip.offsetHeight - 12; // Show above instead
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }

    private showTooltip(item: HTMLElement): void {
        const { tooltip, tooltipName, tooltipDescription } = this.elements;
        if (!tooltip || !tooltipName || !tooltipDescription) return;

        const companyName = item.getAttribute('data-company') || '';
        const companyId = item.getAttribute('data-company-id') || '';

        tooltipName.textContent = companyName;
        tooltipDescription.textContent = this.companyDescriptions[companyId] || 'Information not available.';

        this.positionTooltip(item);
        tooltip.classList.add('show');
    }

    private hideTooltip(): void {
        const { tooltip } = this.elements;
        if (!tooltip) return;

        tooltip.classList.remove('show');

        // Reset hover state on the currently clicked item when tooltip transition ends
        if (this.currentClickedItem) {
            const itemToReset = this.currentClickedItem;

            // Listen for the tooltip's transition to complete, then reset logo color
            const handleTransitionEnd = (e: TransitionEvent): void => {
                if (e.target === tooltip && e.propertyName === 'opacity') {
                    itemToReset.classList.remove('force-hover');
                    tooltip.removeEventListener('transitionend', handleTransitionEnd);
                }
            };

            tooltip.addEventListener('transitionend', handleTransitionEnd);
        }

        this.isClickOpen = false;
        this.currentClickedItem = null;
    }

    private clearTooltipTimeout(): void {
        if (this.tooltipTimeout) {
            clearTimeout(this.tooltipTimeout);
            this.tooltipTimeout = null;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', (): void => {
    new CompanyTooltip();
});
