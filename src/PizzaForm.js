import React, { useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const initialOrderValues = {
    name: '',
    email: '',
    phone:'',
    text:'',
    size:'',
    sauce:'',
    pepperoni: false,
    sausage: false,
    mushrooms: false,
    onions: false,
    }
    
    const initialOrderErrors = {
    name: '',
    email: '',
    phone:'',
    }

const PizzaForm = () => {

    const formSchema = yup.object().shape({
        name: yup.string().required('Please enter your name').min(2, "Name must be at least 2 characters"),
        email: yup.string().required('Must be a valid email'),
        phone: yup.string().required('Must be a valid phone number'),
        size: yup.string().required('Pick a size'),
        sauce: yup.string().required('Pick a sauce'),
        specialInstructions: yup.string(),
        pepperoni:yup.boolean(),
        mushrooms:yup.boolean(),
        onions:yup.boolean(),
        sausage:yup.boolean(),
        textarea: yup.string(),
    })
    
    const [orderValues, setOrderValues]=useState(initialOrderValues)
    const [orderErrors, setOrderErrors]=useState(initialOrderErrors)
    const [newOrder, setNewOrder] = useState(initialOrderValues)
    
    const postNewOrder = () => {
        axios
        .post('https://reqres.in/api/user', newOrder)
        .then((res) => {
        setNewOrder(newOrder)
        })
        .catch((err) => {
          console.log(err);
        });
    }
      const onSubmit = (e) => {
        e.preventDefault();
       postNewOrder(orderValues)
    };
      const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        const valuePicked = type === "checkbox" ? checked : value;
        inputChange(name, valuePicked);
    }; 
    
    
    const inputChange = (name, value) =>{
        yup.reach(formSchema, name)
            .validate(value)
            .then(() => {
        setOrderErrors({
                ...orderErrors,
                [name]: "",
    })})
              .catch((err) => {
        setOrderErrors({
                  ...orderErrors,
                  [name]: err.errors[0],
    })});
        setOrderValues({
            ...orderValues,
            [name]: value, 
    });};
    
    return (
    <form onSubmit={onSubmit}>
    <div className = 'form'>
            <h3>Build Your Pizza</h3>
        <label>
             Name:
        <input
            value={orderValues.name}
            onChange={onChange}
            name='name'
            type='text'/>
    </label>
    <br></br>
    <label>
            Email: 
            <input
                value={orderValues.email}
                onChange={onChange}
                name='email'
                type='email'/>
    </label>
    <br></br>
        <label>
            Phone Number:
        <input
            value={orderValues.phone}
            onChange={onChange}
            name='phone'
            type='text'/>
    </label>
    <br></br>
    <label>
        <select
         name='size'
         value={orderValues.size}
         onChange={onChange}>
            <option>-Pick a size-</option>
            <option value="small">Small</option>
            <option value="med">Medium</option>
            <option value="lrg">Large</option>
    </select>
    </label>
    
                <h2>Pick Sauce</h2>
            <label>
                Red Sauce
                <input
                type="radio"
                name="sauce"
                value="red"
                checked={orderValues.sauce === "red"}
                onChange={onChange}
              />
    </label>
        <label>
            Oil & Garlic
              <input
                type="radio"
                name="sauce"
                value="oil"
                checked={orderValues.sauce === "oil"}
                onChange={onChange}
              />
    </label>
        <label>
            BBQ Sauce
              <input
                type="radio"
                name="sauce"
                value="bbq"
                checked={orderValues.sauce === "bbq"}
                onChange={onChange}
              />
    </label>
                <h2>Add Toppings</h2>
    
    <div className="add-toppings">
        <label> Onions
            <input
                type="checkbox"
                name="onions"
                checked={orderValues.onions}
                onChange={onChange}/>
    
    </label>
        <label> Mushrooms
             <input
                type="checkbox"
                name="mushrooms"
                checked={orderValues.mushrooms}
                onChange={onChange} />
    
    </label>
        <label> Pepperoni
            <input
                type="checkbox"
                name="pepperoni"
                checked={orderValues.pepperoni}
                onChange={onChange}/>
    
    </label>
        <label> Sausage
            <input
                type="checkbox"
                name="sausage"
                checked={orderValues.sausage}
                onChange={onChange}/>
    </label>
    </div>
    
        <h2>Special Instructions</h2>
             <textarea className='textarea'
                name="textarea"
                value={orderValues.textarea}
                onChange={onChange}
                placeholder="Please add special instructions here" rows ="4" />
    <div className="button">
    
        <button id="submit-btn" onClick={(evt)=> evt.preventDefault}>Submit</button>
    </div>
         
    </div>
    </form>
    )}

    console.log("hello world")

export default PizzaForm
