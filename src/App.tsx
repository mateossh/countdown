import { useEffect, useState } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'
import './App.css'
import { useForceUpdate } from './hooks'
import { Timer as ITimer } from './types'
import Timer from './Timer'

interface FormErrors {
  title?: string
  date?: string
}

function App() {
  const [timers, setTimers] = useState<ITimer[]>([]);

  const validate = (values: ITimer) => {
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

  return (
    <div className="App">
      <header className="App-header">
        <p>countdown</p>
      </header>

      <div>
        <ul>
        {timers.map((timer: ITimer, key: number) => (
          <Timer
            key={key}
            title={timer.title}
            date={timer.date}
          />
        ))}
        </ul>

        <Formik
          initialValues={{
            title: '',
            date: '',
          }}
          onSubmit={(
            values: ITimer,
            { resetForm }: FormikHelpers<ITimer>
          ) => {
            console.log(`form submitted`);
            console.log(values);

            const newTimer: ITimer = values;
            setTimers([...timers, newTimer]);
            resetForm();
          }}
          validate={validate}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="title">Title</label>
              <Field
                id="title"
                name="title"
                placeholder="Title"
              />
              {errors.title && touched.title && <div>elemele {errors.title}</div>}
              <br />

              <label htmlFor="date">Date</label>
              <Field
                id="date"
                name="date"
                placeholder="date"
                type="datetime-local"
              />
              {errors.date && touched.date && <div>elemele7 {errors.date}</div>}
              <br />

              <button type="submit">Add timer</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default App
