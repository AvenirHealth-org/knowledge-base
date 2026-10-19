// Adds an "Expand" button to each rendered mermaid diagram. It opens the SVG
// in a near-fullscreen dialog at natural size with zoom controls.
(function () {
	var zoom = 1;

	function openDialog(svg) {
		var dialog = document.createElement('dialog');
		dialog.className = 'diagram-dialog';
		var body = document.createElement('div');
		body.className = 'diagram-body';
		var copy = svg.cloneNode(true);
		copy.removeAttribute('style');
		body.appendChild(copy);

		// Mermaid sets width to 100% with a max-width; use the viewBox size instead.
		var vb = svg.viewBox && svg.viewBox.baseVal;
		var baseWidth = vb && vb.width ? vb.width : svg.getBoundingClientRect().width;
		zoom = 1;
		function apply() {
			copy.setAttribute('width', String(baseWidth * zoom));
			copy.removeAttribute('height');
		}
		apply();

		var tools = document.createElement('div');
		tools.className = 'diagram-tools';
		[['−', function () { zoom = Math.max(0.25, zoom - 0.25); apply(); }],
		 ['+', function () { zoom += 0.25; apply(); }],
		 ['Close', function () { dialog.close(); }]].forEach(function (b) {
			var btn = document.createElement('button');
			btn.type = 'button';
			btn.textContent = b[0];
			btn.addEventListener('click', b[1]);
			tools.appendChild(btn);
		});

		dialog.append(body, tools);
		dialog.addEventListener('close', function () { dialog.remove(); });
		dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
		document.body.appendChild(dialog);
		dialog.showModal();
	}

	function decorate(pre) {
		if (pre.dataset.expandReady || !pre.querySelector('svg')) return;
		pre.dataset.expandReady = 'true';
		var wrap = document.createElement('div');
		wrap.className = 'diagram-wrap';
		pre.parentNode.insertBefore(wrap, pre);
		wrap.appendChild(pre);
		var btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'diagram-expand';
		btn.textContent = 'Expand';
		btn.addEventListener('click', function () {
			var svg = pre.querySelector('svg');
			if (svg) openDialog(svg);
		});
		wrap.appendChild(btn);
	}

	function scan() {
		document.querySelectorAll('pre.mermaid[data-processed]').forEach(decorate);
	}

	new MutationObserver(scan).observe(document.documentElement, {
		subtree: true,
		childList: true,
		attributes: true,
		attributeFilter: ['data-processed'],
	});
	scan();
})();
