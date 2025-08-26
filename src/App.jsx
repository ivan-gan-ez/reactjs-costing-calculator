import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Checkbox,
  InputAdornment,
  Button,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import dayjs from "dayjs";

import CalculatorButton from "./components/Button";
import { useState, useEffect } from "react";

function App() {
  const valueInLocalStorage = localStorage.getItem("value");
  const SSTInLocalStorage = localStorage.getItem("SST");
  const serviceTaxInLocalStorage = localStorage.getItem("serviceTax");

  const [total, setTotal] = useState(
    valueInLocalStorage ? JSON.parse(valueInLocalStorage) : 0
  );
  const [operator, setOperator] = useState("");
  const [display, setDisplay] = useState("");
  const [show, setShow] = useState(valueInLocalStorage ? "total" : "display");
  const [SST, setSST] = useState(
    SSTInLocalStorage ? JSON.parse(SSTInLocalStorage) : 8
  );
  const [serviceTax, setServiceTax] = useState(
    serviceTaxInLocalStorage ? JSON.parse(serviceTaxInLocalStorage) : 10
  );
  const [SSTAvailable, setSSTAvailable] = useState(false);
  const [serviceTaxAvailable, setserviceTaxAvailable] = useState(false);
  const [mode, setMode] = useState("dark");
  const [clock, setClock] = useState("——/—/— —:—:—");

  const handleClear = () => {
    setTotal(0);
    setOperator("");
    setDisplay("");
    setShow("display");
    setSST(8);
    setServiceTax(10);
    localStorage.setItem("value", JSON.stringify(0));
    localStorage.setItem("SST", JSON.stringify(8));
    localStorage.setItem("serviceTax", JSON.stringify(10));
  };

  const updateSST = (value) => {
    setSST(value);
    localStorage.setItem("SST", JSON.stringify(value));
  };

  const updateServiceTax = (value) => {
    setServiceTax(value);
    localStorage.setItem("serviceTax", JSON.stringify(value));
  };

  function currentTime() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time =
      year +
      "/" +
      month +
      "/" +
      day +
      " " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds;

    setClock(time);
  }

  useEffect(() => {
    setTimeout(() => {
      setClock(currentTime);
    }, 1000);
  });

  return (
    <Box className={mode} sx={{ minHeight: "100vh", height: "100%" }}>
      <Container sx={{ p: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="h4"
            color={mode === "dark" ? "primary" : "secondary"}
            sx={{ mb: 3 }}
          >
            Costing Calculator
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              color={mode === "dark" ? "primary" : "secondary"}
              sx={{ mr: 3 }}
            >
              {clock}
            </Typography>
            <Button
              variant="contained"
              color={mode === "dark" ? "primary" : "yellow"}
              onClick={
                mode === "dark" ? () => setMode("light") : () => setMode("dark")
              }
            >
              {mode === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: mode === "dark" ? "#cccccc" : "#222222",
          }}
        >
          <Typography
            textAlign="right"
            variant="h4"
            color={mode === "dark" ? "secondary" : "primary"}
          >
            {show === "total"
              ? SSTAvailable && serviceTaxAvailable
                ? (total * ((SST + serviceTax + 100) / 100)).toFixed(2)
                : SSTAvailable
                ? (total * ((SST + 100) / 100)).toFixed(2)
                : serviceTaxAvailable
                ? (total * ((serviceTax + 100) / 100)).toFixed(2)
                : total
              : show === "display"
              ? display === ""
                ? 0
                : display
              : "If you're seeing this, there's a bug in your code."}
          </Typography>
        </Box>

        {/*two missing buttons: reset, undo
      also could add the SST and Service Tax stuff here. theyll be input fields with "buttons" next to them to apply their effects*/}

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box
              bgcolor={mode === "dark" ? "#cccccc" : "#bbbbbb"}
              sx={{ p: 1.25, borderRadius: 2, display: "flex" }}
            >
              <TextField
                id="outlined-basic"
                label="SST"
                variant="outlined"
                value={SST}
                onChange={(e) => updateSST(parseFloat(e.target.value))}
                color="secondary"
                disabled={!SSTAvailable}
                type="number"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  },
                }}
              />
              <Checkbox
                color="secondary"
                checked={SSTAvailable}
                onChange={
                  SSTAvailable === false
                    ? () => setSSTAvailable(true)
                    : () => setSSTAvailable(false)
                }
                sx={{ ml: 1, px: 2 }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Box
              bgcolor={mode === "dark" ? "#cccccc" : "#bbbbbb"}
              sx={{ p: 1.25, borderRadius: 2, display: "flex" }}
            >
              <TextField
                id="outlined-basic"
                label="Service Tax"
                variant="outlined"
                value={serviceTax}
                onChange={(e) => updateServiceTax(parseFloat(e.target.value))}
                color="secondary"
                disabled={!serviceTaxAvailable}
                type="number"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  },
                }}
              />
              <Checkbox
                color="secondary"
                checked={serviceTaxAvailable}
                onChange={
                  serviceTaxAvailable === false
                    ? () => setserviceTaxAvailable(true)
                    : () => setserviceTaxAvailable(false)
                }
                sx={{ ml: 1, px: 2 }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <CalculatorButton
              text={"Reset"}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <CalculatorButton
              text={"←"}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>

          <Grid size={3}>
            <CalculatorButton
              text={7}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={8}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={9}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={"÷"}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>

          <Grid size={3}>
            <CalculatorButton
              text={4}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={5}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={6}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={"×"}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>

          <Grid size={3}>
            <CalculatorButton
              text={1}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={2}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={3}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={"-"}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>

          <Grid size={3}>
            <CalculatorButton
              text={0}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={"."}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={"="}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
          <Grid size={3}>
            <CalculatorButton
              text={"+"}
              total={total}
              setTotal={setTotal}
              operator={operator}
              setOperator={setOperator}
              display={display}
              setDisplay={setDisplay}
              show={show}
              setShow={setShow}
              handleClear={handleClear}
              mode={mode}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
