/*  eslint-disable no-unused-vars*/

import React from "react";
import {render} from "react-dom";



class Header extends React.Component{


    render(){

        return (
        <nav>
            <div className="brand">
                <figure></figure>
                <span>Memorizer!</span>
            </div>
            <ul>
                <ul>
                    <li className="user-info">
                        <span>{this.props.user.userName}</span>
                    </li>
                    <li><button onClick={()=>this.props.logout()}>Log out</button></li>
                </ul>
                <li><img src={this.props.user.photoURL} role="presentation"/></li>
            </ul>
        </nav>
        );
    }
}

export default Header