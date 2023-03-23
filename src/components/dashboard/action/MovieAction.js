import { useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import { MoviesContext } from "../../../App"


function MovieAction({ type }) {
    const { movies, setMovies, navigate, categories, token } = useContext(MoviesContext)

    const titleField = useRef()
    const urlField = useRef()
    const imageField = useRef()
    const descriptionField = useRef()
    const categoryIdField = useRef()
    const naltionalField = useRef()
    const publishedDateField = useRef()

    const isBlank = param => {
        if (typeof param === 'undefined' || param.toString() === '')
            return true
        return false
    }

    const isExist = (arr, key, value) => {
        if (arr.find(e => e[key] === value))
            return true
        return false
    }

    const AddMovie = () => {

        const handleAdd = () => {
            const title = titleField.current.value
            const url = urlField.current.value
            const image = imageField.current.value
            const description = descriptionField.current.value
            const categoryId = categoryIdField.current.value
            const naltional = naltionalField.current.value
            const publishedDate = publishedDateField.current.value

            if (isBlank(title)) {
                alert('Title is Blank !')
                titleField.current.focus()
            } else if (isBlank(url)) {
                alert('Url is Blank !')
                urlField.current.focus()
            } else if (isExist(categories, 'title', title)) {
                alert('Title is Exist !')
                titleField.current.focus()

            } else if (isExist(categories, 'url', url)) {
                alert('Url is Exist !')
                urlField.current.focus()
            } else {

                const newMovies = [...movies, {
                    id: movies[movies.length - 1].id + 1,
                    title: title,
                    url: url,
                    image: image,
                    description: description,
                    categoryId: categoryId,
                    national: naltional,
                    publishedDate: publishedDate,
                    active: true,
                    ownId: token.id
                }]

                setTimeout(() => {
                    localStorage.setItem('movies', JSON.stringify(newMovies))
                    setMovies(newMovies)
                    
                    alert('Movie Added Successfully !')
                    navigate('/dashboard/movies')
                }, 1000)
            }
        }

        return (
            <main className="py-6 bg-surface-secondary" >
                <div className="container-fluid">
                    {/* card  w-100 stats */}
                    <div className="card p-5 w-100 shadow border-0 mb-7">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Title</label>
                                <input type="text" className="form-control " ref={titleField} id="title" defaultValue='' required />

                            </div>
                            <div className="col-md-6">
                                <label forhtml="url" className="form-label">Url</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend3">/</span>
                                    <input type="text" defaultValue='' ref={urlField} className="form-control " id="url" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Image (URL)</label>
                                <input type="text" className="form-control " ref={imageField} id="title" defaultValue='' required />

                            </div>
                            <div class="col-md-6">
                                <label forhtml="title" className="form-label">Category</label>
                                <select class="form-select" required name='categoryId' ref={categoryIdField}>
                                    {
                                        categories.map(e => {
                                            return (
                                                <option key={e.id} value={e.id}>{e.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Publised Date</label>
                                <input type="text" className="form-control " ref={publishedDateField} id="title" defaultValue='' required />
                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">National</label>
                                <input type="text" className="form-control " ref={naltionalField} id="title" defaultValue='' required />
                            </div>
                            <div class="mb-3 col-12">
                                <label for="validationTextarea" class="form-label">Description</label>
                                <textarea class="form-control" id="description" ref={descriptionField} placeholder="Mô Tả" rows={7} required></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary" type="button" onClick={handleAdd}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main >
        )
    }

    const UpdateMovie = () => {
        const { id } = useParams();

        const movie = { ...movies.find(e => e.id == id) }

        const handleUpdate = () => {
            const title = titleField.current.value
            const url = urlField.current.value
            const image = imageField.current.value
            const description = descriptionField.current.value
            const categoryId = categoryIdField.current.value
            const naltional = naltionalField.current.value
            const publishedDate = publishedDateField.current.value
            

            if (isBlank(title)) {
                alert('Title is Blank !')
                titleField.current.focus()
            } else if (isBlank(url)) {
                alert('Url is Blank !')
                urlField.current.focus()
            } else if (isExist(movies, 'title', title) && movie.title != title) {
                alert('Title is Exist !')
                titleField.current.focus()
            } else if (isExist(movies, 'url', url) && movie.url != url) {
                alert('Url is Exist !')
                urlField.current.focus()
            } else {
                const newMovies = movies.map(e => {
                    if (e.id == id) {
                        e.title = title
                        e.url = url
                        e.image = image
                        e.description = description
                        e.categoryId = categoryId
                        e.naltional = naltional
                        e.publishedDate = publishedDate
                        
                    }
                    return e
                })
                setTimeout(() => {
                    localStorage.setItem('movies', JSON.stringify(newMovies))
                    setMovies(newMovies)
                    
                    alert('Movie Updated successfully')
                }, 1000)
            }
        }

        return (
            <main className="py-6 bg-surface-secondary" >
                <div className="container-fluid">
                    {/* card  w-100 stats */}
                    <div className="card p-5 w-100 shadow border-0 mb-7">
                        <form className="row g-3">
                            <div className="col-md-6">
                                <label forhtml="category" className="form-label">Movie ID</label>
                                <input type="text" className="form-control" id="category" defaultValue={movie.id} readOnly />

                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Title</label>
                                <input type="text" className="form-control " ref={titleField} id="title" defaultValue={movie.title} required />

                            </div>
                            <div className="col-md-6">
                                <label forhtml="url" className="form-label">Url</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend3">/</span>
                                    <input type="text" defaultValue={movie.url} ref={urlField} className="form-control " id="url" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Image (URL)</label>
                                <input type="text" className="form-control " ref={imageField} id="title" defaultValue={movie.image} required />

                            </div>
                            <div class="col-md-6">
                                <label forhtml="title" className="form-label">Category</label>
                                <select class="form-select" required name='categoryId' ref={categoryIdField}>
                                    {
                                        categories.map(e => {
                                            return (
                                                <option key={e.id} value={e.id}>{e.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Publised Date</label>
                                <input type="text" className="form-control " ref={publishedDateField} id="title" defaultValue={movie.publishedDate} required />
                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">National</label>
                                <input type="text" className="form-control " ref={naltionalField} id="title" defaultValue={movie.national} required />
                            </div>
                            <div class="mb-3 col-12">
                                <label for="validationTextarea" class="form-label">Description</label>
                                <textarea class="form-control" id="description" ref={descriptionField} placeholder="Mô Tả" rows={7} required>{movie.description}</textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary" type="button" onClick={handleUpdate}>Save Change</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main >
        )
    }

    if (type == 'update')
        return (
            <UpdateMovie />
        )
    else if (type == 'add')
        return (
            <AddMovie />
        )
}

export default MovieAction