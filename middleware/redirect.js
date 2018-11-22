export default function ({ store, redirect, route }) {
    console.log(route.fullPath)
    return redirect('/fr/home')
  }