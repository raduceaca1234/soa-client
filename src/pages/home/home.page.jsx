import React from 'react';
import UserService from '../../services/user.service';
import CarService from '../../services/car.service';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      errorMessage: '',
      infoMessage: '',
      currentUser: new User()
    };
  }

  componentDidMount() {
    UserService.currentUser.subscribe(data => {
      this.setState({
        currentUser: data
      });
    });

    this.getAllCars();
  }

  getAllCars() {
    this.setState({
      cars: {loading: true}
    });

    CarService.findAllCars().then(cars => {
      this.setState({cars: cars.data});
    });
  }

  enroll(car) {
    if(!this.state.currentUser){
      this.setState({errorMessage: 'To buy a car, you should sign in.'});
      return;
    }

    var transaction = new Transaction(this.state.currentUser.id, car);
    CarService.createTransaction(transaction).then(data => {
      this.setState({infoMessage: 'You enrolled the car successfully.'});
    }, error => {
      this.setState({errorMessage: 'Unexpected error occurred.'});
    });
  }

  detail(car) {
    localStorage.setItem('currentCar', JSON.stringify(car));
    this.props.history.push('/detail/' + car.id);
  }

  render() {
    const {cars, infoMessage, errorMessage} = this.state;
    return (
      <div className="col-md-12">
        {infoMessage &&
          <div className="alert alert-success">
            <strong>Successfull! </strong>{infoMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        {errorMessage &&
          <div className="alert alert-danger">
            <strong>Error! </strong>{errorMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        {cars.loading && <em> Loading cars...</em>}
        {cars.length &&
        <div style={{marginTop: 50}}>
          <h2 style={{marginBottom: 60}}>Welcome to our website! Please choose your favorite car from our list:</h2>
          <table className="table table-striped">
            <thead>
              <tr> 
                <th scope="col">#</th>
                <th scope="col">Car Name</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Details</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) =>
                <tr key={car.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{car.name}</td>
                  <td>{car.type}</td>
                  <td>${car.price}/day</td>
                  <td>
                    <button className="btn btn-info" onClick={()=>this.detail(car)}>Detail</button>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={()=>this.enroll(car)}>Buy</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        }
      </div>
    );
  }
  
}
