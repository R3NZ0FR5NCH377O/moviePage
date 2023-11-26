const url = 'https://moviestack.onrender.com/api/movies';
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';
const requestOptions = {
  method: 'GET',
  headers: {
    'x-api-key': apiKey,
  },
};

const favsApp = Vue.createApp({
  data() {
    return {
      peliculas: [],  
      peliculasFavoritas: JSON.parse(localStorage.getItem('peliculasFavoritas')) || [],
      peliculasDetalles: [],  
    };
  },
  beforeCreate() {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((parametro) => {
        this.peliculas = parametro.movies;
        this.cargarPeliculasFavoritas();
      })
      .catch((err) => console.log(err));
  },
  methods: {
    toggleFavorito(id) {
      const index = this.peliculasFavoritas.indexOf(id.toString());

      if (index !== -1) {
        this.peliculasFavoritas.splice(index, 1);
      } else {
        this.peliculasFavoritas.push(id.toString());
      }

      localStorage.setItem('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas));

      this.cargarPeliculasFavoritas();
    },
    
    cargarPeliculasFavoritas() {
      console.log('Películas favoritas cargadas:', this.peliculasFavoritas);

      this.peliculasDetalles = this.peliculasFavoritas.map((id) => this.generarDetallesPelicula(id));

      console.log('Películas favoritas después de cargar:', this.peliculasDetalles);

      localStorage.setItem('peliculasFavoritas', JSON.stringify(this.peliculasFavoritas));
    },

    generarDetallesPelicula(id) {
      const pelicula = this.peliculas.find((p) => p.id === id);

      return {
        id: pelicula.id,
        title: pelicula.title,
        image: pelicula.image,
        overview: pelicula.overview,
      };
    },
  },
  
});

favsApp.mount('#favs-app');



