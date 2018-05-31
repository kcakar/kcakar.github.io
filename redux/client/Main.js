import React from 'react'
import {render} from 'react-dom';
import {Link} from 'react-router';


class Main extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div>
                <h1>
                    <Link to="/">Keremtagram</Link>
                </h1>
                {React.cloneElement(this.props.children,this.props)}
            </div>
        );
    }
}


export default Main;