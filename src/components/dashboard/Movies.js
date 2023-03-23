import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { MoviesContext } from "../../App"



import './custom'


function Movies() {

    const { movies, setMovies, accounts, categories } = useContext(MoviesContext)

    const getCategory = (id) => {
        return categories.find(e => e.id == id)
    }

    const getAccount = (id) => {
        return accounts.find(e => e.id == id)
    }

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure Delete ?')
        if (confirm) {
            const index = movies.findIndex(e => e.id == id)

            movies.splice(index, 1)
            const newMovies = [...movies]
            localStorage.setItem('movies', JSON.stringify(newMovies))

            setMovies(newMovies)
        }
    }

    const handleUpdate = (id, active) => {
        const confirm = window.confirm(`Are you sure ${active ? 'De-Active' : 'Active'} ?`)
        if (confirm) {
            const index = movies.findIndex(e => e.id == id)

            movies[index].active = !active

            const newMovies = [...movies]
            localStorage.setItem('movies', JSON.stringify(newMovies))

            setMovies(newMovies)
        }
    }

    const Movie = ({ id, title, image, url, publishedDate, active, ownId, categoryId, national }) => {
        return (
            <tr>
                <td>{id}</td>
                <td>
                    <img alt="..." src={image} className="avatar avatar-sm me-2" style={{width: '10em'}} />
                    <span className="text-heading font-semibold">{title}</span>
                </td>
                <td>{url}</td>
                <td>{publishedDate}</td>
                <td><span className="text-heading font-semibold">{getAccount(ownId).fullName}</span></td>
                <td><span className="badge badge-sm badge-soft-success text-dark">{getCategory(categoryId).title}</span></td>
                <td>{national}</td>
                <td>
                    <span className="badge badge-lg badge-dot ">
                        <i className={`${active ? 'bg-success' : 'bg-danger'} `} />
                    </span>
                </td>
                <td >
                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover"
                        onClick={() => handleUpdate(id, active)} >
                        <i className="fas fa-sync-alt"></i>
                    </button>

                    <Link to={`update/${id}`} className="btn btn-sm btn-neutral text-primary">
                        <i className="bi bi-pencil" />
                    </Link>

                    <button type="button" className="btn btn-sm btn-square btn-neutral text-danger" onClick={() => handleDelete(id)} >
                        <i className="bi bi-trash" />
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <main className="py-6 bg-surface-secondary" >
            <div className="container-fluid">
                <div className="float-end mb-3">
                    <NavLink
                        to='add'
                        className={`btn d-inline-flex btn-sm btn-primary mx-1`}
                    >
                        <span className=" pe-2">
                            <i className="bi bi-plus" />
                        </span>
                        <span>Create</span>
                    </NavLink>
                </div>
                {/* card  w-100 stats */}
                <div className="card  w-100 shadow border-0 mb-7">
                    <div className="card-header">
                        <h5 className="mb-0">Movies List</h5>
                    </div>
                    <div className="table-responsive">
                        <table id="movieTable" className="table table-hover table-striped table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Url</th>
                                    <th scope="col">Published Date</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">National</th>
                                    <th scope="col">Active</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movies.map((movie, index) =>
                                        <Movie
                                            key={index}
                                            id={movie.id}
                                            image={movie.image}
                                            title={movie.title}
                                            publishedDate={movie.publishedDate}
                                            active={movie.active}
                                            ownId={movie.ownId}
                                            url={movie.url}
                                            categoryId={movie.categoryId}
                                            national={movie.national}
                                        />
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                    {/* <div className="card-footer border-0 py-5">
                        <span className="text-muted text-sm">Showing 10 items out of 250 results found</span>
                    </div> */}
                </div>
            </div>
        </main >
    )
}

export default Movies