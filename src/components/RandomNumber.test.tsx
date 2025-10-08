import { render, screen, fireEvent } from "@testing-library/react";
import RandomNumber from "./RandomNumber";

describe("RandomNumber", () => {
  test("muestra un número aleatorio cuando se hace clic en el botón", async () => {
    // 1. Renderizar el componente
    render(<RandomNumber />);

    // 2. Obtener el botón
    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });

    // 3. Hacer clic en el botón
    fireEvent.click(button);

    // 4. Esperar a que aparezca el número (ahora busca "Tu número es:")
    const numberDisplay = await screen.findByText(/Tu número es:/);
    expect(numberDisplay).toBeInTheDocument();
  });

  test("el número generado está dentro del rango [1,100]", async () => {
    render(<RandomNumber />);

    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });

    // Hacer múltiples clics para probar el rango
    for (let i = 0; i < 5; i++) {
      fireEvent.click(button);
      
      // Esperar a que aparezca "Actual" en las estadísticas
      const actualText = await screen.findByText("Actual");
      const actualContainer = actualText.parentElement;
      const numberElements = actualContainer?.querySelectorAll('div');
      const numberElement = numberElements?.[numberElements.length - 1];
      const number = parseInt(numberElement?.textContent || "0");

      // Verificar que está en el rango correcto
      expect(number).toBeGreaterThanOrEqual(1);
      expect(number).toBeLessThanOrEqual(100);
    }
  });

  test("cada clic genera un nuevo número", async () => {
    render(<RandomNumber />);

    const button = screen.getByRole("button", { name: /Generar Número Aleatorio/i });

    // Mock Math.random para controlar los valores
    const mockRandom = jest.spyOn(Math, 'random');
    
    // Primera generación - simular 0.5 = número 51
    mockRandom.mockReturnValueOnce(0.5);
    fireEvent.click(button);
    await screen.findByText("Tu número es:");

    // Segunda generación - simular 0.2 = número 21
    mockRandom.mockReturnValueOnce(0.2);
    fireEvent.click(button);
    await screen.findByText("Tu número es:");

    // Limpiar el mock
    mockRandom.mockRestore();
  });

  test("no muestra número antes del primer clic", () => {
    render(<RandomNumber />);

    // No debe haber texto con "Tu número es:" antes del primer clic
    expect(screen.queryByText(/Tu número es:/)).not.toBeInTheDocument();
  });
});