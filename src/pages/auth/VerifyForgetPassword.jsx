import { Link } from "react-router";

const VerifyForgetPassword = () => {
  return (
    <>
      <div
        className="container-fluid d-flex vh-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <div className="card mw-25 shadow p-2 mb-5 rounded">
          <div className="row d-flex justify-content-center align-items-center">
            <img
              src="/auth/logo.png"
              className="mt-4 rounded"
              style={{ maxWidth: "250px" }}
            />
            <p className="text-center m-2 h4">Please check your email!</p>
            <small className="text-center text-secondary">
              We&apos;ve emailed a 6-digit confirmation code. Please enter the
              code in the box below to verify your email.
            </small>
            <div className="card-body">
              <form className="mx-5 mb-5">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">OTP</label>
                  <input className="form-control" required />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary py-2" type="submit">
                    Verify
                  </button>
                </div>
              </form>
              <p className="text-center mb-3">
                Don&apos;t have a code?&nbsp;
                <a
                  role="button"
                  onClick={() => {}}
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  Resend
                </a>
              </p>
              <div className="d-flex justify-content-center">
                Return to&nbsp;
                <Link
                  to="/auth/login"
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyForgetPassword;
