// Load Components
async function loadComponents() {
    try {
        console.log('🔄 Loading components...');
        
        // Load Header
        try {
            const headerResponse = await fetch('components/header.html');
            const headerHTML = await headerResponse.text();
            const headerComponent = document.getElementById('headerComponent');
            
            if (headerComponent) {
                headerComponent.innerHTML = headerHTML;
                console.log('✅ Header loaded');
            } else {
                console.error('❌ Header component element not found');
            }
        } catch (error) {
            console.error('❌ Error loading header:', error);
        }

        // Load Footer
        try {
            const footerResponse = await fetch('components/footer.html');
            const footerHTML = await footerResponse.text();
            const footerComponent = document.getElementById('footerComponent');
            
            if (footerComponent) {
                footerComponent.innerHTML = footerHTML;
                console.log('✅ Footer loaded');
            } else {
                console.error('❌ Footer component element not found');
            }
        } catch (error) {
            console.error('❌ Error loading footer:', error);
        }

        // Load Navigation (optional)
        try {
            const navResponse = await fetch('components/navigation.html');
            const navHTML = await navResponse.text();
            const navComponent = document.getElementById('navigationComponent');
            
            if (navComponent) {
                navComponent.innerHTML = navHTML;
                console.log('✅ Navigation loaded');
            } else {
                console.log('ℹ️ Navigation component element not found (optional)');
            }
        } catch (error) {
            console.error('❌ Error loading navigation:', error);
        }

        // Initialize component functionality after loading
        setTimeout(() => {
            initializeComponents();
        }, 100);
        
        console.log('✅ All components loaded successfully');
        
    } catch (error) {
        console.error('❌ Error loading components:', error);
    }
}

// Initialize Component Functionality
function initializeComponents() {
    console.log('🔧 Initializing components...');
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        console.log('✅ Mobile menu initialized');
    }

    // Side Navigation (jika ada)
    const navClose = document.getElementById('navClose');
    const navOverlay = document.getElementById('navOverlay');
    const sideNavigation = document.getElementById('sideNavigation');

    if (navClose && navOverlay && sideNavigation) {
        navClose.addEventListener('click', () => {
            sideNavigation.classList.remove('active');
            navOverlay.classList.remove('active');
        });

        navOverlay.addEventListener('click', () => {
            sideNavigation.classList.remove('active');
            navOverlay.classList.remove('active');
        });

        // Close side nav when clicking on links
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                sideNavigation.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        console.log('✅ Side navigation initialized');
    }

    // Active Navigation Link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    console.log('✅ Navigation active state initialized');
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM ready, loading components...');
    loadComponents();
});

// Manual retry function
window.loadComponents = loadComponents;