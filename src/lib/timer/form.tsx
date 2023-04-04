import { Field, Form, Formik, FormikHelpers } from 'formik';

import { useTimers, TimerFields } from '@/lib/timer';

type FormErrors = {
  title?: string;
  date?: string;
};

export const AddTimerForm = () => {
  const { dispatch } = useTimers();

  const validateForm = (values: TimerFields) => {
    const errors: FormErrors = {};

    if (!values.title) {
      errors.title = 'Required';
    }

    if (!values.date) {
      errors.date = 'Required';
    }

    if (Date.parse(values.date) < Date.now()) {
      errors.date = 'Enter correct date';
    }

    return errors;
  };

  const inputWrapperClasses = 'w-72 mx-auto my-3';
  const inputErrorClasses = 'text-sm text-nordred';

  const onFormSubmit = (
    values: TimerFields,
    { resetForm }: FormikHelpers<TimerFields>
  ) => {
    dispatch({ type: 'create', ...values });
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        title: '',
        date: '',
      }}
      onSubmit={onFormSubmit}
      validate={validateForm}
    >
      {({ errors, touched }) => (
        <Form className="my-8">
          <div className={inputWrapperClasses}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" placeholder="Title" />
            {errors.title && touched.title && (
              <div className={inputErrorClasses}>{errors.title}</div>
            )}
          </div>

          <div className={inputWrapperClasses}>
            <label htmlFor="date">Date</label>
            <Field
              id="date"
              name="date"
              placeholder="date"
              type="datetime-local"
            />
            {errors.date && touched.date && (
              <div className={inputErrorClasses}>{errors.date}</div>
            )}
          </div>

          <button type="submit">Add timer</button>
        </Form>
      )}
    </Formik>
  );
};
