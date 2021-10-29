import Router from './source/js/router.js'

(async ()=>{
	try{
		if(location.hash=='') location.hash ='/catalog'
		Router.init()
		 if(!localStorage.getItem('PhotoFavorite'))  localStorage.setItem('PhotoFavorite',JSON.stringify([]))
	   
		}
		
	catch{
		throw new Error('Произошла ошибка');
	}
})()
