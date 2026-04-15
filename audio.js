// Global audio manager
window.AudioManager = {
    ctx: null,
    bgMusic: null,
    isMuted: localStorage.getItem('mx_muted') === 'true',
    isMusicOff: localStorage.getItem('mx_music_off') === 'true',

    init() {
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            
            this.bgMusic = new Audio('paulyudin-chill-silent-bloom-chill.mp3');
            this.bgMusic.loop = true;
            this.bgMusic.volume = 0.3;
            
            // Try to resume AudioContext on first interaction
            const tryPlay = async () => {
                if (this.ctx && this.ctx.state === 'suspended') {
                    await this.ctx.resume();
                }
                if (!this.isMusicOff && this.bgMusic) {
                    this.bgMusic.play().catch(() => {});
                }
                document.removeEventListener('click', tryPlay);
                document.removeEventListener('touchstart', tryPlay);
            };
            document.addEventListener('click', tryPlay);
            document.addEventListener('touchstart', tryPlay);
            
        } catch(e) { }
    },
    
    toggleMusic() {
        this.isMusicOff = !this.isMusicOff;
        localStorage.setItem('mx_music_off', this.isMusicOff);
        if (this.isMusicOff) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    },
    
    toggleSound() {
        this.isMuted = !this.isMuted;
        localStorage.setItem('mx_muted', this.isMuted);
    },

    playClick() { if (!this.isMuted && this.ctx) this.beep(800, 0.05); },
    
    playMusic() {
        if (!this.isMusicOff && this.bgMusic) {
            this.bgMusic.play().catch(() => {});
        }
    },
    
    pauseMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    },
    
    stopMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    },

    beep(freq, duration) {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.value = 0.1;
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
};

// Stop/Resume music based on page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        window.AudioManager?.pauseMusic();
    } else {
        // Only resume if it wasn't manually turned off
        if (!window.AudioManager?.isMusicOff) {
            window.AudioManager?.playMusic();
        }
    }
});

window.onpagehide = () => { window.AudioManager?.pauseMusic(); };