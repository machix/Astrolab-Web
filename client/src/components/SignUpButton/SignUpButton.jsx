import React, {Component} from 'react';
import './SignUpButton.css';
import {Link} from 'react-router-dom';


class SignUpButton extends Component {
    render() {
        return (
            <div className="f6 f5-ns dib mr3">
                <Link to="/signup">
                    <button id="sign-up-btn">Sign Up</button>

                </Link>
            </div>
        )
    }
}

export default SignUpButton;