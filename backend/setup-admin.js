#!/usr/bin/env node
/**
 * Quick setup script to bootstrap admin user for testing
 * Usage: node setup-admin.js
 */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const ADMIN_EMAIL = 'fanteskorri36@gmail.com';
const ADMIN_PASSWORD = 'fantes36';

const setupAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('❌ MONGODB_URI not found in .env file');
      console.error('📝 Please create backend/.env with MONGODB_URI set');
      process.exit(1);
    }

    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // Import User model after connection
    const { default: User } = await import('./src/models/User.js');

    console.log(`\n➡️ Setting up admin: ${ADMIN_EMAIL}`);

    // Check if user exists
    let user = await User.findOne({ email: ADMIN_EMAIL }).select('+password');

    if (user) {
      console.log('🔄 User already exists');
      
      // Verify password works
      const canLogin = await user.comparePassword(ADMIN_PASSWORD);
      if (canLogin) {
        console.log('✅ Password is correct - ready to login!');
      } else {
        console.log('🔑 Updating password...');
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
        user.password = hashedPassword;
        await user.save();
        console.log('✅ Password updated');
      }

      // Ensure role is admin
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log('✅ Role updated to admin');
      }
    } else {
      console.log('🆕 Creating new admin user...');
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);
      const newUser = new User({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
      await newUser.save();
      console.log('✅ Admin user created');
    }

    // Final verification
    const finalUser = await User.findOne({ email: ADMIN_EMAIL }).select('+password');
    const loginTest = await finalUser.comparePassword(ADMIN_PASSWORD);

    console.log(`\n📋 Final Status:`);
    console.log(`   Email: ${finalUser.email}`);
    console.log(`   Role: ${finalUser.role}`);
    console.log(`   Login Test: ${loginTest ? '✅ PASS' : '❌ FAIL'}`);

    if (loginTest) {
      console.log(`\n🎉 Admin ready! Use these credentials to login:`);
      console.log(`   Email: ${ADMIN_EMAIL}`);
      console.log(`   Password: ${ADMIN_PASSWORD}`);
    } else {
      console.error(`\n❌ Login test failed - something is wrong with password setup`);
      process.exit(1);
    }

    await mongoose.connection.close();
    console.log('\n✅ Setup complete!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Setup error:', error.message);
    process.exit(1);
  }
};

setupAdmin();
