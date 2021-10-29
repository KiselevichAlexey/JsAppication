export default {
  async getData(url) {
	let response = null;
	await fetch(url)
	  .then((response) => {
		if (response.ok) {
		  return response.json();
		}else {
		  throw new Error(response.status);
		}
	  })
	  .then((data) => {
		return (response = data);
	  })
	  .catch (error=>{
		console.log('Возникла проблема с вашим fetch запросом: ', error.message);
		return response = false
	  })
	return response;
  },
  getUsersList() {
	const url = "https://json.medrating.org/users/";
	return this.getData(url);
  },
  getUserAlbumList(userId) {
	const url = `https://json.medrating.org/albums?userId=${userId}`;
	return this.getData(url);
  },
  getUserPhotoList(albumId) {
	const url = `https://json.medrating.org/photos?albumId=${albumId}`;
	return this.getData(url);
  },
  getFavoritePhoto (){
	return JSON.parse(localStorage.getItem('PhotoFavorite'))
  },
  setFavoritePhoto (data){
	 localStorage.setItem('PhotoFavorite',JSON.stringify(data))
  }
};
