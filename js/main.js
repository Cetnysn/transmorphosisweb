document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for sidebar navigation links
    const sidebarLinks = document.querySelectorAll('#sidebar-navigation a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100, // Offset for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in sidebar navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.story-section');
        const scrollPosition = window.scrollY + 150; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Video play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, this would play the video
            // For now, we'll just show an alert
            alert('Video would play here in a real implementation');
        });
    }
    
    // Back project button functionality
    const backProjectBtn = document.querySelector('.back-project-btn');
    if (backProjectBtn) {
        backProjectBtn.addEventListener('click', function() {
            // Scroll to rewards section
            const rewardTiers = document.querySelector('.reward-tiers');
            if (rewardTiers) {
                rewardTiers.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Select reward buttons
    const selectRewardBtns = document.querySelectorAll('.select-reward-btn');
    selectRewardBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real implementation, this would open a pledge modal
            // For now, we'll just show an alert with the reward tier
            const rewardTitle = this.closest('.reward-card').querySelector('.reward-title').textContent;
            alert(`You selected the "${rewardTitle}" reward tier. In a real implementation, a pledge modal would open.`);
        });
    });
    
    // Remind me button functionality
    const remindBtn = document.querySelector('.remind-btn');
    if (remindBtn) {
        remindBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-bookmark"></i> Reminded';
            this.classList.add('reminded');
            // In a real implementation, this would save to user's account
        });
    }
    
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const header = document.getElementById('site-header');
        const headerContent = document.querySelector('.header-content');
        
        // Only create if it doesn't exist yet
        if (!document.querySelector('.mobile-menu-btn')) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
            headerContent.prepend(mobileMenuBtn);
            
            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', function() {
                headerContent.classList.toggle('mobile-active');
                this.classList.toggle('active');
            });
        }
    };
    
    // Check if we need mobile navigation
    if (window.innerWidth <= 768) {
        createMobileNav();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            createMobileNav();
        }
    });
    
    // Sticky sidebar on scroll (for desktop only)
    const stickySidebar = () => {
        if (window.innerWidth > 992) {
            const sidebar = document.querySelector('.project-sidebar');
            const mainContent = document.querySelector('.main-content-area');
            
            if (sidebar && mainContent) {
                const mainContentHeight = mainContent.offsetHeight;
                const sidebarHeight = sidebar.offsetHeight;
                const scrollPosition = window.scrollY;
                const headerHeight = document.getElementById('site-header').offsetHeight;
                const projectHeaderHeight = document.getElementById('project-header').offsetHeight;
                const startPosition = headerHeight + projectHeaderHeight;
                
                // Only make sidebar sticky if main content is taller than sidebar
                if (mainContentHeight > sidebarHeight) {
                    if (scrollPosition > startPosition) {
                        // Check if sidebar is at the bottom of main content
                        if (scrollPosition + sidebarHeight + 40 < startPosition + mainContentHeight) {
                            sidebar.style.position = 'fixed';
                            sidebar.style.top = headerHeight + 'px';
                            sidebar.style.width = sidebar.parentElement.offsetWidth * 0.3 + 'px';
                        } else {
                            sidebar.style.position = 'absolute';
                            sidebar.style.top = (mainContentHeight - sidebarHeight) + 'px';
                            sidebar.style.width = '30%';
                        }
                    } else {
                        sidebar.style.position = 'static';
                        sidebar.style.width = '30%';
                    }
                }
            }
        }
    };
    
    // Initialize sticky sidebar
    window.addEventListener('scroll', stickySidebar);
    window.addEventListener('resize', stickySidebar);
}); 