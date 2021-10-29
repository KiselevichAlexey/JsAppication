import Model from "./model.js";
import View from "./view.js";

export default {
	
	app: document.getElementById("app"),
	async catalogRoute(params) {
		document.querySelector('#catalog').classList.add('active');
		document.querySelector('#favorite').classList.remove('active')
		if(params){
			View.render('.popup','fullScreanPhoto',params);
		}else {
			View.render(app, "Loader",true)
			const catalog = await Model.getUsersList();
			View.render(app, "usersList", catalog);
		}
	},
	async favoriteRoute(params) {
		document.querySelector('#favorite').classList.add('active')
		document.querySelector('#catalog').classList.remove('active')
		if(params){
			View.render('.popup','fullScreanPhoto',params);
		}else {
			View.render(app, "Loader",true);
			View.render(app, "favorite", Model.getFavoritePhoto());
		}
	},

	addFavoriteBtnhandler(buttons){
		[...buttons].forEach((button)=>{
			
			button.addEventListener('click',()=>{
				const PhotoFavorite = Model.getFavoritePhoto()
				const data =JSON.parse(button.dataset.obj)
				const starIcon = button.querySelector('img');
				const empty ='./source/img/star_empty.png'
				const active ='./source/img/star_active.png'
				starIcon.classList.toggle('empty')
				if(starIcon.className){
					starIcon.setAttribute('src',active)
					PhotoFavorite[data.id]=data
				} else {
					starIcon.setAttribute('src',empty)
					PhotoFavorite.splice(data.id, 1)
				}
				Model.setFavoritePhoto(PhotoFavorite)
			})
		})
		
	},

	addBtnListener(buttons,templateName) {
		[...buttons].forEach((button) => {
			const panel = button.parentNode.querySelector(".panel");
			function showPanel() {
				button.classList.toggle("show");
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			}
			async function fetchChild() {
				View.render(panel, "Loader",true)
				const data = await Model[`getUser${templateName}`](button.dataset.id);
				View.render(panel, templateName, data);
				button.removeEventListener("click", fetchChild);
			}
			button.addEventListener("click", showPanel);
			button.addEventListener("click", fetchChild);
		});
	},

};
