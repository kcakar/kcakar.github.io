import React from 'react'; 
import {render} from 'react-dom';
import {BrowserRouter,Match,Miss} from 'react-router';

import './css/style.css';

import Memorizer from './components/Memorizer';
import NotFound from './components/NotFound';


const Root = () =>{
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={Memorizer}/> 
                <Miss component={NotFound}/>
            </div>
        </BrowserRouter>
    )
}


render(<Root/>,document.querySelector("#main"))