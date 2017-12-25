/*  eslint-disable no-unused-vars*/

import React from "react";
import {render} from "react-dom";



class Header extends React.Component{


    render(){

        return (
        <header>
            <div class="top-line"></div>
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
                    <li><img src={this.props.user.photoURL} alt=""/></li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default Header