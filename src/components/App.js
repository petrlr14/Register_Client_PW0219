import React from "react"
import RegisterForm from './RegisterForm'
import RegisterTable from './RegisterTable'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            student_list:[],
            id_counter:0
        }
    }

    handleSubmit(student){
        student._id = this.state.id_counter;
        student.datetime = new Date();

        let buffer_list = this.state.student_list.slice();
        this.setState({
            student_list: buffer_list.concat([student]),
            id_counter: this.state.id_counter + 1,
        })
    }

    handleDelete(student){
        let index = this.state.student_list.find(value=>{
            return value._id === student._id;
        })

        let buffer_list = this.state.student_list.slice();
        buffer_list.splice(index, 1);

        this.setState({
            student_list: buffer_list
        });
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