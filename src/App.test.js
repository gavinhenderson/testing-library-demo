import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe.skip("Ignore", () => {
  it("renders without throwing", () => {
    render(<App />);
  });

  it("show a warning box when there are no todos", () => {
    // Act
    render(<App />);

    // Assert
    const warning = screen.queryByText(
      `You haven't added anything to your todo list. Add a task by filling out the box above and clicking the '+' icon.`
    );
    expect(warning).toBeInTheDocument();
  });

  it("has any empty input box when initially rendered", () => {
    // Act
    render(<App></App>);

    // Assert
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
  });

  it("disabled the add button when there is no text in the input", () => {
    // Act
    render(<App></App>);

    // Assert
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("enables the button once the user enters text", () => {
    // Act
    render(<App></App>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "hello");

    // Assert
    const button = screen.getByRole("button");
    expect(button).not.toBeDisabled();
  });

  it.skip("clears the input and redisables it once you press add", () => {
    // Act
    render(<App></App>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "hello");
    const button = screen.getByRole("button");
    button.click();

    // Assert
    expect(input).toHaveValue("");
    expect(button).toBeDisabled();
  });

  it("hides the warning once you have added a todo", () => {
    // Act
    render(<App></App>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "hello");
    const button = screen.getByRole("button");
    button.click();

    // Assert
    const warning = screen.queryByText(
      `You haven't added anything to your todo list. Add a task by filling out the box above and clicking the '+' icon.`
    );
    expect(warning).not.toBeInTheDocument();
  });

  it("shows the new todo in the list", () => {
    // Arrange
    const TODO_TEXT = "welcome to the brown bag";

    // Act
    render(<App></App>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, TODO_TEXT);
    const button = screen.getByRole("button");
    button.click();

    // Assert
    const todoItem = screen.queryByText(TODO_TEXT);
    expect(todoItem).toBeInTheDocument();
  });

  it("shows multiple items in the todo list", () => {
    // Arrange
    const TODO_TEXT_FIRST = "welcome to the brown bag";
    const TODO_TEXT_SECOND = "Another one";

    // Act
    render(<App></App>);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(input, TODO_TEXT_FIRST);
    button.click();
    userEvent.clear(input);
    userEvent.type(input, TODO_TEXT_SECOND);
    button.click();

    // Assert
    const firstTodoItem = screen.queryByText(TODO_TEXT_FIRST);
    const secondTodoItem = screen.queryByText(TODO_TEXT_SECOND);
    expect(firstTodoItem).toBeInTheDocument();
    expect(secondTodoItem).toBeInTheDocument();
  });

  it.skip("removes item from the todo list one you click the trash can", () => {
    // Arrange
    const TODO_TEXT_FIRST = "welcome to the brown bag";

    // Act
    render(<App></App>);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    userEvent.type(input, TODO_TEXT_FIRST);
    button.click();

    // Assert
    let firstTodoItem = screen.queryByText(TODO_TEXT_FIRST);
    expect(firstTodoItem).toBeInTheDocument();

    // Act
    const deleteButton = screen.getByRole("button", {
      name: `Delete item: ${TODO_TEXT_FIRST}`,
    });
    deleteButton.click();

    // Assert
    firstTodoItem = screen.queryByText(TODO_TEXT_FIRST);
    expect(firstTodoItem).not.toBeInTheDocument();
  });
});
