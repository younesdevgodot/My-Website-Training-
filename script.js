document.addEventListener('DOMContentLoaded', (event) => {
    loadImages();
});

function uploadImage() {
    const fileInput = document.getElementById('upload-input');
    const titleInput = document.getElementById('image-title');
    const file = fileInput.files[0];
    const title = titleInput.value.trim();

    if (file && file.type.startsWith('image/') && title !== '') {
        const images = getImages();

        // تحقق من عدم وجود نفس العنوان أو نفس الصورة
        const isDuplicateTitle = images.some(image => image.title === title);
        const reader = new FileReader();
        reader.onload = function(e) {
            const isDuplicateImage = images.some(image => image.src === e.target.result);

            if (isDuplicateTitle || isDuplicateImage) {
                alert('الصورة أو العنوان موجود بالفعل. يرجى اختيار صورة أو عنوان مختلف.');
            } else {
                images.push({ title: title, src: e.target.result });
                localStorage.setItem('images', JSON.stringify(images));
                displayImages();
                titleInput.value = '';
                fileInput.value = '';
            }
        }
        reader.readAsDataURL(file);
    } else {
        alert('يرجى اختيار ملف صورة صحيح وإدخال عنوان للصورة');
    }
}

function getImages() {
    const images = localStorage.getItem('images');
    return images ? JSON.parse(images) : [];
}

function loadImages() {
    displayImages();
}

function displayImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';
    const images = getImages();
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <h3>${image.title}</h3>
            <button onclick="deleteImage(${index})">حذف</button>
        `;
        gallery.appendChild(item);
    });
}

function deleteImage(index) {
    const images = getImages();
    images.splice(index, 1);
    localStorage.setItem('images', JSON.stringify(images));
    displayImages();
}
