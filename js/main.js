document.addEventListener('DOMContentLoaded', () => {

    // Leer el local storage
    let cropsLocalStrg = JSON.parse(window.localStorage.getItem('crops')) || [];
    let costslocalStrg = JSON.parse(window.localStorage.getItem('costs')) || [];
    let userObj = JSON.parse(window.localStorage.getItem('user')) || {};

    // Poner Id al elemento del nombre

    console.log({ costslocalStrg });

    const cropsForm = document.getElementById('cropsForm');
    const costsForm = document.getElementById('cropsForm');

    if (cropsForm) {

        if (Object.keys(userObj).length === 0) {
            window.location.href = '/';
        }

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

        if (Object.keys(userObj).length === 0) {
            window.location.href = '/';
        }

    }

    const loginForm = document.getElementById('loginForm');

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

            console.log(counter);
            counter >= 2 ? window.location.href = '/dashboard.html' : window.location.href = '/';
        });

    }

    const registerForm = document.getElementById('registerForm');

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
            window.localStorage.setItem("user", JSON.stringify(user));
            window.location.href = '/';
        });
    }

});
