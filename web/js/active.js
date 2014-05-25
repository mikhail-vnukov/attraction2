$(document).ready(function(){
	var callbacks = $.Callbacks();

	var closeModalWindows = function() {
		$(".md-show").removeClass("md-show");
		window.overlay = false;
	}

	callbacks.add(closeModalWindows);
	var openModalWindow = function(el) {
		el.addClass("md-show");
		window.overlay = true;
	}

	var overlay = $(".md-overlay");
	overlay.click(function() {
		if (window.overlay) {
			callbacks.fire();
		}
	})	
	$(".close-button").click(closeModalWindows);

	function chargeForm($popupForm, $triggers) {

		$(".close-button").click(closeModalWindows);
		$triggers.click(function() {
			openModalWindow($popupForm);
		});

		function showErrorMessage() {
			$(".form-fail").addClass("md-show");
		}

		function showSuccessMessage() {
			$(".form-done").addClass("md-show");				
		}

		$("form").each(function() {
			var $form = $(this);
			$form.find("[type='submit']").click(function() {
			// $(this).parsley('validate');

				$.ajax({
						type: "POST",
						url: "send.php",
						data: $form.serialize(),
						success: function(data) {
							showSuccessMessage();
						}, 
						error: function(jqXHR, textStatus, errorThrown) {
							showErrorMessage();
						}

					});
				return false;
			});
		});

	};
	chargeForm($("#popup-form"), $(".trigger"));
	chargeForm($("#request-form"), $(".request-trigger"));


});