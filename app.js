// 🎮 MAIN APP CONTROLLER
class LoveApp {
    constructor() {
        this.init();
    }

    async init() {
        try {
            // Load everything in parallel
            await Promise.all([
                this.loadData(),
                this.setupObservers(),
                this.initAnimations(),
                this.setupEventListeners()
            ]);
            
            // Hide loader with style
            this.hideLoader();
            
            // Start interactive features
            this.startAmbientSound();
            this.initConstellation();
            
            console.log('🚀 Quantum Love App Ready!');
        } catch (error) {
            this.handleError(error);
        }
    }

    // 📦 DATA LOADER
    async loadData() {
        const response = await fetch('data.json');
        this.data = await response.json();
        this.renderTimeline();
        this.renderGallery();
    }

    // 👁️ INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    setupObservers() {
        this.observers = new Map();
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.observers.get(entry.target)?.();
                }
            });
        }, observerOptions);
    }

    // ✨ ADVANCED ANIMATIONS
    initAnimations() {
        // GSAP-like animation engine
        this.animateOnScroll();
        this.initMagneticEffects();
        this.initLiquidButtons();
        this.initTypewriter();
    }

    // 🧲 MAGNETIC EFFECTS
    initMagneticEffects() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) * 0.3;
                const deltaY = (y - centerY) * 0.3;
                
                el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // 💧 LIQUID BUTTONS
    initLiquidButtons() {
        const buttons = document.querySelectorAll('.liquid-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const x = e.clientX - btn.getBoundingClientRect().left;
                const y = e.clientY - btn.getBoundingClientRect().top;
                
                const wave = document.createElement('div');
                wave.className = 'liquid-wave';
                wave.style.left = `${x}px`;
                wave.style.top = `${y}px`;
                
                btn.appendChild(wave);
                
                setTimeout(() => wave.remove(), 1500);
            });
        });
    }

    // ⌨️ TYPEWRITER EFFECT
    initTypewriter() {
        const typewriter = document.getElementById('typewriter');
        const messages = [
            "Berra, sen benim evrenimsin...",
            "Her bakışın yeni bir galaksi yaratıyor kalbimde",
            "Seninle her an, bir ömrü yaşamaya bedel",
            "Aşkımız, zamanın ötesinde bir sabit yıldız"
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentMessage = messages[messageIndex];
            
            if (!isDeleting && charIndex <= currentMessage.length) {
                typewriter.textContent = currentMessage.substring(0, charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex >= 0) {
                typewriter.textContent = currentMessage.substring(0, charIndex);
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    messageIndex = (messageIndex + 1) % messages.length;
                }
                setTimeout(type, 1000);
            }
        }
        
        type();
    }

    // 🌠 CONSTELLATION CANVAS
    initConstellation() {
        const canvas = document.getElementById('loveConstellation');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const stars = [];
        const connections = [];
        
        // Create stars
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                color: i % 3 === 0 ? '#FF2E63' : i % 3 === 1 ? '#08D9D6' : '#FF9A00'
            });
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw stars
            stars.forEach(star => {
                star.x += star.vx;
                star.y += star.vy;
                
                // Bounce off walls
                if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
                if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
                
                // Draw star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.fill();
                ctx.closePath();
                
                // Glow effect
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(
                    star.x, star.y, star.radius,
                    star.x, star.y, star.radius * 3
                );
                gradient.addColorStop(0, `${star.color}80`);
                gradient.addColorStop(1, `${star.color}00`);
                ctx.fillStyle = gradient;
                ctx.fill();
            });
            
            // Draw connections
            stars.forEach((starA, i) => {
                stars.slice(i + 1).forEach(starB => {
                    const dx = starA.x - starB.x;
                    const dy = starA.y - starB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(starA.x, starA.y);
                        ctx.lineTo(starB.x, starB.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance/150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // 🎵 AMBIENT SOUND
    startAmbientSound() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create ambient pad sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start();
        
        // Store for control
        this.oscillator = oscillator;
        this.gainNode = gainNode;
    }

    // ⚡ ERROR HANDLING
    handleError(error) {
        console.error('🚨 App Error:', error);
        // Graceful error UI
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-overlay';
        errorDiv.innerHTML = `
            <h3>Oops! Bir şeyler yanlış gitti</h3>
            <p>Ama aşkımız hala tamam 😉</p>
            <button onclick="location.reload()">Yeniden Dene</button>
        `;
        document.body.appendChild(errorDiv);
    }

    // 🎯 HIDE LOADER WITH ANIMATION
    hideLoader() {
        const loader = document.getElementById('quantumLoader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.getElementById('app').setAttribute('aria-hidden', 'false');
        }, 1000);
    }
}

// 🚀 BOOTSTRAP APP
document.addEventListener('DOMContentLoaded', () => {
    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
        console.warn('WebGL not supported, falling back to basic animations');
    }
    
    // Initialize app
    window.loveApp = new LoveApp();
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('✅ Service Worker Registered'))
            .catch(err => console.warn('⚠️ Service Worker Failed:', err));
    }
});

// 🌐 OFFLINE SUPPORT
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
});

// 📱 TOUCH OPTIMIZATIONS
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, { passive: false });
