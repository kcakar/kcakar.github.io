/*  eslint-disable no-unused-vars*/

import React from 'react';
import {render} from 'react-dom';

class ManageWords extends React.Component{


    renderWordRow(wordInfo,word){
        console.log(wordInfo)
        return(
            <tr key={wordInfo.key}>
                <td className="mdl-data-table__cell--non-numeric"><input type="text" value={word}/></td>
                <td><input type="text" value={wordInfo.translation}/></td>
                <td>{wordInfo.rate}</td>
            </tr>
        )
    }

    renderAddWordForm()
    {
        return (
            <form action="#">
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="word"/>
                <label className="mdl-textfield__label" htmlFor="word">Kelime</label>
            </div>
            <div className="mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="meaning"/>
                <label className="mdl-textfield__label" htmlFor="meaning">Anlamı</label>
            </div>
        </form>
            // <div className="addWords">
            //     <h2>Kelime Ekleme</h2>


            //     <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            //         Ekle
            //     </button>
            // </div>
        )
    }

    render(){
        return(
           <section className="manageWords">
                <div className="words">
                    <h2>Kelime Yönetimi</h2>
                    {this.renderAddWordForm()}

                    <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                        <thead>
                            <tr>
                                <th className="mdl-data-table__cell--non-numeric">Kelime</th>
                                <th>Anlamı</th>
                                <th>Bilme Yüzdesi</th>
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