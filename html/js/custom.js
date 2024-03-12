$(document).ready(function () {
	//Prevent Page Reload on all # links
	$("body").on("click", "a[href='#']", function (e) {
		e.preventDefault();
	});

	//placeholder
	$("[placeholder]").each(function () {
		$(this).attr("data-placeholder", this.placeholder);
		$(this).bind("focus", function () {
			this.placeholder = '';
		});
		$(this).bind("blur", function () {
			this.placeholder = $(this).attr("data-placeholder");
		});
	});

	// On scroll Add Class
	$(window).scroll(function (e) {
		if ($(window).scrollTop() > 200) {
			$(".wrapper").addClass('page-scrolled');
		}
		else {
			$(".wrapper").removeClass('page-scrolled');
		}
	});

	// Add remove class when window resize finished
	var $resizeTimer;
	$(window).on("resize", function (e) {
		if (!$("body").hasClass("window-resizing")) {
			$("body").addClass("window-resizing");
		}
		clearTimeout($resizeTimer);
		$resizeTimer = setTimeout(function () {
			$("body").removeClass("window-resizing");
		}, 250);
	});

	// Add new js functions here -----------------------------------------------------------------
	var $mainClass = $(".tab-heading");
	$mainClass.each(function () {
		var $tab = $(this);
		function ulWidth() {
			var navW = 0;
			$tab.find("> .nav-tabs > a").each(function () {
				navW = navW + $(this).outerWidth(true);
			});
			$tab.find("> .nav-tabs").css({ "width": navW + 5 });
		}
		ulWidth();
		$(window).resize(function () {
			ulWidth();
		});

		$tab.jScrollPane({
			showArrows: true
		});

		function scrollAdj() {
			$tab.data('jsp').reinitialise();
		};
		scrollAdj();
		$(window).resize(function () {
			scrollAdj();
		});

		$tab.find(".nav-tabs a").click(function (e) {
			var $this = $(this);
			e.preventDefault();
			if ($tab.attr('active-center') == "true") {
				$tab.data('jsp').scrollByX(parseInt(($this.offset().left - $tab.offset().left) + ($this.innerWidth() / 2)) - ($tab.innerWidth() / 2));
			}
			$(window).resize();
		});
	});

	$(".right-menu-toggle").click(function () {
		$(".main-wrapper").toggleClass("right-side-open");
	});
	$(".right-menu-toggle,.close-filter,.close-filter-card").click(function () {
		$(".main-wrapper").removeClass("filter-card-open");
	});
	$(".filter").click(function () {
		$(".main-wrapper").toggleClass("filter-card-open");
	});
	$(".filter-overlay").click(function () {
		$(".main-wrapper").removeClass("right-side-open");
		$(".main-wrapper").removeClass("filter-card-open");
	});
	$(".menu-toggle").click(function () {
		$("body").addClass("menu-open");
	});
	$(".overlay").click(function () {
		$("body").removeClass("menu-open");
	});
	$(".search-btn").click(function () {
		$(".search").addClass("search-open");
	});

	$(".close").click(function () {
		$(".search").removeClass("search-open");
	});

	$("body").on("show.bs.select", ".custom-select", function () {
		$(this).closest(".bootstrap-select-outer").css({ "z-index": "1", "position": "relative" });
	})

	$("body").on("hide.bs.select", ".custom-select", function () {
		$(this).closest(".bootstrap-select-outer").css("z-index", "0");
	})

	$(".custom-select").selectpicker();






	// Don't add anything below this --------------------------------------------------------------
	// Add Class on Window Load
	$("body").addClass("page-loaded");
});