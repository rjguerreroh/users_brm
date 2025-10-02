// @import_dependencies
import { Application } from 'express'
import { UserRoutes } from './users/routes/userRoutes';

class Routes {
  
  private app: Application
  private prefix: string = '/api'
  
  // @declare_routes
  private userRoutes: UserRoutes

  constructor(app: Application) {
    this.app = app
    // @assign_routes
    this.userRoutes = new UserRoutes()
  }

  public init() {
    try{
      console.log('routes...');
      this.app.use(`${this.prefix}/users`, this.userRoutes.getRouter())

    } catch (error) {
      console.log('error', error)
    }
  }

}

export { Routes }