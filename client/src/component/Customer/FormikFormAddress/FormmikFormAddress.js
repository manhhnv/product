import React from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";

import "./FormAddress.scss";

const validate = (value) => {
  const errors = {};

  if (!value.address) {
    errors.address = "required";
  }

  if (!value.city) {
    errors.city = "required";
  }

  if (!value.country) {
    errors.country = "required";
  }
  return errors;
};

function FormikFormAddress({ addressFrom, onSetAddressForm }) {
  const formik = useFormik({
    initialValues: addressFrom,
    validate,

    onSubmit: (values) => {
      onSetAddressForm(values);
    },
  });

  return (
    <form className="form-address">
      <div className="form-address-group">
        <label htmlFor="address">Address :</label>
        <input
          id="address"
          name="address"
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.address ? "form-address-outline" : ""}
          value={formik.values.address}
        />
      </div>
      {formik.errors.address ? <div className='error-message'>{ formik.errors.address}</div> : null}
      <div className="form-address-group">
        <label htmlFor="city">City :</label>
        <input
          id="city"
          name="city"
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={formik.errors.city ? "form-address-outline" : ""}
          value={formik.values.city}
        />
      </div>
      {formik.errors.city ? <div className='error-message'>{formik.errors.city}</div> : null}
      <div className="form-address-group">
        <label htmlFor="country">Country :</label>
        <input
          id="country"
          name="country"
          type={"text"}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.country}
          className={formik.errors.country ? "form-address-outline" : ""}
        />
      </div>
      {formik.errors.city ? <div className='error-message'>{formik.errors.city}</div> : null}
      <Button variant="success" className= 'my-2 w-100' onClick={formik.handleSubmit}>Xac nhan</Button>
    </form>
  );
}

export default FormikFormAddress;
