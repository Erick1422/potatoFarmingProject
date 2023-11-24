// import DataTable from './demo/datatables-demo';

document.addEventListener('DOMContentLoaded', () => {

    // Leer el local storage
    let cropsLocalStrg = JSON.parse(window.localStorage.getItem('crops')) || [];
    console.log({ cropsLocalStrg });

    let costslocalStrg = JSON.parse(window.localStorage.getItem('costs')) || [];

    const cropsForm = document.getElementById('cropsForm');
    const costsForm = document.getElementById('cropsForm');

    function addItems (params) {
        
    }

    if (cropsForm) {

        cropsForm.addEventListener('submit', (e) => {
            e.preventDefault();

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

            console.log(cropsLocalStrg);
        });

        // llenar la tabla con la data del local storage
    }

    if (costsForm) {

    }

});