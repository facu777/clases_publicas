document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('nuevaClaseForm');

  // Función para cargar las opciones de universidades y delegados
  fetch('/api/universidades')
    .then(response => {
      if (!response.ok) {
        console.log(response)
        throw new Error('Error al cargar universidades');
      }
      return response.json();
    })
    .then(data => {
      const universidadSelect = document.getElementById('universidad');
      data.forEach(universidad => {
        const option = document.createElement('option');
        option.value = universidad.id;
        const {nombre, especialidad, direccion} = universidad;
        option.textContent = nombre + " - " + (especialidad ?  especialidad : direccion) ;
        universidadSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar universidades:', error);
    });

  fetch('/api/delegados')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al cargar delegados');
      }
      return response.json();
    })
    .then(data => {
      const delegadoSelect = document.getElementById('delegado');
      data.forEach(delegado => {
        const option = document.createElement('option');
        option.value = delegado.id;
        option.textContent = delegado.nombre;
        delegadoSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar delegados:', error);
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

      const formData = new FormData(form);
      const claseData = {
          nombre_clase: formData.get('nombre_clase'),
          profesor: formData.get('profesor'),
          hora: formData.get('hora'),
          duracion: formData.get('duracion'),
          universidad_id: formData.get('universidad_id'),
          delegado_id: formData.get('delegado_id')
      };

      // Hacer la solicitud POST
      fetch('/api/clases', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(claseData)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Error en el POST de la clase');
          }
          return response.json();
      })
      .then(data => {
          console.log('Clase creada con éxito:', data);
          // Redireccionar o mostrar un mensaje de éxito
          alert('Clase creada con éxito');
          form.reset(); // Limpiar el formulario
      })
      .catch(error => {
          console.error('Error al crear la clase:', error);
          alert('Error al crear la clase');
      });
  });
});
