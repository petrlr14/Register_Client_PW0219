import React from "react"
import RegisterForm from './RegisterForm'
import RegisterTable from './RegisterTable'
import API from '../utils/APIConstants'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            student_list:[],
        }
    }

    componentDidMount(){
        fetch(`${API.BaseUrl}/register`, {
            headers:{
                Accept: "application/json"
            }
        })
            .then(res=>{
                return res.json();
            })
            .then(res=>{
                console.log(res)
                this.setState({
                    student_list: res?res:[],
                })
            })
            .catch(err=>{
                alert("Ocurrió un error en la conexión");
            })
    }

    handleSubmit(student){
        let request = {
            method: "POST",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                carnet: student.carnet,
                schedule: student.schedule,
                isLate: student.isLate,
            })
        }

        fetch(`${API.BaseUrl}/register`, request)
            .then(res=>{
                return res.json();
            })
            .then(res=>{
                let buffer_list = this.state.student_list.slice();
                this.setState({
                    student_list: buffer_list.concat([res.register]),
                })
            })  
            .catch(err=>{
                alert("Ocurrió un error en la conexión");
            });
    }

    handleDelete(student){
        let request = {
            method: "DELETE",
            headers:{
                "Content-type":"application/json",
                "Accept":"application/json",
            },
            body: JSON.stringify({
                _id: student._id,
            }) 
        }

        fetch(`${API.BaseUrl}/register`, request)
            .then(res=>res.json())
            .then(res=>{
                let index = this.state.student_list.find(value=>{
                    return value._id === student._id;
                })
        
                let buffer_list = this.state.student_list.slice();
                buffer_list.splice(index, 1);
        
                this.setState({
                    student_list: buffer_list
                });
            })
            .catch(err=>{

            })
    }
    
    render(){
        return (
            <div className="container" style={{"marginTop":2+"em", "marginBottom":2+"em"}}>
                <RegisterForm 
                    onSubmit = {(student)=>{
                        this.handleSubmit(student);
                    }}
                />
                <RegisterTable 
                    list={this.state.student_list}
                    onDelete={(student)=>this.handleDelete(student)}
                    />
            </div>
        );
    }
}

export default App;