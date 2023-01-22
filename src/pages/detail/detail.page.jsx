import React from 'react';
import CarService from '../../services/car.service';

export default class DefaultPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      car: JSON.parse(localStorage.getItem('currentCar')),
      clients: [],
    };
  }

  componentDidMount() {
    this.findClientsOfCar();
  }

  findClientsOfCar() {
    CarService.filterClients(this.state.id).then(clients => {
      this.setState({clients: clients.data});
    });
  }

  render() {
    const {clients} = this.state;
    return (
      <div className="col-md-12">
        <div className="jumbotron">
          <h1 className="display-4">Car: {this.state.car.name}</h1>
          <h1 className="display-4">Car Id: {this.state.id}</h1>
        </div>
        {clients.length &&
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Client Name</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) =>
                <tr key={client}>
                  <th scope="row">{index + 1}</th>
                  <td>{client}</td>
                </tr>
              )}
            </tbody>
          </table>
        }
      </div>
    );
  }

}
