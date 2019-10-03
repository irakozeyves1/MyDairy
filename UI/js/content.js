// story function
let editMode = false;

const update = document.querySelector(".js-edit-story");


const modifyStory = (e) => {
	const el = document.querySelector(".js-story-content");
	if (!editMode) {
		const range = document.createRange();
		const sel = window.getSelection();
		range.setStart(el.childNodes[0], 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		el.focus();
		e.target.innerHTML = "Save";
		editMode = true;
	}
	else {
		/* perform fetch operation */
		e.target.innerHTML = "Update";
		editMode = false;
		window.focus();
	}
};


if (update) update.addEventListener('click', modifyStory);