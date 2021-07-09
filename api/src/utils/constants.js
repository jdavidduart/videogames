const API_KEY='key=23ec02e018834a7cb38c9360c3b5525b'
const URL_BASE='https://api.rawg.io/api/games/'
const URL_GAMES='https://api.rawg.io/api/games?'+ API_KEY
const URL_GENRES='https://api.rawg.io/api/genres?'+ API_KEY
const SEARCH_URL='https://api.rawg.io/api/games?search='
const PLATFORMS = ["PC","PlayStation 5", "PlayStation 4", "PlayStation 3", "PlayStation 2", "PlayStation", "PS Vita", "PSP","Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox","iOS","Android","macOS", "Classic Macintosh", "Apple II","Linux","Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "Wii U", "Wii", "GameCube", "Nintendo 64", "Game Boy Advance", "Game Boy Color", "Game Boy", "SNES", "NES","Atari 7800", "Atari 5200", "Atari 2600", "Atari Flashback", "Atari 8-bit", "Atari ST", "Atari Lynx", "Atari XEGS", "Jaguar","Commodore / Amiga","Genesis", "SEGA Saturn", "SEGA CD", "SEGA 32X", "SEGA Master System", "Dreamcast", "Game Gear","3DO","Neo Geo","Web"]
module.exports ={
    URL_GAMES,
    URL_GENRES,
    API_KEY,
    SEARCH_URL,
    URL_BASE,
    PLATFORMS
}
