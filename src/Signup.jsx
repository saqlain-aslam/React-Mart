import { useAuth } from "./createContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Navigate } from "react-router-dom";

const Signup = () => {
  const { signup, token, isLoading } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    contactNumber: Yup.string()
      .matches(/^\d{11}$/, "Contact Number must be 11 digits")
      .required("Contact Number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const token = "Token123";
    signup(values, token);
    setSubmitting(false);
    resetForm();
  };

  if (isLoading) return <p className="text-center text-blue-300">Loading...</p>;
  if (!isLoading && token) return <Navigate to="/checkout" />;

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-200">Sign Up</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="firstName"
                placeholder="First Name"
                className="border p-2 w-full rounded-xl"
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="border p-2 w-full rounded-xl"
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                className="border p-2 w-full rounded-xl"
              />
              <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 w-full rounded-xl"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="border p-2 w-full rounded-xl"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-400 text-white px-4 py-2 w-full rounded-xl hover:bg-blue-500 transition duration-300 disabled:opacity-50"
            >
              Sign Up
            </button>

            <div className="text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-300 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
