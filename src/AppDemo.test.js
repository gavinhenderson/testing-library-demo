import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { ExpansionPanelActions } from "@material-ui/core";

const WARNING_MESSAGE = `You haven't added anything to your todo list. Add a task by filling out the box above and clicking the '+' icon.`;

describe.only("Demo", () => {
  it("renders without throwing", () => {
    render(<App></App>);
  });

  it("show a warning box when there are no todos", () => {
    render(<App></App>);

    const warningMessage = screen.queryByText(WARNING_MESSAGE);
    expect(warningMessage).toBeInTheDocument();
  });

  it("has any empty input box when initially rendered", () => {
    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("");
  });

  it("disabled the add button when there is no text in the input", () => {
    render(<App></App>);

    const addButton = screen.getByRole("button", { text: "Add" });
    expect(addButton).toBeDisabled();
  });

  it("enables the button once the user enters text", () => {
    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    userEvent.type(inputField, "type this");

    const addButton = screen.getByRole("button", { text: "Add" });
    expect(addButton).not.toBeDisabled();
  });

  it("clears the input and redisables it once you press add", () => {
    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    userEvent.type(inputField, "type this");
    const addButton = screen.getByRole("button", { text: "Add" });
    addButton.click();

    expect(inputField).toHaveValue("");
    expect(addButton).toBeDisabled();
  });

  it("hides the warning once you have added a todo", () => {
    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    userEvent.type(inputField, "type this");
    const addButton = screen.getByRole("button", { text: "Add" });
    addButton.click();

    const warningMessage = screen.queryByText(WARNING_MESSAGE);
    expect(warningMessage).not.toBeInTheDocument();
  });

  it("shows the new todo in the list", () => {
    // Arrange
    const TODO_TEXT = "welcome to the brown bag";

    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    userEvent.type(inputField, TODO_TEXT);
    const addButton = screen.getByRole("button", { text: "Add" });
    addButton.click();

    const todo = screen.queryByText(TODO_TEXT);
    expect(todo).toBeInTheDocument();
  });

  it("shows multiple items in the todo list", () => {
    // Arrange
    const TODO_TEXT_FIRST = "welcome to the brown bag";
    const TODO_TEXT_SECOND = "Another one";

    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    userEvent.type(inputField, TODO_TEXT_FIRST);
    const addButton = screen.getByRole("button", { text: "Add" });
    addButton.click();
    userEvent.type(inputField, TODO_TEXT_SECOND);
    addButton.click();

    const firstTodo = screen.queryByText(TODO_TEXT_FIRST);
    const secondTodo = screen.queryByText(TODO_TEXT_SECOND);

    expect(firstTodo).toBeInTheDocument();
    expect(secondTodo).toBeInTheDocument();
  });

  it("removes item from the todo list one you click the trash can", () => {
    // Arrange
    const TODO_TEXT_FIRST = "welcome to the brown bag";
    const TODO_TEXT_SECOND = "Another one";

    render(<App></App>);

    const inputField = screen.getByRole("textbox");
    userEvent.type(inputField, TODO_TEXT_FIRST);
    const addButton = screen.getByRole("button", { text: "Add" });
    addButton.click();
    userEvent.type(inputField, TODO_TEXT_SECOND);
    addButton.click();

    const deleteButton = screen.getByRole("button", {
      name: `Delete item: ${TODO_TEXT_FIRST}`,
    });
    deleteButton.click();

    const oldTodo = screen.queryByText(TODO_TEXT_FIRST);
    expect(oldTodo).not.toBeInTheDocument();
  });
});
