import React, { Component } from "react";

class Ownersignup extends  Component {

    constructor(props) {
        super(props)
        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:'',
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            passwordError: "",
            confirmPasswordError:'',
        };
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    validate =()=>{
        let firstNameError = '';
        let lastNameError = '';
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError =''
        const emailRegex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/;
        if ((this.state.firstName).trim() ===''){
            firstNameError ='First Name Cannot be Empty'
        }

        if ((this.state.lastName).trim() ===''){
            lastNameError ='Last Name Cannot be Empty'
        }
        if(!this.state.email.match(emailRegex)){
            emailError = 'Invalid email'
        }
        if(!this.state.password.match(passwordRegex)){
            passwordError = 'Enter stronger password'
        }
        if (!(this.state.confirmPassword === this.state.password)){
            confirmPasswordError = 'password did not match'
        }
        if(lastNameError || firstNameError || emailError || passwordError || confirmPasswordError){
            this.setState({lastNameError ,firstNameError, emailError, passwordError, confirmPasswordError});
            return false;
        }

        return true;

    }
      handleSubmit(event) {
         event.preventDefault();
        const isValid = this.validate()
        if(isValid){
         const ownerData = {
             firstName : this.state.firstName,
             lastName : this.state.lastName,
             email : this.state.email,
             password: this.state.password,
             confirmPassword : this.state.confirmPassword
         }
         fetch("https://mamamboga-api.herokuapp.com/api/v0/Owner/admin_auth", {
            method: "POST",
               body: JSON.stringify(ownerData),
               headers: {
                 "Content-Type": "application/json"
               },
               credentials: "same-origin"
             })
     }
     }

render () {
    return (
        <div className="sign_up_form">
            <h1>Sign Up Form</h1>
            <form onSubmit = {this.handleSubmit}>
            <input type ='text' placeholder='First Name' name ='firstName' onChange={this.handleChange}></input>
            <br/>
            <div>{this.state.firstNameError}</div>
            <input type ='text' placeholder='Last Name' name ='lastName' onChange={this.handleChange}></input>
            <br/>
            <div>{this.state.lastNameError}</div>
            <input type ='email' placeholder='Email' name ='email' onChange={this.handleChange}></input>
            <br/>
            <div>{this.state.emailError}</div>
            <input type ='password' placeholder='Password' name ='password' onChange={this.handleChange}></input>
            <br/>
            <div>{this.state.passwordError}</div>
            <input type ='password' placeholder='Confirm Password' name ='confirmPassword' onChange={this.handleChange}></input>
            <br/>
            <div>{this.state.confirmPasswordError}</div>
            <button type= "submit">CREATE ACCOUNT</button>
            </form>
         </div>
    );
}
}


export default Ownersignup;

