const uploadBtn = document.getElementById('uploadBtn');
const imgContainer = document.getElementById('img-container')
const customBtn = document.getElementById('custom-upload-btn');
const uploadValue = document.querySelector('.upload-value');
const submitBtn = document.getElementById('submit-btn');
const alert = document.querySelector('.alert');
let loadingComp = `<div class="lds-ellipsis">
<div></div>
<div></div>
<div></div>
<div></div>
</div>`
let uploadComp = `<i class="fas fa-upload"></i>
<label>UPLOAD</label>`

customBtn.innerHTML = uploadComp



customBtn.addEventListener('click', () => {
    uploadBtn.click();
    return false;
})




uploadBtn.addEventListener('change', ({ target }) => {
    customBtn.innerHTML = loadingComp
    let value = target.value.split("\\");
    let filename = value[2];
    if (!filename) return false;
    console.log(filename)
    let imgFile = target.files
    uploadValue.style.opacity = 1
    uploadValue.innerText = filename
    setTimeout(() => {
        uploadImage(imgFile);
    }, 2000)
})

async function uploadImage(file) {
    const formData = new FormData()
    formData.append('image', file[0])
    console.log(file[0])
    try {
        const res = await fetch(`http://localhost:4000/upload`, {
            method: 'POST',
            body: formData
        })
        if (res.status === 200) {
            alert.classList.add('show');
            customBtn.innerHTML = uploadComp
            setTimeout(() => {
                imgContainer.innerHTML = `<img src="img/uploaded.${file[0].name.split('.')[1]}" alt="" width="300">`

            }, 500)
            setTimeout(() => {
                alert.classList.remove('show');
            }, 3000)
        }

    } catch (err) {
        console.log(err)
    }



}