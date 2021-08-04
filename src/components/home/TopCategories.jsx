import { Swiper, SwiperSlide } from "swiper/react"
import { useResistFetch } from "../../hooks/useResistFetch"
import { addCategoriesAction } from "../../store/actions/categoryActions"
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

export default function TopCategories() {
          const [loading,  categories] = useResistFetch(`/api/categories?limit=${LIMIT}`, categoriesSelector, addCategoriesAction)
          return <div className="categories">
                              {loading ? <Skeletons />:
                                        <Swiper
                                                  slidesPerView= 'auto'
                                                  spaceBetween= {10}
                                                  observer= {true}
                                                  observeParents={true}
                                        >
                                                  {categories.map((category, i) => {
                                                            const active = i === 0 ? 'active' : ''
                                                            return (<SwiperSlide className="category" key={category._id}>
                                                                      <button className={active}>{category.name}</button>
                                                            </SwiperSlide>)
                                                  })}
                                        </Swiper>
                              }
          </div>
}