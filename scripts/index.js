function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
  console.log(activeButtons);
}

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
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");

  for (let cat of categories) {
    const categoryDiv = document.createElement("div");

    categoryDiv.innerHTML = `
  <button id='btn-${cat.category_id}' onclick='loadCategoryVideos(${cat.category_id})' class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
  `;

    categoryContainer.append(categoryDiv);
  }
}

const loadVideoDetails = (videoId) => {
  console.log(videoId);
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => DisplayVideoDetails(data.video));
};

const DisplayVideoDetails = (video) => {
  console.log(video.description);

  document.getElementById("video_details").showModal();

  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
      <ul class="list">
      <li class="list-row">
        <div>
          <img
            class="size-10 rounded-box"
            src="${video.authors[0].profile_picture}"
          />
        </div>
        <div>
          <div>${video.authors[0].profile_name}</div>
          <div class="text-xs font-semibold opacity-60">
            ${video.title}
          </div>
        </div>
        <p class="list-col-wrap text-xs">${video.description}</p>
      </li>
    </ul>
  `;
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div
        class="col-span-full flex flex-col justify-center items-center gap-8 py-20"
      >
        <img src="./assets/Icon.png" alt="" />
        <h2 class="text-2xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    `;
    return;
  }

  videos.forEach((video) => {
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
          <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
        </div>
    `;

    videoContainer.append(videoCard);
  });
};

loadCategories();
