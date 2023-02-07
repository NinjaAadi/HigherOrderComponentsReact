import React, {useState,useEffect} from 'react';
import axios  from 'axios';
const Search = (WrappedComponent,entity) => {

    return class extends React.Component{
        constructor(props){
            super(props);
            this.onChange = this.onChange.bind(this);
            this.componentDidMount = this.componentDidMount.bind(this);
        }
        state = {
            data:undefined,
            filteredData:[],
            term:"",
            input:""
        }
        componentDidMount(){
            axios.get('https://jsonplaceholder.typicode.com/' + entity).then((_data) => {
                this.setState({...this.state,data:_data.data})
                console.log(this.state.data,_data.data);
                if(entity == 'user'){
                    this.setState({...this.state,data:<div >{
                        this.state.data.map((data) => {
                            return <p key = {data.id}>{data.name}</p>
                    })} 
                </div>})
                }
                if(entity == 'todo'){
                    this.setState({...this.state,data:<div >{
                        this.state.data.map((data) => {
                            return <p key = {data.id}>{data.title}</p>
                    })} 
                </div>})
                }
                console.log(this.state.data);
            });
        }
        onChange(e){
            this.state = this.setState({...this.state,input:e.target.value})
            if(e.target.value == '') {
                if(entity == 'user'){
                    this.setState({...this.state,filteredData:<div >{
                        this.state.data.map((data) => {
                            return <p key = {data.id}>{data.name}</p>
                    })} 
                </div>})
                }
                if(entity == 'todo'){
                    this.setState({...this.state,filteredData:<div >{
                        this.state.data.map((data) => {
                            return <p key = {data.id}>{data.title}</p>
                    })} 
                </div>})
                }
                return;
            }
            this.setState({...this.state,filteredData:this.state.data.filter((d) => {
                return entity == "user"?d.name.indexOf(this.state.input)>=0:d.title.indexOf(this.state.input);
                
            }).map((data) => {
                return entity == "user"?(<p key = {data.id}>{data.name}</p>):(<p key = {data.id}>{data.title}</p>);
            })})
        }
        render(){
            
            <h1>{entity}</h1>
            return  (<div style = {{backgroundColor:"gold",height :"auto",width:"50%"}}>
                        <p>{entity}</p>
                        <input type = "search" placeholder={`Search ${entity}`} name = 'input' value = {this.state.term} onChange = {e => this.onChange(e)}></input>
                        <WrappedComponent filteredData = {this.state.filteredData}></WrappedComponent>
                    </div>);
        }
    }
}

export default Search;