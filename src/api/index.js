import axios from "axios";

const GENRESAPI =
	"https://api.themoviedb.org/3/genre/movie/list?api_key=a18a4c3abe6c63b9d003880cedebf790&language=en-US";


    export const getMovies = async (url) => {
	try {
		const {
			data: { results },
		} = await axios.get(url);
		return results;
	} catch (error) {
		return error;
	}
};

export const getGenres = async () => {
	try {
		const {
			data: { genres },
		} = await axios.get(GENRESAPI);
		return genres;
	} catch (error) {
		return error;
	}
};

export const findGenre = async (id) => {
	try {
		const {
			data: { genres },
		} = await axios.get(GENRESAPI);

		for (let i = 0; i <= genres.length; i++) {
			if (id === genres[i].id) {
				return genres[i].name;
			} else {
				return "No Genre";
			}
		}
	} catch (error) {
		return error;
	}
};

export const findMovie = async (id) => {
	try {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}?api_key=a18a4c3abe6c63b9d003880cedebf790&language=en-US`
		);
		return data;
	} catch (error) {
		return error;
	}
};
