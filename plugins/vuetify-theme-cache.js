export default (context) => {
  const isDarkTheme = localStorage.getItem('opnakama_theme_dark')
  context.app.vuetify.framework.theme.isDark = isDarkTheme === 'true'
}
