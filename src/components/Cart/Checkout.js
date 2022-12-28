import {useRef, useState} from 'react';

import classes from './Checkout.module.css';

const isEmpty= value => value.trim()==='';
const isFiveChars = value => value.trim().length ===5;


const Checkout = (props) => {
    const [formInputsValidity, setFormsInputsValidity] =useState({
        name:true,
        address: true,
        city: true,
        pincode:true
    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const pinInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName= nameInputRef.current.value;
    const enteredAddress= addressInputRef.current.value;
    const enteredPin= pinInputRef.current.value;
    const enteredCity= cityInputRef.current.value;
    
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress)
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPinIsValid = isFiveChars(enteredPin);

    setFormsInputsValidity({
        name: enteredNameIsValid,
        address: enteredAddressIsValid,
        city: enteredCityIsValid,
        pincode:enteredPinIsValid
    });


    const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredCityIsValid && enteredPinIsValid;

    if(!formIsValid){
        return
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      pincode: enteredPin
    });
};


const nameControlClasses =`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
const addressControlClasses =`${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`;
const cityControlClasses =`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;
const pincodeControlClasses =`${classes.control} ${formInputsValidity.pincode ? '' : classes.invalid}`;



  return (
    <form className={classes.form} onSubmit={confirmHandler}>

      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p> Please enter a valid name !</p>}
      </div>

      <div className={addressControlClasses}>
        <label htmlFor='street'>Address</label>
        <input type='text' id='street' ref={addressInputRef}/>
        {!formInputsValidity.address && <p> Please enter a valid address !</p>}
      </div>

      <div className={pincodeControlClasses}>
        <label htmlFor='postal'>Pin Code</label>
        <input type='text' id='postal' ref={pinInputRef}/>
        {!formInputsValidity.pincode && <p> Please enter a valid pincode 5 characters long !</p>}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'ref={cityInputRef} />
        {!formInputsValidity.city && <p> Please enter a valid city !</p>} 
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;