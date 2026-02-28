export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "lax",        // important for cross-site cookie
    secure: process.env.NODE_ENV === "production", // https only in prod
  };

  res.status(statusCode)
     .cookie("token", token, options)
     .json({
       success: true,
       user,
       message,
     });
};
