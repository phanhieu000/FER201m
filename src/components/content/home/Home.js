
import { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { MoviesContext } from '../../../App';
import './style.css'

function Home() {

    const { movies, comments, categories } = useContext(MoviesContext);

    const localMovies = [...JSON.parse(localStorage.getItem('movies'))].filter(e => e.active === true)

    const getStar = (movieId) => {
        const commentsOfMovie = comments.filter(comment => comment.movieId == movieId)

        let count = 0
        commentsOfMovie.reduce((acc, cur) => count += cur.rate, 0)
        const size = commentsOfMovie.length

        if (size === 0) return 0
        return Number(count / size)
    }

    const getCategory = (id) => {
        return { ...categories.find(e => e.id == id) }
    }



    const Item = ({ id, title, image, categoryId }) => {
        return (
            <NavLink key={id}
                to={`/movie/${id}`}
                className="col-2 my-2 px-1"
                data-toggle="tooltip" title={title}
            >
                <div className="card w-auto">
                    <div className="content w-100">
                        <div className="content-overlay rounded"></div>
                        <div className='image-wrapper border-rouned'>
                            <img
                                src={image}
                                className="card-img-top w-100 h-auto rounded content-image"
                                style={{ width: '100%', maxHeight: '15rem' }}
                                alt="..."
                            />
                        </div>
                        <div className="content-details fadeIn-bottom ">
                            <h6 className="content-title">{title}</h6>
                            <p className="content-text ">Thể Loại: {getCategory(categoryId).title}</p>
                            <p className="content-text p-0 m-0">Xếp Hạng: {getStar(id) == 0 ? 'Chưa Có Xếp Hạng' : getStar(id) + "/5 star"}</p>
                        </div>
                    </div>
                </div>
            </NavLink>
        )
    }

    const getMovies = (indexStart, indexEnd) => {
        return localMovies.slice(indexStart, (indexEnd > movies.length ? movies.length : indexEnd))
    }

    const renderMovies = (id) => {
        let datas = [...localMovies]
        if (id != 0) {
            datas = [...localMovies].filter(e => e.categoryId == id)
        }

        let result = []
        for (var i = 0; i < datas.length; i += 5) {
            result.push(
                <div key={i} className={`carousel-item ${i == 0 ? 'active' : ''}`}>
                    <div className="cards-wrapper">
                        {
                            getMovies(i, i + 5).map((movie, index) =>

                                <Item key={index}
                                    id={movie.id}
                                    title={movie.title}
                                    image={movie.image}
                                    categoryId={movie.categoryId}
                                    type={movie.active ? 'block' : 'none'}
                                />
                            )
                        }
                    </div>
                </div>
            )
        }
        return result
    }




    return (

        <div className="" style={{ paddingTop: '4rem' }}>
            <div className='row'>
                <div className='mt-4' style={{ marginLeft: '10rem', width: '10rem' }}>
                    <span className='text-light'>
                        Phim Mới
                    </span>
                </div>

                <div id="all" className="carousel slide mt-0" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {renderMovies(0)}
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#all" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#all" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='row'>
                <div className='mt-4' style={{ marginLeft: '10rem', width: '10rem' }}>
                    <span className='text-light'>
                        Phim Lẻ
                    </span>
                </div>

                <div id="phimle" className="carousel slide mt-0" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {renderMovies(1)}
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#phimle" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#phimle" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='row'>
                <div className='mt-4' style={{ marginLeft: '10rem', width: '10rem' }}>
                    <span className='text-light'>
                        Phim Bộ
                    </span>
                </div>

                <div id="phimbo" className="carousel slide mt-0" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {renderMovies(2)}
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#phimbo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#phimbo" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        </div >


    )
}

export default Home