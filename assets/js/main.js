window.addEventListener("DOMContentLoaded", function () {
	netlifyInit();
	mobileMenu();
});

function mobileMenu() {
	const navToggler = document.getElementById("nav_toggler");
	const navList = document.getElementsByClassName("nav_list")[0];
	navToggler.addEventListener("click", function () {
		if (navToggler.innerText === "Menu") {
			navList.classList.toggle("mobileShown");
			navToggler.innerText = "Hide Menu";
		}
		else if (navToggler.innerText === "Hide Menu") {
			navList.classList.toggle("mobileShown");
			navToggler.innerText = "Menu";
		}
	});
}

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
