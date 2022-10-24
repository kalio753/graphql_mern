import { useEffect, useState } from "react"
import { FaList } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "@apollo/client"
import { GET_CLIENTS } from "../querries/clientQuery"
import Spinner from "./Spinner"

const AddProjectModal = () => {
    // Get Clients for <select>
    const { loading, error, data } = useQuery(GET_CLIENTS)

    let name, email, phone
    // const [addClient] = useMutation(ADD_CLIENT, {
    //     variables: { name, email, phone },
    //     update(cache, { data: addClient }) {
    //         const { clients } = cache.readQuery({ query: GET_CLIENTS })
    //         cache.writeQuery({
    //             query: GET_CLIENTS,
    //             data: { clients: [...clients, addClient] },
    //         })
    //     },
    // })

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        // addClient({
        //     variables: {
        //         name: data.name,
        //         email: data.email,
        //         phone: data.phone,
        //     },
        // })
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ name: "", email: "", phone: "" })
        }
    }, [formState, reset])

    if (loading) return null
    if (error) return "Something went wrong"

    console.log("err", data)
    return (
        <>
            {!loading && !error && (
                <>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModal"
                    >
                        <div className="d-flex align-items-center">
                            <FaList className="icon" />
                            <div>New Project</div>
                        </div>
                    </button>

                    <div
                        className="modal fade"
                        id="addProjectModal"
                        tabIndex="-1"
                        aria-labelledby="addProjectModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1
                                        className="modal-title fs-5"
                                        id="addProjectModalLabel"
                                    >
                                        New Project
                                    </h1>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form
                                        action=""
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                {...register("name", {
                                                    required:
                                                        "This field cannot be blank",
                                                })}
                                            />
                                            {errors.name && (
                                                <p
                                                    role="alert"
                                                    style={{
                                                        color: "red",
                                                        fontSize: 14,
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    {errors.name?.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                {...register("description", {
                                                    required:
                                                        "This field cannot be blank",
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
                                                    {
                                                        errors.description
                                                            ?.message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                {...register("status")}
                                                className="form-select"
                                            >
                                                <option value="new">
                                                    Not Started
                                                </option>
                                                <option value="progress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
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
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Client:
                                            </label>
                                            <select
                                                id="client_id"
                                                {...register("client_id")}
                                                className="form-select"
                                            >
                                                {data?.clients.map((client) => (
                                                    <option
                                                        value={client.id}
                                                        key={client.id}
                                                    >
                                                        {client.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* {errors.client && (
                                                <p
                                                    role="alert"
                                                    style={{
                                                        color: "red",
                                                        fontSize: 14,
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    {errors.client?.message}
                                                </p>
                                            )} */}
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            data-bs-dismiss="modal"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default AddProjectModal
