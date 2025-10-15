//src\components\MultiplicationTable.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import MultiplicationTable from "./MultiplicationTable";

describe("MultiplicationTable", () => {
  test("muestra la tabla de multiplicar cuando se genera", () => {
    // 1. Renderizar el componente
    render(<MultiplicationTable />);

    // 2. Obtener el input y el botón
    const input = screen.getByPlaceholderText("Número");
    const button = screen.getByRole("button", { name: /Generar/i });

    // 3. Simular escribir el número 5 en el input
    fireEvent.change(input, { target: { value: "5" } });

    // 4. Hacer clic en el botón "Generar"
    fireEvent.click(button);

een.getByText("5 × 10 = 50")).toBeInTheDocument();
  });

  test("no genera tabla si el input está vací", () => {
    render(<MultiplicationTable />);
    const button = screen.getByRole("button", { name: /Generar/i });

    // Clic sin haber ingresado número
    fireEvent.click(button);

    // La tabla no debe mostrarse
    expect(screen.queryByText(/Tabla del/)).toBeNull();
  });
});
