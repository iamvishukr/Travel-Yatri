// export const RouteToPageMapper: { [key: string]: string } = {
//   "/dashboard": "Create Trip",
//   "/dashboard/all-trip": "My Trips",
//   "/dashboard/trip": "Trip",
//   "/dashboard/create-trip": "Create Trip",
//   "/dashboard/organizer-verification": "Organizer Verification",
//   "/dashboard/admin-organizer": "Organizers",
//   "/dashboard/single-trip": "Trip Details",
//   "/dashboard/bookings": "Bookings"
// };

export const RouteToPageMapper = (path: string) => {
  const mapper: { [key: string]: string } = {
    "/dashboard": "Create Trip",
    "/dashboard/all-trip": "My Trips",
    "/dashboard/trip": "Trip",
    "/dashboard/create-trip": "Create Trip",
    "/dashboard/organizer-verification": "Organizer Verification",
    "/dashboard/admin-organizer": "Organizers",
    "/dashboard/single-trip": "Trip Details",
    "/dashboard/bookings": "Bookings",
  };

  if (mapper?.[path]) {
    return mapper?.[path];
  }else if(path.startsWith("/dashboard/trip")){
    return "Edit Trip"
  }
};
