/*  eslint-disable no-unused-vars*/

import React from 'react';
import {render} from 'react-dom';

import base from '../base';

class Login extends React.Component{
    constructor(){
        super();

        this.authenticate=this.authenticate.bind(this);
        this.authHandler=this.authHandler.bind(this);
        this.login=this.login.bind(this);
        
        this.state={
            uid:null,
            owner:null
        }
        
    }

    componentDidMount(){

         base.onAuth((user)=>{
             if(user){
                 this.authHandler(null,{user});
             }
         });
    }

    authHandler(err,authData){
        if(err){
            console.error(err);
            return;
        }

        //get store info
        const userRef = base.database().ref(this.props.userId);
        console.dir(userRef)

        //query db for store data
        userRef.once('value',(snapshot)=>{
            console.log(authData)
            const data = snapshot.val() || {}
            if(!data.owner)
            {
                userRef.set({
                    owner:authData.user.uid
                })
            }

            let user={
                uid:authData.user.uid,
                userName:authData.user.displayName,
                photoURL:authData.user.photoURL
            }

            this.login(user);
        });
    }

    authenticate(provider){
        console.log("AUTHENTİKATE")
        base.authWithOAuthPopup(provider,this.authHandler);
    }

    login(user)
    {
        this.props.login(user);
    }


    logout(){
        base.unauth();
    }

    render(){
        return(
           <section className="manageWords">
                <button className="facebook" onClick={()=> this.authenticate('facebook')}>LOG IN WITH FACEBOOK</button>
           </section>
        );
    }
}

export default Login