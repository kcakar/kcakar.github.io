/*  eslint-disable no-unused-vars*/
import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import Setup from './Setup';
import ManageWords from './ManageWords';
import Login from './Login';
import Header from './Header';
import base from '../base';

class Memorizer extends React.Component {

    constructor() {
        super();
        this.state = {
            settings: {},
            words: {},
            isSetup: true,
            didLogin: false,
            userLogout:false,
            user:{}
        }
        this.saveSettings = this.saveSettings.bind(this);
        this.login = this.login.bind(this);
        this.fillMockupWords = this.fillMockupWords.bind(this);
        this.logout = this.logout.bind(this);
        this.updateSettings = this.updateSettings.bind(this);
        this.userLoggedOut = this.userLoggedOut.bind(this);
    }

    fillMockupWords() {
        const words = {
            Yes: {
                key:1,
                language: "İngilizce",
                translation: "Evet",
                translationLanguage: "Türkçe",
                rate:"0"
            },
            No: {
                key:2,
                language: "İngilizce",
                translation: "Ni",
                translationLanguage: "İspanyolca",
                rate:"80"
            }
        };
        this.setState({words:{...words}});

        // const fishes = { ...this.state.fishes };
        // this.setState({words:words});
    }

    updateSettings()
    {
        let settings = localStorage.getItem(this.state.user.userName);
        if (settings && this.state.user.userName !== undefined ) {
            this.saveSettings(JSON.parse(settings));
            this.setState({
                isSetup: false
            })
        }
        else {
            this.setState({
                isSetup: true
            })
        }
        this.fillMockupWords();
    }

    login(user)
    {
        console.log("login")
        this.setState({user});
        this.setState({didLogin:true});
        this.updateSettings();
        console.log("didLogin")
    }

    userLoggedOut(){
        this.setState({userLogout:false})
    }

    logout(user)
    {
        this.setState({didLogin:false});
        this.setState({userLogout:true});
    }

    saveSettings(settings) {
        this.setState({settings});
        this.setState({isSetup: false});
        localStorage.setItem(this.state.user.userName, JSON.stringify(settings));
    }

    render() {
        if (this.state.didLogin) {
            if(this.state.isSetup)
            {
            return(
                <div>
                    <Header  user={this.state.user} logout={this.logout}/>
                    <Setup user={this.state.user} saveSettings={this.saveSettings} />
                </div>
             );
            }
            else{
                return(
                    <div>
                        <Header  user={this.state.user} logout={this.logout}/>
                        <ManageWords settings={this.state.settings} user={this.state.user} words={this.state.words}/>
                    </div>
                 );  
            }
        } 
        else 
        {
            return <Login login={this.login} didLogin={this.state.didLogin} userLogout={this.state.userLogout} userLoggedOut={this.userLoggedOut}/>;
        }

    }
}

export default Memorizer;