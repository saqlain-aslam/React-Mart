import { Formik, Form, Field, ErrorMessage } from "formik";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useNavigate } from "react-router-dom";
import { paymentFormValidation } from "./validations/paymentFormValidation";
paymentFormValidation;

const Payment = () => {
  document.title = "Payment";
  const navigate = useNavigate();

  const initialValues = {
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    localStorage.setItem("Paymentinfo", JSON.stringify(values));
    alert("Congratulations! You ordered Successfully.");
    // console.log('Payment Data:', values);
    navigate("/");
    setSubmitting(false);
    resetForm();
  };

  // if (state) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="min-h-screen space-y-15">
      <Header />

      <div className="max-w-lg mx-auto  p-6 bg-gray-800  rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-200 mb-6">
          Payment Information
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={paymentFormValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-blue-200"
                >
                  Cardholder Name
                </label>
                <Field
                  type="text"
                  name="cardName"
                  id="cardName"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="cardName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-blue-200"
                >
                  Card Number
                </label>
                <Field
                  type="text"
                  name="cardNumber"
                  id="cardNumber"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="cardNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-blue-200"
                  >
                    Expiry (MM/YY)
                  </label>
                  <Field
                    type="text"
                    name="expiry"
                    id="expiry"
                    placeholder="MM/YY"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="expiry"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="w-1/2">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-blue-200"
                  >
                    CVV
                  </label>
                  <Field
                    type="text"
                    name="cvv"
                    id="cvv"
                    className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="cvv"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300 disabled:opacity-50"
              >
                Pay Now
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
