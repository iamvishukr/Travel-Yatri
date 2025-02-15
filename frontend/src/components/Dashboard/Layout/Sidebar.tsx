import Sidebar from "react-bootstrap-sidebar-menu";
import "./layout.scss";
import { useUserContext } from "../../../context/User";
import { ADMIN, ORGANIZER } from "../../../contracts/constants/roleConstant";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { logout } from "../../../redux/slices/auth";
import userApi from "../../../redux/services/user";
const DashboardSidebar = () => {
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();
  const appDispatcher = useAppDispatch();
  const handleLogout = () => {
    appDispatcher(logout());
    navigate("/");
    appDispatcher(userApi.util.resetApiState());
    setUser(null);
  };

  return (
    <>
      <Sidebar expand="sm" className="vh-100 dashboard-sidebar">
        <Sidebar.Collapse className="sidebar-width" getScrollValue={200}>
          <Sidebar.Header>
            {/* <Sidebar.Nav.Title><h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i></h1></Sidebar.Nav.Title> */}
            <Sidebar.Nav.Title>
              <img
                src="/img/logo/ty-logo.svg"
                alt="logo_img"
                width="90px"
                height="29px"
              />
            </Sidebar.Nav.Title>
            <Sidebar.Toggle className="text-black btn common-ty-btn">
              <i className="fas fa-bars"></i>
            </Sidebar.Toggle>
          </Sidebar.Header>
          <Sidebar.Body className="sidebar-body">
            {user?.role === ORGANIZER ? (
              <>
                {user?.isVerified ? (
                  <>
                    <Link to="/dashboard">
                      <Sidebar.Nav className="side-nav-group">
                        <Sidebar.Nav.Icon>
                          <i className="fas fa-plus-square"></i>
                        </Sidebar.Nav.Icon>
                        <Sidebar.Nav.Title className="sidebar-item">
                          Create Trip
                        </Sidebar.Nav.Title>
                      </Sidebar.Nav>
                    </Link>
                    <Link to="/dashboard/all-trip">
                      <Sidebar.Nav className="mt-4 side-nav-group">
                        <Sidebar.Nav.Icon>
                          <i className="fas fa-plane-departure"></i>
                        </Sidebar.Nav.Icon>
                        <Sidebar.Nav.Title className="sidebar-item">
                          My Trip
                        </Sidebar.Nav.Title>
                      </Sidebar.Nav>
                    </Link>
                    <Link to="/dashboard/bookings">
                      <Sidebar.Nav className="mt-4 side-nav-group">
                        <Sidebar.Nav.Icon>
                          <i className="fas fa-history"></i>
                        </Sidebar.Nav.Icon>
                        <Sidebar.Nav.Title className="sidebar-item">
                          Bookings
                        </Sidebar.Nav.Title>
                      </Sidebar.Nav>
                    </Link>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : user?.role === ADMIN ? (
              <>
                <Link to="/dashboard/admin-organizer">
                  <Sidebar.Nav className="side-nav-group">
                    <Sidebar.Nav.Icon>
                      <i className="fas fa-user-lock"></i>
                    </Sidebar.Nav.Icon>
                    <Sidebar.Nav.Title className="sidebar-item">
                      Organizers
                    </Sidebar.Nav.Title>
                  </Sidebar.Nav>
                </Link>
                <Link to="/dashboard/bookings">
                  <Sidebar.Nav className="mt-4 side-nav-group">
                    <Sidebar.Nav.Icon>
                      <i className="fas fa-history"></i>
                    </Sidebar.Nav.Icon>
                    <Sidebar.Nav.Title className="sidebar-item">
                      Bookings
                    </Sidebar.Nav.Title>
                  </Sidebar.Nav>
                </Link>
                <Link to="/dashboard/all-trip">
                  <Sidebar.Nav className="mt-4 side-nav-group">
                    <Sidebar.Nav.Icon>
                      <i className="fas fa-plane-departure"></i>
                    </Sidebar.Nav.Icon>
                    <Sidebar.Nav.Title className="sidebar-item">
                      Trips
                    </Sidebar.Nav.Title>
                  </Sidebar.Nav>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard/trip">
                  <Sidebar.Nav className="side-nav-group">
                    <Sidebar.Nav.Icon>
                      <i className="fas fa-plane-departure"></i>
                    </Sidebar.Nav.Icon>
                    <Sidebar.Nav.Title className="sidebar-item">
                      Trip
                    </Sidebar.Nav.Title>
                  </Sidebar.Nav>
                </Link>
                <Link to="/dashboard/bookings">
                  <Sidebar.Nav className="mt-4 side-nav-group">
                    <Sidebar.Nav.Icon>

                      <i className="fas fa-history"></i>
                    </Sidebar.Nav.Icon>
                    <Sidebar.Nav.Title className="sidebar-item">
                      Bookings
                    </Sidebar.Nav.Title>
                  </Sidebar.Nav>
                </Link>
              </>
            )}
          </Sidebar.Body>
          <Sidebar.Footer className="sidebar-body sidebar-footer">
            <Sidebar.Nav className="side-nav-group" onClick={handleLogout}>
              <Sidebar.Nav.Icon>
                <i className="fas fa-sign-out-alt"></i>
              </Sidebar.Nav.Icon>
              <Sidebar.Nav.Title className="sidebar-item">
                Logout
              </Sidebar.Nav.Title>
            </Sidebar.Nav>
          </Sidebar.Footer>
        </Sidebar.Collapse>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;

// <Sidebar.Nav.Link eventKey="menu_title">
// <Sidebar.Nav.Icon>1</Sidebar.Nav.Icon>
// <Sidebar.Nav.Title>Menu Title</Sidebar.Nav.Title>
// </Sidebar.Nav.Link>
// <Sidebar.Sub eventKey={0}>
// <Sidebar.Sub.Toggle>
//     <Sidebar.Nav.Icon />
//     <Sidebar.Nav.Title>Submenu</Sidebar.Nav.Title>
// </Sidebar.Sub.Toggle>
// <Sidebar.Sub.Collapse>
//     <Sidebar.Nav>
//         <Sidebar.Nav.Link eventKey="sum_menu_title">
//             <Sidebar.Nav.Icon>1.1</Sidebar.Nav.Icon>
//             <Sidebar.Nav.Title>Sub menu item</Sidebar.Nav.Title>
//         </Sidebar.Nav.Link>
//     </Sidebar.Nav>
// </Sidebar.Sub.Collapse>
// </Sidebar.Sub>
