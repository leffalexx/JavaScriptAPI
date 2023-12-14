import data from './data.json' assert {type: 'json'};
const scheduleData = data;

function createSchedule(scheduleData) {
    const scheduleItem = document.querySelector('.schedule');

    scheduleData.forEach(item => {

        scheduleItem.insertAdjacentHTML('beforeend', `

        <div class="schedule_item-box" id="${item.name}">
			<div class="schedule_item">
            <p class="schedule_item-title">${item.name}</p>
            <p class="schedule_item-time">${item.time}</p>
			<p class="schedule_item-maxnumber">Максимальное количество участников: <span>${item.maxParticipants}</span></p>
            <p data-id=${item.id} class="schedule_item-currentnumber">Текущее количество записанных участников: <span>${item.currentParticipants}</span></p>
            <div class="button-box">
            <button class="button-submit" id="${item.id}">Записаться</button>
            <button class="button-reject disabled" data-id="${item.name}">Отменить запись</button>
            </div>
		</div>

        `)

        if (Number(item.maxParticipants) === Number(item.currentParticipants)) {
            const submitButton = document.getElementById(`${item.id}`);
            submitButton.classList.add('disabled');
        }
    });
}

createSchedule(scheduleData);

const scheduleItem = document.querySelector('.schedule');

scheduleItem.addEventListener('click', function (e) {
    if (e.target.classList.contains('button-submit')) {
        scheduleData[e.target.id - 1].currentParticipants = Number(scheduleData[e.target.id - 1].currentParticipants) + 1;
        const currentParticipants = document.querySelector(`[data-id="${e.target.id}"]`);
        const span = currentParticipants.querySelector('span');
        span.textContent = scheduleData[e.target.id - 1].currentParticipants;

        const currentSubmitButton = document.getElementById(`${e.target.id}`);
        currentSubmitButton.classList.add('disabled');
        currentSubmitButton.nextElementSibling.classList.remove('disabled');
    }
    if (e.target.classList.contains('button-reject')) {

        console.log(scheduleData);

        let currentscheduleDataItem = scheduleData.filter(item => item.name === e.target.dataset.id);
        let index = Number(currentscheduleDataItem[0].id) - 1;
        scheduleData[index].currentParticipants = scheduleData[index].currentParticipants - 1;

        const currentParticipants = document.querySelector(`[data-id="${index + 1}"]`);
        const span = currentParticipants.querySelector('span');
        span.textContent = scheduleData[index].currentParticipants;

        const currentRejectButton = document.querySelector(`[data-id="${e.target.dataset.id}"]`);
        currentRejectButton.classList.add('disabled');
        currentRejectButton.previousElementSibling.classList.remove('disabled');
    }
});
