const url = 'https://moviestack.onrender.com/api/movies';
const apiKey = '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd';
const requestOptions = {
    method: 'GET',
    headers: {
        'x-api-key': apiKey,
    },
};

const detailsApp = Vue.createApp({
    data() {
        return {
            movieDetails: false,
        };
    },
    beforeCreate() {
        const params = new URLSearchParams(window.location.search);
        const movieId = params.get('id');

        if (movieId) {
            fetch(`${url}/${movieId}`, requestOptions)
                .then((res) => res.json())
                .then((movieDetails) => {
                    this.movieDetails = movieDetails;
                })
                .catch((err) => console.error(err));
        } else {
            console.error('No movie ID in the URL');
        }
    },
    methods: {
        formatCurrency(amount) {
            if (typeof amount !== 'number') {
                return amount; 
            }

            const formattedAmount = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS', 
            }).format(amount);

            return formattedAmount;
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    },
});

detailsApp.mount('#details-app');

