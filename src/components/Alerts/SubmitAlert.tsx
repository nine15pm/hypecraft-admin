"use client"
import React from "react";
import { useState, useEffect } from "react";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const SubmitAlert = (props:{
  alert_type: string;
  header: string;
  msg: string;
  show_time: number;
}) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After X seconds set the show value to false
      setShow(false)
    }, props.show_time)

    return () => {
      clearTimeout(timeId)
    }
  }, []);

  if (!show) {
    return null;
  }

  return (
    props.alert_type === "success" ? <AlertSuccess header="Success" msg={props.msg} />
    : <AlertError header="Error" msg={props.msg} />
  );
};

export default SubmitAlert;
