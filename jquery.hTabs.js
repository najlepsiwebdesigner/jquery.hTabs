/*
 * jQuery plugin  
 * 
 * Description: Simpe plugin to transform element to tabs GUI element,
 * <h2>blah</h2> elements are considered tab starts, 
 * anything after it until next <h2>uff</h2> 
 * will be content of "blah" tab. Anything after "uff" header will be content of "uff" tab.:D
 * 
 * Version: 0.4
 *
 * Author: Peter Beno, najlepsiwebdesigner@gmail.com
 *
 * Revisions: 
 *
 * TODO: Param to set element name instead of just 'h2' constant
 * 
 * References:	FREE FOR ANYTHING
 *
 * EXAMPLE:
 *	code:
 	<div class="simpleTabs">
 		<h2>contact</h2>
 			<p>some contact</p>
 			<img ../>
 		<h2>about</h2>
 			<div>blah</div>
 	</div>
 	<script>
 		
 	renders as:
 		__________________
 	       | contact | about |
 	|	some contact                 |
 *
 */
(function($) {
    $.fn.hTabs = function(options) {
	// plugin default options
        var opts = {
		activeTabClass	:	'activetab',
		hoverTabClass	:	'hovertab',
		initialTab : 1,
		displayHeadings : false,
		evtType : 'click'
		element
        };

    	// extends defaults with options provided
	if (options) {
		$.extend(opts, options);
	}

	// iterate over matched elements
        return this.each(function() {
		_init($(this), opts);
        });

    };


	// creates html structure
	function _init(e, opts) {
		if (e.find('.tabsHeading').length > 0) {
			return false;
		}
		// zoberiem si cely html obsah rieseneho elementu a nahradim v nom tagy tak, ako to potrebujem
		$content = e.html();
		$h2 = e.find('h2');
		$headingNum = e.find('h2').size();
		$headings = '<ul class="tabsHeading">';
		for ($i = 0; $i < $headingNum; $i++) {		
			if ($.browser.msie) {
				$headings += '<li rel="' + ($i + 1) + '">' + $($h2[$i]).text() + '</li>';
				$content = $content.replace('</H2>','</HEADING><DIV class="tab">');
				$content = $content.replace('<H2', (($i == 0) ? '<HEADING class="heading"' : '</DIV><HEADING class="heading"'));
				$content = $content.replace('</h2>', '</heading><div class="tab">');
				$content = $content.replace('<h2', (($i == 0) ? '<heading class="heading"' :'</div><heading class="heading"'));
			}
			else {
				$headings += '<li rel="' + ($i + 1) + '">' + $($h2[$i]).text() + '</li>';
				$content = $content.replace('</h2>', '</heading><div class="tab">');
				$content = $content.replace('<h2', (($i == 0) ? '<heading' :'</div><heading'));
			}
		}
		$headings += '</ul>';
		$content = $headings + $content + '</div>';
		// vlozim modifikovany obsah spat do elementu
		e.empty().append($content);

	   	if (!opts.displayHeadings) {
	   		e.find('heading').hide();
		}
			             
		// ostranim prazdne elementy, aby mi nerobili neplechu
		$('.tab, .tabsHeading').each(function($key) { // not tested selectors
			if ($(this).text().length == 0) {
				$(this).remove();
			}
		});
		// vytvorim zoznam kariet
		if (e.find('.tabsHeading li').length > 1) {
			e.find('.tabsHeading li').bind(opts.evtType, function() {
				_showTab($(this).parent().parent(), $(this).attr('rel'));
				  //$('#adminContent').hTabs({initialTab:1});
			});
		}
		// zobrazim prvy tab
		_showTab(e, opts.initialTab);
	}
	
	
	// funkcia nastavi aktivny tab 
	function _showTab(e, $tabNum) {
		if (e.find('.tabsHeading li').length > 1) {
			$tabs = e.find('.tab');
			$links = e.find('.tabsHeading li');
			$j=0;
			//$tabs.hide();
			//e.find('.tab').hide();
			//e.find('.tab :eq('+$tabNum+')').show();
			$tabs.each(function($key) {
				if ($j != (($tabNum * 1) - 1)) {
					$(this).hide();
				}
				else {
					$(this).show();
				}
				$j++;
			});
			if (e.find('.tabsHeading li').length > 1) {
				$j=0;
				$links.each(function($key) {
					if ($j != (($tabNum * 1) - 1)) {
						$(this).attr('class', '');
					}
					else {
						$(this).attr('class', 'active');
					}
					$j++;
				});
			}
		}
		else {
			e.find('.tabsHeading li').attr('class','active');
		}
	}
})(jQuery);