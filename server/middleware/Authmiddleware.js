import jwt from "jsonwebtoken";

// export const verifyToken = (request, response, next) => {
//   const token = request.cookies.jwt; // Assuming you're using cookies for storing JWTs
//   if (!token) {
//     return response.status(401).send("You are not authenticated");
//   }

//   jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
//     if (err) {
//       return response.status(403).send("Token is not valid");
//     }
//     request.userId = decodedToken.userId; // Store userId in the request object
//     next();
//   });
// };

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.userId = decoded.id; // Attach userId to request
    next();
  });
};
