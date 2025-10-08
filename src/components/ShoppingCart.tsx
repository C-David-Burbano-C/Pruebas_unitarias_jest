import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const availableProducts: Product[] = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Mouse", price: 25.99 },
  { id: 3, name: "Teclado", price: 79.99 },
  { id: 4, name: "Monitor", price: 299.99 },
  { id: 5, name: "Auriculares", price: 149.99 },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== productId);
      }
    });
  };

  const getTotalPrice = (): number => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-[600px] w-full p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-white text-2xl">🛒</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Tienda Online
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Encuentra los mejores productos tech
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Productos Disponibles */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                🏪 Productos
              </h2>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                {availableProducts.length} disponibles
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {availableProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                          Disponible
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    data-testid={`add-${product.id}`}
                  >
                    🛒 Agregar al carrito
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">🛍️ Mi Carrito</h2>
                  <p className="opacity-90">
                    {getTotalItems()}{" "}
                    {getTotalItems() === 1 ? "producto" : "productos"}
                  </p>
                </div>

                <div className="p-6" data-testid="cart">
                  {cart.length === 0 ? (
                    <div className="text-center py-12" data-testid="empty-cart">
                      <div className="text-6xl mb-4">🛒</div>
                      <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                        El carrito está vacío
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm">
                        Agrega algunos productos para comenzar
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div
                          key={item.id}
                          className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                                {item.name}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  ${item.price.toFixed(2)} × {item.quantity}
                                </span>
                                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                            data-testid={`remove-${item.id}`}
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      ))}

                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-6">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl text-center">
                          <p className="text-sm font-medium opacity-90 mb-1">
                            Total a pagar
                          </p>
                          <div className="text-3xl font-bold">
                            ${getTotalPrice().toFixed(2)}
                          </div>
                        </div>
                        <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                          💳 Proceder al pago
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
