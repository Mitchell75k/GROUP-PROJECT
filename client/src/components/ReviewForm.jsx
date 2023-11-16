import React, { useState } from 'react'
import axios from 'axios'
import { Link, navigate } from '@reach/router'

const NoteForm = (props) => {
    const [songTitle, setSongTitle] = useState('')
    const [artistName, setArtistName] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1)
    const [errors, setErrors] = useState([])


    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/notes', {
            songTitle,
            artistName,
            review,
            rating
        })
            .then((res) => {
                console.log(res)
                navigate('/notes')
            })
            .catch((err) => {
                console.log(err)
                const errorResponse = err.response.data.errors
                const errorArr = []
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr)
            })
    }

    return (
        <>
        <div className="container mt-4">
            <h2>Write a Review</h2>
            <form onSubmit={submitHandler}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                <div className="form-group">
                    <label htmlFor="">Song Title</label>
                    <input onChange={(e) => setSongTitle(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Artist Name</label>
                    <input onChange={(e) => setArtistName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Review</label>
                    <input onChange={(e) => setReview(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Rating</label>
                    <input onChange={(e) => setRating(e.target.value)} type="number" className="form-control" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    )
}
    