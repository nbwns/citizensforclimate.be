export default function ({ store, redirect, route }) {
    console.log("path", route.fullPath)
    console.log("locale", route.params.locale)
    let homepage = process.env.HOME_PAGE
    let defaultLocale = process.env.DEFAULT_LOCALE
    let path
    if(route.fullPath === '/'){
      path = route.fullPath + defaultLocale + '/' + homepage
    } else {
      path = route.fullPath + '/' + homepage
    }
    return redirect(path)
  }