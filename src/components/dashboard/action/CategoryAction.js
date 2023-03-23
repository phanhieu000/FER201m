import { useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../../../App";


function CategoryAction({ type }) {

    const { categories, setCategories, navigate } = useContext(MoviesContext)

    const titleField = useRef()
    const urlField = useRef()

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

    const AddCategory = () => {

        const handleAdd = () => {
            const title = titleField.current.value
            const url = urlField.current.value

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
                setTimeout(() => {
                    const newCategory = [...categories, { id: categories[categories.length - 1].id + 1, title, url }]
                    localStorage.setItem('categories', JSON.stringify(newCategory))
                    setCategories(newCategory)
                    alert('Category Added Success !')
                    navigate('/dashboard/categories')
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

                            <div className="col-12">
                                <button className="btn btn-primary" type="button" onClick={handleAdd}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main >
        )
    }

    const UpdateCategory = () => {
        const { id } = useParams();

        const category = { ...categories.find(e => e.id == id) }

        const handleUpdate = () => {
            const title = titleField.current.value
            const url = urlField.current.value

            if (isBlank(title)) {
                alert('Title is Blank !')
                titleField.current.focus()
            } else if (isBlank(url)) {
                alert('Url is Blank !')
                urlField.current.focus()
            } else if (isExist(categories, 'title', title) && category.title != title) {
                alert('Title is Exist !')
                titleField.current.focus()
            } else if (isExist(categories, 'url', url) && category.url != url) {
                alert('Url is Exist !')
                urlField.current.focus()
            } else {
                const newCategory = categories.map(e => {
                    if (e.id == id) {
                        e.title = title
                        e.url = url
                    }
                    return e
                })
                setTimeout(() => {
                    localStorage.setItem('categories', JSON.stringify(newCategory))
                    setCategories(newCategory)
                    alert('Category Updated successfully')
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
                                <label forhtml="category" className="form-label">Category ID</label>
                                <input type="text" className="form-control" id="category" defaultValue={category.id} readOnly />

                            </div>
                            <div className="col-md-6">
                                <label forhtml="title" className="form-label">Title</label>
                                <input type="text" className="form-control " ref={titleField} id="title" defaultValue={category.title} required />

                            </div>
                            <div className="col-md-6">
                                <label forhtml="url" className="form-label">Url</label>
                                <div className="input-group has-validation">
                                    <span className="input-group-text" id="inputGroupPrepend3">/</span>
                                    <input type="text" defaultValue={category.url} ref={urlField} className="form-control " id="url" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                                </div>
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
            <UpdateCategory />
        )
    else if (type == 'add')
        return (
            <AddCategory />
        )

}

export default CategoryAction