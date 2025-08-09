//   for clinic images

const images = {
  1: [
      "assets/IMG_9642.jpeg",
      "assets/IMG_9638.jpeg",
      "assets/IMG_9636.jpeg",
      "assets/IMG_9627.jpeg",
      "assets/IMG_9637.jpeg",
      "assets/IMG_9633.jpeg",
      "assets/IMG_9639-zoom.jpeg",
      "assets/andheri-2.jpg"
  ],
  2: [
      "assets/IMG_9638.jpeg",
      "assets/IMG_9636.jpeg",
      "assets/IMG_9627.jpeg",
      "assets/IMG_9637.jpeg",
      "assets/andheri-2.jpg",
      "assets/IMG_9633.jpeg",
     "assets/IMG_9642.jpeg",
      "assets/IMG_9639-zoom.jpeg"
  ],
  3: [
      "assets/IMG_9636.jpeg",
      "assets/IMG_9639-zoom.jpeg",
      "assets/IMG_9638.jpeg",
      "assets/IMG_9642.jpeg",
      "assets/IMG_9627.jpeg",
      "assets/IMG_9633.jpeg",
      "assets/IMG_9637.jpeg",
      "assets/andheri-2.jpg"
  ]
};

function changePage(pageNumber) {
  const container = document.getElementById('clinic-images-container');
  container.innerHTML = '';
  images[pageNumber].forEach(imageUrl => {
      const img = document.createElement('img');
      img.src = imageUrl;
      container.appendChild(img);
  });

  // Change the color of the active button
  const buttons = document.querySelectorAll('.clinicimagespagination button');
  buttons.forEach((button, index) => {
      if (index + 1 === pageNumber) {
          button.classList.add('active');
      } else {
          button.classList.remove('active');
      }
  });
}

// Initialize with the first page
changePage(1);