window.addEventListener('load', () => {
    renderPhoto();
});

async function getDataFromApi() {
    const apiAccessKey = 'WCXr5XjBlkSdA9sM9DzZFxm0deyGUM82jUTRAKKlRww';
    try {
        const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${apiAccessKey}`
        );
        const photoData = await response.json();
        return photoData;
    } catch (error) {
        console.error('Error:', error);
        return {};
    }
}

async function renderPhoto() {

    const photoData = await getDataFromApi();

    if (photoData) {
        const image = document.querySelector('.image');
        const img = document.createElement('img');
        img.classList.add('img');

        img.src = photoData.urls.regular;
        img.alt = photoData.alt_description;
        image.appendChild(img);

        const titlePhotoOwner = document.querySelector('.title__photo_owner');
        titlePhotoOwner.textContent = `${photoData.user.name}`;

        const likesSection = document.querySelector('.likes-section__counter');
        likesSection.textContent = `${photoData.likes}`;

        console.log(photoData);
    }
}

const counterButton = document.querySelector('.likes-section__button');

function increaseCounter() {
    const likesCounter = document.querySelector('.likes-section__counter');
    const currentCounter = parseInt(likesCounter.textContent);
    likesCounter.textContent = currentCounter + 1;
}

counterButton.addEventListener('click', function () {
    increaseCounter();
});
