document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/clases')
      .then(response => response.json())
      .then(data => {
        const clasesContainer = document.querySelector('.row');
        
        data.forEach(clase => {
          // Crear el HTML para cada clase
          const claseHTML = `
            <div class="col-md-6 mb-4">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${clase.nombre_clase}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Profesor: ${clase.profesor}</h6>
                  <p class="card-text">
                    <strong>Universidad:</strong> ${clase.Universidad.nombre} <br>
                    <strong>Ubicación:</strong> ${clase.Universidad.ubicacion} <br>
                    <strong>Hora:</strong> ${clase.hora} <br>
                    <strong>Duración:</strong> ${clase.duracion} minutos
                  </p>
                </div>
              </div>
            </div>
          `;
  
          // Insertar en el contenedor
          clasesContainer.innerHTML += claseHTML;
        });
      })
      .catch(error => console.error('Error al cargar las clases:', error));
  });
  