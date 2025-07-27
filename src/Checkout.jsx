import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { useNavigate } from 'react-router-dom';

function Checkout() {
  document.title = "Delivery";
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string()
      .matches(/^[0-9]{11}$/, 'Phone number must be 11 digits')
      .required('Phone number is required'),
    address: Yup.string().min(5, 'Address is too short').required('Address is required'),
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    localStorage.setItem('deliveryInfo', JSON.stringify(values));
    // alert('Delivery info saved!');
    setSubmitting(false);
    resetForm();
    navigate("/payment");

  };

  return (
    <div className="min-h-screen ">
      <Header />

      <div className="max-w-md mx-auto my-10 p-6 bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-200">Delivery Information</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 my-8">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-blue-200">First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-blue-200">Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-blue-200">Phone Number</label>
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-blue-200">Address</label>
                <Field
                  as="textarea"
                  name="address"
                  id="address"
                  rows="3"
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300 disabled:opacity-50"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
