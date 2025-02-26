import React, {useState, useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import { Route } from 'react-router-dom';
import Form from './Form';
import schema from './Schema'
import Home from './Home'

const initialFormValues = {
  name: '',
  size: '',
  cheese: false,
  sausage: false,
  pepperoni: false,
  bacon: false,
  instructions: '',
}

const initialFormErrors = {
  name: '',
  size: ''
}

const initialPizza = []

const initialDisabled = true

const App = () => {

  const [orders, setOrders] = useState(initialPizza)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const postNewOrder = newOrder => {
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(response => {
        setOrders([response.data, ...orders])
      })
      .catch(error => {
        console.error(error)
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ''}))
      .catch(error => setFormErrors({...formErrors, [name]: error.errors[0]}))
  }

  const inputChange = (name, value) => {
    validate(name, value)
    setFormValues({...formValues, [name]: value})
  }

  const submitOrder = () => {
    const newOrder = {
      name: formValues.name.trim(),
      size: formValues.size.trim(),
      instructions: formValues.instructions.trim(),
      toppings: ['cheese', 'sausage', 'pepperoni', 'bacon'].filter(topping => !!formValues[topping])
    }
    postNewOrder(newOrder)
  }

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  return (

    <div>
      <h1>Lambda Eats</h1>
        <Route exact path='/'>
        <p>Please press button below to begin your pizza order!</p>
          <Home />
        </Route>
        <Route path='/pizza'>
          <Form
            values={formValues}
            change={inputChange}
            submit={submitOrder}
            disabled={disabled}
            errors={formErrors}
          />
        </Route>
    </div>
  );
};
export default App;