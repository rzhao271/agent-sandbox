// Sample JavaScript for Agent Sandbox Web Demo
// This file demonstrates common JavaScript patterns and functionality

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Agent Sandbox sample page loaded successfully!');
    
    // Initialize the page
    initializePage();
    setupEventListeners();
    addInteractivity();
});

/**
 * Initialize page elements and setup
 */
function initializePage() {
    // Add fade-in animation to content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 200);
    });
    
    // Set current year in footer if needed
    const currentYear = new Date().getFullYear();
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.textContent = footer.textContent.replace('2024', currentYear);
    }
}

/**
 * Setup event listeners for interactive elements
 */
function setupEventListeners() {
    // Demo button click handler
    const demoButton = document.getElementById('demo-button');
    if (demoButton) {
        demoButton.addEventListener('click', handleDemoClick);
    }
    
    // Submit button click handler
    const submitButton = document.getElementById('submit-button');
    if (submitButton) {
        submitButton.addEventListener('click', handleSubmit);
    }
    
    // Enter key handler for input field
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
}

/**
 * Handle demo button click
 */
function handleDemoClick() {
    const messages = [
        "Welcome to the Agent Sandbox demo!",
        "This demonstrates JavaScript functionality.",
        "You can interact with various elements on this page.",
        "Try typing in the input field below!"
    ];
    
    const outputArea = document.getElementById('output');
    if (outputArea) {
        outputArea.innerHTML = '';
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                addMessageToOutput(message, 'demo');
            }, index * 1000);
        });
    }
    
    // Scroll to the demo section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Handle form submission
 */
function handleSubmit() {
    const userInput = document.getElementById('user-input');
    const inputValue = userInput.value.trim();
    
    if (inputValue === '') {
        addMessageToOutput('Please enter a message first!', 'error');
        return;
    }
    
    // Add user message
    addMessageToOutput(`You said: "${inputValue}"`, 'user');
    
    // Simulate processing delay
    setTimeout(() => {
        const response = generateResponse(inputValue);
        addMessageToOutput(response, 'bot');
    }, 500);
    
    // Clear input
    userInput.value = '';
}

/**
 * Add message to output area
 */
function addMessageToOutput(message, type = 'default') {
    const outputArea = document.getElementById('output');
    if (!outputArea) return;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `message-${type}`);
    messageElement.textContent = message;
    
    // Add type-specific styling
    switch (type) {
        case 'user':
            messageElement.style.backgroundColor = '#e6f3ff';
            messageElement.style.borderLeft = '4px solid #667eea';
            break;
        case 'bot':
            messageElement.style.backgroundColor = '#f0fff4';
            messageElement.style.borderLeft = '4px solid #48bb78';
            break;
        case 'error':
            messageElement.style.backgroundColor = '#fff5f5';
            messageElement.style.borderLeft = '4px solid #f56565';
            break;
        case 'demo':
            messageElement.style.backgroundColor = '#faf5ff';
            messageElement.style.borderLeft = '4px solid #9f7aea';
            break;
    }
    
    outputArea.appendChild(messageElement);
    
    // Scroll to latest message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Generate a response based on user input
 */
function generateResponse(input) {
    const responses = {
        'hello': 'Hello there! Welcome to the Agent Sandbox!',
        'hi': 'Hi! How can I help you today?',
        'how are you': 'I\'m doing great! Thanks for asking.',
        'what is this': 'This is a sample web page demonstrating HTML, CSS, and JavaScript.',
        'agent': 'This is the Agent Sandbox - a place for AI agent experimentation!',
        'sandbox': 'The sandbox provides a safe environment for testing and development.',
        'help': 'You can type anything here and I\'ll try to respond! Try asking about agents or the sandbox.'
    };
    
    const lowerInput = input.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerInput.includes(keyword)) {
            return response;
        }
    }
    
    // Default responses
    const defaultResponses = [
        `Interesting! You said "${input}". That's a great observation!`,
        `Thanks for sharing "${input}" with me!`,
        `I received your message: "${input}". What else would you like to know?`,
        `"${input}" - that's something to think about!`,
        `Got it! "${input}" is noted. Feel free to explore more features!`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

/**
 * Handle smooth scrolling for navigation
 */
function handleSmoothScroll(event) {
    event.preventDefault();
    
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Add additional interactivity and animations
 */
function addInteractivity() {
    // Add scroll effect for header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out';
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
}

// Utility functions
const Utils = {
    /**
     * Debounce function to limit function calls
     */
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },
    
    /**
     * Check if element is in viewport
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    /**
     * Format date for display
     */
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
};

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Utils,
        generateResponse,
        addMessageToOutput
    };
}