document.addEventListener('DOMContentLoaded', () => {

    // Leer el local storage
    let cropsLocalStrg = JSON.parse(window.localStorage.getItem('crops')) || [];
    let costsLocalStrg = JSON.parse(window.localStorage.getItem('costs')) || [];
    let tracingLocalStrg = JSON.parse(window.localStorage.getItem('tracing')) || [];
    let userObj = JSON.parse(window.localStorage.getItem('user')) || {};

    // Poner Id al elemento del nombre
    console.log({ costsLocalStrg });
    console.log({ cropsLocalStrg });
    console.log({ tracingLocalStrg });

    const cropsForm = document.getElementById('cropsForm');
    const costsForm = document.getElementById('costsForm');
    const tracingForm = document.getElementById('tracingForm');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const url = `${location.pathname}`.split('/');
    console.log(url);

    if (cropsForm) {

        /* if (Object.keys(userObj).length === 0) {
            window.location.href =  '/';
        } */

        const cropsTable = document.getElementById('cropsTable');
        const tableBody = cropsTable.querySelector('tbody');

        for (let i = 0; i <= cropsLocalStrg.length; i++) {
            let trElement = document.createElement('tr');

            for (const key in cropsLocalStrg[i]) {
                const tdElement = document.createElement('td');
                const element = cropsLocalStrg[i][key];

                tdElement.textContent = element;

                trElement.appendChild(tdElement);
            }
            tableBody.appendChild(trElement);
        }

        cropsForm.addEventListener('submit', (e) => {

            const cropObj = {
                id: cropsLocalStrg.length + 1,
                date: new Date(),
                soil: "",
                seedType: "",
                fertilizerQuantity: 0,
                aditionalInformation: ""
            }

            for (let i = 0; i <= e.target.elements.length; i++) {
                let element = e.target.elements[i];

                if (cropObj.hasOwnProperty(element?.name)) {
                    cropObj[element.name] = element.value;
                }
            }

            cropsLocalStrg.push(cropObj);
            window.localStorage.setItem("crops", JSON.stringify(cropsLocalStrg));
        });
    }

    if (costsForm) {

        /* if (Object.keys(userObj).length === 0) {
            window.location.href = '/';
        } */

        const cropsTable = document.getElementById('costsTable');
        const tableBody = cropsTable.querySelector('tbody');

        for (let i = 0; i <= costsLocalStrg.length - 1; i++) {

            let trElement = document.createElement('tr');
            let totalCost = 0;

            for (const key in costsLocalStrg[i]) {
                const tdElement = document.createElement('td');
                const element = costsLocalStrg[i][key];

                if (key == 'crop') {
                    let { date, seedType } = cropsLocalStrg.find(({ id }) => id == element);
                    tdElement.textContent = `${seedType} - ${date}`; 

                } else {
                    if (key != 'id')
                        totalCost += +element;

                    tdElement.textContent = element;
                }
                trElement.appendChild(tdElement);
            }

            let tdTotalCost = document.createElement('td');
            tdTotalCost.textContent = totalCost;

            trElement.appendChild(tdTotalCost);
            tableBody.appendChild(trElement);
        }

        // Llena el select con los cultivos existentes
        const cropsSelect = costsForm.querySelector('select');

        for (let i = 0; i <= cropsLocalStrg.length - 1; i++) {

            let crop = cropsLocalStrg[i];
            let optionElement = document.createElement('option');

            optionElement.value = crop.id;
            optionElement.textContent = `${crop.id} - ${crop.seedType} - ${crop.date}`;

            cropsSelect.appendChild(optionElement);
        }

        // Agrega el evento al formulario
        costsForm.addEventListener('submit', (e) => {

            const costObj = {
                id: costsLocalStrg.length + 1,
                crop: '',
                fertilizerCost: 0,
                labourCost: 0,
                fungicideCost: 0,
                otherCosts: 0
            }

            for (let i = 0; i <= e.target.elements.length; i++) {
                let element = e.target.elements[i];

                if (costObj.hasOwnProperty(element?.name)) {
                    costObj[element.name] = element.value;
                }
            }
            
            costsLocalStrg.push(costObj);
            window.localStorage.setItem("costs", JSON.stringify(costsLocalStrg));
        });

    }

    if (tracingForm) {

        if (Object.keys(userObj).length === 0) {
            window.location.href = '/';
        }
        
        const tracingTable = document.getElementById('tracingTable');
        const tableBody = tracingTable.querySelector('tbody');

        for (let i = 0; i <= tracingLocalStrg.length; i++) {
            let trElement = document.createElement('tr');

            for (const key in tracingLocalStrg[i]) {
                const tdElement = document.createElement('td');
                const element = tracingLocalStrg[i][key];

                if (key == 'crop') {
                    let { date, seedType } = cropsLocalStrg.find(({ id }) => id == element);
                    tdElement.textContent = `${seedType} - ${date}`; 

                } else {
                    tdElement.textContent = element;
                }

                trElement.appendChild(tdElement);
            }
            tableBody.appendChild(trElement);
        }

        // Llena el select con los cultivos existentes
        const cropsSelect = tracingForm.querySelector('select');

        for (let i = 0; i <= cropsLocalStrg.length - 1; i++) {

            let crop = cropsLocalStrg[i];
            let optionElement = document.createElement('option');

            optionElement.value = crop.id;
            optionElement.textContent = `${crop.id} - ${crop.seedType} - ${crop.date}`;

            cropsSelect.appendChild(optionElement);
        }

        tracingForm.addEventListener('submit', (e) => {

            const tracingObj = {
                id: tracingLocalStrg.length + 1,
                crop: "",
                date: new Date(),
                stage: "",
                aditionalInformation: ""
            }

            for (let i = 0; i <= e.target.elements.length; i++) {
                let element = e.target.elements[i];

                if (tracingObj.hasOwnProperty(element?.name)) {
                    tracingObj[element.name] = element.value;
                }
            }

            tracingLocalStrg.push(tracingObj);
            window.localStorage.setItem("tracing", JSON.stringify(tracingLocalStrg));
        });
    }

    if (loginForm) {

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const user = {
                email: '',
                password: ''
            }

            let counter = 0;

            for (let i = 0; i <= e.target.elements.length; i++) {
                let element = e.target.elements[i];

                if (user.hasOwnProperty(element?.name) && userObj[element.name] == element.value) {
                    counter++;
                }
            }

            const url = `${window.location.pathname}`.split('/');
            console.log(url);

            if (counter >= 2) {
                url.length >= 3 ? `${window.location.origin}/${url[1]}/dashboard.html` : '/dashboard.html';
            } else {
                url.length >= 3 ? `${window.location.origin}/${url[1]}/index.html` : '/index.html';
            }
        });

    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const user = {
                name: '',
                lastName: '',
                email: '',
                password: ''
            }

            for (let i = 0; i <= e.target.elements.length; i++) {
                let element = e.target.elements[i];

                if (user.hasOwnProperty(element?.name)) {
                    user[element.name] = element.value;
                }
            }

            const url = `${window.location.pathname}`.split('/');
            window.localStorage.setItem("user", JSON.stringify(user));

            if (url.length >= 3) {
                console.log(`${window.location.origin}/${url[1]}/index.html`);
            }

            window.location.href = url.length >= 3 ? `${window.location.origin}/${url[1]}/index.html` : '/index.html';
        });
    }

});
