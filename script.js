// Reads ProjectInfo.txt and generates a project card for each listed project
// which consists of a tile, description, and mp4 file path.
const filePath = './Content/ProjectInfo.txt';

fetch(filePath)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load file: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    const projectsContainer = document.getElementById('projects');
    const projects = data.split('\n'); // Split file contents into lines

    projects.forEach(project => {
      if (project.trim() !== '') { // Avoid empty lines
        const [title, description, videoSrc] = project.split('|'); // Split by the '|' delimiter

        const projectCard = document.createElement('div');
        projectCard.className = 'bg-gray-900 shadow-lg rounded p-2 flex flex-col';

        const projectContent = `
          <video controls class="w-full h-64 object-cover rounded">
            <source src="${videoSrc}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <h3 class="text-xl font-semibold text-slate-50 mt-4 mx-2">${title}</h3>
          <p class="text-gray-50 m-2">${description}</p>
        `;
        
        projectCard.innerHTML = projectContent;
        projectsContainer.appendChild(projectCard);
      }
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });