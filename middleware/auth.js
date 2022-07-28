import jwt from "jsonwebtoken"

// export const auth = (req, res, next) => {
    async function auth(req, res, next)  {
        const token = req.headers["token"];
        if (!token) return res.status(401).send({ message: "Access denied" });
        try {
            const verified = await jwt.verify(token, process.env.SECRET_KEY)
            req.user = verified;
            next();
        }
        catch (err) {
            res.status(401).send({ message: err.message })
        }
}


 function verifyTokenAndAdmin(req, res, next) {
    // console.log("Admin ?");
    auth(req, res, () => {
      console.log(req.user.existUser.isAdmin);
      if (req.user.existUser.isAdmin) {
        return next();
      } else {
        res.status(403).send("you are not allowed to do manipulation...");
      }
    });
  }

  export {auth,verifyTokenAndAdmin}