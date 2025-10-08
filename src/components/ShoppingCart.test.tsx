import { render, screen, fireEvent, within } from "@testing-library/react";
import ShoppingCart from "./ShoppingCart";

describe("ShoppingCart", () => {
  test("el carrito inicia vacio", () => {
    render(<ShoppingCart />);
    expect(screen.getByTestId("empty-cart")).toBeInTheDocument();
    expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();
  });

  test("permite agregar productos al carrito", () => {
    render(<ShoppingCart />);
    const addButton = screen.getByTestId("add-2"); // Mouse
    fireEvent.click(addButton);
  // El nombre 'Mouse' aparece en la lista de productos y en el carrito; comprobamos que hay al menos
  const matches = screen.getAllByText("Mouse");
  expect(matches.length).toBeGreaterThanOrEqual(1);
  // Verificamos el contador global de items (el header está fuera del contenedor "cart")
  expect(screen.getByText(/1\s*producto/)).toBeInTheDocument();
  });

  test("muestra el precio correcto de productos individuales", () => {
    render(<ShoppingCart />);
    fireEvent.click(screen.getByTestId("add-2")); // Mouse
    const cart = screen.getByTestId("cart");
    // Busca específicamente el precio con cantidad
    expect(within(cart).getByText(/\$25\.99 × 1/)).toBeInTheDocument();
  });

  test("permite aumentar cantidad de productos existentes", () => {
    render(<ShoppingCart />);
    const addButton = screen.getByTestId("add-2"); // Mouse
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    const cart = screen.getByTestId("cart");
  expect(within(cart).getByText(/\$25\.99 × 2/)).toBeInTheDocument();
  // El total aparece tanto como subtotal (span) y como total (div). Seleccionamos la versión en el bloque de total (es un div)
  expect(within(cart).getByText(/\$51\.98/, { selector: 'div' })).toBeInTheDocument();
  });

  test("permite quitar productos del carrito", () => {
    render(<ShoppingCart />);
    fireEvent.click(screen.getByTestId("add-2")); // Mouse
    // Nos aseguramos de que el item esté ahora en el carrito (al menos una aparición)
    expect(screen.getAllByText("Mouse").length).toBeGreaterThanOrEqual(1);

    // ahora usamos el data-testid en lugar de buscar texto para eliminar
    const removeButton = screen.getByTestId("remove-2");
    fireEvent.click(removeButton);

    // El mensaje de carrito vacío está dentro del contenedor del carrito
    const cart = screen.getByTestId("cart");
    expect(within(cart).getByText("El carrito está vacío")).toBeInTheDocument();
  });

  test("reduce cantidad cuando hay multiples unidades", () => {
    render(<ShoppingCart />);
    const addButton = screen.getByTestId("add-2"); // Mouse
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    const cart = screen.getByTestId("cart");
    expect(within(cart).getByText(/\$25\.99 × 3/)).toBeInTheDocument();

    // Quitar una unidad (simulamos eliminar 1)
    fireEvent.click(screen.getByTestId("remove-2"));

    expect(within(cart).getByText(/\$25\.99 × 2/)).toBeInTheDocument();
  });

  test("calcula el total correctamente con multiples productos", () => {
    render(<ShoppingCart />);
    fireEvent.click(screen.getByTestId("add-2")); // Mouse ($25.99)
    fireEvent.click(screen.getByTestId("add-3")); // Teclado ($79.99)
  const cart = screen.getByTestId("cart");
  // El header del carrito (fuera del contenedor 'cart') muestra el número de productos
  expect(screen.getByText(/2\s*productos/)).toBeInTheDocument();
  // El total aparece en la sección de 'Total a pagar' (dentro del cart)
  expect(within(cart).getByText(/\$105\.98/)).toBeInTheDocument();
  });

  test("muestra todos los productos disponibles", () => {
    render(<ShoppingCart />);
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("Teclado")).toBeInTheDocument();
    expect(screen.getByText("Monitor")).toBeInTheDocument();
    expect(screen.getByText("Auriculares")).toBeInTheDocument();
  });
});
