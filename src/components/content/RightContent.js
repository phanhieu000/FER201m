import { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MoviesContext } from "../../App";


function RightContent() {

    const { movies, currentPath, comments } = useContext(MoviesContext);
    const localCategories = JSON.parse(localStorage.getItem('categories'))

    const getCategoryID = () => {
        return {...localCategories.find(category => category.url === currentPath)}.id
    }
    
    const getCategory = (id) => {
        return localCategories.find(e => e.id == id)
    }

    const getStar = (movieId) => {
        const commentsOfMovie = comments.filter(comment => comment.movieId == movieId)

        let count = 0
        commentsOfMovie.reduce((acc, cur) => count += cur.rate, 0)
        const size = commentsOfMovie.length

        if (size === 0) return 0
        return Number(count / size)

    }


    return (
        <div className="row d-flex align-self-stretch mt-3">
            {
                movies.map((movie, index) => {
                    if (movie.categoryId == getCategoryID() && movie.active === true)
                        return (
                            <div key={index} className="col-2 px-2 my-2">
                                <div className="bg-light rounded" >
                                    <div className="">
                                        <img src={movie.image} className="w-100 rounded-top" style={{ height: '225px' }} alt="..." />

                                        <div className="card-body my-2">
                                            <h6 className="card-title text-center" style={{ height: '3rem' }}>{movie.title}</h6>
                                            <p className="card-text px-2">Thể Loại: {getCategory(movie.categoryId).title}</p>
                                            <p className="card-text px-2">Đánh Giá: {
                                                (getStar(movie.id) === 0 ? 'Chưa Có Đánh Giá' : getStar(movie.id) + "/5 Star")
                                            }</p>
                                        </div>

                                        <div className="d-flex justify-content-center pb-2 pt-4">
                                            <NavLink
                                                to={`/movie/${movie.id}`}
                                                className="btn btn-warning w-75"
                                            >
                                                Đánh Giá
                                            </NavLink>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                })
            }
        </div>

    )
}

export default RightContent