import React, { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Side from './components/Side/Side';
import Main from './components/Main/Main';


const App = () => {

	const [products, setProducts] = useState(false);
	const [productsToDisplay, setProductsToDisplay] = useState(false);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [minRating, setMinRating] = useState(0);
	const [freeDelivery, setFreeDelivery] = useState(false);
	const [sort, setSort] = useState({
		value: false,
		order: false
	});
	const [searchString, setSearchString] = useState('');

	//useEffect hook that fires on any filter value or sort value change
	useEffect(() => {

		let filteredProducts = [];

		if(!products){
			return;
		}

		filteredProducts = filterByPrice(products, minPrice, maxPrice);
		filteredProducts = filterByRating(filteredProducts, minRating);
		filteredProducts = filterByDelivery(filteredProducts, freeDelivery);

		if(sort.value === 'price'){
			sortByPrice(filteredProducts, sort.order);
		}else if(sort.value === 'rating'){
			sortByRating(filteredProducts, sort.order);
		};
		setProductsToDisplay(filteredProducts);
	
	}, [minPrice, maxPrice, minRating, freeDelivery, sort])


	//useEffect hook that fires on header search change
	useEffect(() => {
		setSearchedProducts(products, searchString);
	}, [searchString])

	const fetchProducts = async () => {
		const data = await fetch("https://raw.githubusercontent.com/arnavozil/ecommerce-database/master/db.json");
		if(data.status === 200){
			const d = await data.json();
			setProducts(d.selection1);
			setProductsToDisplay(d.selection1);
		}
	};
	

	//sets displayProducts state array to products that includes searchString
	const setSearchedProducts = (products, string) => {
		if(!products || !string){
			return;
		}

		const filteredArray = products.filter(p => {
			const { selection2 } = p;
			return selection2[0].name.toLowerCase().includes(string.toLowerCase())
			 || selection2[1].name.toLowerCase().includes(string.toLowerCase());
		});
		setProductsToDisplay(filteredArray);
	}

	//returns an array of items filterd by price (less than)
	const filterByPrice = (products, min, max) => {
		if(!products){
			return;
		}

		const filteredArray = [];
		products.forEach(p => {
			const { selection4 } = p;
			if(parseInt(selection4, 10) <= max && parseInt(selection4, 10) >= min){
				filteredArray.push(p);
			}
		})
		return filteredArray;
	}


	//returns an array of items filtered by rating (greater than)
	const filterByRating = (products, rating) => {
		if(!products){
			return;
		}

		if(rating === 0){
			return products;
		}

		const filteredArray = [];
		products.forEach(p => {
			const { selection3 = "0.0 0" } = p;
			if(parseFloat(selection3.split(" ")[0]) >= rating){
				filteredArray.push(p);
			}
		})
		return filteredArray;
	}

	
	//returns an array of items that have free delivery
	const filterByDelivery = (products, flag) => {
		if(!products){
			return products;
		}

		if(!flag){
			return products;
		}

		const filteredArray = [];
		products.forEach(p => {
			const { selection5 = '' } = p;
			if(selection5){
				filteredArray.push(p);
			}
		})
		return filteredArray;
	}

	//sorts all products inplace by price 
	const sortByPrice = (products, order) => {
		if(!products || !order){
			return;
		}

		products.sort((a, b) => {
			if(order === 'asc'){
				return parseInt(a.selection4, 10) - parseInt(b.selection4, 10);
			}else{
				return parseInt(b.selection4, 10) - parseInt(a.selection4, 10);
			}
		})
	}

	//sorts all products inplace by rating
	const sortByRating = (products, order) => {
		if(!products || !order){
			return;
		}

		products.sort((a, b) => {

			a.selection3 = a.selection3 || '0.0 0';
			b.selection3 = b.selection3 || '0.0 0';

			if(order === 'asc'){
				return parseFloat(a.selection3.split(" ")[0]) - parseFloat(b.selection3.split(" ")[0]);
			}else{
				return parseFloat(b.selection3.split(" ")[0]) - parseFloat(a.selection3.split(" ")[0]);
			}
		})
	}

	useEffect(() => {
		fetchProducts();
	}, []);

	const onChangePrice = ({target}, min = false) => {
		const price = parseInt(target.value, 10);
		if(!price){
			return;
		}

		if(min){
			setMinPrice(price);
		}else{
			setMaxPrice(price);
		}
	}

	const onChangeRating = ({target}) => {
		const rating = parseFloat(target.value);
		if(!rating){
			return;
		}

		setMinRating(rating);
	}

	const onChangeDelivery = () => setFreeDelivery(!freeDelivery);

	const onChangeSort = (value, order) => setSort({value, order});

	const onSearchStringChange = ({target}) => setSearchString(target.value);

	return (
		<div>
			<Header searchString={searchString} onSearchStringChange={onSearchStringChange} />
			<Side
			 onChangePrice={onChangePrice} 
			 minPrice={minPrice} 
			 maxPrice={maxPrice}
			 rating={minRating}
			 onChangeRating={onChangeRating}
			 onChangeDelivery={onChangeDelivery}
			 delivery={freeDelivery}
			 onChangeSort={onChangeSort}
			 sortObject={sort}
			/>
			{productsToDisplay?<Main products={productsToDisplay} />:<p>Loading...</p>}
		</div>
	);
}

export default App;
