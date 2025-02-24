import { Link } from "react-router";

const ForgetPassword = () => {
  return (
    <>
      <div
        className="container-fluid d-flex vh-100 justify-content-center align-items-center"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <div className="card mw-25 shadow p-3 mb-5 rounded">
          <div className="row d-flex justify-content-center align-items-center">
            <img
              src="logo.png"
              className="mt-4 rounded"
              style={{ maxWidth: "250px" }}
            />
            <p className="text-center m-2 h4">Forgot your password?</p>
            <small className="text-center text-secondary">
              Please enter the email address associated with your account and
              we&apos;ll email you an OTP code to reset your password.
            </small>
            <div className="card-body">
              <form className="mx-5 mb-5">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" required />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary py-2" type="submit">
                    Send OTP
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                Already have an account?&nbsp;
                <Link
                  to="/auth/login"
                  className="link-offset-2 link-underline link-underline-opacity-0"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
