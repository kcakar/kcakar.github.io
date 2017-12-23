/*  eslint-disable no-unused-vars*/
import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router'

class Setup extends React.Component {
    
    // constructor(){
    //     super();
    //     // this.updateStoreName=this.updateStoreName.bind(this);
    // }

    saveSettings(){
        let settings={
            UserLanguage:this.userLanguageInput.value,
            LearningLanguage:this.learnLanguageInput.value,
        };

        this.props.saveSettings(settings);
    }

    
    render() {
        return (
            <section className="setup">

                <div className="questionContainer">
                    <span>Merhaba {this.props.user.userName}</span>
                    <img role="presentation" src={this.props.user.photoURL}/>
                </div>

                <div className="questionContainer">
                    <label htmlFor="ulang">Hangi dili konuşuyorsun?</label>
                    <select id="ulang" ref={userLanguageInput => this.userLanguageInput = userLanguageInput}>
                        <option value="Türkçe">Türkçe</option>
                        <option value="İngilizce">İngilizce</option>
                        <option value="İspanyolca">İspanyolca</option>
                    </select>
                </div>

                <div className="questionContainer">
                    <label htmlFor="learnlang">Hangi dili öğreniyorsun?</label>
                    <select id="learnlang" ref={learnLanguageInput => this.learnLanguageInput = learnLanguageInput}>
                        <option value="Türkçe">Türkçe</option>
                        <option value="İngilizce">İngilizce</option>
                        <option value="İspanyolca">İspanyolca</option>
                    </select>
                </div>

                <button onClick={()=>this.saveSettings()}>Kaydet</button>
            </section>
        );
    }
}

export default Setup;