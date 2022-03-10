import React from 'react';
import axios from 'axios';

class Item extends React.Component {
    constructor() {
        super();
        this.state = {
            groceries: {}
        }
    }
    async componentDidMount(){
        const response = await axios.post('/api/groceries', )
    }
}