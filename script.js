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
          <div class="w-full h-64 relative">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoSrc}" 
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
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