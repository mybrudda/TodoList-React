import {
  AppBar,
  Button,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React, { useRef, useState } from "react";

function TodoList() {
  const [todo, setTodo] = useState({ desc: "", date: "", priority: "" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();
  const [tabValue, setTabValue] = useState(0);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ desc: "", date: "", priority: "" });
  };

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (_, index) =>
            index !== parseInt(gridRef.current.getSelectedNodes()[0].id)
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  const handleClear = () => {
    setTodos([]);
  };

  const columns = [
    { headerName: "Description", field: "desc", sortable: true },
    { headerName: "Date", field: "date", sortable: true },
    {
      headerName: "Priority",
      field: "priority",
      sortable: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ];

  return (
    <Container>
      <AppBar position="static">
        <Tabs
          value={tabValue}
          onChange={(event, newValue) => setTabValue(newValue)}
        >
          <Tab label="Home" />
          <Tab label="Todos" />
        </Tabs>
      </AppBar>
      <Container>
        {tabValue === 0 && (
          <Typography variant="h5">Welcome to Home!</Typography>
        )}
        {tabValue === 1 && (
          <div className="info">
            <Stack spacing={2} direction="column">
              <Typography variant="h5">Add todo:</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <TextField
                    label="Description"
                    variant="outlined"
                    name="desc"
                    onChange={handleChange}
                    value={todo.desc}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Date"
                    variant="outlined"
                    name="date"
                    onChange={handleChange}
                    value={todo.date}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Priority"
                    variant="outlined"
                    name="priority"
                    onChange={handleChange}
                    value={todo.priority}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={addTodo}>
                    Add
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleDelete}>
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClear}>
                    Clear
                  </Button>
                </Grid>
              </Grid>
            </Stack>
            <div style={{ display: "grid", placeItems: "center" }}>
              <div
                className="ag-theme-material"
                style={{
                  height: "500px",
                  width: "600px",
                  margin: "20px auto 0",
                }}
              >
                <AgGridReact
                  rowSelection="single"
                  ref={gridRef}
                  onGridReady={(params) => (gridRef.current = params.api)}
                  animateRows={true}
                  columnDefs={columns}
                  rowData={todos}
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
}

export default TodoList;
