import React, { Component } from "react";
 import "./Ownersignup.css";
class Ownersignup extends  Component {

    constructor(props) {
        super(props)
        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirmPassword:''
        };
        this.handleChange =this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
     handleSubmit(event) {
         event.preventDefault();

         const ownerData = {
             firstName : this.state.firstName,
             lastName : this.state.lastName,
             email : this.state.email,
             password: this.state.password,
             confirmPassword : this.state.confirmPassword
         }
         console.group(ownerData)
         fetch("https://mamamboga-api.herokuapp.com/api/v0/Owner/admin_auth", {
            method: "POST",
               body: JSON.stringify(ownerData),
               headers: {
                 "Content-Type": "application/json"
               },
               credentials: "same-origin"
             }).then(function(response){
              console.log(response);
          })
     }
    
render () {
    return (
        <div className="sign_up_form">
            <h1>Sign Up Form</h1>
            <form onSubmit = {this.handleSubmit}>
            <input type ='text' placeholder='First Name' name ='firstName' onChange={this.handleChange}></input>
            <br/>            
            <input type ='text' placeholder='Last Name' name ='lastName' onChange={this.handleChange}></input>
            <br/>
            <input type ='email' placeholder='Email' name ='email' onChange={this.handleChange}></input>
            <br/>
            <input type ='password' placeholder='Password' name ='password' onChange={this.handleChange}></input>
            <br/>
            <input type ='password' placeholder='Confirm Password' name ='confirmPassword' onChange={this.handleChange}></input>
            <br/>
            <button type= "submit">CREATE ACCOUNT</button>
            </form>
         </div>
    );
}
}


export default Ownersignup;

