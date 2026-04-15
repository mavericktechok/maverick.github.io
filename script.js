document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'active' class to trigger the CSS animation
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class when out of view to allow re-triggering
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    // Select all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });

    // WebViewer Integration for Company Documents
    const docButtons = document.querySelectorAll('.doc-btn');
    const viewerElement = document.getElementById('viewer');
    let viewerInstance = null;

    // Define allowed documents to prevent unauthorized file access
    const ALLOWED_DOCS = [
        'Maverick Business Capabilites 2018.doc',
        'Maverick Executive Summary 2020.doc',
        'Quality Policy.doc'
    ];

    docButtons.forEach(button => {
        button.addEventListener('click', () => {
            const docPath = button.getAttribute('data-doc');

            // Validate the document path against the allowlist
            if (!ALLOWED_DOCS.includes(docPath)) {
                console.error('Unauthorized document path:', docPath);
                return;
            }

            // Show the viewer container
            viewerElement.style.display = 'block';

            if (!viewerInstance) {
                // Initialize WebViewer on first click
                WebViewer({
                    path: 'webviewer',
                    initialDoc: docPath
                }, viewerElement).then(instance => {
                    viewerInstance = instance;
                });
            } else {
                // Load the new document if viewer is already initialized
                viewerInstance.UI.loadDocument(docPath);
            }
        });
    });
});
