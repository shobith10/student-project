
import './App.css';
import React from 'react';
import axios from 'axios';

const defaultState = {
  users: [],
  id: 0,
  name: '',
  classn: '',
  section: '',
  gender: '',
  dob: '',
  nameError: ''
}

class App extends React.Component{
  constructor(props)  {
    super(props);
    this.state = defaultState;
  }

  componentDidMount(){
    axios.get("http://localhost:8080/api/")
    .then((res) =>{
    this.setState({
        users:res.data,
        id: 0,
        name: '',
        classn: '',
        section: '',
        gender: '',
        dob: ''
      })
    })
  }

  //validation of name
  validate = () =>  {
    let nameError= '';

    if(!this.state.name){
      nameError = "name cannot be blank"
    }

    if(nameError){
      this.setState({nameError});
      return false;
    }
    return true;  
    };


  submit(event,id){
    event.preventDefault();
    const isValid = this.validate();
    
      if(id===0 && isValid){
      console.log("Submitted");
      axios.post("http://localhost:8080/api/",{
      name:this.state.name,
      classn:this.state.classn,
      section:this.state.section,
      gender:this.state.gender,
      dob:this.state.dob
      }).then(()=>{
        this.componentDidMount();
      })
      //clear form
      this.setState(defaultState);

    }else{
      axios.put("http://localhost:8080/api/",{
      id:this.state.id,
      name:this.state.name,
      classn:this.state.classn,
      section:this.state.section,
      gender:this.state.gender,
      dob:this.state.dob
      }).then(()=>{
        this.componentDidMount();
      })
    }
  }

  render(){

  return (
   <div className="main-body">
      <div className="details-form ">
      <p className="display-4">Student Details</p> 
  <form onSubmit={(e)=>this.submit(e,this.state.id)} class="row g-3">
    <div className="col-md-6">
      <label htmlFor="inputname" class="form-label mb-3">Name</label>
      <input value={this.state.name} onChange={(e)=>this.setState({name:e.target.value})} type="Text" class="form-control" id="inputname" />
         <div style={{fontSize: 12, color: "red"}}>
           {this.state.nameError}
           </div>
        
    </div>
    <div class="col-md-6">
      <label for="inputdob" class="form-label mb-3">Date of Birth</label>
      <input value={this.state.dob} onChange={(e)=>this.setState({dob:e.target.value})} type="date" class="form-control" id="inputdob" required/>
    </div>
    
    <div class="col-md-6 " id="classbox">
      <label htmlFor="inputClass" class="form-label">Class</label>
      <select value={this.state.classn} onChange={(e)=>this.setState({classn:e.target.value})} class="form-select m-3 pl-3" aria-label="Default select example">
      <option>Select class</option>
      <option>I</option>
      <option>II</option>
      <option>III</option>
      <option>IV</option>
      <option>V</option>
      <option>VI</option>
      <option>VII</option>
      <option>VIII</option>
      <option>IX</option>
      <option>X</option>
      <option>XI</option>
      <option>XII</option>
    </select>
    </div>
    <div className="col-md-6">
      <label htmlFor="inputAddress2" className="form-label">Section</label>
      <select value={this.state.section} onChange={(e)=>this.setState({section:e.target.value})} class="form-select-lg m-3 pl-3">
      <option>Selected section</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
      </select>
    </div>
 
  <div className="col-md-6">
    <label htmlFor="inputZip" class="form-label">Gender</label>
    <div className="form-check">
    <select value={this.state.gender} onChange={(e)=>this.setState({gender:e.target.value})} class="form-select-lg m-3 pl-3">
      <option>Select Gender</option>
      <option>Male</option>
      <option>Female</option>
      <option>Others</option>
      </select>
  </div>
  </div>
  
  <div className="col-12 m-3">
    <button type="submit" class="btn btn-primary">SUBMIT</button>
  </div>
</form>
</div>
 
<div className="details-table">
      <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">ClassNaclass</th>
      <th scope="col">Section</th>
      <th scope="col">Gender</th>
      <th scope="col">DOB</th>
    </tr>
  </thead>
  <tbody>
    {
      this.state.users.map(user =>
        <tr key={user.id}>
        <th scope="row">{user.name}</th>
        <td>{user.classn}</td>
        <td>{user.section}</td>
        <td>{user.gender}</td>
        <td>{user.dob}</td>
      </tr>
        )
    }
   
  
  </tbody>
</table>
      </div>
    </div>
    );
  }
}

export default App;