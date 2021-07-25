
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                // Get the first checkbox
                const c1 = form.querySelector('#check1');
                // Get the second checkbox
                const c2 = form.querySelector('#check2');
                const c3 = form.querySelector('#check3');
                const c4 = form.querySelector('#check4');
                const c5 = form.querySelector('#check5');
                const c6 = form.querySelector('#check6');
                const c7 = form.querySelector('#check7');
                // Detect if atleast one checkbox is checked
                const isCheckboxChecked = c1.checked || c2.checked || c3.checked || c4.checked || c5.checked || c6.checked || c7.checked;

                // If form is invalid or at least one checkbox is not checked -> fail validation
                if (isCheckboxChecked === false) {
                    const p = form.querySelector('#EQ');
                    p.style.color = 'red';
                }
                if (form.checkValidity() === false || isCheckboxChecked === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

