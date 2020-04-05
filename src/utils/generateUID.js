export default () => {
    let code = ''
    for (let i = 0, max = 6; i < max; i += 1) {
        code += String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    }
    return code
}
