import RegisterForm from "../components/RegisterForm";

export default function RegisterFormView() {
  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Formulario de Registro
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}