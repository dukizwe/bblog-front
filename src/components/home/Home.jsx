import TopPosts from "../home/TopPosts"
import { Link } from "react-router-dom";
import Lottie from "react-lottie-player";
import bannerJson from '../../lottie/banner.json'

import "../../css/home/home.scss"
import { useRef } from "react";

export default function Home() {
          return (
              
          <>
          <main role="main">
                    <section>
                              <div className="hero">
                                        <div className="hero__container">
                                                  <div className="hero__text">
                                                            <h1 className="jumbotron-heading">Welcome to bblog</h1>
                                                            <p>Find and create your interests</p>
                                                  </div>
                                                  <div className="hero__action">
                                                            <Link to="/register" className="to-register">Register</Link>
                                                            <p>and explore</p>
                                                  </div>
                                        </div>
                              </div>
                              <div className="banner">
                                        <Lottie
                                                  animationData={bannerJson}
                                                  style={{background:"transparent" }} 
                                                  loop
                                                  play
                                        />
                              </div>
                    </section>
                    <TopPosts />
          </main>
          </>
          )
}
