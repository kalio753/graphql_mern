const Spinner = () => {
    return (
        <>
            <div className="d-flex align-items-center flex-column">
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                <div>Loading...</div>
            </div>
        </>
    )
}

export default Spinner
