
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MoviesContext } from '../../../App';
import './home.css'

function Home() {

    const { movies } = useContext(MoviesContext);

    return (
        <div className="container-fluid" style={{ paddingTop: '4rem' }}>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active ">

                            <div className="cards-wrapper row">
                                {
                                    movies.map(movie => (
                                        <NavLink key={movie.id}
                                            to={`/movie/${movie.id}`}
                                            className="col-2 my-2"
                                            data-toggle="tooltip" title={movie.title}
                                        >

                                            <div className="card w-100" style={{ borderRadius: 'unsert!important' }}>
                                                <img
                                                    src={movie.image}
                                                    className="card-img-top w-100 h-auto rounded"
                                                    style={{ width: '100%', maxHeight: '15rem' }}
                                                    alt="..."
                                                />
                                                {/* <p
                                                        className="text-capitalize card-text position-absolute bottom-0 start-0 w-100
                                                                    h-25 mb-0 d-flex align-items-center justify-content-center
                                                                    text-white"
                                                    >{movie.title}</p> */}
                                            </div>
                                        </NavLink>

                                    ))
                                }
                            </div>
                        </div>
                        <div className="carousel-item ">
                            <div className="cards-wrapper ">
                                <div className="card m-2">
                                    <div className="image-wrapper ">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>
                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item  ">
                            <div className="cards-wrapper ">
                                <div className="card m-2">
                                    <div className="image-wrapper ">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>
                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                                <div className="card m-2">
                                    <div className="image-wrapper">
                                        <img src="https://codingyaar.com/wp-content/uploads/multiple-items-carousel-slide-1-card-3.jpg" alt="..." />
                                        <p className="fs-5 text-capitalize position-absolute bottom-0 start-0 w-100 h-25 mb-0 d-flex align-items-center justify-content-center" >Go somewhere 1</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>

        </div>
    )
}

export default Home