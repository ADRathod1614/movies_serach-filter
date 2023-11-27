import React from "react";
import cx from "classnames";
import InfiniteScroll from "react-infinite-scroller";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Nullimage from "./no-image.webp";
import styles from "./Movies.module.css";

function getClassByRate(vote) {
	if (vote >= 8) {
		return "green";
	} else if (vote >= 5) {
		return "orange";
	} else {
		return "red";
	}
}

function checkImageExists(image) {
	if (image != null) {
		return "https://image.tmdb.org/t/p/w780" + image;
	}
	return Nullimage;
}


const Movies = ({ movies, fetchMoreMovies, hasmore }) => {
	document.title = `Z-Flix`;
	return (
		<div>
			{movies && movies.length !== 0 ? (
				<InfiniteScroll
					loadMore={fetchMoreMovies}
					hasMore={hasmore}
					initialLoad={false}
					useWindow={true}
					loader={
						<div key={0} className={styles.loading}>
							<ReactLoading type={"spin"} color={"grey"} height={50} width={50}/>
						</div>
					}
				>
					<main id="main">
						{movies.map((movie, i) => (
							<Link style={{ textDecoration: "none" }} to={`/movie/${movie.id}`} key={i} >
								<div alt={movie.title} title={movie.title} className={styles.movie} >
									<span className={cx( getClassByRate(movie.vote_average), styles.span )} >
										<i className="fas fa-star"></i>{" "}
										{movie.vote_average}
									</span>
									<img className={styles.poster} src={checkImageExists( movie.poster_path )} alt={movie.title} />
									<div className={styles.movieinfo}>
										<h3>{movie.title}</h3>
										<p className={styles.year}>
											<b> 
												{movie.release_date ? movie.release_date.slice(0, movie.release_date.indexOf("-")) : "No Date"}
											</b>
										</p>
									</div>
								</div>
							</Link>
						))}
					</main>
				</InfiniteScroll>
			) : (
					<div>No More Movies Found</div>
				)}
		</div>
	);
};

export default Movies;
