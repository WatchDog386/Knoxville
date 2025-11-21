// backend/createAdmin.mjs - MANUAL HASHING VERSION

import mongoose from "mongoose";
import "dotenv/config";
import User from "./src/models/User.js";
import bcrypt from "bcryptjs";

const createAdmins = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("❌ MONGODB_URI missing in .env");
    }

    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(uri);
    console.log("✅ Connected!");

    const admins = [
      { email: "fanteskorri36@gmail.com", password: "fantes36" },
      { email: "knoxvilletechnologyltd@gmail.com", password: "KnoxJanelleTemi001" },
    ];

    for (const admin of admins) {
      console.log(`\n➡️ Processing admin: ${admin.email}`);

      let user = await User.findOne({ email: admin.email }).select("+password");

      // MANUAL HASHING - Bypass the pre-save hook entirely
      const hashedPassword = await bcrypt.hash(admin.password, 12);

      if (user) {
        console.log("🔄 Existing user found. Updating...");
        // Directly set the hashed password
        user.password = hashedPassword;
        user.role = "admin";
        await user.save({ validateBeforeSave: false }); // Skip validation since we manually hashed
        console.log(`✅ Updated admin → ${admin.email}`);
      } else {
        console.log("🆕 Creating new admin...");
        const newUser = new User({
          email: admin.email,
          password: hashedPassword, // Already hashed
          role: "admin",
        });
        await newUser.save();
        console.log(`✅ Created new admin → ${admin.email}`);
      }
    }

    console.log("\n🎉 All admin tasks complete.");
    
    // Verify the updates
    console.log("\n🔍 Verifying admin accounts:");
    for (const admin of admins) {
      const user = await User.findOne({ email: admin.email }).select("+password");
      if (user) {
        const isMatch = await user.comparePassword(admin.password);
        console.log(`   ${admin.email}: ${isMatch ? '✅ Password works' : '❌ Password mismatch'}`);
      }
    }
    
    await mongoose.connection.close();
    console.log("🔌 Connection closed.");
    process.exit(0);

  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
};

createAdmins();