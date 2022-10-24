import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import ClientInfo from "../components/ClientInfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import Spinner from "../components/Spinner"
import { GET_PROJECT } from "../querries/projectQuery"

const Project = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id },
    })

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong</p>

    return (
        !loading &&
        !error && (
            <div className="mx-auto w-75 card p-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>{data.project.name}</h1>
                    <Link
                        to="/"
                        className="btn btn-light btn-sm w-25 d-block h-50"
                    >
                        Back
                    </Link>
                </div>

                <p>{data.project.description}</p>

                <h5 className="mt-3">Project Status</h5>
                <p className="lead">{data.project.status}</p>

                <ClientInfo client={data.project.client} />

                <DeleteProjectButton prjId={data.project.id} />
            </div>
        )
    )
}

export default Project
