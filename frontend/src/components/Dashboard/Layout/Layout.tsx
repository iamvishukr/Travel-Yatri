import "./../../../style.scss";
import { Container, Navbar, Offcanvas } from "react-bootstrap";
import DashboardSidebar from "./Sidebar";
import Main from "./Main";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouteToPageMapper } from "./RouteToPageNameMapper";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../context/User";
import { ADMIN, ORGANIZER } from "../../../contracts/constants/roleConstant";
import { useAppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/slices/auth";
import userApi from "../../../redux/services/user";
export default function Layout() {
  const location = useLocation();
  const { pathname } = location;
  const { user, setUser } = useUserContext();
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const appDispatcher = useAppDispatch();
  useEffect(() => {
    setShow(false);
  }, [location]);
  const handleLogout = () => {
    appDispatcher(logout());
    navigate("/");
    appDispatcher(userApi.util.resetApiState());
    setUser(null);
  };

  return (
    <div className="dashboard-ty layout-ty">
      <div className="main-wrapper">
        <Navbar className="main-header" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home" className="text-primary">
              {RouteToPageMapper(pathname) ?? "Lost"}
            </Navbar.Brand>
            <div
              className="responsive-bar"
              onClick={() => setShow((prev) => !prev)}
            >
              <i className="fas fa-bars "></i>
            </div>
          </Container>
        </Navbar>
        <DashboardSidebar />
        <Main>
          <Outlet />
        </Main>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Travel yatris</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="offcanvas-links">
            {user?.role === ORGANIZER ? (
              <>
                {user?.isVerified ? (
                  <>
                    <Link to="/dashboard">
                      <div className="canvas-item">
                        <div>
                          <i className="fas fa-plus-square"></i>
                        </div>
                        <div className="sidebar-item">Create Trip</div>
                      </div>
                    </Link>
                    <Link to="/dashboard/all-trip">
                      <div className="mt-4 canvas-item">
                        <div>
                          <i className="fas fa-plane-departure"></i>
                        </div>
                        <div className="sidebar-item">My Trip</div>
                      </div>
                    </Link>
                    <Link to="/dashboard/bookings">
                      <div className="mt-4 canvas-item">
                        <div>
                          <i className="fas fa-history"></i>
                        </div>
                        <div className="sidebar-item">Bookings</div>
                      </div>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : user?.role === ADMIN ? (
              <>
                <Link to="/dashboard/admin-organizer">
                  <div className="canvas-item">
                    <div>
                      <i className="fas fa-user-lock"></i>
                    </div>
                    <div className="sidebar-item">Organizers</div>
                  </div>
                </Link>
                <Link to="/dashboard/bookings">
                  <div className="mt-4 canvas-item">
                    <div>
                      <i className="fas fa-history"></i>
                    </div>
                    <div className="sidebar-item">Bookings</div>
                  </div>
                </Link>
                <Link to="/dashboard/all-trip">
                  <div className="mt-4 canvas-item">
                    <div>
                      <i className="fas fa-plane-departure"></i>
                    </div>
                    <div className="sidebar-item">Trips</div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/trip">
                  <div className="canvas-item">
                    <div>
                      <i className="fas fa-plane-departure"></i>
                    </div>
                    <div className="sidebar-item">Trip</div>
                  </div>
                </Link>
                <Link to="/dashboard/bookings">
                  <div className="mt-4 canvas-item">
                    <i className="fas fa-history"></i>
                    <div className="sidebar-item">Bookings</div>
                  </div>
                </Link>
              </>
            )}
          </div>
          <div>
            <div className="canvas-item" onClick={handleLogout}>
              <div>
                <i className="fas fa-sign-out-alt"></i>
              </div>
              <div className="sidebar-item">Logout</div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
