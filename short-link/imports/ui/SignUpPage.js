import React from 'react';
import { Link } from 'react-router';

export default class SignUpPage extends React.Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);


    this.state ={
      error: ''
    }
  }
  onSubmit(e){
    //prevent full page refresh
    e.preventDefault();
    this.setState({
      error:'Something went wrong.. goodluck'
    })
  }
  render(){
    return (
      <div>
        <h1>Join shrtLynk </h1>

        {this.state.error ? <p>{this.state.error} </p> : undefined }

        <form onSubmit={this.onSubmit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Create Account</button>

        </form>


        <Link to="/"> Have an account already? </Link>
      </div>
    )
  }
}
