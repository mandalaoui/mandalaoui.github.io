// ========== Theme Toggle ==========
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function setDarkTheme() {
    root.style.setProperty('--primary', '#3b82f6');
    root.style.setProperty('--primary-dark', '#1d4ed8');
    root.style.setProperty('--secondary', '#f3f4f6');
    root.style.setProperty('--dark', '#1f2937');
    root.style.setProperty('--light', '#ffffff');
    root.style.setProperty('--gray', '#6b7280');
    root.style.setProperty('--light-gray', '#e5e7eb');
    root.style.setProperty('--dark-gray', '#1f1f1f');
    root.style.setProperty('--background', '#2b2b2b');
    root.style.setProperty('--gray-border', '#444');
    root.style.setProperty('--tech-blue', '#90cdf4');
    root.style.setProperty('--light-text', '#ddd');
    root.style.setProperty('--dark-blue', '#2c3341');
    root.style.setProperty('--text-color', '#ffffff');
    localStorage.setItem('theme', 'dark');
}

function setLightTheme() {
    root.style.setProperty('--primary', '#2563eb');
    root.style.setProperty('--primary-dark', '#1d4ed8');
    root.style.setProperty('--secondary', '#ffffff');        // רקע משני בהיר
    root.style.setProperty('--dark', '#111827');             // טקסט כהה
    root.style.setProperty('--light', '#f9fafb');            // רקע כללי בהיר
    root.style.setProperty('--gray', '#6b7280');             // אפור כללי
    root.style.setProperty('--light-gray', '#f3f4f6');       // אפור בהיר
    root.style.setProperty('--dark-gray', '#e5e7eb');        // כהה יחסית לרקע
    root.style.setProperty('--background', '#ddd');          // רקע ראשי
    root.style.setProperty('--gray-border', '#ccc');         // גבולות בהירים
    root.style.setProperty('--tech-blue', '#2563eb');        // כחול לטכנולוגיות
    root.style.setProperty('--light-text', '#444');          // טקסט עזר כהה
    root.style.setProperty('--dark-blue', '#f0f0f0');        // רקע קלטים בהיר
    root.style.setProperty('--text-color', '#000000');       // טקסט רגיל שחור
    localStorage.setItem('theme', 'light');
}


function loadTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        storedTheme === 'light' ? setLightTheme() : setDarkTheme();
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkTheme();
        } else {
            setLightTheme();
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = localStorage.getItem('theme');
        current === 'light' ? setDarkTheme() : setLightTheme();
    });
    loadTheme();
}

// ========== Mobile Navigation ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Contact Form Submission ==========
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

if (contactForm && contactStatus) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showToast("✅ Message sent successfully!");
            contactForm.reset();
        } else {
            showToast("❌ Something went wrong. Please try again.", true);
        }
    });
}

// ========== Video Modal ==========
const modal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const closeBtn = document.querySelector(".modal .close");

function openVideoModal(videoUrl) {
    videoFrame.src = videoUrl;
    modal.style.display = "block";
}

closeBtn.onclick = () => {
    videoFrame.src = ""; // Stop video
    videoFrame.muted = true; 
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        videoFrame.src = "";
        modal.style.display = "none";
    }
};

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.backgroundColor = isError ? 'crimson' : getComputedStyle(document.documentElement).getPropertyValue('--primary');
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

