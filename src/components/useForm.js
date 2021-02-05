import React, {useState, useEffect} from 'react';
import validate from './validationInfo';
import { registerUser } from '../actions/userAction';
import { useDispatch } from 'react-redux';

const useForm = validate => {
    
  
    // const handleDrop = (e) =>{
    //     const {value, name} = e.target;
    //     se
    // }


    // useEffect(() => {
    //     if (signInput.length === 10) {
    //       setSignInput(signInput.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    //     }
    //     if (signInput.length === 13) {
    //       setSignInput(signInput.phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    //     }
    //   }, [signInput]);

 
    

    // return {handleInfoChange, signInput, onSubmit, error}
};

export default useForm;