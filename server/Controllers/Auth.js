import jwt from "jsonwebtoken";
import users from "../Models/Auth.js";

export const login = async (req, res) => {
  const { email } = req.body;
  const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  try {

    let city = "Unknown";
    try {
      const geoResponse = await axios.get(`https://ipapi.co/${userIp}/json`);
      city = geoResponse.data.city || "Unknown";
    } catch (geoError) {
      console.error("Geolocation API error:", geoError);
    }


    const existingUser = await users.findOne({ email });
    //console.log(existingUser);
    
    if (!existingUser) {
      try {
        const newUser = await users.create({ email, city });
        const token = jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ result: newUser, token });
      } catch (error) {
        res.status(500).json({ message: "something went wrong.." });
        return;
      }
    } else {
      
      if (existingUser.city !== city) {
        existingUser.city = city;
        await existingUser.save();
      }
      
        const token = jwt.sign(
            {
              email: existingUser.email,
              id: existingUser._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1h",
            }
          );
          

      res.status(200).json({ result: existingUser, token });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong.." });
    return;
  }
};
