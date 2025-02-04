import { Link, useNavigate } from "react-router";
import { Dropdown } from "react-bootstrap";
import { getItem, removeData } from "../utils/session";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { name = "" } = JSON.parse(getItem("currentUser"));

  const handleLogout = () => {
    removeData();
    navigate("/auth/login");
  };
  return (
    <>
      <div className="col-auto">
        <div
          className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary vh-100"
          style={{ maxWidth: "310px", width: "310px" }}
        >
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <span className="fs-4">Sidebar</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-body-emphasis">
                Customers
              </a>
            </li>
          </ul>
          <hr />
          <Dropdown data-bs-theme="light">
            <Dropdown.Toggle variant="outline-secondary">
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="24"
                height="24"
                className="rounded-circle me-2"
              />
              <strong>{name}</strong>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to="/admin/profile" className="dropdown-item">
                Profile
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
