import { useContext, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { MoviesContext } from "../../App";


function RightContent() {

    const { movies, currentPath, categories, comments } = useContext(MoviesContext);

    const getCategoryID = () => {
        return categories.find(category => category.url.split('/')[1] === currentPath).id
    }

    const getCategory = (id) => {
        return categories.find(e => e.id == id)
    }

    const getStar = (movieId) => {
        const currentComments = comments.filter(comment => comment.movieId == movieId)

        let count = 0
        currentComments.reduce((acc, cur) => count += cur.rate, 0)

        return Number(count / currentComments.length)
    }

    console.log(currentPath)


    return (
        <div className="row d-flex align-self-stretch mt-3">

            {
                movies.map((movie, index) => {
                    if (movie.categoryId == getCategoryID())
                        return (
                            <div key={index} className="col-2 px-2 my-2">
                                <div className="bg-light rounded" >
                                    <div className="">
                                        <img src={movie.image} className="w-100 rounded-top" style={{ height: '225px' }} alt="..." />

                                        <div className="card-body my-2">
                                            <h6 className="card-title text-center" style={{ height: '3rem' }}>{movie.title}</h6>
                                            <p className="card-text px-2">Thể Loại: {getCategory(movie.categoryId).title}</p>
                                            <p className="card-text px-2">Rate: {
                                                (getStar(movie.id).isNaN ? 'Chưa Có Đánh Giá' : getStar(movie.id))
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