import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { UPDATE_PROJECT } from "../mutations/projectMutation"
import { GET_PROJECT } from "../querries/projectQuery"

const EditProjectForm = ({ project }) => {
    let name, description, status
    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: { id: project.id, name, description, status },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    })

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        updateProject({
            variables: {
                name: data.prjName,
                description: data.description,
                status: data.status,
            },
        })
    }

    console.log("test", project.status)

    return (
        <div className="mt-5">
            <h3>Update Project Details</h3>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="prjName"
                        defaultValue={project.name}
                        {...register("prjName", {
                            required: "This field cannot be blank",
                        })}
                    />
                    {errors.prjName && (
                        <p
                            role="alert"
                            style={{
                                color: "red",
                                fontSize: 14,
                                fontStyle: "italic",
                            }}
                        >
                            {errors.prjName?.message}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        defaultValue={project.description}
                        {...register("description", {
                            required: "This field cannot be blank",
                        })}
                    ></textarea>
                    {errors.description && (
                        <p
                            role="alert"
                            style={{
                                color: "red",
                                fontSize: 14,
                                fontStyle: "italic",
                            }}
                        >
                            {errors.description?.message}
                        </p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        id="status"
                        defaultValue={
                            project.status === "Not Started"
                                ? "new"
                                : project.status === "In Progress"
                                ? "progress"
                                : "completed"
                        }
                        {...register("status")}
                        className="form-select"
                    >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    {errors.status && (
                        <p
                            role="alert"
                            style={{
                                color: "red",
                                fontSize: 14,
                                fontStyle: "italic",
                            }}
                        >
                            {errors.status?.message}
                        </p>
                    )}
                </div>

                <button className="btn btn-primary" type="submit">
                    Update
                </button>
            </form>
        </div>
    )
}

export default EditProjectForm
