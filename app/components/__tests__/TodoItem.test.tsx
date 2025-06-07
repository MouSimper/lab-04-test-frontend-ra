import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../TodoItem";

// Prepare, Execute and Validate pattern
describe("TodoItem Component", () => {
  // Happy path tests
  it("renderiza correctamente una tarea no completada", () => {
    // Prepare: configuración del test con una tarea no completada
    const mockTodo = {
      id: 1,
      text: "Comprar leche",
      completed: false,
    };
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: renderizar el componente con las props
    render(
      <TodoItem
        id={mockTodo.id}
        text={mockTodo.text}
        completed={mockTodo.completed}
        onToggle={mockToggle}
        onDelete={mockDelete}
        dataTestId={`todo-item-${mockTodo.id}`}
      />
    );

    // Validate: verificar que el texto y el checkbox se muestran correctamente
    expect(screen.getByTestId("todo-item-1")).toHaveTextContent(
      "Comprar leche"
    );
    expect(screen.getByTestId("todo-checkbox")).not.toBeChecked();
    expect(screen.getByTestId("todo-item-1")).not.toHaveClass("line-through");
  });

  it("renderiza correctamente una tarea completada", () => {
    // Prepare: configuración del test con una tarea completada
    const mockTodo = {
      id: 1,
      text: "Comprar leche",
      completed: true,
    };
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: renderizar el componente
    render(
      <TodoItem
        id={mockTodo.id}
        text={mockTodo.text}
        completed={mockTodo.completed}
        onToggle={mockToggle}
        onDelete={mockDelete}
        dataTestId={`todo-item-${mockTodo.id}`}
      />
    );

    // Validate: verificar que el texto aparece tachado y el checkbox marcado
    expect(screen.getByTestId("todo-checkbox")).toBeChecked();
    expect(screen.getByTestId("todo-item-1")).toHaveClass("line-through");
  });

  it("llama a onToggle cuando se hace clic en el checkbox", () => {
    // Prepare: configuración del test y mocks
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: renderizar y hacer clic en el checkbox
    render(
      <TodoItem
        id={1}
        text="Test todo"
        completed={false}
        onToggle={mockToggle}
        onDelete={mockDelete}
        dataTestId={`todo-item-1`}
      />
    );

    fireEvent.click(screen.getByTestId("todo-checkbox"));

    // Validate: verificar que se llamó al mock con el ID correcto
    expect(mockToggle).toHaveBeenCalledWith(1);
  });

  it("llama a onDelete cuando se hace clic en el botón de eliminar", () => {
    // Prepare: configuración del test y mocks
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: renderizar y hacer clic en el botón de eliminar
    render(
      <TodoItem
        id={1}
        text="Test todo"
        completed={false}
        onToggle={mockToggle}
        onDelete={mockDelete}
      />
    );

    fireEvent.click(screen.getByTestId("todo-delete-button"));

    // Validate: verificar que se llamó al mock con el ID correcto
    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  // EJERCICIO 1: Completa el siguiente test para verificar que el componente
  // muestra correctamente el texto de una tarea con caracteres especiales
  it("renderiza correctamente una tarea con caracteres especiales", () => {
    const mockTodo = {
      id: 1,
      text: 'Tarea con caracteres especiales: & < > "',
      completed: false,
    };
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();

    // Execute: renderizar el componente con la tarea
    render(
      <TodoItem
        id={mockTodo.id}
        text={mockTodo.text}
        completed={mockTodo.completed}
        onToggle={mockToggle}
        onDelete={mockDelete}
        dataTestId={`todo-item-${mockTodo.id}`}
      />
    );

    // Validate: verificar que el texto se muestra tal cual con los caracteres especiales
    expect(screen.getByTestId(`todo-item-${mockTodo.id}`)).toHaveTextContent(
      mockTodo.text
    );
    expect(screen.getByTestId('todo-checkbox')).not.toBeChecked();
  });
});
