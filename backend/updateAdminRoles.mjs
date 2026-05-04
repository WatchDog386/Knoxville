// backend/updateAdminRoles.mjs
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './src/models/User.js';
import bcrypt from 'bcryptjs';

const updateAdminRoles = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('❌ MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    const adminUsers = [
      { email: 'fanteskorri36@gmail.com', password: 'fantes36' },
      { email: 'knoxvilletechnologyltd@gmail.com', password: 'KnoxJanelleTemi001' },
    ];

    for (const admin of adminUsers) {
      console.log(`\n➡️ Processing: ${admin.email}`);
      
      let user = await User.findOne({ email: admin.email }).select('+password');

      if (!user) {
        console.log(`❌ No user found with email: ${admin.email}`);
        console.log(`🆕 Creating new admin user...`);
        
        // Create new admin user with proper password hashing
        const hashedPassword = await bcrypt.hash(admin.password, 12);
        const newUser = new User({
          email: admin.email,
          password: hashedPassword,
          role: 'admin'
        });
        await newUser.save();
        console.log(`✅ Created new admin: ${admin.email}`);
      } else {
        // Update existing user - ensure password is properly set
        console.log(`🔄 User found, updating role to admin...`);
        
        // Check if password needs to be updated
        if (admin.password) {
          const isCurrentPasswordValid = await bcrypt.compare(admin.password, user.password);
          if (!isCurrentPasswordValid) {
            console.log(`🔄 Updating password for: ${admin.email}`);
            const hashedPassword = await bcrypt.hash(admin.password, 12);
            user.password = hashedPassword;
          }
        }
        
        user.role = 'admin';
        await user.save();
        console.log(`✅ Updated role to 'admin' for: ${admin.email}`);
      }

      // Verify the user can login
      const verifiedUser = await User.findOne({ email: admin.email }).select('+password');
      if (verifiedUser) {
        const canLogin = await verifiedUser.comparePassword(admin.password);
        console.log(`🔐 Login test: ${canLogin ? '✅ SUCCESS' : '❌ FAILED'}`);
      }
    }

    console.log('\n🎉 Admin roles update completed.');
    
    // Final verification
    console.log('\n📋 Final admin list:');
    const admins = await User.find({ role: 'admin' });
    admins.forEach(admin => {
      console.log(`   - ${admin.email} (${admin.role})`);
    });

    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin roles:', error.message);
    process.exit(1);
  }
};

updateAdminRoles();