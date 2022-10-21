import { useEffect, useState } from "react"
import { FaUser } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client"
import { ADD_CLIENT } from "../mutations/clientMutation"
import { GET_CLIENTS } from "../querries/clientQuery"

const AddClientModal = () => {
    let name, email, phone
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: { name, email, phone },
        update(cache, { data: addClient }) {
            const { clients } = cache.readQuery({ query: GET_CLIENTS })
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] },
            })
        },
    })

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

        addClient({
            variables: {
                name: data.name,
                email: data.email,
                phone: data.phone,
            },
        })
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ name: "", email: "", phone: "" })
        }
    }, [formState, reset])

    console.log("err", errors)
    return (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addClientModal"
            >
                <div className="d-flex align-items-center">
                    <FaUser className="icon" />
                    <div>Add Client</div>
                </div>
            </button>

            <div
                className="modal fade"
                id="addClientModal"
                tabIndex="-1"
                aria-labelledby="addClientModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="addClientModalLabel"
                            >
                                Add Client
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form action="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
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
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        {...register("email", {
                                            required:
                                                "This field cannot be blank",
                                        })}
                                    />
                                    {errors.email && (
                                        <p
                                            role="alert"
                                            style={{
                                                color: "red",
                                                fontSize: 14,
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {errors.email?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        {...register("phone", {
                                            required:
                                                "This field cannot be blank",
                                        })}
                                    />
                                    {errors.phone && (
                                        <p
                                            role="alert"
                                            style={{
                                                color: "red",
                                                fontSize: 14,
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {errors.phone?.message}
                                        </p>
                                    )}
                                </div>
                                <button
                                    className="btn btn-secondary"
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
    )
}

export default AddClientModal
