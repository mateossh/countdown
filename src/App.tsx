import { useEffect, useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import { Timer as ITimer } from './types'
import Timer from './Timer'

interface FormErrors {
  title?: string
  date?: string
}

function App() {
  const [timers, setTimers] = useState<ITimer[]>([]);

  useEffect(() => {
    const timers = localStorage.getItem('timers');

    if (timers) {
      setTimers(JSON.parse(timers));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const validateForm = (values: ITimer) => {
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
  }

  const timersListClasses = 'my-2';
  const formInputWrapperClasses = 'w-full my-3';

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-slate-100">
      <header className="py-4">
        <p>countdown</p>
      </header>

      <div>
        {timers?.length == 0 &&
         <div className={timersListClasses}>No timers created :(</div>}

        {timers?.length > 0 && <ul className={timersListClasses}>
          {timers.map((timer: ITimer, key: number) => (
            <Timer
              key={key}
              title={timer.title}
              date={timer.date}
            />
          ))}
        </ul>}

        <Formik
          initialValues={{
            title: '',
            date: '',
          }}
          onSubmit={(
            values: ITimer,
            { resetForm }: FormikHelpers<ITimer>
          ) => {
            const newTimer: ITimer = values;
            setTimers([...timers, newTimer]);
            resetForm();
          }}
          validate={validateForm}
        >
          {({ errors, touched }) => (
            <Form className="my-8">
              <div className={formInputWrapperClasses}>
                <label
                  htmlFor="title"
                >
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Title"
                />
                {errors.title && touched.title && <div>{errors.title}</div>}
              </div>

              <div className={formInputWrapperClasses}>
                <label
                  htmlFor="date"
                >
                  Date
                </label>
                <Field
                  id="date"
                  name="date"
                  placeholder="date"
                  type="datetime-local"
                />
                {errors.date && touched.date && <div>{errors.date}</div>}
              </div>

              <button type="submit">Add timer</button>
            </Form>
          )}
        </Formik>
      </div>
      <footer className="text-xs text-gray-700">
        <p>
          Made by
          <a
            href="#"
          >
            mateossh
          </a>
        </p>
        <a href="https://github.com/mateossh/countdown2">Source code</a>
      </footer>
    </div>
  )
}

export default App
