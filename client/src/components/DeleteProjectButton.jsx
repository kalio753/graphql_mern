import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { DELETE_PROJECT } from "../mutations/projectMutation"
import { GET_PROJECTS } from "../querries/projectQuery"

const DeleteProjectButton = ({ prjId }) => {
    const navigate = useNavigate()

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: prjId },
        onCompleted: () => navigate("/"),
        refetchQueries: [{ query: GET_PROJECTS }],
    })

    return (
        <div className="mt-5 d-flex ms-auto">
            <button className="btn btn-danger m-2" onClick={deleteProject}>
                <FaTrash className="icon" />
                Delete Project
            </button>
        </div>
    )
}

export default DeleteProjectButton
