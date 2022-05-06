import React, { Component } from "react";
class App extends Component {

    //jsonwebtoken, login
    constructor() {
        super();
        this.state = {
            title: "",
            description: "",
            tasks: [],
            formButton: "SEND"
        };
    }

    componentDidMount() {
        this.fetchTask();
    }
    componentDidUpdate() {
        this.fetchTask();
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    fetchTask() {
        fetch("/api/tasks")
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
            });
    }
    addTask = (e) => {
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`,{
                method: "PUT",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            });
            this.setState({description:"",title: "",_id:"",formButton: "SEND"});
        }else{
            fetch("/api/tasks", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data.status);
                    M.toast({ html: data.status });
    
                })
                .catch(err => console.error(err))
            this.setState({
                title: "",
                description: ""
            });
        }
        e.preventDefault();

    }
    UpdateTask= (task) =>{
        const title = document.getElementById("input-title");
        const description = document.getElementById("input-description");
        
        this.setState({
            title: task.title,
            description: task.description,
            _id: task._id,
            formButton: "UPDATE"
        })
        description.focus();
        setTimeout(()=>{
            title.focus();
        },1)
  
    }
    deleteTask = (id) => {
        if(confirm("Are you sure you want to delete it?")){
            fetch(`/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res=> res.json())
            .then(data=> {
                console.log(data)
                M.toast({html: data.status});
    
            })
        }
    }

    render() {
        return (
            <div>
                {/*NAVEGATION*/}
                <nav>
                    <div className="nav-wrapper blue darken-4">
                        <div className="container">
                            <a href="/" className="brand-logo">MERN TASK</a>
                        </div>
                    </div>
                </nav>

                <div className="Container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" id="input-title" name="title" value={this.state.title} onChange={this.handleChange} />
                                                <label for="input-title">Task title</label>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea value={this.state.description} id="input-description" name="description" className="materialize-textarea" onChange={this.handleChange}></textarea>
                                                <label for="input-description">Task description</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn blue darken-4">{this.state.formButton}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map(task => {
                                        return <tr key={task._id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>
                                                <button  onClick={()=>this.UpdateTask(task)}className="btn" style={{margin: "8px"}}><i className="material-icons">edit</i></button>
                                                <button onClick={()=>this.deleteTask(task._id)} className="btn btn-left"><i className="material-icons">delete</i></button></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default App; 