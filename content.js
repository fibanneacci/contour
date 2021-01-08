console.log('fuck!')

// click
document.addEventListener('click', function (e) {
    console.log('click')
    chrome.storage.local.get('toggle', function (result) {
        if (result.toggle == '■' && e.target.id != 'toggle') {
            let mouse_x = e.clientX
            let mouse_y = e.clientY
            // console.log(mouse_x + ', ' + mouse_y)
            let radius = 75
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    let new_x = mouse_x + dx
                    let new_y = mouse_y + dy
                    if (new_x >= 0 && new_x < width + 70 && new_y >= 0 && new_y < height) {
                        let dist = Math.sqrt((new_x - mouse_x) * (new_x - mouse_x) + (new_y - mouse_y) * (new_y - mouse_y))
                        if (dist <= radius) {
                            z[new_x * height + new_y] += radius - dist
                            // console.log(new_x + ', ' + new_y + ', ' + z[new_x * height + new_y])
                        }
                    }
                }
            }
        }
    })
})

// move
document.addEventListener('mousemove', function (e) {
    console.log('mousemove')
    chrome.storage.local.get('toggle', function (result) {
        if (result.toggle == '■') {
            let mouse_x = e.clientX
            let mouse_y = e.clientY
            // console.log(mouse_x + ', ' + mouse_y)
            let radius = 50
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    let new_x = mouse_x + dx
                    let new_y = mouse_y + dy
                    if (new_x >= 0 && new_x < width + 70 && new_y >= 0 && new_y < height) {
                        let dist = Math.sqrt((new_x - mouse_x) * (new_x - mouse_x) + (new_y - mouse_y) * (new_y - mouse_y))
                        if (dist <= radius) {
                            z[new_x * height + new_y] += radius - dist
                            // console.log(new_x + ', ' + new_y + ', ' + z[new_x * height + new_y])
                        }
                    }
                }
            }
        }
    })
})

// scroll
document.addEventListener('scroll', function () {
    console.log('scroll')
    chrome.storage.local.get('toggle', function (result) {
        if (result.toggle == '■') {
            scroll_dist += window.scrollY // later: modify to include change (for scrolling up)
            // console.log(scroll_dist)
            let added = 0
            let interval = (width + 70 - scroll_dist) / 5
            for (let i = 0; i < width + 70; i++) {
                if (i % Math.max(interval, 1) == 0) {
                    added += 10
                    // console.log(i + ': ' + added)
                }
                for (let j = 0; j < height; j++) {
                    z[i * height + j] += added
                }
            }
        }
    })
})