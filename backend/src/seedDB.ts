import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Product } from "./products/product.entity";
import { User } from "./users/user.entity";
import * as bcrypt from "bcrypt";
dotenv.config({ path: "./.env.development.local" });
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
} = process.env;

const sampleProductsInfo: Partial<Product>[] = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    image: "/images/airpods.jpg",
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    image: "/images/phone.jpg",
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    image: "/images/camera.jpg",
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    image: "/images/playstation.jpg",
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    image: "/images/mouse.jpg",
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    image: "/images/alexa.jpg",
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
];

const sampleUserInfo: Partial<User> = {
  email: "peter@gmail.com",
  isAdmin: true,
  name: "Peter Parker",
};
const AppDataSource = new DataSource({
  synchronize: false,
  type: "postgres",
  database: POSTGRES_DB,
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  entities: ["**/*.entity.js"],
  migrations: ["migrations/*.js"],
});

async function seedData() {
  await AppDataSource.initialize();
  console.log("Data Source has been initialized!");
  const hash = bcrypt.hashSync(
    "Peter123" + BCRYPT_PASSWORD,
    Number(SALT_ROUNDS),
  );
  sampleUserInfo.password = hash;
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const sampleUserInstance = queryRunner.manager.create(User, sampleUserInfo);
    const sampleUser = await queryRunner.manager.save(sampleUserInstance);
    const sampleProducts: Partial<Product>[] = sampleProductsInfo.map(
      (productInfo) => ({ ...productInfo, user: sampleUser }),
    );

    for (const productInfo of sampleProducts) {
      const sampleProductInstance = queryRunner.manager.create(
        Product,
        productInfo,
      );
      await queryRunner.manager.save(sampleProductInstance);
    }

    await queryRunner.commitTransaction();
  } catch (err) {
    console.error("transaction failed " + err);
    // since we have errors lets rollback the changes we made
    await queryRunner.rollbackTransaction();
  } finally {
    // you need to release a queryRunner which was manually instantiated
    await queryRunner.release();
  }
}

seedData()
  .then(() => {
    console.log("seeding done successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("seeding failed " + err);
  });
