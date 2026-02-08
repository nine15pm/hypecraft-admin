import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';

const client = await db.connect();
const seedUserPassword = process.env.SEED_USER_PASSWORD ?? 'replace_with_secure_seed_password';
const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      password: seedUserPassword,
    },
    {
      id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
      first_name: 'Demo',
      last_name: 'User',
      email: 'demo@example.com',
      password: seedUserPassword,
    },
  ];

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, first_name, last_name, email, password)
        VALUES (${user.id}, ${user.first_name}, ${user.last_name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
