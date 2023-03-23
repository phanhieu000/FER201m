import { useContext } from "react"
import { useParams } from "react-router-dom"
import { MoviesContext } from "../../App"


function Detail() {

    const { movies } = useContext(MoviesContext)
    const { movieId } = useParams()

    const item = movies.find((movie) => movie.id == movieId)



    return (
        <>
            <div className="container" style={{ paddingTop: '10rem' }}>
                <h1>Movie Name: {item.name}</h1>
                <p>{item.title}</p>

            </div>


        </>
    )
}

export default Detail