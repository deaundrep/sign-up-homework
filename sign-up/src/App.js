import React, { Component } from "react";
import './App.css';
import validator from 'validator';

class App extends Component {


    state = {
      email: "",
      password: "",
      effectualMessage: "",
      userInput: "",
      isError: false,
      
    }

  handleOnChangeEmail = (event)=>{
      
    this.setState({
      [event.target.name]: event.target.value,
    }, ()=>{
  
    const {email} = this.state;
      
      console.log(event.target.name)
      
    
    let isEmail = validator.isEmail(email);
      
    if(isEmail){ 
    this.setState({
        isError: false,
        message: "",
        userInput: "email",
    })
      }else {
    this.setState({
        isError: true,
        message: `Please enter your email address in desired format: yourname@example.com  `,
        userInput: "email",
    })
      }
    })}
      
      
  handelOnChangePassword = (event)=>{
    this.setState({
      [event.target.name]: event.target.value,
      }, ()=>{
    const {password} = this.state;
      
    let isPassword = validator.matches(password, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$" );
      
    if(isPassword){
    this.setState({
      isError: false,
      message: '',
      userInput: "password"
    })
    } else {
    this.setState({
      isError: true,
      message: `Password must contain A minimum of 8 characters, including:
        - 1 Uppercase Letter,  
        - 1 Lowercase Letter,
        - 1 Number,  
        - and 1 of these special characters " #?!@$%^&*_ "`,
        userInput: "password"
        });
    }
      });
    }
      
      
    handleOnSubmit = async (event) => {
      event.preventDefault();
      
      
  const {email, password} = this.state;
      
  if(validator.isEmpty(email) && validator.isEmpty(password)) {
    this.setState({
      isError:  true,
      message: " Cannot have empty Email and Password",
      userInput: "submit-button"
      });
      return;
    } else {
    this.setState({
        isError: false,
        message: "",
        userInput: "submit-button"
      });
    }
      
    if(validator.isEmpty(email)){
      this.setState({
        isError: true,
        message: "Please enter email",
        userInput: "submit-button"
        })
    } else {
      this.setState({
        isError: false,
        message: "",
        userInput: "submit-button"
        });
      }
      
      
    if(validator.isEmpty(password)){
      this.setState({
        isError: true,
        message: "Please enter password",
        userInput: "submit-button"
      });
    } else {
      this.setState({
        isError:false,
        message:"",
        userInput: "submit-button"
      })
    }
      
      };
      
      
      
      
      
    render () { 
      
    const {message, isError, userInput}= this.state
      
    let showSignUpComponent = <form onSubmit={this.handleOnSubmit}>
            <div className="login-info-box" >
            <h2>Sign Up</h2>
                  
              {isError && userInput ==="email"  ? <div className="message">{message}</div>: ""}
              {isError && userInput ==="submit-button" ? <div className="message">{message}</div>: ""}
              <br/>
                <input 
                  type="text"
                  placeholder="enter email"
                  name="email"
                  onChange={this.handleOnChangeEmail}
                />
                  {" "}<br />
      
                      
                {isError && userInput === "password" ? <div className="message">{message}</div>: ""}
                  <input
                  type="text"
                  placeholder="enter password"
                  name="password"
                  onChange={this.handelOnChangePassword}
                  />
                  {" "}
                  <br />
      
                    <button>Sign Up</button>
              </div>
            </form>
        return (
      
          <div>
          {showSignUpComponent}
      
        </div>
          )
      
        
      }}
      
      export default App;