/*  eslint-disable no-unused-vars*/

import React from 'react';
import {render} from 'react-dom';

class ManageWords extends React.Component{


    renderWordRow(word){
        console.log(word)
        return(
            <tr>
                <td data-label="Account">{word}</td>
                <td data-label="Due Date">04/01/2016</td>
                <td data-label="Amount">$1,190</td>
            </tr>
        )
    }

    render(){
        return(
           <section className="manageWords">
                <nav>
                    <div className="info">
                        <span>{this.props.user.userName}</span>
                    </div>
                </nav>

                <div className="words">
                    <div>Add Word Form</div>
                    <table>
                    <caption>Words</caption>
                    <thead>
                        <tr>
                            <th scope="col">Kelime</th>
                            <th scope="col">Anlamı</th>
                            <th scope="col">Öğrenme durumu</th>
                        </tr>
                    </thead>
                        <tbody>
                            { Object.keys(this.props.words).map(key=>this.renderWordRow(this.props.words[key]))}
                            <tr>
                                <td data-label="Account">Visa - 3412</td>
                                <td data-label="Due Date">04/01/2016</td>
                                <td data-label="Amount">$1,190</td>
                            </tr>
                            <tr>
                                <td scope="row" data-label="Account">Visa - 6076</td>
                                <td data-label="Due Date">03/01/2016</td>
                                <td data-label="Amount">$2,443</td>
                            </tr>
                            <tr>
                                <td scope="row" data-label="Account">Corporate AMEX</td>
                                <td data-label="Due Date">03/01/2016</td>
                                <td data-label="Amount">$1,181</td>
                            </tr>
                            <tr>
                                <td scope="row" data-label="Acount">Visa - 3412</td>
                                <td data-label="Due Date">02/01/2016</td>
                                <td data-label="Amount">$842</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
           </section>
        );
    }
}

export default ManageWords