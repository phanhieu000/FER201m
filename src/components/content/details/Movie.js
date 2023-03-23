import { memo, useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { MoviesContext } from "../../../App"



function Movie() {

    const { movies, comments, token, setComments, accounts, categories } = useContext(MoviesContext)
    const { id } = useParams()

    const [star, setStar] = useState(0)

    const textRef = useRef()

    const [isComment, setIsComment] = useState(false)
    const [currentComment, setCurrentComment] = useState('')
    const [currentStar, setCurrentStar] = useState(0)

    const navigate = useNavigate()

    const movie = movies.find(movie => movie.id == id)


    const getAccount = (id) => {
        return accounts.find(e => e.id == id)
    }

    const getCategory = () => {
        return { ...categories.find(e => e.id == movie.categoryId) }
    }
    useEffect(() => {
        if (token) {
            comments.map(comment => {
                if (comment.movieId == id && comment.accountId == token.id) {
                    setIsComment(true)
                    setCurrentComment(comment.content)
                    setCurrentStar(comment.rate)
                }
            })
        }

    }, [comments])


    const getStar = (movieId) => {
        const currentComments = comments.filter(comment => comment.movieId == id)

        let count = 0
        currentComments.reduce((acc, cur) => count += cur.rate, 0)
        const size = currentComments.length

        if (size === 0) return 0
        return Number(count / size)

    }

    const handleClickStar = (e) => {
        const starID = e.target.id
        for (let i = 1; i <= 5; i++) {
            document.getElementById(i).className = 'star'
        }

        let count = 0;
        for (let i = 1; i <= starID; i++) {
            document.getElementById(i).className = 'star selected'
            count++;
        }
        setStar(count)
    }

    const handleComment = () => {
        const comment = textRef.current.value
        const accountID = token.id
        const movieID = id

        const newDate = new Date()
        const date = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear()

        const newComment = [...comments, {
            id: comments[comments.length - 1].id + 1,
            movieId: Number(movieID),
            accountId: Number(accountID),
            content: comment,
            rate: Number(star),
            createTime: date,
            updateTime: date
        }]

        localStorage.setItem('comments', JSON.stringify(newComment))
        setComments(newComment)

    }

    const handleUpdateComment = () => {
        const content = textRef.current.value
        const accountID = token.id
        const movieId = id

        const newDate = new Date()
        const date = newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear()

        const newComment = comments.map(comment => {
            if (comment.movieId == movieId && comment.accountId == accountID) {
                comment.content = content
                comment.rate = (star == 0 ? comment.rate : star)
                comment.updateTime = date
            }
            return comment
        })

        localStorage.setItem('comments', JSON.stringify(newComment))
        setComments(newComment)
    }

    const getCurrentStar = () => {
        return (
            <>
                <li className={`star ${currentStar == 5 ? 'selected' : currentStar == 4 ? '' : currentStar == 3 ? '' : currentStar == 2 ? '' : currentStar == 1 ? '' : ''}`} id='5' onClick={handleClickStar}></li>
                <li className={`star ${currentStar == 5 ? 'selected' : currentStar == 4 ? 'selected' : currentStar == 3 ? '' : currentStar == 2 ? '' : currentStar == 1 ? '' : ''}`} id='4' onClick={handleClickStar}></li>
                <li className={`star ${currentStar == 5 ? 'selected' : currentStar == 4 ? 'selected' : currentStar == 3 ? 'selected' : currentStar == 2 ? '' : currentStar == 1 ? '' : ''}`} id='3' onClick={handleClickStar}></li>
                <li className={`star ${currentStar == 5 ? 'selected' : currentStar == 4 ? 'selected' : currentStar == 3 ? 'selected' : currentStar == 2 ? 'selected' : currentStar == 1 ? '' : ''}`} id='2' onClick={handleClickStar}></li>
                <li className={`star ${currentStar == 5 ? 'selected' : currentStar == 4 ? 'selected' : currentStar == 3 ? 'selected' : currentStar == 2 ? 'selected' : currentStar == 1 ? 'selected' : ''}`} id='1' onClick={handleClickStar}></li>
            </>

        )
    }

    return (
        <div className="container " style={{ paddingTop: '100px' }}>
            {
                movie && (
                    <div className=" d-flex justify-content-center align-items-center" >
                        <div className="card w-100" >
                            <div className="card-body row" >
                                <div className="col-4">
                                    <img
                                        className="w-100 p-0 rounded"
                                        // style={{ height: '100%' }}
                                        src={movie.image}
                                        style={{ height: '36rem' }}
                                        alt="..." />

                                </div>

                                <div className="col-8 overflow-auto"
                                    style={{ height: '36rem', paddingRight: '10rem!important', paddingLeft: '2rem' }} >
                                    <div className="border-bottom pb-2">

                                        <div className="d-flex justify-content-between">
                                            <h1 className="card-title">{movie.title}</h1>
                                            <button type="button" className="border-0 my-2 mx-3 fas fa-reply fs-6"
                                                style={{ fontSize: '16px', backgroundColor: 'unset' }}
                                                aria-label="Close"
                                                onClick={() => navigate(-1)}
                                            ></button>

                                        </div>

                                        <p className="card-text p-0"><span className="">Thể Loại: {getCategory().title}</span> </p>
                                        <p className=""><span className="">Điểm Đánh Giá: {getStar() === 0 ? 'Chưa Có Đánh Giá' : getStar() + "/5 Star"} {/*<span className="star selected" style={{ height: '15px', width: '15px', fontSize: '15px' }} ></span>*/}</span> </p>
                                        <p className="card-text text-break text-capitalize w-100" style={{ marginRight: '2rem' }}><span className="fw-bold">Mô Tả:</span> {movie.description}</p>
                                    </div>
                                    <div className="mt-3 border-bottom pb-3">

                                        {
                                            token && isComment === false ?
                                                <>
                                                    <h3 className="">Chi Tiết Đánh Giá: </h3>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <span className="">Vote:</span>
                                                        </div>
                                                        <div className="mx-3">
                                                            <ul className="ratings">
                                                                <li className="star" id='5' onClick={handleClickStar}></li>
                                                                <li className="star" id='4' onClick={handleClickStar}></li>
                                                                <li className="star" id='3' onClick={handleClickStar}></li>
                                                                <li className="star" id='2' onClick={handleClickStar}></li>
                                                                <li className="star" id='1' onClick={handleClickStar}></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="">Bình Luận:</span>
                                                        <textarea rows={5}  type="text" ref={textRef} className="form-control w-100" />

                                                        <button className="btn btn-primary mt-3" onClick={handleComment}>Đánh Giá</button>
                                                    </div>
                                                </>
                                                : ''
                                        }
                                        {
                                            token && isComment === true ?
                                                <>
                                                    <h3 className="">Chi Tiết Đánh Giá: </h3>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <span className="">Vote:</span>
                                                        </div>
                                                        <div className="mx-3">
                                                            <ul className="ratings">
                                                                {getCurrentStar()}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="mb-2">Bình Luận:</span>
                                                        <textarea rows={5} type="text" defaultValue={currentComment} ref={textRef} className="form-control w-100" ></textarea>

                                                        <button className="btn btn-primary mt-3" onClick={handleUpdateComment}>Chỉnh Sửa</button>
                                                    </div>
                                                </>
                                                : ''
                                        }
                                    </div>

                                    <div className="mt-3 border-botttom pt-2">
                                        <h3 className="">Bình Luận: </h3>

                                        <div className="card shadow-0 border w-100" style={{ backgroundColor: '#f0f2f5' }}>
                                            <div className="card-body p-4">
                                                {
                                                    comments && (
                                                        comments.map((comment, index) => {
                                                            if (comment.movieId == id) {
                                                                return (
                                                                    <div key={index} className="card w-100 mb-4">
                                                                        <div className="card-body">

                                                                            <div className="d-flex justify-content-between">
                                                                                <div className="d-flex flex-row align-items-center">
                                                                                    <img
                                                                                        style={{ width: '50px', height: '50px' }}
                                                                                        src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                                                                                        alt="avatar"
                                                                                    />
                                                                                    <p className="small mb-0 ms-2">
                                                                                        {
                                                                                            token && getAccount(comment.accountId).id == token.id ?
                                                                                                'You' : getAccount(comment.accountId).fullName
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className="d-flex flex-row align-items-center">
                                                                                    <p className="small text-muted mb-0">Rate: </p>
                                                                                    <i className="far fa-star mx-2 fa-xs text-warning" style={{ marginTop: '-0.16rem' }} />
                                                                                    <p className="small text-muted mb-0">{comment.rate}</p>
                                                                                </div>
                                                                            </div>
                                                                            <figure>
                                                                                <blockquote className="blockquote">
                                                                                    <p className="text-capitalize">{comment.content}</p>
                                                                                </blockquote>
                                                                                <figcaption className="blockquote-footer">
                                                                                    Last Update: <cite title="Source Title">{comment.createTime}</cite>
                                                                                </figcaption>
                                                                            </figure>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

        </div >

    )
}

export default memo(Movie)