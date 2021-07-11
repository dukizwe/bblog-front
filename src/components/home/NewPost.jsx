import { useMemo } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { io } from "socket.io-client"
import { prependPostsAction } from "../../store/actions/postActions"

export default function NewPost() {
          const [inputData, setData] = useState({ title: '', body: '', image: null})
          // const history = useHistory()
          const dispatch = useDispatch()
          const socket = useMemo(() => io('http://localhost:8080/'), [])

          const handleSubmit = async (e) => {
                    e.preventDefault()
                    const formData = new FormData()
                    for(let key in inputData) {
                              formData.append(key, inputData[key])
                    }
                    const response = await fetch('/api/posts', {
                              method: 'POST',
                              body: formData
                              // body: JSON.stringify(formData),
                              // headers: { 'Content-type': 'application/json' }
                    })
                    const data = await response.json()
                    if(response.ok) {
                              socket.emit('newPost', data)
                              socket.on('newPost', data => {
                                        document.body.prepend(JSON.stringify(data))
                                        dispatch(prependPostsAction(data))
                                        // history.push('/posts')
                              })
                    }
          }

          const handleChange = (e) => {
                    const name = e.target.name
                    const value = e.target.value
                    
                    setData(fd => ({...fd, [name]: value}))
          }

          const handleFileChange = (e) => {
                    e.preventDefault()
                    const file = e.target.files[0]
                    setData(fd => ({...fd, image: file}))
          }
          return (
                    <div className="container d-flex justify-content-center">
                              <form className="form py-5 w-50 " onSubmit={handleSubmit}>
                                        <h5>Adding new post</h5>
                                        <div className="form-group">
                                                  <input type="text" className="form-control" name="title" placeholder="Title" onChange={handleChange} />
                                        </div>
                                        <div className="form-group mt-2">
                                                  <textarea type="text" className="form-control" name="body" placeholder="Content" onChange={handleChange}></textarea>
                                        </div>
                                        <div className="form-group mt-2">
                                                  <input type="file" className="form-control" name="image" accept=".png, .jpge, .jpg" onChange={handleFileChange}/>
                                        </div>
                                        <div className="form-group mt-2 text-end">
                                                  <button className="btn btn-primary">Envoyer</button>
                                        </div>
                              </form>
                    </div>
          )
}