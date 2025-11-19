import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/apiClient"
import { Button, Table } from "react-bootstrap"

interface Movie {
    _id : string,
    judul : string,
    tahunRilis : string,
    sutradara : string,
    createdAt : string,
    updateAt : string
}

function Movies() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchMovies = useCallback(async () => {
        setLoading(true)
        const response = await ApiClient.get("/movie")

        if(response.status == 200) {
            setMovies(response.data.data )
            setLoading(false)
        }

    }, [])

    useEffect(() => {
        fetchMovies()
    }, [fetchMovies])

    const handleDelete = async (movieId : String) => {
        const response = await ApiClient.delete(`/movie/${movieId}`)

        if (response.status == 200) {
            fetchMovies()
        }
    }

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3"> 
            <h2>Movie Page</h2>
            <NavLink to="/add-movie" className="btn btn-primary"> Add Movie </NavLink>
        </div>
            <Table striped bordered hover>
                <thead>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Tahun Rilis</th>
                    <th>Sutradara</th>
                    <th>Aksi</th>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                    }
                    {
                        movies.length > 0 && movies.map((movies, index) => {
                            return <tr key = {movies._id}>
                                <td>{index + 1}</td>
                                <td>{movies.judul}</td>
                                <td>{movies.tahunRilis}</td>
                                <td>{movies.sutradara}</td>
                                <td><Button variant="danger" onClick={() => handleDelete(movies._id)}>Delete</Button></td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    
}

export default Movies