import { useState } from "react"
import { useDispatch } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useFormErrorsHandle } from "../../hooks/useFormErrorsHandle"
import { useResistFetch } from "../../hooks/useResistFetch"
import { addCategoriesAction } from "../../store/actions/categoryActions"
import { categoriesSelector } from "../../store/selectors/categorySelectors"

export default function NewPost() {
          const [inputData, handleChange] = useForm({ title: '', categories: [], body: '', image: null})
          const { errors, setErrors, getErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(inputData, {
                    title: {
                              required: true,
                              length: [5, 30]
                    },
                    categories: {
                              required: true,
                              length: [1, 3]
                    },
                    body: {
                              required: true,
                              length: [10, 5000]
                    },
                    image: {
                              required: true,
                              image: 21000000
                    }
          })
          const dispatch = useDispatch()

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
                    }
          }
          const [loadingCategories, categories] = useResistFetch('/api/categories', categoriesSelector, addCategoriesAction)
          const invalidClass = name => hasError(name) ? 'is-invalid': ''
          return (
                    <div className="container d-flex justify-content-center">
                              <form className="form py-5 w-50 " onSubmit={handleSubmit}>
                                        <h5>Adding new post</h5>
                                        {JSON.stringify(inputData)}
                                        { JSON.stringify(errors)}
                                        <div className="form-group">
                                                  <input type="text" value={inputData.title} onChange={handleChange} onBlur={checkFieldData} className={`form-control ${invalidClass('title')}`} name="title" placeholder="Title"/>
                                                  {hasError('title') && <div className="invalid-feedback">{getError('title')}</div>}
                                        </div>
                                        <div className="form-group mt-2">
                                                  <select
                                                            className={`form-control ${invalidClass('categories')}`}
                                                            name="categories"
                                                            multiple={true}
                                                            value={inputData.categories}
                                                            onBlur={checkFieldData}
                                                            onChange={handleChange}>
                                                            {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option> )}
                                                  </select>
                                                  {hasError('categories') && <div className="invalid-feedback">{getError('categories')}</div>}
                                        </div>
                                        <div className="form-group mt-2">
                                                  <textarea type="text" value={inputData.body} onChange={handleChange} onBlur={checkFieldData} className={`form-control ${invalidClass('body')}`} name="body" placeholder="Content" />
                                                  {hasError('body') && <div className="invalid-feedback">{getError('body')}</div>}
                                        </div>
                                        <div className="form-group mt-2">
                                                  <input type="file" onBlur={checkFieldData} className={`form-control ${invalidClass('image')}`} name="image" accept=".png, .jpeg, .jpg, .gif" onChange={handleChange}/>
                                                  {hasError('image') && <div className="invalid-feedback">{getError('image')}</div>}
                                        </div>
                                        <div className="form-group mt-2 text-end">
                                                  <button className="btn btn-primary">Envoyer</button>
                                        </div>
                              </form>
                    </div>
          )
}