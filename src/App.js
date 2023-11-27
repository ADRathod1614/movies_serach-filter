import React from "react";
import styles from "./App.module.css";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { Header, Filter ,Search, Movies} from "./components";
import { getMovies, getGenres } from './api'

const DISCOVERSEARCH = "https://api.themoviedb.org/3/discover/movie?api_key=a18a4c3abe6c63b9d003880cedebf790";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=a18a4c3abe6c63b9d003880cedebf790&query=";


class App extends React.Component {
    
    state = {
        movies: [],
        genres: [],
        genre: "",
        sort: "popularity.desc",
        year: "",
        search: "",
        page: 1,
        hasmore: false,
    }
    
    async componentDidMount() {
        const btnToggle = document.querySelector("#modeToggle i");
        const theme = localStorage.getItem("theme");

        if (theme === "light") {
            btnToggle.classList.add("fa-sun");
            btnToggle.style.padding = "4px 3.8px";
            btnToggle.classList.remove("fa-moon");
            document.querySelector("body").classList.add(theme);
        }

        btnToggle.addEventListener("click", () => {
            if (btnToggle.classList.contains("fa-moon")) {
                btnToggle.classList.add("fa-sun");
                btnToggle.style.padding = "4px 3.8px";
                btnToggle.classList.remove("fa-moon");
                localStorage.setItem("theme", "light");
            } else {
                btnToggle.classList.add("fa-moon");
                btnToggle.classList.remove("fa-sun");
                btnToggle.style.padding = "4px 5px";
                localStorage.clear();
            }
            document.querySelector("body").classList.toggle("light");
        });

        setTimeout(async () => { 
            const movies = await getMovies(DISCOVERSEARCH);
            var hasmore = false;
            var genre = "";
            var sort = "popularity.desc";
            var year = "";
            if(movies.length > 0){
                hasmore = true;
            }
            const genres = await getGenres();
            this.setState({ movies, genres, hasmore, genre, sort, year });
        }, 0);
    }

    handleSortChange = (sort) => {
        setTimeout(async () => { 
            const page = 1;
            this.setState({ page, sort });
            const movies = await getMovies(DISCOVERSEARCH + "&sort_by=" + this.state.sort + "&with_genres=" + this.state.genre + "&primary_release_year=" + this.state.year + "&page=" + this.state.page);
            this.setState({ movies });
        }, 0);
    }

    handleSearchChange = (search) => {
        setTimeout(async () => { 
            const page = 1;
            var hasmore = true;
            const filter = document.querySelector("#filter"); 
            this.setState({ page, search });
            var movies;
            if (this.state.search === "") {
                filter.style.display = "grid";
                movies = await getMovies(DISCOVERSEARCH + "&sort_by=" + this.state.sort + "&with_genres=" + this.state.genre + "&primary_release_year=" + this.state.year + "&page=" + this.state.page);
            }else {
                filter.style.display = "none";
                movies = await getMovies(SEARCHAPI + this.state.search  + "&page=" + this.state.page);
            }

            if(movies.length < 20){
                hasmore = false
            }
            this.setState({ movies, hasmore });
        }, 0);
    }

    fetchMoreMovies = () => {
        setTimeout(async () => {
            const filter = document.querySelector("#filter");
            this.setState({ page: this.state.page + 1 });
            var movies;
            var hasmore = true;
            if (this.state.search === "" && filter) {
                filter.style.display = "grid";
                movies = await getMovies(DISCOVERSEARCH + "&sort_by=" + this.state.sort + "&with_genres=" + this.state.genre + "&primary_release_year=" + this.state.year + "&page=" + this.state.page);
            }else {
                filter.style.display = "none";
                movies = await getMovies(SEARCHAPI + this.state.search  + "&page=" + this.state.page);
            }
            var totalMovies = [].concat(this.state.movies, movies);

            if(movies.length < 20){
                hasmore = false
            }
            this.setState({ movies: totalMovies, hasmore });
        }, 1000);
    }


    render() {
        const { movies, hasmore } = this.state;
        return (

            <div className={styles.container}>
                <Header />
                <Router>
                    <Switch>
                        <Route exact path="/">
                        <Search handleSearchChange={this.handleSearchChange}/>
                            <Filter  handleGenreChange={this.handleGenreChange} handleSortChange={this.handleSortChange} handleYearChange={this.handleYearChange} getState={this.state}/>
                            <div className={styles.content}>
                                <Movies movies={movies} fetchMoreMovies={this.fetchMoreMovies} hasmore={hasmore}/>
                            </div>
                        </Route>
                        <Route><Redirect to="/"/></Route>
                    </Switch>
                </Router>
            </div>

        );
    }
}

export default App;
