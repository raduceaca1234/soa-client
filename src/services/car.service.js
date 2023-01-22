import axios from 'axios';

let API_URL = 'http://localhost:8765/api/car/service/';

class CarService {
  createTransaction(transaction){
    return axios.post(API_URL + 'rent', JSON.stringify(transaction),
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  filterTransactions(userId){
    return axios.get(API_URL + 'user/'+ userId,
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  filterClients(carId){
    return axios.get(API_URL + 'car/' + carId,
  {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }

  findAllCars(){
    return axios.get(API_URL + 'all',
    {headers: {'Content-Type':'application/json; charset=UTF-8'}});
  }
}
export default new CarService();
