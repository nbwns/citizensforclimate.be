export default function ({ store, redirect, route }) {
    console.log("path", route.fullPath)
    console.log("locale", route.params.locale)
    let defaultLocale = process.env.DEFAULT_LOCALE
    let path
    if(route.fullPath === '/'){
      path = route.fullPath + defaultLocale
    } 
    return redirect(path)
  }