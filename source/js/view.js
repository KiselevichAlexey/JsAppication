import Controller from "./controller.js";
import Model from "./model.js";

export default {

  render(node, templateName, data = []) {
	const NODE = node;
	const PhotoFavorite = Model.getFavoritePhoto();

	if (data) {
	  switch (templateName) {
		case 'Loader':
			NODE.innerHTML=`
			<div class="loader">
				<img src="./source/img/loader.gif">
			</div>`
			break;	
		case "usersList":
		  let userList = "";

		  for (let { name, id } of data) {
			userList += `
			<li class="userlist__item">
				<button type="button" data-id=${id} class="btn show"></button>
					  	${name}
						  <div class="panel">
						  </div>
						  </li>`;
		  }
		  NODE.innerHTML = `<ul class="user-list">${userList}</ul>`;
		  const btns = NODE.querySelectorAll(".btn");
		  Controller.addBtnListener(btns, "AlbumList");
		  break;

		case "AlbumList":
		  let albumList = "";
		  for (let { title, id } of data) {
			albumList += `
				  <li class="album-list__item">
					<button type="button" data-id=${id} class="btn show"></button>
						${title}
					<div class="panel">
					</div>
				  </li>`;
		  }
		  NODE.innerHTML = `<ul class="album-list">${albumList}</ul>`;
		  Controller.addBtnListener(NODE.querySelectorAll(".btn"), "PhotoList");
		  break;

		case "PhotoList":
		  let photoList = "";
		  for (let photo of data) {
			photoList += `
						<div class="photo-wrapper" data-tooltip="${photo.title}">
											<button class="star" type="button" data-obj='${JSON.stringify(photo)}'>`;
			PhotoFavorite[photo.id]
			  ? (photoList += `<img  src="./source/img/star_active.png" alt="addfavorite">`)
			  : (photoList += `<img  src="./source/img/star_empty.png" alt="addfavorite">`);
			photoList += `</button>
			  <a href="#/catalog/${photo.url}"><img class="tooltip"  src="${photo.thumbnailUrl}" alt="${photo.title}"></a>
		</div>`;
		  }
		  NODE.innerHTML = ` 
		  <div class="photo-gallery">
		  ${photoList}
		 </div>`;
		  const btnList = NODE.querySelectorAll(".star");
		  Controller.addFavoriteBtnhandler(btnList);

		  break;

		case "favorite":
		  let getData = [...new Set(data)];
		  if (getData.length <= 1) {
			NODE.innerHTML = `
			<div class="not-favorite">
				<img src="./source/img/empty.png">
				<h2>Список избранного пуст</h2>
				<p>Добавляйте изображения, нажимая на звездочки</p>
			</div>`;
		  } else {
			let photoList = "";
			for (let i = 1; i < getData.length; i++) {
			  photoList += `
			  <div>
		   <div class="photo-wrapper" data-tooltip="${getData[i].title}">
				<button class="star" type="button" data-obj='${JSON.stringify(getData[i])}'>
					<img  src="./source/img/star_active.png" alt="addfavorite">
				</button>
				<a href="#/favorite/${getData[i].url}">
					<img class="tooltip"  src="${getData[i].thumbnailUrl}" alt="${getData[i].title}">
				</a>
		  </div>
		  <p class="card-title">${getData[i].title}</p> 
		  </div>
		  `;
			}
			NODE.innerHTML = ` 
				<div class="photo-gallery fav">
					${photoList}
				</div>`;

			Controller.addFavoriteBtnhandler(NODE.querySelectorAll(".star"));
		  }
		  break;
		case "fullScreanPhoto": {
		  const modalW = document.querySelector(NODE);
		  modalW.style.display = "flex";
		  modalW.innerHTML = `
				<div>
					<img src="${data}">
					<div class="close"></div>
				</div>
			`;
		  modalW.addEventListener("click", (e) => {
			e.currentTarget.style.display = "none";
		  });
		}
	  }
	} else {
	  NODE.innerHTML = `
	  <div class="error">
		<div>
		  <img src="./source/img/error.png" alt="Error">
		</div>
		<div>
		  <h4>Сервер не отвечает</h4>
		  <p>уже работаем над этим</p>
		</div>
	  </div>`;
	}
  },
};
