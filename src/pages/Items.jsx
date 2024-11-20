import products from "../../database.json";

export default function Items() {
  return (
    <section>
      <p>Produtos do estoque</p>
      <span>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.quantity}</p>
          </div>
        ))}
      </span>
    </section>
  );
}
