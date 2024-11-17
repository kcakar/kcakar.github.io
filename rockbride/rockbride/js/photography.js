import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import '../css/style.scss';

document.addEventListener("DOMContentLoaded", function () {
    // Step 1: Initialize Masonry
    var elem = document.querySelector('.masonry-container');
    if(!elem)
        return;
    var msnry = new Masonry(elem, {
        itemSelector: '.masonry-item', // Select the items within the container
        columnWidth: '.masonry-item',  // The width of the column should be based on the items
        percentPosition: true, // Use percentage positioning
        gutter: 20, // Space between items
    });

    // Step 2: Use IntersectionObserver to load images lazily and fade them in
    var lazyImages = document.querySelectorAll('.lazy-load'); // Select all images with the lazy-load class

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.getAttribute('data-src'); // Set the source from data-src
                img.classList.add('visible'); // Add the 'visible' class to trigger fade-in

                img.onload = function () {
                    msnry.layout(); // Recalculate Masonry layout after the image is loaded
                };

                observer.unobserve(img); // Stop observing this image after it's loaded
            }
        });
    }, {
        rootMargin: '200px 0px', // Start loading before the image enters the viewport
        threshold: 0.1 // Start loading when 10% of the image is in the viewport
    });

    // Step 3: Observe each lazy-load image
    lazyImages.forEach(function (img) {
        observer.observe(img);
    });

    // Step 4: Trigger Masonry layout after initial image loading (in case images are loaded on page load)
    imagesLoaded(elem, function () {
        msnry.layout(); // Recalculate the layout after images are loaded
    });
});
