import { catsData } from "/data.js"

const emotionRadios = document.getElementById("emotion-radios")
const getImage = document.getElementById("get-image-btn")
const memeModal = document.getElementById("meme-modal-inner")
const closeImageBtn = document.getElementById("meme-modal-close-btn")

const getMatchingCatsArr = () => {
    const checkedRadio = document.querySelector("input[type='radio']:checked")
    if (checkedRadio) { 
        const isChecked = document.querySelector("input[type='checkbox']").checked
        const cats = catsData.filter((cat) => {
            if (isChecked) {
                return cat.emotionTags.includes(checkedRadio.value.toLowerCase()) && cat.isGif
            } else {
                return cat.emotionTags.includes(checkedRadio.value.toLowerCase())
            } 
        })
        return cats
    }
}

const getSingleCat = () => {
    const cats = getMatchingCatsArr()
    if (cats.length === 1) {
        return cats[0]
    } else {
        const random = Math.floor(Math.random() * cats.length)
        return cats[random]
    }
}

const renderCat = () => {
    const catObj = getSingleCat()
    memeModal.innerHTML = 
    `<img
        class="cat-img"
        src="./images/${catObj.image}"
        alt="${catObj.alt}"
     >`
    document.getElementById("meme-modal").style.display = "flex"
}

getImage.addEventListener("click", renderCat)

closeImageBtn.addEventListener("click", () => {
    document.getElementById("meme-modal").style.display = "none"
})

const highlightCheckedOpt = (e) => {
    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

emotionRadios.addEventListener("change", highlightCheckedOpt)

const getEmotionsArr = (cats) => {
    const emotionsArr = []
    for (let cat of cats) {
        for (let tags of cat.emotionTags) {
            let tag = tags.charAt(0).toUpperCase() + tags.slice(1)
            if (!emotionsArr.includes(tag)) {
                emotionsArr.push(tag)
            }
        }
    }
    return emotionsArr
}

const renderEmotionsRadios = (cats) => {
    const emotions = getEmotionsArr(cats)
    let value = ""
    for (let emotion of emotions) {
        value += 
        `
            <div class="radio">
                <input 
                    type="radio"
                    id=${emotion}
                    value=${emotion}
                    name="radio-btns"
                />
                <label for=${emotion}>${emotion}</label>
            </div>     
        `
    }
    emotionRadios.innerHTML = value
}

renderEmotionsRadios(catsData)


