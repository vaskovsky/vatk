/*! Copyright © 2017, 2021 Alexey Vaskovsky. Released under the MIT license */
if(!window.VATK)
{
	window.VATK =
	{
		fonts:
		[
			{family: "sans-serif", size: "14pt"},
			{family: "sans-serif", size: "16pt"},
			{family: "sans-serif", size: "18pt"}
		],
		colors:
		[
			{foreground: "black", background: "white"},
			{foreground: "white", background: "black"},
			{foreground: "darkblue", background: "cyan"}
		],
		ignore: [".fa", ".glyphicon", ".dashicons"],
		message:
		(
			/^ru\b/.test(navigator.language)?
			{
				title: "Версия сайта для слабовидящих",
				font: "Размер шрифта",
				color: "Цветовая схема"
			}:
			{
				title: "Accessibility Toolkit",
				font: "Font size",
				color: "Color scheme"
			}
		),
		getPanelHTML: function()
		{
			var fonts = "";
			for(var i = 0; i < this.fonts.length; i++)
				fonts += 
					'<button id="vatkFont' + i + '" class="vatkOption"' +
						' style="font-family:' + this.fonts[i].family +
							';font-size:' + this.fonts[i].size + '"' +
						' onclick="VATK.setFont(' + i + ')">' +
						'A' +
					'</button> ';
			var colors = "";
			for(var j = 0; j < this.colors.length; j++)
				colors += 
					'<button id="vatkColor' + i + '" class="vatkOption"' +
						' style="color:' + this.colors[j].foreground +
							';background:' + this.colors[j].background + '"' +
						' onclick="VATK.setColor(' + j + ')">' +
						'A' +
					'</button> ';
			return '<div id="vatkPanel">' +
				'<div id="vatkTitle" class="vatkBlock">' +
					this.message.title +						
				'</div>' +
				'<div class="vatkBlock">' +
					this.message.font + ": " + fonts +
				'</div> ' +
				'<div class="vatkBlock">' +
					this.message.color + ": " + colors +
				'</div> ' +
			'</div>';
		},
		setFont: function(i)
		{
			localStorage.setItem("VATK.font", i);
			this.setActive(true);
		},
		setColor: function(i)
		{
			localStorage.setItem("VATK.color", i);
			this.setActive(true);
		},
		isActive: function()
		{
			return "true" == localStorage.getItem("VATK.active");
		},
		setActive: function(value)
		{
			localStorage.setItem("VATK.active", value);
			$("#openVATK").css("display", value? "none": "inline-block");
			$("#closeVATK").css("display", value? "inline-block": "none");
			if(value)
			{
				var font = parseInt(localStorage.getItem("VATK.font") || "0");
				var color = parseInt(localStorage.getItem("VATK.color") || "0");
				$("#vatkPanel").css("display", "block");
				$("*").not(VATK.ignore.join(",")+",.vatkOption").each(function()
				{
					$(this).css("font-family", VATK.fonts[font].family);
					$(this).css("font-size", VATK.fonts[font].size);
					$(this).css("color", VATK.colors[color].foreground);
					$(this).css("border-color", VATK.colors[color].foreground);
					$(this).css("background", VATK.colors[color].background);
					$(this).css("line-height", "normal");
					$(this).css("letter-spacing", "normal");
					$(this).css("box-shadow", "none");
					$(this).css("text-shadow", "none");
				});
			}
			else location.reload(0);		
		}		
	}
}
$(function()
{
	$(VATK.getPanelHTML()).prependTo("body");
	if(VATK.isActive()) VATK.setActive(true);
	$("#faVATK").html(
		'<i id="openVATK" class="fa fa-eye"></i>'+
		'<i id="closeVATK" class="fa fa-eye-slash"></i>');
	$("#glyphiconVATK, .btn-vatk").html(
		'<span id="openVATK" class="glyphicon glyphicon-eye-open"></span>'+
		'<span id="closeVATK" class="glyphicon glyphicon-eye-close"></span>');
	$("#dashiconsVATK").html(
		'<span id="openVATK" class="dashicons dashicons-visibility"></span>'+
		'<span id="closeVATK" class="dashicons dashicons-hidden"></span>');
	$("#faVATK,#glyphiconVATK,.btn-vatk,#dashiconsVATK").click(function(e)
	{
		e.preventDefault();
		VATK.setActive(!VATK.isActive());
	});
	$("#openVATK").click(function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		VATK.setActive(true);
	});
	$("#closeVATK").click(function(e)
	{
		e.preventDefault();
		e.stopPropagation();
		VATK.setActive(false);
	});
});
