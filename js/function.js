document.addEventListener("DOMContentLoaded", function () {
    const categoryLink = document.getElementById("categoryLink");
    const mainContainer = document.querySelector(".main-container");

    categoryLink.addEventListener("click", function () {
        // Toggle the "active" class on main-container
        mainContainer.classList.toggle("active");
    });
});
