import 'dotenv/config'
import { connectDB } from '../src/lib/db'
import { Product } from '../src/models/Product'
import { Category } from '../src/models/Category'
import { categories, seedProducts } from '../src/data/seed-products'

async function seed() {
  await connectDB()
  await Promise.all(categories.map((category) => Category.updateOne({ slug: category.slug }, { $set: category }, { upsert: true })))
  await Promise.all(seedProducts.map((product) => Product.updateOne({ slug: product.slug }, { $set: product }, { upsert: true })))
  console.log(`Seeded ${categories.length} categories and ${seedProducts.length} products.`)
  process.exit(0)
}
seed().catch((error) => { console.error(error); process.exit(1) })
