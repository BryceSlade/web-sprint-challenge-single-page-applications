import React from 'react'
import styled from 'styled-components'

const InputStyle = styled.div`
    height: 50vh;
    border: 1px solid red;
    align-content: 
`;

const SubmitDivStyle = styled.div`
    padding-left: 40%;
    border: 1px solid red;
`;

const TitleStyle = styled.h3`
    border: 1px solid red;
    text-align: center;
`;

export default function Form(props) {

    const {values, submit, change, disabled, errors,} = props

    const onSubmit = event => {
        event.preventDefault()
        submit()
    }

    const onChange = event => {
        const { name, value, checked, type } = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse)
    }

    return (
        <form id="pizza-form" onSubmit={onSubmit}>
            <div className='form inputs'>
                <h2>Build Your Own Pizza</h2>

                <h3>Name</h3>  {/* Name */}
                <p>Required</p>
                <label> 
                    <input
                        id="name-input"
                        value={values.name}
                        onChange={onChange}
                        name='name'
                        type='text'
                    />
                </label>

                <h3>Choice of Size</h3>  {/* Dropdown */}
                <p>Required</p>
                <label>
                    <select id="size-dropdown" onChange={onChange} value={values.size} name='size'>
                        <option value=''>- Select an option -</option>
                        <option value='small'>Small</option>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='extra-large'>Extra-Large</option>
                    </select>
                </label>

            <div id='checks'>
                <h3>Add Toppings</h3>  {/* Checkboxes */}
                <label>Cheese
                    <input
                        type='checkbox'
                        name='cheese'
                        onChange={onChange}
                        checked={values.cheese}
                    />
                </label>

                <label>Sausage
                    <input
                        type='checkbox'
                        name='sausage'
                        onChange={onChange}
                        checked={values.sausage}
                    />
                </label>

                <label>Pepperoni
                    <input
                        type='checkbox'
                        name='pepperoni'
                        onChange={onChange}
                        checked={values.pepperoni}
                    />
                </label>

                <label>Bacon
                    <input
                        type='checkbox'
                        name='bacon'
                        onChange={onChange}
                        checked={values.bacon}
                    />
                </label>

                <h3>Special Instructions</h3>  {/* Text area */}
                <label>
                    <input
                        id="special-text"
                        type='textarea'
                        name='instructions'
                        onChange={onChange}
                        value={values.instructions}
                    />
                </label>
            </div>
            </div>

            <div className='form-submit'>
                <button id="order-button" disabled={disabled}>Add to Order</button>
                <div className='errors'>
                    <div>{errors.name}</div>
                    <div>{errors.size}</div>
                </div>
            </div>
        </form>
    )
}