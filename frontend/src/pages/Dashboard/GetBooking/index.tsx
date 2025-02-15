import { startOfDay, endOfDay, compareAsc } from "date-fns";

import CommonTable from "../../../components/common/Tables";
import { IGetTripResponse } from "../../../contracts/IGetTripResponse";
import { IUser } from "../../../contracts/IUser";
import {
  useGetBookingQuery,
  useMarkTripAsStratedMutation,
} from "../../../redux/services/booking";
import { format } from "date-fns";
import { truncateString } from "../../../utils/truncateString";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";

import "./style.scss";
import { useState } from "react";
import classNames from "classnames";
import { useUserContext } from "../../../context/User";
import {
  ADMIN,
  ORGANIZER,
  USER,
} from "../../../contracts/constants/roleConstant";
import { toast } from "react-toastify";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

export function compareDate(date1: string, date2: string) {
  const d1 = startOfDay(date1);
  const d2 = startOfDay(date2);
  return compareAsc(d1, d2);
}

const GetBooking = () => {
  const [query, setQuery] = useState<{ dateRange: Value; search: string }>({
    dateRange: [startOfDay(new Date()), endOfDay(new Date())],
    search: "",
  });
  const { data } = useGetBookingQuery({ ...query });
  const [startTripTrigger] = useMarkTripAsStratedMutation();
  const { user } = useUserContext();

  const tableRow = {
    bookingStatus: "Status",
    // organizerName: "Organizer",
    place: "Trip",
    // pickUp: "Pick up",
    usersNo: "Users",
    startDate: "Start",
    endDate: "End",
    booking: "Booking Date",
    totalCost: "Price",
    razorpayPaymentId: "Payment id",
    // ...(user && user.role === ADMIN ? {Organier} : {}),
    ...(user && user.role === USER ? { startTrip: "Start Trip" } : {}),
    ...(user && (user.role === ADMIN || user.role === ORGANIZER)
      ? { tripStatus: "Trip Status" }
      : {}),
  };

  const tableData = data?.data?.map((data) => {
    return {
      ...data,
      bookingStatus: (
        <div
          className={classNames({
            "text-danger-cust": data.bookingStatus === "Failed",
            "text-success-cust": data.bookingStatus === "Accepted",
          })}
        >
          {data.bookingStatus}
        </div>
      ),
      organizerName: (data?.organizerId as IUser)?.fullName ?? "-",
      place: (data?.tripId as IGetTripResponse)?.place ?? "-",
      pickUp:
        truncateString((data?.tripId as IGetTripResponse)?.pickUp, 15) ?? "-",
      usersNo: data?.users?.length ?? "-",
      startDate:
        format(
          (data?.tripId as IGetTripResponse)?.startDate as string,
          "LLL dd, yyyy"
        ) ?? "-",
      endDate:
        format(
          (data?.tripId as IGetTripResponse)?.endDate as string,
          "LLL dd, yyyy"
        ) ?? "-",
      booking: format(data?.createdAt as string, "LLL dd, yyyy") ?? "-",
      ...(user && user.role === USER
        ? {
          startTrip: data?.tripStarted ? (
            <span className="table-text">
              {format(data?.tripStarted as string, "LLL dd, yyyy") ?? "-"}
            </span>
          ) : (
            <button
              className="btn btn-primary table-btn"
              disabled={
                0 !=
                compareDate(
                  "" + new Date(),
                  (data?.tripId as IGetTripResponse)?.startDate
                )
              }
              onClick={() =>
                startTripTrigger({ bookingId: data?._id })
                  .unwrap()
                  .then((res) => {
                    toast(res.message, {
                      type: "success",
                      theme: "colored",
                    });
                  })
                  .catch((error) => {
                    toast(error.message, {
                      type: "error",
                      theme: "colored",
                    });
                  })
              }
            >
              Start Trip
            </button>
          ),
        }
        : {}),
      ...(user && (user.role === ADMIN || user.role === ORGANIZER)
        ? {
          tripStatus: data?.tripStarted ? (
            <span className="success-badge">STARTED</span>
          ) : (
            <span className="warning-badge"> PENDING</span>
          ),
        }
        : {}),
      openedContent: (
        <div className="opened-content">
          <div>
            <h5>User Name:</h5>
            <p>{data?.users[0]?.name}</p>
          </div>
          <div>
            <h5>Trip place:</h5>
            <p>{typeof (data?.tripId as IGetTripResponse)?.place === "object" ? <>
              <ul>
                {(data?.tripId as IGetTripResponse)?.place?.map((item, index) => {
                  return <li key={index}>
                    {item}
                  </li>
                })}
              </ul>
            </> : <>{(data?.tripId as IGetTripResponse)?.place}</>}</p>
          </div>
          <div>
            <h5>Trip pickup:</h5>
            <p>{(data?.tripId as IGetTripResponse)?.pickUp}</p>
          </div>
          <div>
            <h5>Trip Price:</h5>
            <p>{(data?.tripId as IGetTripResponse)?.price}</p>
          </div>
          {user?.role === ADMIN && <><div>
            <h5>User Email:</h5>
            <p>{data?.users[0]?.email}</p>
          </div>
            <div>
              <h5>User Number:</h5>
              <p>{data?.users[0]?.contactNumber}</p>
            </div></>}
          {user?.role === ADMIN && <>
            <div>
              <h5>
                Organizer Name :
              </h5>
              <p>
                {(data?.organizerId as IUser)?.fullName}
              </p>
            </div>
            <div>
              <h5>
                Organizer Number :
              </h5>
              <p>
                {(data?.organizerId as IUser)?.contactNumber ?? '-'}
              </p>
            </div>
            <div>
              <h5>
                Organizer Email :
              </h5>
              <p>
                {(data?.organizerId as IUser)?.email}
              </p>
            </div></>}
        </div>
      )
    };
  });

  const OnDateChange = (date: Value) => {
    setQuery({
      ...query,
      dateRange: date,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(tableData, ">>>>>")
  return (
    <>
      <div className="filters">
        <div className="search-input">
          <input
            className="search"
            placeholder="search"
            onChange={onChange}
            name="search"
          />
          <div className="search-icon">
            <i className="fas fa-search"></i>
          </div>
        </div>

        <DateRangePicker
          dayPlaceholder="DD"
          monthPlaceholder="MM"
          yearPlaceholder="YYY"
          className="custom-date-picker"
          onChange={OnDateChange}
          value={query.dateRange}
          calendarIcon={<i className="fas fa-calendar"></i>}
        />
      </div>
      <div className="register-as-page admin-organizer">
        <CommonTable
          noData="No Bookings found."
          tableRow={tableRow}
          tableData={tableData ?? []}
          openDetail={true}
          ignoreVerificationSubmitted={true}
        />
      </div>
    </>
  );
};

export default GetBooking;
