import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "../TodoForm";

describe("TodoForm Component", () => {
  // Happy path tests
  it("renderiza el formulario correctamente", () => {
    // Prepare: Mock de la función de añadir tarea
    const mockAddTodo = jest.fn();

    // Execute: Renderizar el componente
    render(<TodoForm onAddTodo={mockAddTodo} />);

    // Validate: Verificar que los elementos del formulario existen
    expect(screen.getByTestId("todo-form")).toBeInTheDocument();
    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("todo-submit")).toBeInTheDocument();
    expect(screen.getByTestId("todo-submit")).toBeDisabled(); // Botón deshabilitado inicialmente
  });

  it("actualiza el valor del input cuando el usuario escribe", () => {
    // Prepare: Mock de la función de añadir tarea
    const mockAddTodo = jest.fn();

    // Execute: Renderizar el componente y escribir en el input
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Nueva tarea" } });

    // Validate: Verificar que el valor del input ha cambiado
    expect(input).toHaveValue("Nueva tarea");
    expect(screen.getByTestId("todo-submit")).not.toBeDisabled(); // Botón habilitado
  });

  it("llama a onAddTodo con el texto correcto al enviar el formulario", () => {
    // Prepare: Mock de la función de añadir tarea
    const mockAddTodo = jest.fn();

    // Execute: Renderizar el componente, escribir en el input y enviar el formulario
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "Nueva tarea" } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    // Validate: Verificar que se llamó a la función con el texto correcto
    expect(mockAddTodo).toHaveBeenCalledWith("Nueva tarea");
    expect(input).toHaveValue(""); // El input se limpia después de enviar
  });

  // Unhappy path tests
  it("no llama a onAddTodo cuando el texto está vacío", () => {
    // Prepare: Mock de la función de añadir tarea
    const mockAddTodo = jest.fn();

    // Execute: Renderizar el componente y enviar el formulario con texto vacío
    render(<TodoForm onAddTodo={mockAddTodo} />);
    fireEvent.submit(screen.getByTestId("todo-form"));

    // Validate: Verificar que no se llamó a la función
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  it("no llama a onAddTodo cuando el texto solo contiene espacios", () => {
    // Prepare: Mock de la función de añadir tarea
    const mockAddTodo = jest.fn();

    // Execute: Renderizar el componente, escribir espacios y enviar
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    // Validate: Verificar que no se llamó a la función
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  // EJERCICIO 2: Completa el siguiente test para verificar que el componente
  // maneja correctamente la entrada de texto con espacios al inicio o final
  it("llama a onAddTodo con el texto recortado (sin espacios al inicio/final)", () => {
    const mockAddTodo = jest.fn();

    // Execute: Renderizar el componente, escribir texto con espacios y enviar el formulario
    render(<TodoForm onAddTodo={mockAddTodo} />);
    const input = screen.getByTestId("todo-input");
    fireEvent.change(input, { target: { value: "  Texto con espacios  " } });
    fireEvent.submit(screen.getByTestId("todo-form"));

    // Validate: Verificar que el texto se recorta correctamente antes de llamar a onAddTodo
    expect(mockAddTodo).toHaveBeenCalledWith("Texto con espacios");
    expect(input).toHaveValue("");
  });
});
