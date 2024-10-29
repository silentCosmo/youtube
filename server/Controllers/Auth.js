import jwt from "jsonwebtoken";
import users from "../Models/Auth.js";
import axios from "axios";

export const login = async (req, res) => {
  const { email } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  try {
    const existingUser = await users.findOne({ email });

    let city = "Unknown";
    let region = "Unknown";
    if (existingUser.ip !== ip) {
      try {
        const ipInfo = await axios.get(
          `https://ipinfo.io/${ip}?token=b4fcb4e9c26a5e`
        );
        city = ipInfo.data.city || "Unknown";
        region = ipInfo.data.region || "Unknown";
        console.log(ip,city,region);
      } catch (error) {
        console.error("Geolocation error:", error);
      }
    }

    //console.log(existingUser);

    if (!existingUser) {
      try {
        const newUser = await users.create({ email, ip, city, region });
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
      if (existingUser.ip !== ip) {
        existingUser.ip = ip;
        existingUser.city = city;
        existingUser.region = region;
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
