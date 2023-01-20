import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Payments() {
  const { id } = useParams();

  return (
    <div>
      <h1>Productos</h1>
      <p>varios xd</p>
    </div>
  );
}

export default Payments;
