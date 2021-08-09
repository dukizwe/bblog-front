import { useState } from "react"
import { useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { useResistFetch } from "../../hooks/useResistFetch"
import { addCategoriesAction } from "../../store/actions/categoryActions"
import { addTopPostsAction } from "../../store/actions/postActions"
import { categoriesSelector } from "../../store/selectors/categorySelectors"
import Skeleton from "../main/Skeleton"

const LIMIT = 20

const Skeletons = () => {
          const fakeCategories = []
          for (let i = 1; i <= LIMIT ; i++) {
                    fakeCategories.push(i)
          }
          return  <Swiper
                              slidesPerView= 'auto'
                              spaceBetween= {10}
                              observer= {true}
                              observeParents={true}
                    >
                              {fakeCategories.map(category => <SwiperSlide key={category} className="category"><Skeleton width="100px" height="36px" /></SwiperSlide>)}
                    </Swiper>
}

export default function TopCategories({ setPostsLoading, secondPostsLoading}) {
          const dispatch = useDispatch()
          const [selectedCategory, setSelectedCategory] = useState(null)
          const [loading,  categories] = useResistFetch(`/api/categories?limit=${LIMIT}`, categoriesSelector, addCategoriesAction)

          const handleCategoryChange = async (e, category) => {
                    e.preventDefault()
                    e.target.parentNode.parentNode.querySelectorAll('button.active').forEach(button => {
                              button.classList.remove('active')
                    });
                    let url = `/api/posts?limit=8`
                    if(category) url += `&category=${category._id}`

                    setSelectedCategory(category)
                    e.target.classList.add('active')
                    setPostsLoading(true)
                    const response = await fetch(url)
                    const posts = await response.json()
                    setPostsLoading(false)
                    if(response.ok) {
                              dispatch(addTopPostsAction(posts))
                    }
          }
          const blocked = secondPostsLoading ? 'blocked' : ''
          return <div className={`categories ${blocked}`}>
                              {loading ? <Skeletons />:
                                        <Swiper
                                                  slidesPerView= 'auto'
                                                  spaceBetween= {10}
                                                  observer= {true}
                                                  observeParents={true}
                                        >
                                                  <SwiperSlide className="category" key="custom" >
                                                            <button className={!selectedCategory ? 'active' : ''} onClick={(e) => { handleCategoryChange(e, null) }}>All</button>
                                                  </SwiperSlide>
                                                  {categories.map(category => {
                                                            const active = category._id === selectedCategory?._id ? 'active' : ''
                                                            return (<SwiperSlide className="category" key={category._id} >
                                                                      <button className={active} onClick={(e) => { handleCategoryChange(e, category) }}>{category.name}</button>
                                                            </SwiperSlide>)
                                                  })}
                                        </Swiper>
                              }
          </div>
}