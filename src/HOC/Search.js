import React, {useState,useEffect, Fragment} from 'react';
import axios  from 'axios';
const Search = (WrappedComponent,entity) => {

    return class extends React.Component{
        constructor(props){
            super(props);
            this.onChange = this.onChange.bind(this);
            this.setData = this.setData.bind(this);
            this.onChange = this.onChange.bind(this);
        }
        state = {
            data:undefined,
            filteredData:undefined,
            input:""
        }
        setData(_data){
            console.log("Calling setData....");
            console.log(_data);
            const curr = {...this.state,data:_data};
            console.log("Curr is",curr);
            this.setState(curr);
        }
        componentDidMount(){
            axios.get('https://jsonplaceholder.typicode.com/' + entity).then((_data) => {
                if(entity == "users"){
                    this.setState({...this.state,data:_data.data,filteredData:_data.data.map((d) => {
                        return <p>{d.name}</p>
                    })})
                }
                else{
                const newTodos = _data.data.map((d) => {
                    return <p>{d.title}</p>
                }).slice(0,10);
                console.log(newTodos);
                this.setState({...this.state,data:_data.data.slice(0,10),filteredData:newTodos})
            }
            });
            
           
        }
        onChange(e){
            console.log(e.target.value);
            console.log(this.state.data);
            const newData = this.state.data.filter((d) => {
                return entity == "users"? d.name.indexOf(e.target.value)>=0 : d.title.indexOf(e.target.value)>=0;
                
            }).map((data) => {
                return entity == "users"?(<p key = {data.id}>{data.name}</p>):(<p key = {data.id}>{data.title}</p>);
            });
            console.log(newData);
            this.setState({...this.state,filteredData:newData,input:e.target.value});
            
        }
        getData(){
            let data;
            if(entity == 'users'){
                data = this.state.data.map((d) => {
                    return <p key = {d.id}>{d.name}</p>
                })
                return data;
            }
            else{
                data = this.state.data.map((d) => {
                    return <p key = {d.id}>{d.title}</p>
                })
            }
            return data;
        }
        render(){
            console.log(this.state);
            if(this.state.filteredData === undefined) return <div>Wrong</div>
            return <Fragment>
                <div style={{width:"50%",backgroundColor:entity == "users"?"orange":"yellow"}}>
                        <p>{entity}</p>
                        <input type = "search" placeholder={`Search ${entity}`} name = 'input' value = {this.state.input} onChange = {e => this.onChange(e)}></input>
                        <WrappedComponent filteredData = {this.state.input == ''?(this.getData()):this.state.filteredData}></WrappedComponent>
                    </div>
            </Fragment>
        }
    }
}

export default Search;