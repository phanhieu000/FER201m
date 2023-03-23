import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { MoviesContext } from "../../App"



import './custom'


function Categories() {

    const { movies, setMovies, categories, setCategories } = useContext(MoviesContext)

    const localCategories = JSON.parse(localStorage.getItem('categories'))

    const getCategory = (id) => {
        return localCategories.find(e => e.id == id)
    }

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure Delete ?')
        if (confirm) {
            handleDeleteRelatedMovies(id)

            const index = localCategories.findIndex(e => e.id == id)

            localCategories.splice(index, 1)
            const newCategories = [...localCategories]
            localStorage.setItem('categories', JSON.stringify(newCategories))

            setCategories(newCategories)
        }
    }

    const handleDeleteRelatedMovies = (id) => {

        const newMovies = movies.filter(e => e.categoryId != id)
        localStorage.setItem('movies', JSON.stringify(newMovies))
        setMovies(newMovies)

    }

    const Category = ({ id, title, url }) => {
        return (
            <tr>
                <td>{id}</td>
                <td><span className="text-heading font-semibold">{title}</span></td>
                <td>{url}</td>
                <td>
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
                        <h5 className="mb-0">Categories List</h5>
                    </div>
                    <div className="table-responsive">
                        <table id="movieTable" className="table table-hover table-striped table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Url</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map(category => <Category key={category.id} id={category.id}
                                        title={category.title} url={category.url}
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

export default Categories