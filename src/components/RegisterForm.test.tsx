import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "./RegisterForm";

describe("RegisterForm", () => {
  test("el botón está deshabilitado si los campos están vacíos", () => {
    // 1. Renderizar el componente
    render(<RegisterForm />);

    // 2. Obtener el botón de registro (ahora tiene texto dinámico)
    const registerButton = screen.getByRole("button", { name: /Completa los campos/i });

    // 3. Verificar que está deshabilitado
    expect(registerButton).toBeDisabled();
  });

  test("el botón está deshabilitado si solo el nombre está completo", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const registerButton = screen.getByRole("button", { name: /Completa los campos/i });

    

    // Llenar solo el nombre
    fireEvent.change(nameInput, { target: { value: "Juan Pérez" } });

    // El botón debe seguir deshabilitado
    expect(registerButton).toBeDisabled();
  });

  test("el botón está deshabilitado si solo el email está completo", () => {
    render(<RegisterForm />);

    const emailInput = screen.getByPlaceholderText("Ingresa tu email");
    const registerButton = screen.getByRole("button", { name: /Completa los campos/i });

    // Llenar solo el email
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });

    // El botón debe seguir deshabilitado
    expect(registerButton).toBeDisabled();
  });

  test("al completar los campos, se habilita el botón", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const emailInput = screen.getByPlaceholderText("Ingresa tu email");
    
    // Completar ambos campos
    fireEvent.change(nameInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(emailInput, { target: { value: "juan@example.com" } });

    // El botón debe estar habilitado y ahora dice "Crear Cuenta"
    const createButton = screen.getByRole("button", { name: /Crear Cuenta/i });
    expect(createButton).toBeEnabled();
  });

  test("no se habilita el botón con espacios en blanco", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const emailInput = screen.getByPlaceholderText("Ingresa tu email");
    const registerButton = screen.getByRole("button", { name: /Completa los campos/i });

    // Llenar con solo espacios
    fireEvent.change(nameInput, { target: { value: "   " } });
    fireEvent.change(emailInput, { target: { value: "  " } });

    // El botón debe seguir deshabilitado
    expect(registerButton).toBeDisabled();
  });

  test("al hacer submit, se limpia el formulario y aparece mensaje de confirmación", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const emailInput = screen.getByPlaceholderText("Ingresa tu email");

    // 1. Completar el formulario
    fireEvent.change(nameInput, { target: { value: "Ana García" } });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });

    // 2. Enviar el formulario (botón ahora dice "Crear Cuenta")
    const createButton = screen.getByRole("button", { name: /Crear Cuenta/i });
    fireEvent.click(createButton);

    // 3. Verificar que aparece el mensaje de confirmación
    expect(screen.getByText("¡Registro Exitoso!")).toBeInTheDocument();
    // Buscar las partes del mensaje por separado ya que están en líneas diferentes
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && content.includes('Te has registrado correctamente');
    })).toBeInTheDocument();

    // 4. Verificar que el formulario ya no está visible
    expect(screen.queryByPlaceholderText("Ingresa tu nombre")).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Ingresa tu email")).not.toBeInTheDocument();
  });

  test("puede realizar un nuevo registro después de enviar", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const emailInput = screen.getByPlaceholderText("Ingresa tu email");

    // 1. Completar y enviar formulario
    fireEvent.change(nameInput, { target: { value: "Carlos López" } });
    fireEvent.change(emailInput, { target: { value: "carlos@example.com" } });
    
    const createButton = screen.getByRole("button", { name: /Crear Cuenta/i });
    fireEvent.click(createButton);

    // 2. Hacer clic en "Nuevo Registro"
    const newRegisterButton = screen.getByRole("button", { name: /Nuevo Registro/i });
    fireEvent.click(newRegisterButton);

    // 3. Verificar que volvió al formulario
    expect(screen.getByPlaceholderText("Ingresa tu nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ingresa tu email")).toBeInTheDocument();

    // 4. Verificar que el formulario está limpio y el botón deshabilitado
    const newNameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const newEmailInput = screen.getByPlaceholderText("Ingresa tu email");
    const newSubmitButton = screen.getByRole("button", { name: /Completa los campos/i });

    expect(newNameInput).toHaveValue("");
    expect(newEmailInput).toHaveValue("");
    expect(newSubmitButton).toBeDisabled();
  });

  test("envía el formulario al presionar Enter", () => {
    render(<RegisterForm />);

    const nameInput = screen.getByPlaceholderText("Ingresa tu nombre");
    const emailInput = screen.getByPlaceholderText("Ingresa tu email");

    // Completar ambos campos
    fireEvent.change(nameInput, { target: { value: "María González" } });
    fireEvent.change(emailInput, { target: { value: "maria@example.com" } });

    // Obtener el formulario y hacer submit
    const form = nameInput.closest('form')!;
    fireEvent.submit(form);

    // Verificar que se envió el formulario
    expect(screen.getByText("¡Registro Exitoso!")).toBeInTheDocument();
  });
});