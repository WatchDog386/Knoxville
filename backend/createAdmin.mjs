import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";

const createAdmins = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("❌ MONGODB_URI missing in .env");

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected!");

    const admins = [
      { email: "fanteskorri36@gmail.com", password: "fantes36" },
      { email: "knoxvilletechnologyltd@gmail.com", password: "KnoxJanelleTemi001" }
    ];

    for (const admin of admins) {
      console.log(`\n➡️ Processing admin: ${admin.email}`);

      let user = await User.findOne({ email: admin.email }).select("+password");

      if (user) {
        console.log("🔄 Existing user found.");

        // Check if the password needs updating
        const passwordMatches = await bcrypt.compare(admin.password, user.password);
        if (!passwordMatches) {
          const hashedPassword = await bcrypt.hash(admin.password, 12);
          user.password = hashedPassword; // ✅ update only if changed
          console.log("🔑 Password updated.");
        } else {
          console.log("✅ Password is already up to date.");
        }

        // Ensure role is admin
        if (user.role !== "admin") {
          user.role = "admin";
          console.log("🎯 Role updated to admin.");
        }

        await user.save();
        console.log(`✅ Updated admin → ${admin.email}`);
      } else {
        console.log("🆕 Creating new admin...");
        const hashedPassword = await bcrypt.hash(admin.password, 12);
        const newUser = new User({
          email: admin.email,
          password: hashedPassword,
          role: "admin",
        });
        await newUser.save();
        console.log(`✅ Created new admin → ${admin.email}`);
      }
    }

    console.log("\n🎉 All admin tasks complete.");
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
    process.exit(0);

  } catch (error) {
    console.error("❌ ERROR:", error.message);
    process.exit(1);
  }
};

createAdmins();
