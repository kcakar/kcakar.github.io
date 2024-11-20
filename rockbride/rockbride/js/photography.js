import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import hashtags from './hashtags.json';
import { bindHamburger, initScrollButton } from './motions'
import '../css/style.scss';

let iso = null;
document.addEventListener("DOMContentLoaded", function () {
    bindHamburger();
    initScrollButton();
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

const viewer = document.querySelector('.photo-viewer');
document.querySelector('.photography').addEventListener('click', e => {
    if (e.target && e.target.classList.contains('photography-item')) {
        setViewerImage(e.target.getAttribute('data-detail-src'), e.target.getAttribute('data-id'));
        viewer.classList.add('fullscreen');

        // Try Fullscreen API
        if (document.documentElement.requestFullscreen) {
            viewer.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen mode:", err);
                // Fallback to CSS if fullscreen API fails
                viewer.classList.add('fullscreen');
            });
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            viewer.mozRequestFullScreen().catch(err => {
                console.error("Error attempting to enable fullscreen mode:", err);
                viewer.classList.add('fullscreen');
            });
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari
            viewer.webkitRequestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen mode:", err);
                viewer.classList.add('fullscreen');
            });
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            viewer.msRequestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen mode:", err);
                viewer.classList.add('fullscreen');
            });
        } else {
            // No fullscreen support, fallback to CSS solution
            console.error('Fullscreen not supported in this browser.');
            viewer.classList.add('fullscreen');
        }
    }
});

const loader = viewer.querySelector('.loader');
const image = viewer.querySelector('img');
function setViewerImage(src, id) {
    image.src = src;
    loader.style.display = 'block';
    image.style.display = 'none';
    image.src = src;
    viewer.setAttribute('data-id', id);
    image.onload = function () {
        loader.style.display = 'none';
        image.style.display = 'block';
    };

    image.onerror = function () {
        loader.style.display = 'none';
    };
}

viewer.querySelector('.close').addEventListener('click', e => {
    closeViewer()
})

function closeViewer() {
    if (document.fullscreenElement ||
        document.mozFullScreenElement || // Firefox
        document.webkitFullscreenElement || // Safari, Chrome, Opera
        document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { // For WebKit browsers
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) { // For Firefox
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) { // For IE/Edge
            document.msExitFullscreen();
        }
    }
    viewer.classList.remove('fullscreen')
}

viewer.querySelector('.next').addEventListener('click', e => {
    const currentID = Number(viewer.getAttribute('data-id'));
    let nextID;
    if (currentHashtag) {
        const imageIDs = currentHashtag.imageIDs;
        const currentIndex = imageIDs.indexOf(currentID);

        if (currentIndex !== -1) {
            if (currentIndex === imageIDs.length - 1) {
                nextID = imageIDs[0];
            } else {
                nextID = imageIDs[currentIndex + 1];
            }
        }
    }
    else {
        const nextIMG = document.querySelector(`.photography-item[data-id="${currentID}"]`).nextElementSibling
        if (nextIMG) {
            nextID = nextIMG.getAttribute('data-id')
        }
        else {
            nextID = 1;
        }
    }
    const nextIMG = document.querySelector(`.photography-item[data-id="${nextID}"]`);
    setViewerImage(nextIMG.getAttribute('data-detail-src'), nextIMG.getAttribute('data-id'))
})

viewer.querySelector('.prev').addEventListener('click', e => {
    const currentID = Number(viewer.getAttribute('data-id'));
    let prevID;
    if (currentHashtag) {
        const imageIDs = currentHashtag.imageIDs;
        const currentIndex = imageIDs.indexOf(currentID);

        if (currentIndex !== -1) {
            if (currentIndex === 0) {
                prevID = imageIDs[imageIDs.length - 1];
            } else {
                prevID = imageIDs[currentIndex - 1];
            }
        }
    }
    else {
        const prevIMG = document.querySelector(`.photography-item[data-id="${currentID}"]`).previousElementSibling
        if (prevIMG) {
            prevID = prevIMG.getAttribute('data-id')
        }
        else {
            prevID = document.querySelector('.photography-item:last-of-type').getAttribute('data-id');
        }
    }
    const prevIMG = document.querySelector(`.photography-item[data-id="${prevID}"]`);
    setViewerImage(prevIMG.getAttribute('data-detail-src'), prevIMG.getAttribute('data-id'))
})

document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
        viewer.classList.remove('fullscreen');
    }
});

const hashtagsContainer = document.querySelector('.hashtags');
let currentHashtag = null;
hashtagsContainer.addEventListener('click', e => {
    if (e.target && e.target.tagName === 'SPAN') {
        let query = e.target.getAttribute('data-tag')

        if (query === currentHashtag?.word) {
            let selectedSpan = document.querySelector('.selected');
            if (selectedSpan) {
                selectedSpan.classList.remove('selected');
            }
            filterImages();
        }
        else {
            let selectedSpan = document.querySelector('.selected');
            if (selectedSpan) {
                selectedSpan.classList.remove('selected');
            }
            e.target.classList.add('selected');
            filterImages(query);
        }
    }
});

function filterImages(query) {
    if (!query) {
        currentHashtag = null;
        iso.arrange({ filter: '*' });
        iso.layout();
    }

    const result = hashtags.find(tag => tag.word.includes(query));
    if (result != null) {
        currentHashtag = result;
        const selector = result.imageIDs.map(id => `[data-id='${id}']`).join(', ');
        iso.arrange({ filter: selector });
        iso.layout();
    }
}
