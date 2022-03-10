import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const root = document.querySelector('#root');

class App extends React.Component {
    constructor (){
        super();
        this.state = {
            groceries: [],
            selectedGroceryId: '',
        }
    }
    async componentDidMount(){
        try {
            const response = await axios.get('/api/groceries');
            const groceries = response.data;
            this.setState({groceries})
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.groceries.map(item => <li key = {item.id}>{item.name}   <button className = 'delete'>X</button> </li>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<App />, root)