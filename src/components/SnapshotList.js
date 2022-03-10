import React from 'react';
import SnapImage from './SnapImage.js'

class SnapshotList extends React.Component {

    render(){
        return ( 
        <div>
            <h1>Snapshots:</h1>
            <ul className='snapshot-list'>
                {this.props.snapshots.map((snapshot) =>(
                <SnapImage key={snapshot.name} snapshot={snapshot}></SnapImage>
                ))}
            </ul>
        </div>   

    );
    }
}

export default SnapshotList

