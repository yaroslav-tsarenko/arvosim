import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://projects_db_user:uYQxjuwkvaZxpv9A@cluster0.yh3piyf.mongodb.net/simora?appName=Cluster0';

async function seed() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db();

  console.log('Seeding test user...');

  const existingUser = await db.collection('users').findOne({ email: 'test@gmail.com' });

  if (existingUser) {
    console.log('Test user already exists. Updating balance to 10000...');
    await db.collection('users').updateOne(
      { email: 'test@gmail.com' },
      { $set: { balance: 10000, name: 'Test User' } }
    );
  } else {
    const hashedPassword = await bcrypt.hash('test123!', 10);
    await db.collection('users').insertOne({
      name: 'Test User',
      email: 'test@gmail.com',
      password: hashedPassword,
      balance: 10000,
      createdAt: new Date(),
    });
    console.log('Test user created.');
  }

  // Create indexes
  await db.collection('users').createIndex({ email: 1 }, { unique: true });
  await db.collection('purchases').createIndex({ userId: 1, purchasedAt: -1 });

  console.log('Indexes created.');
  console.log('\nTest user credentials:');
  console.log('  Email: test@gmail.com');
  console.log('  Password: test123!');
  console.log('  Balance: $10,000 (£10,000)');

  await client.close();
  console.log('\nDone!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
