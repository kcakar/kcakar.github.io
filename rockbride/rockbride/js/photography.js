import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import hashtags from './hashtags.json';
import '../css/style.scss';

let iso = null;
document.addEventListener("DOMContentLoaded", function () {
    var elem = document.querySelector('.photography');
    if (!elem)
        return;

    iso = new Isotope('.photography', {
        itemSelector: '.photography-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.photography-item',
            gutter: 20
        }, hiddenStyle: {
            opacity: 0,
            height: 0,
            pointerEvents: 'none'
        },
        visibleStyle: {
            opacity: 1,
            height: 'auto'
        }, 
        transitionDuration: '0'
    });

    var lazyImages = document.querySelectorAll('.lazy-load');

    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('visible');

                img.onload = function () {
                    iso.layout();
                    img.onload = null;
                };

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px 0px',
        threshold: 0.1
    });

    lazyImages.forEach(function (img) {
        observer.observe(img);
    });

    imagesLoaded(elem, function () {
        iso.layout();
    });
});


const hashtagsContainer = document.querySelector('.hashtags');
hashtagsContainer.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'SPAN') {
        filterImages(e.target.innerHTML);
    }
});

function filterImages(query) {
    if (query.startsWith('#')) {
        query = query.slice(1);
    }

    const result = hashtags.find(tag => tag.word.includes(query));
    if (result != null) {
        const selector = result.imageIDs.map(id => `[data-id='${id}']`).join(', ');
        iso.arrange({ filter: selector });
        iso.layout();
    }
}

