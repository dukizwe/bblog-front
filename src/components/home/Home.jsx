import "../../css/home.scss"
import LatestPosts from "../Post/LatestPosts"
import { Link } from "react-router-dom";

export default function Home() {
          return (
          <>
          <main role="main">
                    <section className="jumbotron text-center">
                              <div className="container">
                                        <h1 className="jumbotron-heading">Welcome to bblog</h1>
                                        <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
                                        <p>
                                        <Link to="/posts" className="btn btn-primary my-2">All posts</Link>
                                        <Link to="/addpost" className="btn btn-secondary my-2 m-2">New post</Link>
                                        </p>
                              </div>
                    </section>
                    <LatestPosts />
          </main>
          </>
          )
}
