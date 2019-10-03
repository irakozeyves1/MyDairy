// story function
let editMode = false;
const update = document.querySelector(".js-edit-story");
const modal= document.querySelector(".js-modal");
const Delete = document.querySelector(".js-delete-story");
const modalCancelBtn = document.querySelector(".js-cancel-modal");
const modalConfirmBtn = document.querySelector(".js-confirm-modal");


const showDeleteModal = (e) => {
	modal.style.display ='block';
};

const hideDeleteModal = (e) => {
	modal.style.display ='none';
};

const confirmDelete = (e) =>{
	modal.style.display ='none';
};


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
if (Delete) Delete.addEventListener('click', showDeleteModal);
if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', confirmDelete);
if (modalCancelBtn) modalCancelBtn.addEventListener('click', hideDeleteModal);