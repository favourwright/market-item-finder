export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()

  // user is logged in, redirect to home page
  if (user) {
    return navigateTo({
      path: '/',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})