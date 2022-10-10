console.clear()
console.log("%cMetallic", "color: " + getComputedStyle(document.body).getPropertyValue('--highlight').replaceAll(" ", "") + "; font-size: 45px")
console.log("%cBy Fog Network", "color: " + getComputedStyle(document.body).getPropertyValue('--highlight').replaceAll(" ", "") + "; font-size: 20px")
console.log("%chttps://discord.gg/yk33HZSZkU", "font-size: 15px")
console.log("%chttps://github.com/FogNetwork/Metallic", "font-size: 15px")

if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register(window.location.origin + "/sw.js")
}

if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register(window.location.origin + "/uv-sw.js", {scope: __uv$config.prefix})
}

var Stomp = new StompBoot({
  bare_server: "/bare/",
  directory: "/stomp/",
  loglevel: StompBoot.LOG_ERROR,
  codec: StompBoot.CODEC_XOR
})

if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register(window.location.origin + "/dip-sw.js", {scope: __DIP.config.prefix })
}

navigator.serviceWorker.register(window.location.origin + "/osana/sw.js", {
  scope: __osana$config.prefix,
  updateViaCache: "none"
})

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register(window.location.origin + "/aero-sw.js", {
  scope: "/go/",
  // Don't cache http requests
  updateViaCache: 'none',
  type: 'module'
})
}

function getSearchEngine() {
var engine = localStorage.getItem("engine") || "Google"
switch(engine) {
case "Google":
return "https://www.google.com/search?a="
break;
case "DuckDuckGo":
return "https://duckduckgo.com/?q="
break;
case "Bing":
return "https://www.bing.com/search?q="
break;
case "Brave":
return "https://search.brave.com/search?q="
break;
default:
return "https://www.google.com/search?a="
break;
}
}

function searchURL(url) {
if (url.match(/^https?:\/\//)) {
return url;
} else if (url.includes('.') && !url.includes(" ")) {
return "https://" + url
} else {
return getSearchEngine() + encodeURIComponent(url)
}
}

function getLink(url) {
url = searchURL(url)
var type = localStorage.getItem("type") || "Ultraviolet"

switch(type) {
case "Ultraviolet":
return "." + __uv$config.prefix + __uv$config.encodeUrl(url)
break;
case "Stomp":
return "." + Stomp.html(url)
break;
case "DIP":
return "." + __DIP.config.prefix + __uv$config.encodeUrl(url)
break;
case "Osana":
return "." + __osana$config.prefix + __osana$config.codec.encode(url)
break;
case "Aero":
return "." + "/go/" + url
break;
default:
return "." + __uv$config.prefix + __uv$config.encodeUrl(url)
break;
}
}

function getGlobeImg() {
  var code = `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM4 12h4.4c3.407.022 4.922 1.73 4.543 5.127H9.488v2.47a8.004 8.004 0 0010.498-8.083C19.327 12.504 18.332 13 17 13c-2.137 0-3.206-.916-3.206-2.75h-3.748c-.274-2.728.683-4.092 2.87-4.092 0-.975.327-1.597.811-1.97A8.004 8.004 0 004 12z" fill="%COLOR%"/></svg>`
  code = code.replace("%COLOR%", getComputedStyle(document.body).getPropertyValue('--background').replaceAll(" ", ""))
  return "data:image/svg+xml;base64," + window.btoa(code)
}

function getWindowLocation(page) {
var type = localStorage.getItem("type") || "Ultraviolet"

var pageURL = page.contentWindow.location.toString()

try {
switch(type) {
case "Ultraviolet":
pageURL = page.contentWindow.__uv$location.toString()
break;
case "Stomp":
pageURL = page.contentWindow.tc$.access.get2(page.contentWindow, 'location', '(window.location)').toString()
break;
case "DIP":
pageURL = page.contentWindow.__DIP.location.toString()
break;
case "Osana":
pageURL = page.contentWindow.location.toString().split(page.contentWindow.__osana$config.prefix)[1]
break;
case "Aero":
pageURL = page.contentWindow.location.toString().split("/go/")[1]
break;
default:
pageURL = page.contentWindow.__uv$location.toString()
break;
}
} catch {
}
return pageURL;
}