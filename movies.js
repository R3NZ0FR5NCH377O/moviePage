const url = 'https://moviestack.onrender.com/api/movies';
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';
const requestOptions = {
  method: 'GET',
  headers: {
    'x-api-key': apiKey,
  },
};
const { createApp } = Vue;

const options = {
  data() {
    return {
      peliculasFavoritas: JSON.parse(localStorage.getItem('peliculasFavoritas')) || [],
      peliculas: [],
      peliculasFiltradas: [],
      generos: [],
      search: "",
      selectedGenre: "all",
      peliculasPorPagina: 4,
      paginaActual: 1,
      totalPeliculas: 0,
    };
  },
  beforeCreate() {
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((parametro) => {
        this.peliculas = parametro.movies.map((pelicula) => ({
          ...pelicula,
          favorito: this.peliculasFavoritas.includes(pelicula.id), 
        }));
        this.generos = [...new Set(this.peliculas.flatMap((pelicula) => pelicula.genres))];
        this.filtrar();
      })
      .catch((err) => console.log(err));
  },
  methods: {
 
    filtrar() {
      const inicio = (this.paginaActual - 1) * this.peliculasPorPagina;
      const fin = inicio + this.peliculasPorPagina;
      const aux = this.peliculas.filter(
        (pelicula) =>
          pelicula.title.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.selectedGenre === "all" || pelicula.genres.includes(this.selectedGenre))
      );
      this.totalPeliculas = aux.length;
      this.peliculasFiltradas = aux.slice(inicio, fin);

      this.generos = [...new Set(this.peliculas.flatMap((pelicula) => pelicula.genres))];
    },
    toggleFavorito(pelicula) {
      console.log("estoy usando la funcion toggleFavorito")
      pelicula.favorito = !pelicula.favorito;
      console.log("estoy usando la funcion toggleFavorito y pelicula.favorito es: "+ pelicula.favorito )


      if (pelicula.favorito) {
        this.guardarEnLocalStorage(pelicula.id);
      } else {
        this.removerDeLocalStorage(pelicula.id);
      }
    },
    guardarEnLocalStorage(id) {
      console.log("estoy usando la funcion guardarEnLocalStorage")

      const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
      if (!peliculasFavoritas.includes(id)) {
        peliculasFavoritas.push(id);
        localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));
      }
    },
    removerDeLocalStorage(id) {
      console.log("estoy usando la funcion removerDelLocalStorage")

      const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas')) || [];
      const nuevaLista = peliculasFavoritas.filter((peliculaId) => peliculaId !== id);
      localStorage.setItem('peliculasFavoritas', JSON.stringify(nuevaLista));
    },
    irPagina(direccion) {
      console.log("estoy usando la funcion irPagina")
      this.paginaActual += direccion;
      this.filtrar();
    },
  },
};

const app = createApp(options);
app.mount("#app");
