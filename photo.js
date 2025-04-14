document.addEventListener('DOMContentLoaded', function() {
    // Sample Gallery Data
    const galleryData = [
        { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b', category: 'nature', caption: 'Beautiful Mountains' },
        { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', category: 'nature', caption: 'Forest Landscape' },
        { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e', category: 'nature', caption: 'Waterfall' },
        { src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000', category: 'city', caption: 'City Skyline' },
        { src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b', category: 'city', caption: 'Urban Night' },
        { src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df', category: 'city', caption: 'Cityscape' },
        { src: 'https://images.unsplash.com/photo-1555169062-013468b47731', category: 'animals', caption: 'Wild Deer' },
        { src: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890', category: 'animals', caption: 'Eagle Flying' },
        { src: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5', category: 'animals', caption: 'Fox in Snow' },
        { src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800', category: 'travel', caption: 'Road Trip' },
        { src: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21', category: 'travel', caption: 'Desert Adventure' },
        { src: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e', category: 'travel', caption: 'Beach Sunset' }
    ];

    // DOM Elements
    const galleryGrid = document.querySelector('.gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;
    let filteredImages = [];

    // Load Gallery Images
    function loadGallery(images) {
        galleryGrid.innerHTML = '';
        images.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${image.category}`;
            galleryItem.innerHTML = `
                <img src="${image.src}" alt="${image.caption}" class="gallery-img">
                <div class="gallery-caption">${image.caption}</div>
            `;
            galleryItem.addEventListener('click', () => openLightbox(index, images));
            galleryGrid.appendChild(galleryItem);
        });
    }

    // Filter Images by Category
    function filterImages(category) {
        if (category === 'all') {
            filteredImages = [...galleryData];
        } else {
            filteredImages = galleryData.filter(img => img.category === category);
        }
        loadGallery(filteredImages);
    }

    // Open Lightbox
    function openLightbox(index, images) {
        currentIndex = index;
        lightbox.classList.add('active');
        lightboxImg.src = images[currentIndex].src;
        lightboxCaption.textContent = images[currentIndex].caption;
        document.body.style.overflow = 'hidden';
    }

    // Close Lightbox
    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate Lightbox
    function navigateLightbox(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        } else {
            currentIndex = (currentIndex + 1) % filteredImages.length;
        }
        lightboxImg.src = filteredImages[currentIndex].src;
        lightboxCaption.textContent = filteredImages[currentIndex].caption;
    }

    // Event Listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterImages(btn.dataset.filter);
        });
    });

    closeLightbox.addEventListener('click', closeLightboxFunc);
    prevBtn.addEventListener('click', () => navigateLightbox('prev'));
    nextBtn.addEventListener('click', () => navigateLightbox('next'));

    // Close Lightbox on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightboxFunc();
    });

    // Initialize Gallery
    filterImages('all');
});