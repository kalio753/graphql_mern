import { useQuery } from "@apollo/client"
import { GET_PROJECTS } from "../querries/projectQuery"
import ProjectCard from "./ProjectCard"
import Spinner from "./Spinner"

const Projects = () => {
    const { loading, error, data } = useQuery(GET_PROJECTS)

    if (loading) return <Spinner />
    if (error) return <p>Something Went Wrong !</p>

    return (
        <>
            {data.projects.length > 0 ? (
                <div className="row mt-4">
                    {data.projects.map((prj) => (
                        <ProjectCard key={prj.id} project={prj} />
                    ))}
                </div>
            ) : (
                <p>No projects !</p>
            )}
        </>
    )
}

export default Projects
