window.addEventListener("DOMContentLoaded", function () {
	netlifyInit();
	// mobileMenu();
});

// function mobileMenu() {
// 	const navToggler = document.getElementById("nav_toggler");
// 	const navList = document.getElementsByClassName("nav_list")[0];
// 	navToggler.addEventListener("click", function () {
// 		if (navToggler.innerText === "Menu") {
// 			navList.classList.toggle("mobileShown");
// 			navToggler.innerText = "Hide Menu";
// 			navToggler.setAttribute("aria-expanded", true)
// 		}
// 		else if (navToggler.innerText === "Hide Menu") {
// 			navList.classList.toggle("mobileShown");
// 			navToggler.innerText = "Menu";
// 			navToggler.setAttribute("aria-expanded", false)

// 		}
// 	});
// }

function netlifyInit() {
	if (window.netlifyIdentity) {
		window.netlifyIdentity.on("init", user => {
			if (!user) {
				window.netlifyIdentity.on("login", () => {
					document.location.href = "/admin/";
				});
			}
		});
	}
}
