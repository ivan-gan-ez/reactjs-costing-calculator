import { Button } from "@mui/material";

import { useState } from "react";

const CalculatorButton = (props) => {
  const {
    text,
    total,
    setTotal,
    operator,
    setOperator,
    display,
    setDisplay,
    show,
    setShow,
    handleClear,
    mode,
  } = props;

  const handleConcat = () => {
    if ((display === "" || display === "0" || display === 0) && text !== ".") {
      setDisplay(text.toString());
      setShow("display");
    } else if (
      text !== "." ||
      (text === "." && display !== "" && !display.match(/[.]/))
    ) {
      setDisplay(display + text.toString());
      setShow("display");
    } else if (text === "." && display === "") {
      setDisplay("0" + text.toString());
      setShow("display");
    }
  };

  const handleBackspace = () => {
    if (display.length === 1) {
      setDisplay("");
      setShow("display");
    } else {
      setDisplay(display.slice(0, -1));
      setShow("display");
    }
  };

  const handleOperation = (text) => {
    handleEqual(operator);
    setOperator(text);
  };

  const handleEqual = (operator) => {
    if (display !== "") {
      if (operator === "") {
        if (show === "total") {
          setTotal(Number.parseFloat(total).toFixed(2));
          localStorage.setItem(
            "value",
            JSON.stringify(Number.parseFloat(total).toFixed(2))
          );
        } else if (show === "display") {
          setTotal(Number.parseFloat(display).toFixed(2));
          localStorage.setItem(
            "value",
            JSON.stringify(Number.parseFloat(display).toFixed(2))
          );
        }
      }

      if (operator === "+") {
        setTotal((Number(total) + Number.parseFloat(display)).toFixed(2));
        localStorage.setItem(
          "value",
          JSON.stringify(
            (Number(total) + Number.parseFloat(display)).toFixed(2)
          )
        );
      }

      if (operator === "-") {
        setTotal((Number(total) - Number.parseFloat(display)).toFixed(2));
        localStorage.setItem(
          "value",
          JSON.stringify(
            (Number(total) - Number.parseFloat(display)).toFixed(2)
          )
        );
      }

      if (operator === "×") {
        setTotal((Number(total) * Number.parseFloat(display)).toFixed(2));
        localStorage.setItem(
          "value",
          JSON.stringify(
            (Number(total) * Number.parseFloat(display)).toFixed(2)
          )
        );
      }

      if (operator === "÷") {
        setTotal((Number(total) / Number.parseFloat(display)).toFixed(2));
        localStorage.setItem(
          "value",
          JSON.stringify(
            (Number(total) / Number.parseFloat(display)).toFixed(2)
          )
        );
      }

      setDisplay("");
      setShow("total");
      setOperator("");
    }
  };

  return (
    <Button
      sx={{ p: 2, fontSize: "1.5rem" }}
      variant="contained"
      color={
        typeof text === "number" || text === "."
          ? mode === "dark"
            ? "primary"
            : "secondary"
          : text === "="
          ? "red"
          : operator === text
          ? mode === "dark"
            ? "primary"
            : "secondary"
          : mode === "dark"
          ? "secondary"
          : "primary"
      }
      fullWidth
      onClick={
        typeof text === "number" || text === "."
          ? handleConcat
          : text === "+" || text === "-" || text === "×" || text === "÷"
          ? () => handleOperation(text)
          : text === "Reset"
          ? handleClear
          : text === "←"
          ? handleBackspace
          : () => handleEqual(operator)
      }
    >
      {text}
    </Button>
  );
};

export default CalculatorButton;
