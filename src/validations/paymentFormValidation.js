import * as Yup from "yup";

export const paymentFormValidation = Yup.object({
  cardName: Yup.string().required("Cardholder name is required"),
  cardNumber: Yup.string()
    .matches(/^[0-9]{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry format (MM/YY)")
    .required("Expiry date is required"),
  cvv: Yup.string()
    .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
});
