
const menuButton = document.getElementById("menu-button");
menuButton.addEventListener("click", function () {
	const menuText = document.getElementById("menu-text");
	const mobileMenu = document.getElementById("navbarToggler");

	if (menuText.textContent === "Menu") {
		menuText.textContent = "Hide Menu";
		mobileMenu.classList.remove("collapse");

	}
	else {
		menuText.textContent = "Menu";
		mobileMenu.classList.add("collapse");
	}
});
