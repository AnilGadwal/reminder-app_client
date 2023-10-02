export const getUser = () => {
  try {
    const userObject = localStorage.getItem("userDetails");
    if (userObject) {
      const userDetails = JSON.parse(userObject);
      return userDetails;
    }
    return null;
  } catch (error) {
    console.error("Error parsing user details:", error);
    return null;
  }
};

export const logoutUser = () => {
  try {
    if (localStorage.getItem("userDetails")) {
      localStorage.removeItem("userDetails");
      window.location.reload();
    }
  } catch (error) {
    console.error("Error removing user details:", error);
  }
};

export const getToday = () =>{
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var today = new Date(Date.now() - tzoffset).toISOString().slice(0, 16);
  return today
}

export const getLocalTime = (date) => {
  if (date) {
    const eventDate = new Date(date);
    const userTimeZoneOffsetInMinutes = new Date().getTimezoneOffset();
    const eventDateInLocalTimezone = new Date(
      eventDate.getTime() - userTimeZoneOffsetInMinutes * 60000
    ).toISOString().slice(0, 16);
    return eventDateInLocalTimezone;
  }
  return getToday();
};