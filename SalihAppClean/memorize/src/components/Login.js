/*  eslint-disable no-unused-vars*/
// login fonksiyonu her seferinde 2-3-4 kere çağrılıyor
import React from 'react';
import { render } from 'react-dom';

import base from '../base';
import * as firebase from "firebase";

class Login extends React.Component {
    constructor() {
        super();

        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            uid: null,
            owner: null
        }

    }

    componentDidMount() {
        let component=this;
        firebase.auth().onAuthStateChanged(function(user, error) {
            if (user) {
                component.authHandler(null, { user });
            }
          });
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.userLogout) {
            this.logout();
        }
    }

    authHandler(err, authData) {
        if (err) {
            console.error(err);
            return;
        }

        //get store info
        const userRef = firebase.database().ref(this.props.userId);

        //query db for store data
        userRef.once('value', (snapshot) => {
            const data = snapshot.val() ||  {}
            if (!data.owner) {
                userRef.set({
                    owner: authData.user.uid
                })
            }

            let user = {
                uid: authData.user.uid,
                userName: authData.user.displayName,
                photoURL: authData.user.photoURL
            }

            this.login(user);
        });
    }

    authenticate(provider) {
        console.log("AUTHENTİKATE")
        base.authWithOAuthPopup(provider, this.authHandler);
    }

    login(user) {
        this.props.login(user);
    }


    logout() {
        console.log("login.logout")
        base.unauth();
        this.props.userLoggedOut();
    }

    render() {
        return (
            <section className="manageWords">
                <button className="facebook" onClick={() => this.authenticate('facebook')}>LOG IN WITH FACEBOOK</button>
            </section>
        );
    }
}

export default Login