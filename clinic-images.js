//   for clinic images

const images = {
  1: [
      "a-1.jpeg",
      "a-2.jpeg", 
      "a-3.jpeg",
      "a-4.jpeg",
      "a-5.jpeg",
      "a-6.jpeg",
      "a-7.jpeg",
      "a-8.jpeg",
      "a-9.jpeg"
  ],
  3: [
      "c-1.jpeg",
      "c-2.jpeg",
      "c-3.jpeg", 
      "c-4.jpeg",
      "c-5.jpeg",
      "c-6.jpeg",
  ]
};

function changePage(pageNumber) {
  const container = document.getElementById('clinic-images-container');
  container.innerHTML = '';
  
  if (images[pageNumber]) {
    images[pageNumber].forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Clinic Image ${imageUrl}`;
        container.appendChild(img);
    });
  }

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

// Initialize with the first page (Andheri)
changePage(1);