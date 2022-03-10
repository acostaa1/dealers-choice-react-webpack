import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const root = document.querySelector('#root');

class App extends React.Component {
    constructor (){
        super();
        this.state = {
            groceries: [],
            inputGroceryName: '',
            inputGrocerySection: '',
            inputGroceryPrice: '',
        };
        this.create= this.create.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.sectionChange = this.sectionChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        
    }
    async create(name, section, price) {
        const item = (await axios.post(`/api/groceries/${name}/${section}/${price}`)).data;
        this.state.groceries.push(item);
        this.setState({groceries})
        
    }
    nameChange(event) {
        this.setState({inputGroceryName: event.target.value})

    }
    sectionChange(event) {
        this.setState({inputGrocerySection: event.target.value})

    }
    priceChange(event) {
        this.setState({inputGroceryPrice: event.target.value})

    }
    
    async componentDidMount(){
        try {
            const response = await axios.get('/api/groceries');
            const groceries = response.data;
            const section = groceries[0].section;
            this.setState({groceries, inputGrocerySection: section})
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const groceries = this.state.groceries;
        //console.log(this.state.inputGroceryPrice);
        //console.log(groceries);
        if(groceries[0]) 
        return (
            <div>
                <div className='new'> 
                    <h3>Add <i>Expensive</i> Items To Your List</h3>
                    <form onSubmit={()=> this.create(this.state.inputGroceryName, this.state.inputGrocerySection, this.state.inputGroceryPrice)}>
                        <label >Item</label> 
                        <input name = "name" placeholder = "what do you need?" onChange = {this.nameChange}/>
                        <label className = "section">Section</label>
                            <select onChange= {this.sectionChange}>
                                {groceries.map(item => {
                                    return (<option key= {item.id} value= {item.section}> {item.section} </option>)
                                })}
                            </select>
                        <label className = "price">Price $</label>
                        <input name= "price" placeholder = "hint: it should be pricey" onChange = {this.priceChange}/>
                        <button type = "submit" className = "add" >Add Item</button>
                    </form>
                </div>
                <div>
                    <ul>
                        {this.state.groceries.map(item => <li key = {item.id}>{item.name}   <button className = 'delete'>X</button> </li>)}
                    </ul>
                </div>
            </div>
        )
        return(
            <h1>loading...</h1>
        )
    }
}

ReactDOM.render(<App />, root)