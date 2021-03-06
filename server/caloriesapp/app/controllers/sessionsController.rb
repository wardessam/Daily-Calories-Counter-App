class SessionsController < ApplicationController
   
    def create
       
        user = User.find_by(email:params["user"]["email"])
                    .try(:authenticate,params["user"]["password"])
        if user
         session[:user_id] = user.id
          render json: {
              logged_in: true,
              user: user
            }
         else
           render json: { 
              status: 401,
              errors: ['no such user, please try again']
             }
        end
    end
   
end