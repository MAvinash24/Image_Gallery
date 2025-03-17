let images = [];
let currentIndex = 0;
let zoomLevel = 1;

// Handle File Upload (Click & Drag-and-Drop)
document.getElementById("uploadContainer").addEventListener("click", () => {
    document.getElementById("imageUpload").click();
});

document.getElementById("uploadContainer").addEventListener("dragover", (e) => {
    e.preventDefault();
});

document.getElementById("uploadContainer").addEventListener("drop", (event) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
});

document.getElementById("imageUpload").addEventListener("change", function(event) {
    handleFiles(event.target.files);
});

function handleFiles(files) {
    const gallery = document.getElementById("gallery");
    for (let file of files) {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(e) {
                images.push(e.target.result);
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imgElement.onclick = function() { openLightbox(images.length - 1); };
                gallery.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }
    }
}

// Open Lightbox
function openLightbox(index) {
    if (images.length === 0) return; // Prevent opening lightbox if no images exist

    currentIndex = index;
    let lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = images[currentIndex] || "noimage.png";

    let isDefaultImage = lightboxImg.src.includes("noimage.png");

    // Hide controls if there's no valid image
    document.querySelector(".prev").style.display = isDefaultImage ? "none" : "block";
    document.querySelector(".next").style.display = isDefaultImage ? "none" : "block";
    document.querySelector(".download").style.display = isDefaultImage ? "none" : "block";
    document.querySelector(".zoom-in").style.display = isDefaultImage ? "none" : "block";
    document.querySelector(".zoom-out").style.display = isDefaultImage ? "none" : "block";

    document.getElementById("lightbox").style.display = "flex";
}

// Close Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Image Navigation
function changeImage(step) {
    currentIndex = (currentIndex + step + images.length) % images.length;
    document.getElementById("lightbox-img").src = images[currentIndex];
    resetZoom();
}

// Download Image
function downloadImage() {
    let link = document.createElement("a");
    link.href = images[currentIndex];
    link.download = `image-${currentIndex + 1}.jpg`;
    link.click();
}

// Zoom Functions
function zoomImage(factor) {
    zoomLevel *= factor;
    document.getElementById("lightbox-img").style.transform = `scale(${zoomLevel})`;
}

function resetZoom() {
    zoomLevel = 1;
    document.getElementById("lightbox-img").style.transform = "scale(1)";
}
