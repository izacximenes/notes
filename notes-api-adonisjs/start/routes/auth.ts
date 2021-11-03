import Route from '@ioc:Adonis/Core/Route'

Route.post('register', 'AuthController.register')
Route.post('login', 'AuthController.login')
Route.get('info', 'AuthController.show').middleware('auth')
Route.delete('logout', 'AuthController.logout').middleware('auth')
