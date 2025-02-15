import { useState } from "react";
import Form from "react-bootstrap/Form";
import CommonTable from "../../../components/common/Tables";
import { ORGANIZER } from "../../../contracts/constants/roleConstant";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useVerifyOrganizerMutation,
} from "../../../redux/services/admin";
import "./style.scss";
import { format } from "date-fns";
import { toast } from "react-toastify";
import Confirmation from "../../../components/common/Popups/Confirmation";

const tableRow = {
  fullName: "Full Name",
  email: "Email",
  createdAt: "Created At",
  isDeleted: "Deleted",
  isVerified: "Verified",
  delete: "Delete User",
};

export const AdminOrganizerList = () => {
  const { data } = useGetUsersQuery({ role: ORGANIZER });
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const handleClose = () => setShowModal(false);
  const [deleteUser] = useDeleteUserMutation();
  const [verifyOrganizer] = useVerifyOrganizerMutation();

  const handleDelete = () => {
    if (selectedUserId) {
      deleteUser(selectedUserId)
        .unwrap()
        .then((res) => {
          toast(res.message ?? "User deleted successfully.", {
            type: "success",
            theme: "colored",
          });
        })
        .catch((error) => {
          toast(error.message ?? "Failed to delete the user.", {
            type: "error",
            theme: "colored",
          });
        })
        .finally(() => {
          handleClose();
        });
    }
  };

  const tableData = data?.data?.map((row) => {
    return {
      ...row,
      createdAt: format(row.createdAt, "LLL dd, yyyy"),
      isVerified: (
        <Form.Check
          type="switch"
          className="bootstrap-switch"
          onChange={(e) => {
            verifyOrganizer({ id: row._id, isVerified: e.target.checked })
              .unwrap()
              .then((res) => {
                toast(res.message ?? "Organizer updated successfully.", {
                  type: "success",
                  theme: "colored",
                });
              })
              .catch((err) => {
                toast(err?.message ?? "Something went wrong.", {
                  type: "error",
                  theme: "colored",
                });
              });
          }}
          defaultChecked={row.isVerified}
          disabled={!row.isVerificationSubmitted}
        />
      ),
      isDeleted: <span>{row.isDeleted ? "Yes" : "No"}</span>,
      openedContent: (
        <div className="opened-content">
          <div>
            <h5>Address:</h5> <p>{row?.organizer?.address}</p>
          </div>
          <div>
            <h5>Contact Number:</h5> <p>{row?.organizer?.contactNumber}</p>
          </div>
          <div>
            <h5>Description:</h5> <p>{row?.organizer?.description}</p>
          </div>
          <div>
            <h5>Website:</h5> <p>{row?.organizer?.website || "NA"}</p>
          </div>
          <div>
            <h5>Addhar Number:</h5> <p>{row?.organizer?.aadhaarNumber}</p>
          </div>
          <div>
            <h5>Addhar Card</h5>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                row?.organizer?.adhaarImage?.path
              }`}
              alt="adhar image"
            />
          </div>
          <div>
            <h5>Pan Number:</h5> <p>{row?.organizer?.panNumber}</p>
          </div>
          <div>
            <h5>Pan Card:</h5>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}${
                row?.organizer?.panImage?.path
              }`}
              alt="adhar image"
            />
          </div>
          <div>
            <h5>Gst Number:</h5> <p>{row?.organizer?.gstNumber || "NA"}</p>
          </div>
        </div>
      ),
      delete: (
        <>
          <button
            className="btn btn-danger"
            onClick={() => {
              setSelectedUserId(row._id);
              setShowModal(true);
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <Confirmation
            title="Confirm Delete"
            description="Are you sure you want to delete this item?"
            btnText="Delete"
            show={showModal && selectedUserId === row._id}
            handleClose={handleClose}
            handleDelete={handleDelete}
          />
        </>
      ),
    };
  });

  return (
    <div className="register-as-page admin-organizer">
      <CommonTable
        tableRow={tableRow}
        tableData={tableData ?? []}
        openDetail={true}
      />
    </div>
  );
};

export default AdminOrganizerList;
