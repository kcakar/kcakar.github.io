/*  eslint-disable no-unused-vars*/

import React from 'react';
import {render} from 'react-dom';

class ManageWords extends React.Component{


    renderWordRow(wordInfo,word){
        console.log(wordInfo)
        return(
            <tr key={wordInfo.key}>
                <td><input type="text" value={word}/></td>
                <td><input type="text" value={wordInfo.translation}/></td>
                <td>{wordInfo.rate}</td>
            </tr>
        )
    }

    render(){
        return(
           <section className="manageWords">
                <div className="words">
                    <h2>Kelime Yönetimi</h2>
                    <table className="container">
                        <thead>
                            <tr>
                                <th><h1>Kelime</h1></th>
                                <th><h1>Anlamı</h1></th>
                                <th><h1>Bilme Yüzdesi</h1></th>
                            </tr>
                        </thead>
                        <tbody>
                            { Object.keys(this.props.words).map(key=>this.renderWordRow(this.props.words[key],key))}
                        </tbody>
                    </table>
                </div>
           </section>
        );
    }
}

export default ManageWords