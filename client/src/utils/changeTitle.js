const changeTitle = (partial) => {
    if (partial !== ''){
        let title = `FanArt Central - ${partial}`
        document.title = title;
    } else {
        document.title = 'FanArt Central';
    }
}

export default changeTitle;