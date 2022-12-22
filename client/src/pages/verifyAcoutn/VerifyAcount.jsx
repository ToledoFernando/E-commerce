import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { verifiAcoutnBT } from "../../store/action";

function VerifyAcount() {
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifiAcoutnBT(token)).then(() => {
      console.log("FIN");
    });
  }, []);

  return <div>{token}</div>;
}

export default VerifyAcount;
