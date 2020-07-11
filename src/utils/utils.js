const fetchProducts = async () => {
	const data = await fetch("https://raw.githubusercontent.com/arnavozil/ecommerce-database/master/db.json");
	if(data.status === 200){
		const d = await data.json();
		console.log(d);
	}
};


export default fetchProducts;