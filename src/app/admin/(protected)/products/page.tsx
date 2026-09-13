import { ProductManager } from "@/components/admin/product-manager";
export default function Products() {
  return (
    <div className="admin-page">
      <span className="eyebrow">Catalogue</span>
      <h1>Products</h1>
      <p>Edit demo prices, merchandising flags and storefront visibility.</p>
      <ProductManager />
    </div>
  );
}
