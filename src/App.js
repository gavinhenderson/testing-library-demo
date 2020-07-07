import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  TextField,
  Fab,
  List,
  ListItem,
  IconButton,
  Card,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import "./App.css";

const useStyles = makeStyles({
  root: { width: "100%" },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "1rem !important",
  },
  grow: {
    flexGrow: 1,
    marginRight: "1rem",
  },
  alert: {
    marginTop: "1rem",
  },
});

// const DEFAULT_LIST = [
//   {
//     id: uuidv4(),
//     text: "Write some tests",
//   },
//   {
//     id: uuidv4(),
//     text: "Learn how to write code",
//   },
// ];

const DEFAULT_LIST = [];

function App() {
  const [todoList, setTodoList] = useState(DEFAULT_LIST);
  const [inputValue, setInputValue] = useState("");

  const classes = useStyles();

  const addTodo = (todoText) => {
    setTodoList([...todoList, { id: uuidv4(), text: todoText }]);
  };

  const removeTodo = (id) => {
    const filteredList = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredList);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTodo(inputValue);
            setInputValue("");
          }}
        >
          <Card className={classes.root}>
            <CardContent className={classes.flex}>
              <TextField
                className={classes.grow}
                value={inputValue}
                onChange={({ target: { value } }) => setInputValue(value)}
                type="text"
                placeholder="eg. really important task"
                label="New todo"
              ></TextField>
              <Fab
                disabled={inputValue === ""}
                type="submit"
                color="primary"
                aria-label="add"
                size="medium"
              >
                <AddIcon />
              </Fab>
            </CardContent>
          </Card>
        </form>
      </div>
      {todoList.length === 0 && (
        <Alert severity="warning" className={classes.alert}>
          <Typography>
            You haven't added anything to your todo list. Add a task by filling
            out the box above and clicking the '+' icon.
          </Typography>
        </Alert>
      )}
      <List>
        {todoList.map(({ text, id }, index) => (
          <ListItem key={id} disableGutters>
            <Card className={classes.root}>
              <CardContent className={classes.flex}>
                <Typography className={classes.grow}>{text}</Typography>
                <IconButton
                  aria-label={`Delete item: ${text}`}
                  onClick={() => removeTodo(id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
