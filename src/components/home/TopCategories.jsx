import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { useResistFetch } from "../../hooks/useResistFetch"
import { addCategoriesAction, setCategory } from "../../store/actions/categoryActions"
import { appendTopPostsAction } from "../../store/actions/postActions"
import { categoriesSelector, selectedCategorySelector } from "../../store/selectors/categorySelectors"
import { topPostsSelectors } from "../../store/selectors/postsSelector"
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
          console.log('top categories')
          const dispatch = useDispatch()
          const selectedCategory = useSelector(selectedCategorySelector)
          const [loading,  categories] = useResistFetch(`/api/categories?limit=${LIMIT}`, categoriesSelector, addCategoriesAction)
          const topPosts = useSelector(topPostsSelectors)

          const handleCategoryChange = async (e, category) => {
                    e.preventDefault()
                    let url = `/api/posts?limit=8`
                    if(category) url += `&category=${category._id}`
                    const toSelectCategoryKey = category ? category._id : 'all'
                    setPostsLoading(true)
                    if(topPosts[toSelectCategoryKey]) {
                              var posts = topPosts[toSelectCategoryKey]
                    } else {
                              var response = await fetch(url)
                              var posts = await response.json()
                    }
                    setPostsLoading(false)
                    if(response?.ok || topPosts[toSelectCategoryKey]) {
                              e.target.parentNode.parentNode.querySelectorAll('button.active').forEach(button => {
                                        button.classList.remove('active')
                              });
                              e.target.classList.add('active')
                              dispatch(setCategory(category))
                              dispatch(appendTopPostsAction(posts, category))
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