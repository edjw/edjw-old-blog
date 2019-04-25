if (window.netlifyIdentity) {
	window.netlifyIdentity.on("init", user => {
		if (!user) {
			window.netlifyIdentity.on("login", () => {
				document.location.href = "/admin/";
			});
		}
	});
}

// Scroll Indicator across top of page
function moveScrollIndicator() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	document.getElementById("scroll_indicator").style.width = scrolled + "%";
}
if (document.getElementById("scroll_indicator")) {
	window.onscroll = function () {
		moveScrollIndicator();
	};
}

// Suggest horizontal scrolling
new ScrollHint(".js-scrollable", {
	suggestiveShadow: true
});
