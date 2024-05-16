import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import { setCurrency, setPending } from "./features/paypalSlice";
import { setCurrency, setPending } from "features/paypalSlice";
import { followedProgram } from "features/program";

const Checkout = ({ price, id, setSubscribed, setShow }) => {
  const dispatch = useDispatch();
  const options = useSelector((state) => state.paypal.options);
  const isPending = useSelector((state) => state.paypal.isPending);

  const [{ isPending: scriptPending }, scriptDispatch] =
    usePayPalScriptReducer();

  useEffect(() => {
    dispatch(setPending(scriptPending));
  }, [scriptPending, dispatch]);

  const handleCurrencyChange = ({ target: { value } }) => {
    dispatch(setCurrency(value));
    scriptDispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price.toString(),
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      const name = details.payer.name.given_name;
      dispatch(followedProgram(id));
      setSubscribed(true);
      setShow(false);
      alert(`Transaction completed by ${name}`);
    });
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <>
          <select value={options.currency} onChange={handleCurrencyChange}>
            <option value="USD">💵 USD</option>
            <option value="EUR">💶 Euro</option>
          </select>
          <PayPalButtons
            // style={{ layout: "vertical" }}
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApproveOrder(data, actions)}
          />
        </>
      )}
    </div>
  );
};

export default Checkout;
