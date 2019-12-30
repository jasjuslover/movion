import * as Lib from '../utils/Lib';


export default class MovieService {

    async discover(params, onSuccess) {
        try {
            const response = await fetch(Lib.requestURL('/discover/movie', params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let movies = responseJson.results;
            movies = Lib.filterData(movies);

            onSuccess(movies);

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }

    async getInTheaters(onSuccess) {
        const params = [{
                key: 'primary_release_date.gte',
                val: Lib.formatDate(Lib.oneMonthBefore())
            },
            {
                key: 'primary_release_date.lte',
                val: Lib.formatDate(Lib.now())
            },
            {
                key: 'sort_by',
                val: 'popularity.desc'
            },
            {
                key: 'page',
                val: 1
            },
        ];
        this.discover(params, onSuccess);
    }

    async getMostPopular(onSuccess) {
        const params = [{
                key: 'sort_by',
                val: 'vote_count.desc'
            },
            {
                key: 'page',
                val: 1
            },
        ];
        this.discover(params, onSuccess);
    }

    async getComingSoon(onSuccess) {
        const params = [{
                key: 'primary_release_date.gte',
                val: Lib.formatDate(Lib.now())
            },
            {
                key: 'sort_by',
                val: 'popularity.desc'
            },
            {
                key: 'page',
                val: 1
            },
        ];
        this.discover(params, onSuccess);
    }

    // TODO: set onError callback handle
    async getMovie(id, onSuccess) {
        try {
            const url = `/movie/${id}`
            const params = [{
                key: 'append_to_response',
                val: 'videos,credits'
            }]
            const response = await fetch(Lib.requestURL(url, params), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            const movie = Lib.filterMovie(responseJson);

            onSuccess(movie);

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }

    async getRecommendations(id, onSuccess) {
        try {
            const url = `/movie/${id}/recommendations`;

            const response = await fetch(Lib.requestURL(url, null), Lib.requestHeader());
            const responseJson = await response.json();

            if (!response.ok) {
                this.handleError();
                return;
            }

            let movies = responseJson.results;
            movies = Lib.filterData(movies);

            onSuccess(movies);

        } catch (error) {
            console.log(error);
            this.handleError();
        }
    }

    handleError() {
        alert('Oops, something went wrong. Please try again.');
    }

}