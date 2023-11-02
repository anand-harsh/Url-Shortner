const jwt = require("jsonwebtoken");

const JWT_JWT_SECRET=process.env.JWT_JWT_SECRET
const JWT_SECRET = "enfesilnviseisnev";
// const sessionIdToUserMap = new Map();

function setUser(user) {
  //   sessionIdToUserMap.set(id, user);
  //   const payload = {
  //     ...user,
  //   };
  return jwt.sign({ _id: user._id, email: user.email, role: user.role }, JWT_SECRET); // Ensure user object is properly formatted within an object
}
function getUser(token) {
  //   return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // Handle the error properly here
    console.error("JWT verification error:", err);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
