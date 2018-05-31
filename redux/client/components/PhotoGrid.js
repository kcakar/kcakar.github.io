import React from 'react'
import {render} from 'react-dom';
import Photo from './Photo';
class PhotoGrid extends React.Component{
    render(){
        return (
            <div className="photo-grid">
                    {
                        this.props.posts.map(
                            (post,i) => <Photo key={i}  i={i} {...this.props} post={post}/>
                        )

                    }
            </div>
        );
    }
}


export default PhotoGrid;