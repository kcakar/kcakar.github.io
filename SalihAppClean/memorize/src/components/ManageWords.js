/*  eslint-disable no-unused-vars*/

import React from 'react';
import {render} from 'react-dom';

import { Button,TextField,TextFieldIcon,Elevation,Fab } from 'rmwc';


class ManageWords extends React.Component{
    renderWordRow(wordInfo,word){
        console.log(wordInfo)
        return(
            <tr key={wordInfo.key}>
                <td>
                    <TextField  value={word} />
                </td>
                <td>
                    <TextField  value={wordInfo.translation} />
                </td>
                <td>{wordInfo.rate}</td>
            </tr>
        )
    }

    renderAddWordForm()
    {
        return (
            <form action="#">
                <TextField label="Kelime" />
                <TextField label="Anlamı" />
                <Button raised>Ekle</Button>
            </form>
        )
    }

    render(){
        return(
           <section className="manageWords">
                    <div className="addWords">
                    {this.renderAddWordForm()}
                    </div>
                <Elevation z={3}>
                    <div className="words">
                        <Fab mini>add</Fab>
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
                </Elevation>
           </section>
        );
    }
}

export default ManageWords