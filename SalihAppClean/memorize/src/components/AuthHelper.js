/*  eslint-disable no-unused-vars*/
// login fonksiyonu her seferinde 2-3-4 kere çağrılıyor
import React from 'react';
import { render } from 'react-dom';

import base from '../base';

class AuthHelper extends React.Component {
    constructor() {
        super();

        this.authenticate = this.authenticate.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.onAuth = this.onAuth.bind(this);

        this.state = {
            uid: null,
            owner: null
        }

    }

    onAuth(){
        base.onAuth((user) => {
            if (user) {
                this.authHandler(null, { user });
            }
        });
    }

    authHandler(err, authData) {
        //login olur
        //auth data auth handlere gelir
        //auth datadan uid alınır
        //uid ile databaseye erişilir
        if (err) {
            console.error(err);
            return;
        }

        //get store info
        const userRef = base.database().ref(authData.uid);

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
        // this.props.login(user);
    }

    logout() {
        base.unauth();
    }

}

export default new AuthHelper()