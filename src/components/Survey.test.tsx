import { render, screen, fireEvent } from "@testing-library/react";
import Survey from "./Survey";

describe("Survey", () => {
  test("se renderizan las 5 opciones de estrellas", () => {
    // 1. Renderizar el componente
    render(<Survey />);

    // 2. Verificar que existen los 5 radio buttons
    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(5);

    // 3. Verificar que cada opción tiene el valor correcto en los radio buttons
    expect(radioButtons[0]).toHaveAttribute("value", "1");
    expect(radioButtons[1]).toHaveAttribute("value", "2");
    expect(radioButtons[2]).toHaveAttribute("value", "3");
    expect(radioButtons[3]).toHaveAttribute("value", "4");
    expect(radioButtons[4]).toHaveAttribute("value", "5");
  });

  test("al seleccionar un valor, se refleja en el estado", () => {
    render(<Survey />);

    // Obtener el radio button de 3 estrellas
    const threeStarRadio = screen.getByRole("radio", { name: /3 estrellas/ });

    // Hacer clic en el radio button
    fireEvent.click(threeStarRadio);

    // Verificar que está seleccionado
    expect(threeStarRadio).toBeChecked();

    // Verificar que los otros no están seleccionados
    const oneStarRadio = screen.getByRole("radio", { name: /1 estrella/ });
    const fiveStarRadio = screen.getByRole("radio", { name: /5 estrellas/ });
    expect(oneStarRadio).not.toBeChecked();
    expect(fiveStarRadio).not.toBeChecked();
  });

  test("al enviar, aparece un mensaje de confirmación con la puntuación", () => {
    render(<Survey />);

    // 1. Seleccionar 4 estrellas
    const fourStarRadio = screen.getByRole("radio", { name: /4 estrellas/ });
    fireEvent.click(fourStarRadio);

    // 2. Hacer clic en enviar (botón ahora dice "Enviar Encuesta")
    const submitButton = screen.getByRole("button", { name: /Enviar Encuesta/i });
    fireEvent.click(submitButton);

    // 3. Verificar que aparece el mensaje de confirmación
    expect(screen.getByText("¡Gracias por tu feedback!")).toBeInTheDocument();
    // Verificar que aparece el número 4 y las 4 estrellas
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && content.includes('Has calificado con') && content.includes('4');
    })).toBeInTheDocument();
    expect(screen.getByText("⭐⭐⭐⭐")).toBeInTheDocument();
  });

  test("el botón enviar está deshabilitado si no se selecciona ninguna opción", () => {
    render(<Survey />);

    const submitButton = screen.getByRole("button", { name: /Selecciona una calificación/i });

    // El botón debe estar deshabilitado inicialmente
    expect(submitButton).toBeDisabled();
  });

  test("el botón enviar se habilita cuando se selecciona una opción", () => {
    render(<Survey />);

    const disabledButton = screen.getByRole("button", { name: /Selecciona una calificación/i });
    const twoStarRadio = screen.getByRole("radio", { name: /2 estrellas/ });

    // Inicialmente deshabilitado
    expect(disabledButton).toBeDisabled();

    // Seleccionar una opción
    fireEvent.click(twoStarRadio);

    // Ahora debe estar habilitado y cambió el texto
    const enabledButton = screen.getByRole("button", { name: /Enviar Encuesta/i });
    expect(enabledButton).toBeEnabled();
  });

  test("puede realizar una nueva encuesta después de enviar", () => {
    render(<Survey />);

    // 1. Completar encuesta
    const threeStarRadio = screen.getByRole("radio", { name: /3 estrellas/ });
    fireEvent.click(threeStarRadio);

    const submitButton = screen.getByRole("button", { name: /Enviar Encuesta/i });
    fireEvent.click(submitButton);

    // 2. Hacer clic en "Nueva Encuesta"
    const newSurveyButton = screen.getByRole("button", { name: /Nueva Encuesta/i });
    fireEvent.click(newSurveyButton);

    // 3. Verificar que volvió a la vista inicial
    expect(screen.getByText("¿Qué tan satisfecho estás con nuestro servicio?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Selecciona una calificación/i })).toBeDisabled();
  });
});