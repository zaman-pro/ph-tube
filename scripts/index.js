// fetch data for categories button

function loadCategories() {
  // fetch data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then((res) => res.json())

    // send data to display category func
    .then((data) => displayCategories(data["categories"]));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");

  for (let cat of categories) {
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
  <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
  `;

    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");

    videoCard.innerHTML = `
    <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover rounded-lg" src="${video.thumbnail}" />
          <span
            class="absolute bottom-2 right-2 bg-black/50 text-white rounded text-sm px-2"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="flex items-start gap-3 px-0 py-5">
          <div class="profile">
            <div class="avatar">
              <div class="w-6 rounded-full">
                <img 
                src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-sm font-semibold">
            ${video.title}
            </h2>
            <p class="flex gap-1 text-sm text-gray-400">
            ${video.authors[0].profile_name}
            <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
            </p>
            <p class="text-sm text-gray-400">
            ${video.others.views}
            </p>
          </div>
          </div>
        </div>
    `;

    videoContainer.append(videoCard);
  });
};

loadCategories();
