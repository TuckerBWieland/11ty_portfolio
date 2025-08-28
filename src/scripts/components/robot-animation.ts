// Robot Animation Component for 404 Page
interface RobotElements {
    leftPupil: HTMLElement | null;
    rightPupil: HTMLElement | null;
    robotMouth: HTMLElement | null;
}

class RobotAnimation {
    private elements: RobotElements;
    private idleTimer: number | null = null;
    private mouthReactionTimer: number | null = null;

    constructor() {
        this.elements = {
            leftPupil: document.getElementById('left-pupil'),
            rightPupil: document.getElementById('right-pupil'),
            robotMouth: document.querySelector('.robot-mouth')
        };

        this.init();
    }

    private init(): void {
        if (!this.elements.leftPupil || !this.elements.rightPupil || !this.elements.robotMouth) {
            // Robot animation elements not found
            return;
        }

        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        document.addEventListener('mousemove', (e: MouseEvent) => this.handleMouseMove(e));
    }

    private handleMouseMove(e: MouseEvent): void {
        const { leftPupil, rightPupil, robotMouth } = this.elements;
        if (!leftPupil || !rightPupil || !robotMouth) return;

        this.clearTimers();

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Get eye positions
        const leftEye = leftPupil.parentElement as HTMLElement;
        const rightEye = rightPupil.parentElement as HTMLElement;

        if (!leftEye || !rightEye) return;

        const leftEyeRect = leftEye.getBoundingClientRect();
        const rightEyeRect = rightEye.getBoundingClientRect();

        // Calculate eye centers
        const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
        const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;
        const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
        const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;

        // Move pupils based on mouse position
        const maxMove = 6; // Maximum pixels the pupil can move
        const moveSpeed = 0.1; // How fast the eyes follow

        // Left eye movement
        const leftDeltaX = (mouseX - leftEyeCenterX) * moveSpeed;
        const leftDeltaY = (mouseY - leftEyeCenterY) * moveSpeed;
        const leftMoveX = Math.max(-maxMove, Math.min(maxMove, leftDeltaX));
        const leftMoveY = Math.max(-maxMove, Math.min(maxMove, leftDeltaY));

        // Right eye movement
        const rightDeltaX = (mouseX - rightEyeCenterX) * moveSpeed;
        const rightDeltaY = (mouseY - rightEyeCenterY) * moveSpeed;
        const rightMoveX = Math.max(-maxMove, Math.min(maxMove, rightDeltaX));
        const rightMoveY = Math.max(-maxMove, Math.min(maxMove, rightDeltaY));

        // Apply movement
        leftPupil.style.transform = `translate(calc(-50% + ${leftMoveX}px), calc(-50% + ${leftMoveY}px))`;
        rightPupil.style.transform = `translate(calc(-50% + ${rightMoveX}px), calc(-50% + ${rightMoveY}px))`;

        // Reset mouth to normal state
        robotMouth.classList.remove('talking', 'smiling');

        // Set idle timer for dramatic movements
        this.idleTimer = window.setTimeout(() => {
            this.performIdleAnimation();
        }, 3000); // 3 seconds of no movement
    }

    private clearTimers(): void {
        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
            this.idleTimer = null;
        }
        if (this.mouthReactionTimer) {
            clearTimeout(this.mouthReactionTimer);
            this.mouthReactionTimer = null;
        }
    }

    private performIdleAnimation(): void {
        const { leftPupil, rightPupil, robotMouth } = this.elements;
        if (!leftPupil || !rightPupil || !robotMouth) return;

        // Dramatic side-to-side eye movement when idle
        this.dramaticEyeMove();

        // Add mouth reactions
        this.mouthReactionTimer = window.setTimeout(() => {
            const reactions = ['talking', 'smiling'];
            const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
            robotMouth.classList.add(randomReaction);

            // Remove reaction after a delay
            setTimeout(() => {
                robotMouth.classList.remove(randomReaction);
            }, 2000);
        }, 1000);
    }

    private dramaticEyeMove(): void {
        const { leftPupil, rightPupil } = this.elements;
        if (!leftPupil || !rightPupil) return;

        const sequence = [
            { x: -8, y: 0, delay: 0 }, // Look left
            { x: 8, y: 0, delay: 800 }, // Look right
            { x: 0, y: -6, delay: 1600 }, // Look up
            { x: 0, y: 6, delay: 2400 }, // Look down
            { x: 0, y: 0, delay: 3200 } // Return to center
        ];

        sequence.forEach(({ x, y, delay }) => {
            setTimeout(() => {
                const transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                leftPupil.style.transform = transform;
                rightPupil.style.transform = transform;
            }, delay);
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', (): void => {
    new RobotAnimation();
});
