/*  eslint-disable no-unused-vars*/
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import Setup from './Setup';
import ManageWords from './ManageWords';
import Login from './Login';
import base from '../base';

class Memorizer extends React.Component {

    constructor() {
        super();
        this.state = {
            settings: {},
            words: {},
            isSetup: true,
            didLogin: false,
            user:{}
        }
        this.saveSettings = this.saveSettings.bind(this);
        this.login = this.login.bind(this);
        this.fillMockupWords = this.fillMockupWords.bind(this);
    }

    fillMockupWords() {
        let words = {
            Yes: {
                language: "İngilizce",
                translation: "Evet",
                translationLanguage: "Türkçe"
            },
            No: {
                language: "İngilizce",
                translation: "Ni",
                translationLanguage: "İspanyolca"
            }
        };
        // this.setState({words});

        // const fishes = { ...this.state.fishes };
        // this.setState({words:words});
    }

    componentWillMount() {
        let settings = localStorage.getItem(this.state.settings.Username);
        if (settings) {
            this.saveSettings(JSON.parse(settings));
            this.setState({
                isSetup: false
            })
        }
        this.fillMockupWords();
    }

    addWord(word, language) {

    }

    login(user)
    {
        this.setState({user});
        this.setState({didLogin:true});
        
    }


    saveSettings(settings) {
        this.setState({settings});

        this.setState({isSetup: false});

        localStorage.setItem(settings.Username, JSON.stringify(settings));
    }

    render() {
        if (this.state.didLogin) {
            return ( 
            <div>
                {this.state.isSetup ? <Setup user={this.state.user} saveSettings={this.saveSettings} /> : <ManageWords settings={this.state.settings} user={this.state.user} words={this.state.words}/> } 
            </div>
            );
        } else {
            return ( 
            <div>
                <Login login={this.login} />
            </div>
            );
        }

    }
}

export default Memorizer;