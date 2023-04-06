import React, {useState} from 'react';
import './App.css';

const initialCar = {
	userName: '',
	volume: '',
	userYear: '',
	produser: '',
	color: '',
	price: '',
	info: ''
}

function App() {
	const [userData, setUserData] = useState(initialCar);
	const [cars, setCars] = useState([]);
	const [editCarData, setEditCarData] = useState({
		isEdit: false,
		carIndex: null
	})

	const handleRemoveClick = ({index}) => {
		setCars(cars.filter((car, carIndex) => carIndex !== index));
	}

	const isFilledFields = userData.userName && userData.volume && userData.userYear && userData.produser && userData.color && userData.price && userData.info;

	const handleSubmitCar = (e) => {
		e.preventDefault();

		if (isFilledFields) {
			if (editCarData.isEdit) {
				const editedData = cars;
				editedData.splice(editCarData.carIndex, 1, userData);

				setCars(editCarData);

				setEditCarData({
					isEdit: false,
					carIndex: null
				})
			} else {
				setCars((prevState) => [...prevState, userData]);
			}			
			
			setUserData(initialCar)
				
		}
	}
	
	const handleCleanClick = () => setUserData(initialCar);

	const handleEditClick = (data, index) => {
		setUserData(data);
		setEditCarData({
			isEdit: true,
			carIndex: index
		})
	}

	console.log('cars', cars)
	return (
		
   <div className='wrapper'>
		<div className='wrapper-content'>
			<div className='table-data'>
				<h1>Каталог автомобилей</h1>
				<table>
					<th>№</th>
					<th>Марка</th>
					<th>Объём двигателя</th>
					<th>Год выпуска</th>
					<th>Производитель</th>
					<th>Цвет</th>
					<th>Стоимость</th>
					<th>Описание</th>
					<th>Actions</th>

					<tbody>
						{cars.map((car, index) => (
							<tr>
								<td>{index + 1}</td>
								<td>{car.userName}</td>
								<td>{car.volume}</td>
								<td>{car.userYear}</td>
								<td>{car.produser}</td>
								<td>{car.color}</td>
								<td>{car.price}</td>
								<td>{car.info}</td>
								<td>
									<div>
										<button className='edit' onClick={() => handleEditClick(car, index)}>Редактировать</button>
										<button className='remove' onClick={() => handleRemoveClick(index)}>Удалить</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div>
				<form onSubmit={handleSubmitCar} onReset={handleCleanClick}>
					<input placeholder='Марка' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						userName: e.target.value
					}) )}
					value={userData.userName}
					></input>
					<input placeholder='Объём двигателя' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						volume: e.target.value
					}) )}
					value={userData.volume}
					></input>
					<input placeholder='Год выпуска' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						userYear: e.target.value
					}) )}
					value={userData.userYear}
					></input>
					<input placeholder='Производитель' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						produser: e.target.value
					}) )}
					value={userData.produser}
					></input>
					<input placeholder='Цвет' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						color: e.target.value
					}) )}
					value={userData.color}
					></input>
					<input placeholder='Стоимость' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						price: e.target.value
					}) )}
					value={userData.price}
					></input>
					<input placeholder='Описание' onChange={(e)=> setUserData((prevState) => ({
						...prevState,
						info: e.target.value
					}) )}
					value={userData.info}
					></input>

					<div className='btn-wrapper'>
						<button type='reset'>Очистить</button>
						<button disabled={!isFilledFields} type='submit'>Добавить</button>
					</div>
				</form>
			</div>
		</div>
    </div>
  );
}

export default App;
